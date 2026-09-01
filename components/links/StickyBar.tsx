"use client";

import { useEffect, useRef, useState } from "react";

import { safeHref } from "@/lib/safe-href";
import type { Link as LinkValue } from "@/sanity/lib/types";

import { outbound } from "./shared";

/**
 * The condensed bar that takes over once the profile block scrolls away.
 *
 * Phones only: on desktop the column is short enough that the real header stays
 * useful, and the design gives wide screens the left rail instead. A sentinel
 * sits where the bar's content used to be, so the swap is driven by the
 * profile's actual position rather than a guessed pixel offset.
 */
export default function StickyBar({
  logoMark,
  wordmark,
  cta,
}: {
  logoMark?: string | null;
  wordmark: string;
  cta?: LinkValue | null;
}) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { rootMargin: "-8px 0px 0px 0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="h-px" />

      <div
        // Off-screen until it slides in, so keep it out of the accessibility
        // tree until then — an `aria-hidden` wrapper must never hold a
        // focusable child, which is why this tracks `stuck` rather than being
        // hidden outright.
        aria-hidden={!stuck}
        className={`fixed inset-x-0 top-0 z-40 flex h-[58px] items-center gap-2.5 border-b border-border-line bg-[rgba(244,241,232,0.96)] pr-3.5 pl-4 backdrop-blur-sm transition-transform duration-200 md:hidden ${
          stuck ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-1 items-baseline gap-1.5">
          {logoMark && (
            <span className="font-display text-xl leading-none font-extrabold text-green">
              {logoMark}
            </span>
          )}
          <span className="font-display text-[19px] leading-none font-extrabold tracking-[-0.02em] text-ink">
            {wordmark}
          </span>
        </div>

        {cta && (
          <a
            href={safeHref(cta.href)}
            {...outbound(cta.openInNewTab)}
            tabIndex={stuck ? 0 : -1}
            className="flex h-11 items-center rounded-xl bg-green px-3.5 font-display text-[13px] font-bold text-paper"
          >
            {cta.label}
          </a>
        )}
      </div>
    </>
  );
}
