"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { SubmissionThrottledError, submitForm } from "@/lib/submit-form";
import type { ReferralForm as ReferralFormCopy } from "@/sanity/lib/types";
import { buttonClass } from "./shared";
import { REFERRED_COMPANY_KEY } from "./storage";

const TOTAL_STEPS = 3;

type FieldKey =
  | "name"
  | "email"
  | "phone"
  | "linkedin"
  | "company"
  | "website"
  | "contactName"
  | "contactRole"
  | "contactEmail"
  | "contactPhone"
  | "contactLinkedin";

type Field = {
  key: FieldKey;
  label: keyof ReferralFormCopy;
  type: "text" | "email" | "tel" | "url";
  required: boolean;
  autoComplete?: string;
};

const STEP_FIELDS: Record<1 | 2, Field[]> = {
  1: [
    { key: "name", label: "nameLabel", type: "text", required: true, autoComplete: "name" },
    { key: "email", label: "emailLabel", type: "email", required: true, autoComplete: "email" },
    { key: "phone", label: "phoneLabel", type: "tel", required: true, autoComplete: "tel" },
    { key: "linkedin", label: "linkedinLabel", type: "url", required: false, autoComplete: "url" },
  ],
  2: [
    { key: "company", label: "companyLabel", type: "text", required: true, autoComplete: "off" },
    { key: "website", label: "websiteLabel", type: "url", required: true, autoComplete: "off" },
    { key: "contactName", label: "contactNameLabel", type: "text", required: true, autoComplete: "off" },
    { key: "contactRole", label: "contactRoleLabel", type: "text", required: true, autoComplete: "off" },
    { key: "contactEmail", label: "contactEmailLabel", type: "email", required: true, autoComplete: "off" },
    { key: "contactPhone", label: "contactPhoneLabel", type: "tel", required: false, autoComplete: "off" },
    {
      key: "contactLinkedin",
      label: "contactLinkedinLabel",
      type: "url",
      required: false,
      autoComplete: "off",
    },
  ],
};

const isEmail = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

const LABEL = "font-display text-[13px] font-bold text-ink";
const ERROR = "font-body text-[13px] text-rust";
const INPUT =
  "w-full rounded-xl border-2 bg-white px-3.5 py-2.5 font-body text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-150 focus:border-green focus:shadow-[0_0_0_3px_rgba(217,242,92,0.4)]";
const CHOICE = "inline-flex cursor-pointer items-center gap-2.5 font-body text-[15px] text-ink";
const RADIO =
  "size-5 flex-shrink-0 cursor-pointer appearance-none rounded-full border-2 border-faint bg-white transition-all duration-150 checked:border-[6px] checked:border-green focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-lime-bright";
const LEGEND = "mb-3 p-0 font-display text-[15px] font-bold text-ink";

/**
 * The three-step referral form at the top of `/referral`: the referrer, the
 * company, then how warm the lead is. Everything is one `<form>` so Enter
 * advances a step the same way the Next button does; errors only appear once a
 * step has been attempted, and the submission lands in the Referrals sheet.
 */
export default function ReferralForm({ copy }: { copy?: ReferralFormCopy | null }) {
  const c = copy ?? {};
  const router = useRouter();
  const baseId = useId();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const movedStep = useRef(false);

  const [step, setStep] = useState(1);
  const [values, setValues] = useState<Record<FieldKey, string>>({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    company: "",
    website: "",
    contactName: "",
    contactRole: "",
    contactEmail: "",
    contactPhone: "",
    contactLinkedin: "",
  });
  const [spoke, setSpoke] = useState<"yes" | "no" | null>(null);
  const [mention, setMention] = useState<"yes" | "no" | null>(null);
  const [notes, setNotes] = useState("");
  const [agree, setAgree] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<null | "generic" | "throttled">(null);

  // Moving between steps swaps the fields out from under the keyboard user, so
  // land them on the new step's title rather than at the top of the document.
  useEffect(() => {
    if (!movedStep.current) return;
    titleRef.current?.focus();
  }, [step]);

  const fieldError = (field: Field) => {
    if (!showErrors) return undefined;
    const value = values[field.key].trim();
    if (field.required && !value) return c.requiredError ?? undefined;
    if (field.type === "email" && value && !isEmail(value)) return c.invalidEmailError ?? undefined;
    return undefined;
  };

  const stepValid = (s: 1 | 2) =>
    STEP_FIELDS[s].every((field) => {
      const value = values[field.key].trim();
      if (field.required && !value) return false;
      return field.type !== "email" || !value || isEmail(value);
    });

  const lastStepValid = !!spoke && (spoke === "yes" || !!mention) && agree;

  function goTo(next: number) {
    movedStep.current = true;
    setShowErrors(false);
    setError(null);
    setStep(next);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    if (step < TOTAL_STEPS) {
      if (stepValid(step as 1 | 2)) goTo(step + 1);
      else setShowErrors(true);
      return;
    }

    if (!lastStepValid) {
      setShowErrors(true);
      return;
    }

    const trimmed = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value.trim()])
    ) as Record<FieldKey, string>;

    setSubmitting(true);
    setError(null);
    try {
      await submitForm({
        formType: "referral",
        source: "referral-page",
        ...trimmed,
        warmIntro: spoke ?? undefined,
        mentionName: spoke === "no" ? (mention ?? "") : "",
        message: notes.trim(),
      });
      try {
        sessionStorage.setItem(REFERRED_COMPANY_KEY, trimmed.company);
      } catch {
        // Storage can be blocked; the thank-you page falls back to generic copy.
      }
      router.push("/referral/thank-you");
    } catch (err) {
      setError(err instanceof SubmissionThrottledError ? "throttled" : "generic");
      setSubmitting(false);
    }
  }

  const title = step === 1 ? c.step1Title : step === 2 ? c.step2Title : c.step3Title;
  const stepLabel = c.stepLabel
    ?.replace("{current}", String(step))
    .replace("{total}", String(TOTAL_STEPS));

  return (
    <form
      id="referral-form"
      noValidate
      onSubmit={handleSubmit}
      className="box-border flex min-w-0 max-w-[560px] flex-[1_1_420px] scroll-mt-28 flex-col gap-8 rounded-[24px] border-2 border-ink bg-white p-[clamp(24px,3.5vw,44px)] shadow-[6px_6px_0_#1C1B19]"
    >
      <div className="flex flex-col gap-3">
        {stepLabel && (
          <span className="font-display text-xs font-bold uppercase tracking-[0.12em] text-green">
            {stepLabel}
          </span>
        )}
        <div className="flex gap-1.5" aria-hidden>
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i < step ? "bg-green" : "bg-surface"
              }`}
            />
          ))}
        </div>
        {title && (
          <h2
            ref={titleRef}
            tabIndex={-1}
            className="mt-1 font-display text-[26px] font-bold leading-[1.1] tracking-[-0.01em] text-ink outline-none"
          >
            {title}
          </h2>
        )}
      </div>

      {step < TOTAL_STEPS ? (
        <div className="flex flex-wrap gap-5">
          {STEP_FIELDS[step as 1 | 2].map((field) => {
            const id = `${baseId}-${field.key}`;
            const err = fieldError(field);
            return (
              <div key={field.key} className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
                <label htmlFor={id} className={LABEL}>
                  {c[field.label]}
                </label>
                <input
                  id={id}
                  name={field.key}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  required={field.required}
                  value={values[field.key]}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                  aria-invalid={err ? true : undefined}
                  aria-describedby={err ? `${id}-error` : undefined}
                  className={`${INPUT} ${err ? "border-rust" : "border-faint"}`}
                />
                {err && (
                  <span id={`${id}-error`} className="font-body text-xs text-rust">
                    {err}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
            <legend className={LEGEND}>{c.spokeQuestion}</legend>
            <label className={CHOICE}>
              <input
                type="radio"
                name="spoke"
                className={RADIO}
                checked={spoke === "yes"}
                onChange={() => setSpoke("yes")}
              />
              <span>{c.spokeYesLabel}</span>
            </label>
            <label className={CHOICE}>
              <input
                type="radio"
                name="spoke"
                className={RADIO}
                checked={spoke === "no"}
                onChange={() => setSpoke("no")}
              />
              <span>{c.spokeNoLabel}</span>
            </label>
            {showErrors && !spoke && c.pickOneError && (
              <span className={ERROR}>{c.pickOneError}</span>
            )}
          </fieldset>

          {spoke === "no" && (
            <fieldset className="m-0 flex flex-col gap-3 rounded-[18px] border-0 bg-paper px-5 py-4">
              <legend className={`float-left w-full ${LEGEND}`}>{c.mentionQuestion}</legend>
              <div className="flex flex-wrap gap-6">
                <label className={CHOICE}>
                  <input
                    type="radio"
                    name="mention"
                    className={RADIO}
                    checked={mention === "yes"}
                    onChange={() => setMention("yes")}
                  />
                  <span>{c.mentionYesLabel}</span>
                </label>
                <label className={CHOICE}>
                  <input
                    type="radio"
                    name="mention"
                    className={RADIO}
                    checked={mention === "no"}
                    onChange={() => setMention("no")}
                  />
                  <span>{c.mentionNoLabel}</span>
                </label>
              </div>
              {showErrors && !mention && c.pickOneError && (
                <span className={ERROR}>{c.pickOneError}</span>
              )}
            </fieldset>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${baseId}-notes`} className={LABEL}>
              {c.notesLabel}
            </label>
            <textarea
              id={`${baseId}-notes`}
              name="notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`${INPUT} resize-y border-faint`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={CHOICE}>
              <span className="relative flex size-5 flex-shrink-0">
                <input
                  type="checkbox"
                  name="agree"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="peer size-5 cursor-pointer appearance-none rounded-md border-2 border-faint bg-white transition-all duration-150 checked:border-0 checked:bg-green focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-lime-bright"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 hidden items-center justify-center text-sm font-bold text-white peer-checked:flex"
                >
                  ✓
                </span>
              </span>
              <span>{c.agreeLabel}</span>
            </label>
            {showErrors && !agree && c.agreeError && <span className={ERROR}>{c.agreeError}</span>}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-surface pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                disabled={submitting}
                className={buttonClass("secondary")}
              >
                {c.backLabel}
              </button>
            )}
          </div>
          <div className="pt-4">
            <button type="submit" disabled={submitting} className={buttonClass("primary")}>
              {step < TOTAL_STEPS
                ? c.nextLabel
                : submitting
                  ? (c.submittingLabel ?? c.submitLabel)
                  : c.submitLabel}
            </button>
          </div>
        </div>
        {error && (
          <p role="alert" className="font-body text-sm font-semibold text-rust">
            {error === "throttled" ? c.throttledError : c.submitError}
          </p>
        )}
      </div>
    </form>
  );
}
