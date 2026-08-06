"use client";

import { useState } from "react";

import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import Headline from "@/components/sanity/Headline";
import { arrOptions, budgetOptions } from "@/lib/quote-options";
import type { ServicesPage } from "@/sanity/lib/types";

/**
 * The catalogue-wide quote form.
 *
 * The per-service version in `components/services/ServiceQuoteForm` asks about
 * one category; this one asks what the visitor is trying to achieve and lets
 * them tick services across all five, which is the whole point of landing on the
 * index rather than on a single service page.
 */

const inputClass =
  "rounded-xl border border-border-soft bg-[#FBFAF6] px-3.5 py-3 font-body text-[15px] text-ink outline-none placeholder:text-faint focus:border-green focus:shadow-[0_0_0_3px_rgba(198,240,0,0.35)]";

const labelClass = "font-display text-[13px] font-bold tracking-[-0.01em] text-ink";

export default function ServicesQuoteForm({ page }: { page: ServicesPage }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  function toggle(key: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <section id="kw-quote" className="bg-paper pb-15 pt-2">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[24px] border border-green-border bg-green-bg px-10 py-11 shadow-[0_16px_40px_rgba(78,125,46,0.12)]">
          <div
            className="pointer-events-none absolute -bottom-[30px] -right-6 h-[200px] w-[240px] opacity-[0.12]"
            style={{
              backgroundImage: "radial-gradient(#4E7D2E 2px, transparent 2.4px)",
              backgroundSize: "15px 15px",
            }}
          />

          <div className="relative z-[2] mb-8 max-w-[760px]">
            {page.quoteEyebrow && (
              <span className="font-display text-[13px] font-bold uppercase tracking-[1.6px] text-green-dark">
                {page.quoteEyebrow}
              </span>
            )}
            <h2 className="my-3 text-pretty font-display text-[clamp(28px,4.2vw,46px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink">
              <Headline value={page.quoteHeadline} />
            </h2>
            <Copy
              value={page.quoteIntro}
              className="font-body text-base font-semibold leading-[1.6] text-green-deep"
            />
          </div>

          <div className="relative z-[2] rounded-[20px] border border-[#E1E9CF] bg-white p-8 shadow-[0_10px_30px_rgba(28,27,25,0.06)]">
            {submitted ? (
              <div className="px-5 py-10 text-center">
                {page.quoteSuccessSticker && (
                  <div className="mb-3 font-sticker text-[34px] tracking-[0.5px] text-green">
                    {page.quoteSuccessSticker}
                  </div>
                )}
                <p className="mx-auto max-w-[460px] font-body text-base font-medium leading-[1.6] text-body">
                  {page.quoteSuccessText}
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="mb-5.5 grid gap-4.5 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>Full Name</span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      required
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>Work Email</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      required
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>Company Name</span>
                    <input
                      type="text"
                      name="company"
                      placeholder="Your company"
                      required
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>Company Website</span>
                    <input
                      type="text"
                      name="website"
                      placeholder="yourwebsite.com"
                      className={inputClass}
                    />
                  </label>
                </div>

                <Select
                  name="arr"
                  label="Current ARR (approximate)"
                  options={arrOptions}
                />

                {page.quoteGoals && page.quoteGoals.length > 0 && (
                  <fieldset className="mb-6">
                    <legend className={`${labelClass} mb-2.75`}>
                      {page.quoteGoalsLabel}
                    </legend>
                    <div className="flex flex-wrap gap-2.25">
                      {page.quoteGoals.map((goal) => {
                        const on = selected.has(`g:${goal}`);
                        return (
                          <button
                            key={goal}
                            type="button"
                            onClick={() => toggle(`g:${goal}`)}
                            aria-pressed={on}
                            className={`cursor-pointer rounded-full px-4.5 py-2.5 font-display text-sm font-bold tracking-[-0.01em] transition-all duration-150 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-2 ${
                              on
                                ? "border-2 border-ink bg-green text-white shadow-[2px_2px_0_#1C1B19]"
                                : "border-2 border-border-soft bg-white text-ink"
                            }`}
                          >
                            {goal}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                )}

                {page.quoteServiceGroups && page.quoteServiceGroups.length > 0 && (
                  <fieldset className="mb-6">
                    <legend className={`${labelClass} mb-3.5`}>
                      {page.quoteServicesLabel}
                    </legend>
                    <div className="flex flex-col gap-5">
                      {page.quoteServiceGroups.map((group) => (
                        <div key={group.title}>
                          <div className="mb-2.5 font-mono text-[11px] font-bold uppercase tracking-[1px] text-green">
                            {group.title}
                          </div>
                          <div className="grid gap-2 [grid-template-columns:repeat(auto-fill,minmax(min(230px,100%),1fr))]">
                            {group.options?.map((option) => {
                              const key = `s:${group.title}:${option}`;
                              const on = selected.has(key);
                              return (
                                <button
                                  key={key}
                                  type="button"
                                  onClick={() => toggle(key)}
                                  aria-pressed={on}
                                  className="flex w-full cursor-pointer items-center gap-2.5 px-1 py-1.5 text-left focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-2"
                                >
                                  <span
                                    className={`inline-flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-[6px] border-2 text-[13px] font-extrabold transition-all duration-150 ${
                                      on
                                        ? "border-ink bg-green text-white"
                                        : "border-[#D8D2C4] bg-[#FBFAF6] text-transparent"
                                    }`}
                                  >
                                    ✓
                                  </span>
                                  <span className="font-body text-sm font-semibold leading-[1.25] text-ink">
                                    {option}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                )}

                <Select
                  name="budget"
                  label="What's your monthly marketing budget?"
                  options={budgetOptions}
                />

                <label className="mb-6 flex flex-col gap-1.5">
                  <span className={labelClass}>Anything else we should know?</span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder={page.quoteMessagePlaceholder ?? undefined}
                    className={`${inputClass} resize-y leading-[1.5]`}
                  />
                </label>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    className="cursor-pointer rounded-xl bg-green px-8 py-4 font-display text-[17px] font-bold text-white shadow-[3px_3px_0_#1C1B19] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#1C1B19] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-[3px]"
                  >
                    {page.quoteButtonLabel}
                  </button>
                  <span className="max-w-[420px] font-body text-[13px] font-medium leading-[1.45] text-muted">
                    {page.quoteNote}
                  </span>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** The chevron is drawn rather than native: `appearance-none` removes the OS one. */
function Select({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <label className="mb-5.5 flex max-w-[340px] flex-col gap-1.5">
      <span className={labelClass}>{label}</span>
      <div className="relative">
        <select
          name={name}
          className={`${inputClass} w-full cursor-pointer appearance-none pr-9.5`}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-green">
          ▾
        </span>
      </div>
    </label>
  );
}
