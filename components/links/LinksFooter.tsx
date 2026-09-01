import type { Link as LinkValue } from "@/sanity/lib/types";

import { SafeLink } from "./shared";

/**
 * The page's own footer. `/links` never renders the site footer, so this is the
 * only place a visitor arriving from a bio gets back to the main site.
 */
export default function LinksFooter({
  links,
  note,
}: {
  links?: LinkValue[] | null;
  note?: string | null;
}) {
  if (!links?.length && !note) return null;

  return (
    <footer className="mt-13 border-t border-border-line px-5 pt-6 pb-8">
      <div className="flex flex-col items-center gap-2.5">
        {links && links.length > 0 && (
          <nav className="flex items-center gap-3.5">
            {links.map((link, i) => (
              <span key={link.href + link.label} className="flex items-center gap-3.5">
                {i > 0 && (
                  <span aria-hidden className="size-1 rounded-full bg-faint" />
                )}
                <SafeLink
                  href={link.href}
                  openInNewTab={link.openInNewTab}
                  className={
                    i === 0
                      ? "py-2.5 font-display text-[15px] font-bold text-ink hover:text-green"
                      : "py-2.5 font-body text-[13px] font-semibold text-body hover:text-green"
                  }
                >
                  {link.label}
                </SafeLink>
              </span>
            ))}
          </nav>
        )}

        {note && <p className="font-mono text-[11px] text-faint">{note}</p>}
      </div>
    </footer>
  );
}
