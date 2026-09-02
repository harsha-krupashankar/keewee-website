"use client";

import { useState } from "react";
import Container from "@/components/Container";
import HoneypotField from "@/components/HoneypotField";
import Reveal from "@/components/Reveal";
import { arrOptions, budgetOptions } from "@/lib/quote-options";
import { SubmissionThrottledError, submitForm } from "@/lib/submit-form";
import type { ServicePage } from "@/sanity/lib/types";

const inputClass =
  "rounded-xl border border-border-soft bg-[#FBFAF6] px-3.5 py-3 font-body text-[15px] text-ink outline-none placeholder:text-faint focus:border-green focus:shadow-[0_0_0_3px_rgba(198,240,0,0.35)]";

export default function ServiceQuoteForm({ doc }: { doc: ServicePage }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<null | "generic" | "throttled">(null);

  function toggle(label: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    const form = new FormData(e.currentTarget);
    setSubmitting(true);
    setError(null);
    try {
      await submitForm({
        formType: "quote",
        source: `service-page:${doc.serviceScope}`,
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        company: String(form.get("company") ?? ""),
        website: String(form.get("website") ?? ""),
        arr: String(form.get("arr") ?? ""),
        budget: String(form.get("budget") ?? ""),
        services: Array.from(selected),
        message: String(form.get("message") ?? ""),
        hp: String(form.get("hp") ?? ""),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof SubmissionThrottledError ? "throttled" : "generic");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="py-8 md:py-10">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[24px] border border-green-border bg-green-bg p-8 shadow-[0_16px_40px_rgba(78,125,46,0.12)] sm:p-10">
          <div
            className="pointer-events-none absolute -bottom-8 -right-6 h-[200px] w-[240px] opacity-[0.12]"
            style={{
              backgroundImage: "radial-gradient(#4E7D2E 2px, transparent 2.4px)",
              backgroundSize: "15px 15px",
            }}
          />
          <div className="relative z-[2] mb-8 max-w-[760px]">
            <span className="font-display text-[13px] font-bold uppercase tracking-[0.09em] text-green-dark">
              Get a custom quote
            </span>
            <h2 className="my-3 font-display text-[26px] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink text-pretty sm:text-[38px]">
              {doc.quoteHeadline}
            </h2>
            <p className="font-body text-base font-semibold leading-relaxed text-green-deep">
              Fill this in and we&apos;ll send a scope and pricing within 48 hours.
              No generic proposal, no sales call you didn&apos;t ask for.
            </p>
          </div>

          <div className="relative z-[2] rounded-[20px] border border-green-border bg-white p-6 shadow-[0_10px_30px_rgba(28,27,25,0.06)] sm:p-8">
            {submitted ? (
              <div className="py-8 text-center">
                <div className="mb-3 font-sticker text-[32px] tracking-wide text-green">
                  Got it — thank you!
                </div>
                <p className="mx-auto max-w-[460px] font-body text-base font-medium leading-relaxed text-body">
                  We respond within 48 hours. A real person reads every submission.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <HoneypotField />
                <div className="mb-5.5 grid gap-4.5 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="font-display text-[13px] font-bold text-ink">Full Name</span>
                    <input type="text" name="name" placeholder="Your name" required className={inputClass} />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="font-display text-[13px] font-bold text-ink">Work Email</span>
                    <input type="email" name="email" placeholder="you@company.com" required className={inputClass} />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="font-display text-[13px] font-bold text-ink">Company Name</span>
                    <input type="text" name="company" placeholder="Your company" required className={inputClass} />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="font-display text-[13px] font-bold text-ink">Company Website</span>
                    <input type="text" name="website" placeholder="yourwebsite.com" className={inputClass} />
                  </label>
                </div>

                <label className="mb-5.5 flex max-w-[340px] flex-col gap-1.5">
                  <span className="font-display text-[13px] font-bold text-ink">Current ARR (approximate)</span>
                  <select name="arr" defaultValue="" required className={`${inputClass} cursor-pointer`}>
                    <option value="" disabled>Select a range</option>
                    {arrOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </label>

                {doc.serviceCheckboxes && doc.serviceCheckboxes.length > 0 && (
                  <fieldset className="mb-6">
                    <legend className="mb-3 font-display text-[13px] font-bold text-ink">
                      Which {doc.serviceScope} services are you interested in?
                    </legend>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {doc.serviceCheckboxes.map((label) => {
                        const on = selected.has(label);
                        return (
                          <button
                            key={label}
                            type="button"
                            onClick={() => toggle(label)}
                            aria-pressed={on}
                            className="flex w-full items-center gap-2.5 rounded-lg px-1 py-1.5 text-left focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-2"
                          >
                            <span
                              className={`flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-[6px] border-2 text-[13px] font-extrabold transition-colors ${
                                on
                                  ? "border-ink bg-green text-white"
                                  : "border-border-soft bg-[#FBFAF6] text-transparent"
                              }`}
                            >
                              ✓
                            </span>
                            <span className="font-body text-sm font-semibold leading-tight text-ink">
                              {label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                )}

                <label className="mb-5.5 flex max-w-[340px] flex-col gap-1.5">
                  <span className="font-display text-[13px] font-bold text-ink">
                    What&apos;s your monthly marketing budget?
                  </span>
                  <select name="budget" defaultValue="" required className={`${inputClass} cursor-pointer`}>
                    <option value="" disabled>Select a range</option>
                    {budgetOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </label>

                <label className="mb-6 flex flex-col gap-1.5">
                  <span className="font-display text-[13px] font-bold text-ink">
                    Anything else we should know?
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your current setup, what's broken, and what you've tried before. The more context you give, the more useful our response will be."
                    className={`${inputClass} resize-y leading-relaxed`}
                  />
                </label>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl bg-green px-8 py-4 font-display text-[17px] font-bold text-white shadow-[3px_3px_0_#1C1B19] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#1C1B19] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-[3px] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Sending…" : "Send my details"}
                  </button>
                  <span className="max-w-[420px] font-body text-[13px] font-medium leading-relaxed text-muted">
                    We respond within 48 hours. A real person reads every submission.
                  </span>
                </div>
                {error && (
                  <p className="mt-4 font-body text-sm font-semibold text-rust">
                    {error === "throttled"
                      ? "Too many submissions from your network. Please wait a few minutes and try again — your details were not sent."
                      : "Something went wrong sending your details. Please try again."}
                  </p>
                )}
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
