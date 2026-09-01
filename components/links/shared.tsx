import Link from "next/link";

import { safeHref } from "@/lib/safe-href";

/**
 * Shared pieces of the `/links` layout.
 *
 * The page renders without the site header and footer, so nothing here is
 * reused elsewhere — but the section rule, the arrow and the outbound-link
 * props repeat often enough inside the page to be worth naming.
 */

export function outbound(openInNewTab?: boolean | null) {
  return openInNewTab ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};
}

/** Trailing glyph on labels and rows. Never announced — the label carries it. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`font-display leading-none ${className}`}>
      →
    </span>
  );
}

/**
 * Dot + label + rule. The dot's colour carries the job — green is ours, clay
 * is time pressure — so it is set by the section, never by an editor.
 */
export function SectionLabel({
  children,
  tone = "green",
  trailing,
}: {
  children: React.ReactNode;
  tone?: "green" | "clay";
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden
        className={`size-1.5 shrink-0 rounded-full ${
          tone === "clay" ? "bg-rust" : "bg-green"
        }`}
      />
      <span className="font-body text-[11px] font-bold tracking-[0.16em] text-body uppercase">
        {children}
      </span>
      <span aria-hidden className="h-px flex-1 bg-border-line" />
      {trailing}
    </div>
  );
}

/** The stacked-squares mark beside a tile's destination count. */
export function StackMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden className={`size-2.5 ${className}`}>
      <rect
        x="0.75"
        y="0.75"
        width="8"
        height="8"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="3.25"
        y="3.25"
        width="8"
        height="8"
        rx="2"
        fill="var(--kw-stack-fill, #f6f4ef)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/**
 * A link that keeps working whatever an editor pastes in. `next/link` renders a
 * plain anchor for external and `mailto:` hrefs, so one component covers both.
 */
export function SafeLink({
  href,
  openInNewTab,
  className,
  children,
  ...rest
}: {
  href: string;
  openInNewTab?: boolean | null;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link
      href={safeHref(href)}
      className={className}
      {...outbound(openInNewTab)}
      {...rest}
    >
      {children}
    </Link>
  );
}
