import Link from "next/link";

/**
 * Shown only while draft mode is on, so nobody mistakes an unpublished draft for
 * the live site. `prefetch={false}` matters: a prefetch of the disable route
 * would silently drop the editor out of preview mode.
 */
export default function DraftModeBanner() {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border-2 border-ink bg-lime px-4 py-2 shadow-[3px_3px_0_#1C1B19]">
      <span className="font-display text-xs font-bold uppercase tracking-[0.09em] text-ink">
        Draft mode
      </span>
      <Link
        href="/api/draft-mode/disable"
        prefetch={false}
        className="border-b-2 border-ink font-display text-xs font-bold text-ink transition-opacity hover:opacity-70"
      >
        Exit
      </Link>
    </div>
  );
}
