"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";

import { SubmissionThrottledError, submitForm } from "@/lib/submit-form";
import type { ReferralFormCopy } from "@/sanity/lib/types";

/** Read back by `ReferralThankYouBody` to name the company on the next page. */
export const REFERRED_COMPANY_KEY = "kw-referral-company";
export const THANK_YOU_PATH = "/referral-program/thank-you";

type Values = Record<FieldKey, string>;
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
  /** Must be a LinkedIn profile URL when filled in. */
  linkedin?: boolean;
};

/** Which inputs each step asks for. The labels are content; this is the form. */
const STEP_FIELDS: Field[][] = [
  [
    { key: "name", label: "nameLabel", type: "text", required: true, autoComplete: "name" },
    { key: "email", label: "emailLabel", type: "email", required: true, autoComplete: "email" },
    { key: "phone", label: "phoneLabel", type: "tel", required: true, autoComplete: "tel" },
    { key: "linkedin", label: "linkedinLabel", type: "url", required: false, linkedin: true },
  ],
  [
    { key: "company", label: "companyLabel", type: "text", required: true },
    { key: "website", label: "websiteLabel", type: "text", required: true },
    { key: "contactName", label: "contactNameLabel", type: "text", required: true },
    { key: "contactRole", label: "contactRoleLabel", type: "text", required: true },
    { key: "contactEmail", label: "contactEmailLabel", type: "email", required: true },
    { key: "contactPhone", label: "contactPhoneLabel", type: "tel", required: false },
    {
      key: "contactLinkedin",
      label: "contactLinkedinLabel",
      type: "url",
      required: false,
      linkedin: true,
    },
  ],
];
const TOTAL_STEPS = 3;

const EMPTY: Values = {
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
};

const isEmail = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim());

/**
 * A LinkedIn profile or company page, with or without the scheme / `www.` /
 * country subdomain: `linkedin.com/in/jane`, `https://uk.linkedin.com/in/jane/`.
 * Kept in sync with the server-side check in `app/api/forms/route.ts`.
 */
export const LINKEDIN_URL =
  /^(https?:\/\/)?([a-z]{2,3}\.)?linkedin\.com\/(in|pub|company)\/[^\s/?#]+\/?([?#]\S*)?$/i;

const labelClass = "font-display text-[13px] font-bold text-ink";
const inputClass =
  "w-full rounded-xl border-2 bg-white px-3.5 py-2.5 font-body text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-150 focus:border-green focus:shadow-[0_0_0_3px_rgba(217,242,92,0.4)]";
const errorClass = "font-body text-[13px] text-rust";
const buttonBase =
  "inline-flex items-center rounded-xl px-5.5 py-2.5 font-display text-[15px] font-bold leading-tight shadow-[3px_3px_0_#1C1B19] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#1C1B19] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-lime-bright disabled:cursor-not-allowed disabled:opacity-60";

/**
 * The three-step referral form: your details → the company → about the
 * referral. Each step validates before moving on; nothing is sent until the
 * last one. On success the visitor lands on the thank-you page, which names the
 * company they referred.
 */
export default function ReferralForm({ copy }: { copy?: ReferralFormCopy | null }) {
  const t = (key: keyof ReferralFormCopy) => copy?.[key] ?? "";
  const router = useRouter();
  const id = useId();

  const [step, setStep] = useState(1);
  const [values, setValues] = useState<Values>(EMPTY);
  const [spoken, setSpoken] = useState<"yes" | "no" | null>(null);
  const [mention, setMention] = useState<"yes" | "no" | null>(null);
  const [notes, setNotes] = useState("");
  const [agree, setAgree] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sendError, setSendError] = useState<null | "generic" | "throttled">(null);

  const fieldError = (f: Field) => {
    const v = values[f.key].trim();
    if (f.required && !v) return t("requiredError");
    if (f.type === "email" && v && !isEmail(v)) return t("emailError");
    if (f.linkedin && v && !LINKEDIN_URL.test(v)) return t("linkedinError");
    return null;
  };
  const stepValid = (n: number) => STEP_FIELDS[n - 1].every((f) => !fieldError(f));
  const step3Valid = !!spoken && (spoken === "yes" || !!mention) && agree;

  const titles = [t("step1Title"), t("step2Title"), t("step3Title")];
  const stepLabel = t("stepLabel")
    .replace("{step}", String(step))
    .replace("{total}", String(TOTAL_STEPS));

  function goNext() {
    if (!stepValid(step)) return setShowErrors(true);
    setShowErrors(false);
    setStep(step + 1);
  }

  function goBack() {
    setShowErrors(false);
    setSendError(null);
    setStep(Math.max(1, step - 1));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < TOTAL_STEPS) return goNext();
    if (submitting) return;
    if (!step3Valid || !spoken) return setShowErrors(true);

    setSubmitting(true);
    setSendError(null);
    const trimmed = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, v.trim()])
    ) as Values;
    try {
      await submitForm({
        formType: "referral",
        source: "referral-page",
        ...trimmed,
        spoken,
        mentionName: spoken === "no" ? (mention ?? undefined) : undefined,
        notes: notes.trim(),
      });
      try {
        sessionStorage.setItem(REFERRED_COMPANY_KEY, trimmed.company);
      } catch {
        // Private mode: the thank-you page falls back to its generic wording.
      }
      router.push(THANK_YOU_PATH);
    } catch (err) {
      setSendError(err instanceof SubmissionThrottledError ? "throttled" : "generic");
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={`${id}-title`}
      className="flex flex-col gap-8 rounded-[24px] border-2 border-ink bg-white p-6 shadow-[6px_6px_0_#1C1B19] sm:p-9 lg:p-11"
    >
      <div className="flex flex-col gap-3">
        <span className="font-display text-xs font-bold uppercase tracking-[0.12em] text-green">
          {stepLabel}
        </span>
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
        <h2
          id={`${id}-title`}
          className="mt-1 font-display text-[26px] font-bold leading-[1.1] tracking-[-0.01em] text-ink"
        >
          {titles[step - 1]}
        </h2>
      </div>

      {step < TOTAL_STEPS ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {STEP_FIELDS[step - 1].map((f) => {
            const error = showErrors ? fieldError(f) : null;
            const inputId = `${id}-${f.key}`;
            return (
              <div key={f.key} className="flex min-w-0 flex-col gap-1.5">
                <label htmlFor={inputId} className={labelClass}>
                  {t(f.label)}
                </label>
                <input
                  id={inputId}
                  name={f.key}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  required={f.required}
                  value={values[f.key]}
                  onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                  aria-invalid={!!error || undefined}
                  aria-describedby={error ? `${inputId}-error` : undefined}
                  className={`${inputClass} ${error ? "border-rust" : "border-faint"}`}
                />
                {error && (
                  <span id={`${inputId}-error`} className={errorClass}>
                    {error}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <RadioGroup
            name={`${id}-spoken`}
            legend={t("spokeQuestion")}
            value={spoken}
            onChange={(v) => {
              setSpoken(v);
              if (v === "yes") setMention(null);
            }}
            options={[
              { value: "yes", label: t("spokeYesLabel") },
              { value: "no", label: t("spokeNoLabel") },
            ]}
            error={showErrors && !spoken ? t("pickOneError") : null}
          />

          {spoken === "no" && (
            <RadioGroup
              name={`${id}-mention`}
              legend={t("mentionQuestion")}
              value={mention}
              onChange={setMention}
              inline
              options={[
                { value: "yes", label: t("mentionYesLabel") },
                { value: "no", label: t("mentionNoLabel") },
              ]}
              error={showErrors && !mention ? t("pickOneError") : null}
            />
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-notes`} className={labelClass}>
              {t("notesLabel")}
            </label>
            <textarea
              id={`${id}-notes`}
              name="notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`${inputClass} resize-y border-faint leading-relaxed`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="inline-flex cursor-pointer items-center gap-2.5 font-body text-[15px] text-ink">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                aria-invalid={(showErrors && !agree) || undefined}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className={`flex size-5 flex-shrink-0 items-center justify-center rounded-md text-sm font-bold text-white transition-all duration-150 peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime-bright ${
                  agree ? "bg-green" : "border-2 border-faint bg-white"
                }`}
              >
                {agree ? "✓" : null}
              </span>
              <span>{t("agreeLabel")}</span>
            </label>
            {showErrors && !agree && <span className={errorClass}>{t("agreeError")}</span>}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-surface pt-6">
        <div>
          {step > 1 && (
            <button
              type="button"
              onClick={goBack}
              className={`${buttonBase} border-2 border-ink bg-white text-ink`}
            >
              {t("backLabel")}
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className={`${buttonBase} bg-green text-white`}
        >
          {step < TOTAL_STEPS
            ? t("nextLabel")
            : submitting
              ? t("submittingLabel")
              : t("submitLabel")}
        </button>
      </div>

      {sendError && (
        <p role="alert" className="-mt-4 font-body text-sm font-semibold text-rust">
          {sendError === "throttled" ? t("throttledError") : t("genericError")}
        </p>
      )}
    </form>
  );
}

function RadioGroup<V extends string>({
  name,
  legend,
  value,
  onChange,
  options,
  error,
  inline = false,
}: {
  name: string;
  legend: string;
  value: V | null;
  onChange: (v: V) => void;
  options: { value: V; label: string }[];
  error: string | null;
  inline?: boolean;
}) {
  return (
    <fieldset
      className={`m-0 flex flex-col gap-3 border-0 ${
        inline ? "rounded-[18px] bg-paper px-5 py-4" : "p-0"
      }`}
    >
      <legend className="float-left mb-3 w-full p-0 font-display text-[15px] font-bold text-ink">
        {legend}
      </legend>
      <div className={`flex gap-3 ${inline ? "flex-wrap gap-x-6" : "flex-col"}`}>
        {options.map((o) => {
          const checked = value === o.value;
          return (
            <label
              key={o.value}
              className="inline-flex cursor-pointer items-center gap-2.5 font-body text-[15px] text-ink"
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                onChange={() => onChange(o.value)}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className={`box-border size-5 flex-shrink-0 rounded-full bg-white transition-all duration-150 peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime-bright ${
                  checked ? "border-[6px] border-green" : "border-2 border-faint"
                }`}
              />
              <span>{o.label}</span>
            </label>
          );
        })}
      </div>
      {error && <span className="font-body text-[13px] text-rust">{error}</span>}
    </fieldset>
  );
}
