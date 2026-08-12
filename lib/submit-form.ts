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
};

export type FormSubmission = SubscribeSubmission | QuoteSubmission;

export async function submitForm(payload: FormSubmission): Promise<void> {
  const res = await fetch("/api/forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Submission failed (${res.status})`);
  }
}
