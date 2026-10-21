"use client";

import { useSyncExternalStore } from "react";

import { REFERRED_COMPANY_KEY } from "./storage";

const noop = () => () => {};

function readCompany() {
  try {
    return sessionStorage.getItem(REFERRED_COMPANY_KEY) || null;
  } catch {
    return null;
  }
}

/**
 * Fills `{company}` in the thank-you copy with the name the visitor just typed.
 *
 * The form hands it over in `sessionStorage` rather than the URL so the page
 * stays fully static (and the name never lands in analytics or server logs).
 * The server render, and anyone arriving without a submission, gets the
 * editor's fallback instead.
 */
export default function ReferredCompanyCopy({
  template,
  fallback,
}: {
  template: string;
  fallback: string;
}) {
  const company = useSyncExternalStore(noop, readCompany, () => null);
  return <>{template.replaceAll("{company}", company ?? fallback)}</>;
}
