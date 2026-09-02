/**
 * Client-side helper the public forms use to send a submission to
 * `POST /api/forms`, which forwards it to Google Sheets.
 *
 * Resolves on success and throws on any failure so callers can `try/catch` and
 * show an inline error instead of silently pretending the row was saved.
 */

export type SubscribeSubmission = {
  formType: "subscribe";
  source: string;
  email: string;
  /** Honeypot — always empty for a real visitor. See the hidden `hp` field on each form. */
  hp?: string;
};

export type QuoteSubmission = {
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
  /** Honeypot — always empty for a real visitor. See the hidden `hp` field on each form. */
  hp?: string;
};

export type FormSubmission = SubscribeSubmission | QuoteSubmission;

/**
 * Thrown when the submission was *throttled* rather than broken — the payload
 * was fine and retrying shortly will work.
 *
 * This exists because the throttle is enforced at the Vercel edge (the
 * `form-rate-limit` firewall rule on `/api/forms`), which denies the request
 * before it reaches the route. Nothing lands in the runtime logs, so from the
 * client the block is indistinguishable from a genuine 5xx unless we look at
 * the status. Telling a throttled visitor "something went wrong, try again"
 * is both wrong and actively harmful — every immediate retry spends more of
 * the same budget. See `docs/google-sheets-forms.md`.
 */
export class SubmissionThrottledError extends Error {
  constructor() {
    super("Submission throttled");
    this.name = "SubmissionThrottledError";
  }
}

declare global {
  interface Window {
    dataLayer?: Object[];
  }
}

/**
 * Pushes a conversion event to GTM's dataLayer. Safe to call before consent is
 * granted / before GTM has loaded — `window.dataLayer` is a plain array that
 * queues events; GTM (components/analytics/GoogleTagManager.tsx) reads through
 * it from the start once it mounts, so nothing is lost, just delayed until the
 * visitor accepts the cookie banner. No PII goes in here — GTM already fires
 * two Custom Event triggers, "Trigger - Free Audit Submit" (free_audit_submit)
 * and "Trigger - Newsletter Signup" (newsletter_signup) — see GTM-P4G38MZB.
 */
function pushDataLayerEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export async function submitForm(payload: FormSubmission): Promise<void> {
  const controller = new AbortController();
  // `/api/forms` now replies as soon as the payload validates — the slow
  // upstream write happens after the response — so a healthy request settles
  // in well under a second. 15s only exists to catch a genuinely stuck
  // network request rather than the several-second-to-30s waits this used to
  // need before the response was decoupled from the write.
  const timeout = setTimeout(() => controller.abort(), 15_000);

  let res: Response;
  try {
    res = await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Submission timed out");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }

  // 429 is the conventional throttle status; 403 is what the Vercel firewall
  // rule actually returns on a `deny`. The route's own 403 (`isAllowedOrigin`)
  // can't happen for a real visitor on a real page — a same-origin POST always
  // sends a matching `Origin` — so treating 403 as "throttled" here is
  // accurate for every case a visitor can reach.
  if (res.status === 429 || res.status === 403) {
    throw new SubmissionThrottledError();
  }

  if (!res.ok) {
    throw new Error(`Submission failed (${res.status})`);
  }

  if (payload.formType === "subscribe") {
    pushDataLayerEvent("newsletter_signup", { source: payload.source });
  } else if (payload.formType === "quote" && payload.source === "free-audit-page") {
    pushDataLayerEvent("free_audit_submit", { source: payload.source });
  }
}
