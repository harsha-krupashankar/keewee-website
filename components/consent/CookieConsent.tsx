"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import { CONSENT_EVENT, getStoredConsent, setConsent } from "@/lib/consent";
import type { CookieConsent as CookieConsentContent } from "@/sanity/lib/types";

/**
 * Site-wide cookie consent banner, rendered once by `SiteShell`.
 *
 * Shows only when Site settings has the banner enabled *and* the visitor has
 * not already chosen. Accept and Decline are given equal visual weight — a
 * pre-ticked or hard-to-find reject option is not valid consent under GDPR /
 * UK PECR. The choice is persisted by `lib/consent.ts`; future analytics
 * scripts read `hasAnalyticsConsent()` there before loading.
 *
 * The stored decision is read as an external store: `useSyncExternalStore`
 * gives a stable server snapshot (`null`, no cookies during SSR) and re-renders
 * the moment the visitor picks, so the banner hides itself without an effect.
 */
function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  return () => window.removeEventListener(CONSENT_EVENT, callback);
}

export default function CookieConsent({
  content,
}: {
  content?: CookieConsentContent | null;
}) {
  const consent = useSyncExternalStore(subscribe, getStoredConsent, () => null);

  if (!content?.enabled || consent !== null) return null;
  if (!content.title || !content.message) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={content.title}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl bg-ink px-5 py-5 text-paper shadow-[0_20px_48px_rgba(28,27,25,0.35)] sm:inset-x-4 sm:bottom-4 sm:px-7"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <p className="mb-1 font-display text-base font-bold">{content.title}</p>
          <p className="font-body text-sm font-medium leading-relaxed text-dark-text">
            {content.message}
            {content.policyLink?.href && (
              <>
                {" "}
                <Link
                  href={content.policyLink.href}
                  target={content.policyLink.openInNewTab ? "_blank" : undefined}
                  rel={content.policyLink.openInNewTab ? "noopener noreferrer" : undefined}
                  className="underline underline-offset-2 hover:text-lime"
                >
                  {content.policyLink.label}
                </Link>
              </>
            )}
          </p>
        </div>

        <div className="flex shrink-0 gap-2.5">
          <button
            type="button"
            onClick={() => setConsent("declined")}
            className="whitespace-nowrap rounded-xl border-2 border-white/40 px-5 py-2.5 font-display text-sm font-bold text-paper transition-colors duration-150 hover:bg-paper hover:text-ink focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-[3px]"
          >
            {content.declineLabel ?? "Decline"}
          </button>
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="whitespace-nowrap rounded-xl bg-green px-5 py-2.5 font-display text-sm font-bold text-white shadow-[3px_3px_0_rgba(0,0,0,0.5)] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-[3px]"
          >
            {content.acceptLabel ?? "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
}
