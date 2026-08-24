"use client";

import { GoogleTagManager as NextGoogleTagManager } from "@next/third-parties/google";
import { useSyncExternalStore } from "react";

import { CONSENT_EVENT, hasAnalyticsConsent } from "@/lib/consent";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  return () => window.removeEventListener(CONSENT_EVENT, callback);
}

/**
 * Loads Google Tag Manager via @next/third-parties
 * (https://nextjs.org/docs/app/guides/third-party-libraries) only once the
 * visitor has accepted the cookie consent banner. GTM itself sets no cookie,
 * but the tags it can fire (GA4, ad pixels, ...) do, so the container is
 * gated exactly like any other non-essential script per lib/consent.ts,
 * rather than loaded unconditionally on every page view.
 *
 * Server snapshot is always `false` (no cookies during SSR/prerender), same
 * pattern as CookieConsent.tsx, so there's no hydration mismatch — the
 * component mounts absent, then re-renders once the stored decision (or a
 * live accept) is read on the client.
 */
export default function GoogleTagManager() {
  const consented = useSyncExternalStore(subscribe, hasAnalyticsConsent, () => false);

  if (!GTM_ID || !consented) return null;
  return <NextGoogleTagManager gtmId={GTM_ID} />;
}
