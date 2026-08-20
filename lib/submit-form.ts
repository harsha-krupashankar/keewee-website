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

  if (!res.ok) {
    throw new Error(`Submission failed (${res.status})`);
  }
}
