import Link from "next/link";

import { safeHref } from "@/lib/safe-href";

/**
 * Shared pieces of the `/links` layout.
 *
 * The page renders without the site header and footer, so nothing here is
 * reused elsewhere — but the arrow and the outbound-link props repeat often
 * enough inside the page to be worth naming.
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
