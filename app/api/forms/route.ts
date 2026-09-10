import { after, type NextRequest } from "next/server";

/**
 * Form-submission sink.
 *
 * The five public forms (two newsletter subscribes, two custom-quote requests,
 * the free-audit booking) POST here. This route forwards each submission to a
 * Google Apps Script Web App that appends a row to one spreadsheet, on a
 * separate tab per form type (Subscribes / Quotes / Audits). See
 * `docs/google-sheets-forms.md` for the Apps Script and setup.
 *
 * The Apps Script URL lives server-side (`GOOGLE_SHEETS_WEBHOOK_URL`, no
 * `NEXT_PUBLIC_` prefix) so it is never shipped to the browser and there is no
 * cross-origin request from the client.
 */

type SubscribePayload = {
  formType: "subscribe";
  source: string;
  email: string;
};

type QuotePayload = {
  formType: "quote";
  source: string;
  name: string;
  email: string;
  company?: string;
  website?: string;
  arr?: string;
  budget?: string;
  services?: string[];
  goals?: string[];
  message?: string;
};

type AuditPayload = {
  formType: "audit";
  source: string;
  name: string;
  email: string;
  company?: string;
  website?: string;
  message?: string;
};

type Payload = SubscribePayload | QuotePayload | AuditPayload;

const FIELD_MAX = 500;
const MESSAGE_MAX = 2000;
const ARRAY_MAX = 20;

const isEmail = (v: unknown): v is string =>
  typeof v === "string" && v.length <= FIELD_MAX && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

/**
 * Google Sheets treats a cell starting with `=`, `+`, `-` or `@` as a
 * formula. A prefixed apostrophe forces it to render as literal text instead
 * — same trick `Code.gs` applies again on write, so this survives someone
 * redeploying the script from an older copy that lacks it.
 */
const sanitize = (v: string, max: number) => {
  const trimmed = v.slice(0, max);
  return /^[=+\-@\t\r]/.test(trimmed) ? `'${trimmed}` : trimmed;
};

/**
 * Why a payload was rejected. Surfaced in the runtime log on every 400 so a
 * "Something went wrong" report can be traced to a cause — the client only
 * ever sees the status.
 */
type Rejection =
  | "not-an-object"
  | "bad-email"
  | "empty-name"
  | "unknown-form-type";

function validate(body: unknown): Payload | Rejection {
  if (!body || typeof body !== "object") return "not-an-object";
  const b = body as Record<string, unknown>;

  if (b.formType === "subscribe") {
    if (!isEmail(b.email)) return "bad-email";
    return {
      formType: "subscribe",
      source: sanitize(typeof b.source === "string" ? b.source : "unknown", FIELD_MAX),
      email: b.email,
    };
  }

  const str = (v: unknown, max = FIELD_MAX) => sanitize(typeof v === "string" ? v : "", max);

  if (b.formType === "audit") {
    if (!isEmail(b.email)) return "bad-email";
    if (typeof b.name !== "string" || !b.name.trim()) return "empty-name";
    return {
      formType: "audit",
      source: str(b.source) || "unknown",
      name: sanitize(b.name.slice(0, FIELD_MAX), FIELD_MAX),
      email: b.email,
      company: str(b.company),
      website: str(b.website),
      message: str(b.message, MESSAGE_MAX),
    };
  }

  if (b.formType === "quote") {
    if (!isEmail(b.email)) return "bad-email";
    if (typeof b.name !== "string" || !b.name.trim()) return "empty-name";
    const arr = (v: unknown) =>
      Array.isArray(v)
        ? v
            .filter((x): x is string => typeof x === "string")
            .slice(0, ARRAY_MAX)
            .map((x) => sanitize(x, FIELD_MAX))
        : [];
    return {
      formType: "quote",
      source: str(b.source) || "unknown",
      name: sanitize(b.name.slice(0, FIELD_MAX), FIELD_MAX),
      email: b.email,
      company: str(b.company),
      website: str(b.website),
      arr: str(b.arr),
      budget: str(b.budget),
      services: arr(b.services),
      goals: arr(b.goals),
      message: str(b.message, MESSAGE_MAX),
    };
  }

  return "unknown-form-type";
}

/**
 * Rejects cross-origin writes. A same-origin `fetch` always sends `Origin`
 * on a POST, so a missing header only happens for non-browser clients (curl,
 * server-to-server) — those aren't the threat model here, so they pass.
 */
function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const allowed = new Set([
    `https://${request.headers.get("host")}`,
    "https://keewee.in",
    "https://www.keewee.in",
  ]);
  if (process.env.NODE_ENV !== "production") allowed.add("http://localhost:3000");

  return allowed.has(origin);
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return Response.json({ message: "Forbidden" }, { status: 403 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("Missing GOOGLE_SHEETS_WEBHOOK_URL");
    return Response.json({ message: "Internal error" }, { status: 500 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    console.warn(`Form rejected: reason=invalid-json ua=${request.headers.get("user-agent") ?? ""}`);
    return Response.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const payload = validate(json);
  if (typeof payload === "string") {
    // Enough to diagnose without logging PII: which check failed, which form,
    // and the UA so a browser/password-manager pattern shows up across reports.
    const b = json as Record<string, unknown>;
    console.warn(
      `Form rejected: reason=${payload} formType=${String(b?.formType)} source=${String(b?.source)}` +
        ` emailShape=${typeof b?.email === "string" ? b.email.replace(/[^@.\s]/g, "x") : typeof b?.email}` +
        ` ua=${request.headers.get("user-agent") ?? ""}`,
    );
    return Response.json({ message: "Bad request" }, { status: 400 });
  }

  // The Apps Script Web App this forwards to is a synchronous, sometimes
  // cold-starting spreadsheet write — 5s warm, 30s+ cold, observed directly
  // against the deployed endpoint. Awaiting it here left the submit button on
  // "Sending…" long enough that a real visitor would assume the site was
  // broken and bail (or double-submit). The payload is already validated
  // above, so nothing past this point can change the response; only whether
  // the write itself lands, which `after` can't communicate back to the
  // client anyway once we've already replied. Failures are still visible
  // server-side via the console.error below.
  after(async () => {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        // A deployed Apps Script Web App answers a POST with a 302 to a
        // *single-use* script.googleusercontent.com URL, emitted only after
        // doPost has run to completion. Following that hop is both
        // unnecessary and flaky (the key is consumed on first read), so we
        // stop at the redirect and treat it — or a direct 2xx — as
        // confirmation the script executed. Following it here is what
        // previously caused intermittent false 502s and duplicate rows.
        redirect: "manual",
      });

      if (res.status !== 302 && !res.ok) {
        console.error(`Form webhook write failed: upstream status ${res.status}`);
      }
    } catch (error) {
      console.error("Form webhook unreachable:", error);
    }
  });

  return Response.json({ ok: true });
}
