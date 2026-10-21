import Link from "next/link";
import type { ReactNode } from "react";

import { safeHref } from "@/lib/safe-href";

/**
 * Pieces shared by `/referral` and `/referral/thank-you`. The referral design
 * runs a touch wider than `Container` (1200px, fluid gutters), so it carries its
 * own wrapper rather than bending the shared one.
 */
export const WRAP = "mx-auto w-full max-w-[1200px] px-[clamp(20px,5vw,48px)]";

/** Section headline: "How the referral program works", "FAQ", … */
export const SECTION_TITLE =
  "font-display text-[length:clamp(34px,4.4vw,52px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink";

/** Headline on the two earnings/eligibility cards and the thank-you cards. */
export const CARD_TITLE =
  "font-display font-extrabold leading-[1.02] tracking-[-0.03em]";

const BUTTON_SIZE = {
  medium: "rounded-xl px-[22px] py-2.5 text-[15px]",
  large: "rounded-[14px] px-7 py-3.5 text-lg",
};

const BUTTON_VARIANT = {
  primary: "bg-green text-white shadow-[3px_3px_0_#1C1B19] hover:text-white",
  // On an ink band the ink shadow vanishes, so it casts lime instead.
  "primary-on-dark": "bg-green text-white shadow-[3px_3px_0_#D9F25C] hover:text-white",
  secondary: "border-2 border-ink bg-white text-ink shadow-[3px_3px_0_#1C1B19] hover:text-ink",
};

export function buttonClass(
  variant: keyof typeof BUTTON_VARIANT = "primary",
  size: keyof typeof BUTTON_SIZE = "medium"
) {
  return `inline-flex items-center gap-2 font-display font-bold leading-[1.1] transition-[transform,box-shadow] duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_#1C1B19] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-lime-bright disabled:cursor-not-allowed disabled:opacity-60 ${BUTTON_SIZE[size]} ${BUTTON_VARIANT[variant]}`;
}

export function LinkButton({
  href,
  children,
  variant,
  size,
  openInNewTab,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof BUTTON_VARIANT;
  size?: keyof typeof BUTTON_SIZE;
  openInNewTab?: boolean | null;
}) {
  return (
    <Link
      href={safeHref(href)}
      className={buttonClass(variant, size)}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}

const STICKER = {
  lime: "bg-lime text-ink px-3 py-1 text-base",
  green: "bg-green text-white px-4 py-1.5 text-2xl",
};

/** The tilted Bangers label. */
export function Sticker({
  children,
  variant = "lime",
  rotate,
}: {
  children: ReactNode;
  variant?: keyof typeof STICKER;
  rotate: number;
}) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-[4px] font-sticker leading-[1.1] tracking-[0.02em] shadow-[2px_2px_0_#1C1B19] ${STICKER[variant]}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}
