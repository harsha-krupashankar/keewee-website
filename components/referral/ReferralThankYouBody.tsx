"use client";

import { useSyncExternalStore } from "react";

import { REFERRED_COMPANY_KEY } from "./ReferralForm";

/**
 * The thank-you body names the company just referred. It is handed over in
 * `sessionStorage` rather than the URL so the page stays fully static and a
 * shared link never carries someone else's referral.
 */
// Written once by the form before navigating here; nothing to listen for.
const subscribe = () => () => {};

function readStored() {
  try {
    return sessionStorage.getItem(REFERRED_COMPANY_KEY);
  } catch {
    // Storage blocked: keep the fallback wording.
    return null;
  }
}

export default function ReferralThankYouBody({
  body,
  fallback,
}: {
  body: string;
  fallback: string;
}) {
  const company = useSyncExternalStore(subscribe, readStored, () => null) || fallback;

  return (
    <p className="font-body text-lg font-medium leading-relaxed text-body sm:text-xl">
      {body.replaceAll("{company}", company)}
    </p>
  );
}
