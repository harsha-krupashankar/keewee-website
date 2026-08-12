/**
 * Client-side cookie consent state.
 *
 * The site stores the visitor's choice in a single first-party cookie and
 * exposes helpers so any future non-essential script (GA4, Microsoft Clarity,
 * Hotjar, …) can gate itself on consent. Nothing here sets a tracking cookie —
 * it only records the decision. Wiring a tracker up looks like:
 *
 *   import { hasAnalyticsConsent, onConsentChange } from "@/lib/consent";
 *
 *   function loadAnalytics() { ...inject the GA4 script... }
 *   if (hasAnalyticsConsent()) loadAnalytics();
 *   onConsentChange((v) => v === "accepted" && loadAnalytics());
 *
 * Essential cookies (Sanity draft mode / perspective) are never gated — they are
 * required for the site to function and carry no tracking.
 */

export const CONSENT_COOKIE = "kw_cookie_consent";

/** Remember the choice for a year, then re-prompt. */
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

/** Fired on the client whenever the stored decision changes. */
export const CONSENT_EVENT = "kw-consent-change";

export type ConsentValue = "accepted" | "declined";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

/** The visitor's stored decision, or `null` if they have not chosen yet. */
export function getStoredConsent(): ConsentValue | null {
  const value = readCookie(CONSENT_COOKIE);
  return value === "accepted" || value === "declined" ? value : null;
}

/** Whether the visitor has opted in to non-essential analytics cookies. */
export function hasAnalyticsConsent(): boolean {
  return getStoredConsent() === "accepted";
}

/** Persist the decision and notify any listeners in the current document. */
export function setConsent(value: ConsentValue): void {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}

/** Subscribe to consent changes. Returns an unsubscribe function. */
export function onConsentChange(handler: (value: ConsentValue) => void): () => void {
  const listener = (event: Event) => handler((event as CustomEvent<ConsentValue>).detail);
  window.addEventListener(CONSENT_EVENT, listener);
  return () => window.removeEventListener(CONSENT_EVENT, listener);
}
