import { after, type NextRequest } from "next/server";

/**
 * Form-submission sink.
 *
 * The four public forms (two newsletter subscribes, two custom-quote requests)
 * POST here. This route forwards each submission to a Google Apps Script Web App
 * that appends a row to one of two spreadsheets — subscribes to one, quotes to
 * the other. See `docs/google-sheets-forms.md` for the Apps Script and setup.
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

type Payload = SubscribePayload | QuotePayload;

const isEmail = (v: unknown): v is string =>
  typeof v === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

function validate(body: unknown): Payload | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;

  if (b.formType === "subscribe") {
    if (!isEmail(b.email)) return null;
    return {
      formType: "subscribe",
      source: typeof b.source === "string" ? b.source : "unknown",
      email: b.email,
    };
  }

  if (b.formType === "quote") {
    if (!isEmail(b.email)) return null;
    if (typeof b.name !== "string" || !b.name.trim()) return null;
    const str = (v: unknown) => (typeof v === "string" ? v : "");
    const arr = (v: unknown) =>
      Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
    return {
      formType: "quote",
      source: str(b.source) || "unknown",
      name: b.name,
      email: b.email,
      company: str(b.company),
      website: str(b.website),
      arr: str(b.arr),
      budget: str(b.budget),
      services: arr(b.services),
      goals: arr(b.goals),
      message: str(b.message),
    };
  }

  return null;
}

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json(
      { message: "Missing GOOGLE_SHEETS_WEBHOOK_URL" },
      { status: 500 }
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const payload = validate(json);
  if (!payload) {
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
