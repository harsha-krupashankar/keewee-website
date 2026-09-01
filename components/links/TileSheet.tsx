"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import SanityImage from "@/components/sanity/SanityImage";
import { safeHref } from "@/lib/safe-href";
import type { FeedTile } from "@/sanity/lib/types";

import { outbound } from "./shared";

/**
 * The destinations behind one tile.
 *
 * A bottom sheet on phones and a centred dialog from `md` up — the same rows
 * re-hung, not a second component. It is a native `<dialog>` opened with
 * `showModal()`, which is what buys the behaviour the design asks for: Esc
 * closes, focus is trapped, the page behind keeps its scroll position, and
 * closing hands focus back to the tile that was tapped. The breakpoint swap and
 * the scrim live in `.kw-sheet` in `globals.css`.
 *
 * Closing is deferred so the sheet can slide out: `requestClose` flips
 * `data-closing`, and the real `close()` waits for the exit animation.
 *
 * That wait is driven by `getAnimations()` rather than an `animationend`
 * listener, and it is deliberately belt-and-braces. If no animation is running
 * — the stylesheet has not loaded, the rule was renamed, a user agent skipped
 * it — there is no event to wait for, and a close gated on one would never
 * happen, leaving a modal that Esc, the backdrop and the close button all fail
 * to dismiss. A trapped visitor is far worse than an abrupt close, so a missing
 * animation closes immediately and a stalled one is cut off by a timeout.
 */
export default function TileSheet({
  tile,
  hint,
  onClose,
}: {
  tile: FeedTile;
  /** The "Esc or click outside to close" line. Desktop only, and optional. */
  hint?: string | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstDestinationRef = useRef<HTMLAnchorElement>(null);
  const [closing, setClosing] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    // The design puts the caret on the first destination, not the close button.
    firstDestinationRef.current?.focus();
  }, []);

  const requestClose = useCallback(() => setClosing(true), []);

  // Waits out the exit animation, then closes for real. Native `close()` is
  // what restores focus to the tile that opened the sheet.
  useEffect(() => {
    if (!closing) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      if (dialog.open) dialog.close();
    };

    const animations = panelRef.current?.getAnimations?.() ?? [];
    if (animations.length === 0) {
      finish();
      return;
    }

    Promise.all(animations.map((animation) => animation.finished)).then(finish, finish);
    // A cancelled or never-settling animation must not strand the dialog.
    const timer = setTimeout(finish, 400);
    return () => clearTimeout(timer);
  }, [closing]);

  const count = tile.destinations.length;
  const listLabel = tile.destinationsLabel?.replace("{count}", String(count));

  return (
    <dialog
      ref={dialogRef}
      className="kw-sheet"
      data-closing={closing ? "true" : undefined}
      aria-labelledby={titleId}
      onCancel={(event) => {
        // Let the slide-out run rather than letting Esc close instantly.
        event.preventDefault();
        requestClose();
      }}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) requestClose();
      }}
    >
      <div
        ref={panelRef}
        className="max-h-[88vh] w-full overflow-y-auto rounded-t-3xl bg-paper px-5 pt-2.5 pb-6 shadow-[0_-12px_40px_rgba(28,27,25,.22)] md:max-h-[88vh] md:w-[560px] md:rounded-3xl md:border md:border-border-soft md:px-6 md:pt-[22px] md:pb-6 md:shadow-[0_30px_80px_rgba(28,27,25,.30)]"
      >
        <span
          aria-hidden
          className="mx-auto mb-3.5 block h-1 w-11 rounded-full bg-border-line md:hidden"
        />

        <div className="flex items-start gap-3.5">
          <SheetThumb tile={tile} />

          <div className="min-w-0 flex-1">
            <h2
              id={titleId}
              className="font-display text-[19px] leading-[1.1] font-extrabold tracking-[-0.02em] text-pretty text-ink md:text-2xl"
            >
              {tile.title}
            </h2>
            {tile.meta && (
              <p className="mt-1 font-mono text-[11px] text-muted md:text-xs">
                {tile.meta}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={requestClose}
            aria-label="Close"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-border-line bg-surface font-body text-[17px] text-body transition-colors hover:border-green hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-bright focus-visible:outline-offset-2"
          >
            <span aria-hidden>×</span>
          </button>
        </div>

        <hr className="mt-4 border-0 border-t border-border" />

        {listLabel && (
          <p className="pt-3.5 font-body text-[11px] font-bold tracking-[0.14em] text-muted uppercase">
            {listLabel}
          </p>
        )}

        <ul className={`flex list-none flex-col gap-2 p-0 ${listLabel ? "pt-3" : "pt-4"}`}>
          {tile.destinations.map((destination, i) => {
            const primary = i === 0;

            return (
              <li key={destination.href + destination.label}>
                <a
                  ref={primary ? firstDestinationRef : undefined}
                  href={safeHref(destination.href)}
                  {...outbound(destination.openInNewTab)}
                  className={`flex min-h-[60px] items-center gap-3 rounded-xl px-4 py-2.5 transition-all duration-150 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-2 ${
                    primary
                      ? "bg-green shadow-[3px_3px_0_#1C1B19] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-green-dark hover:shadow-[1px_1px_0_#1C1B19]"
                      : "border border-border-line bg-surface hover:border-green"
                  }`}
                >
                  <span className="flex flex-1 flex-col gap-0.5">
                    <span
                      className={`font-display text-base font-bold ${
                        primary ? "text-paper" : "text-ink"
                      }`}
                    >
                      {destination.label}
                    </span>
                    {destination.source && (
                      <span
                        className={`font-body text-[11px] ${
                          primary
                            ? "text-paper/70"
                            : destination.urgent
                              ? "text-rust"
                              : "text-muted"
                        }`}
                      >
                        {destination.source}
                      </span>
                    )}
                  </span>
                  <span
                    aria-hidden
                    className={`font-display text-[17px] ${
                      primary ? "text-paper" : "text-green"
                    }`}
                  >
                    →
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        {(hint || (tile.postHref && tile.postLabel)) && (
          <div className="flex items-center justify-between gap-4 pt-4">
            {hint && (
              <span className="hidden font-mono text-[11px] text-faint md:inline">
                {hint}
              </span>
            )}
            {tile.postHref && tile.postLabel && (
              <a
                href={safeHref(tile.postHref)}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto font-body text-xs font-bold text-green hover:text-green-dark"
              >
                {tile.postLabel} <span aria-hidden>→</span>
              </a>
            )}
          </div>
        )}
      </div>
    </dialog>
  );
}

/**
 * The square beside the sheet title. Uses the post image when there is one and
 * falls back to the tile's own ground with its headline set small — the same
 * thing the visitor just tapped, so the sheet reads as continuous with it.
 */
function SheetThumb({ tile }: { tile: FeedTile }) {
  if (tile.image) {
    return (
      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-border-soft md:size-[76px]">
        <SanityImage
          image={tile.image}
          width={200}
          sizes="76px"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    );
  }

  const dark = tile.style === "dark" || tile.style === "green";

  return (
    <div
      aria-hidden
      className={`relative size-14 shrink-0 overflow-hidden rounded-xl p-2 md:size-[76px] md:p-2.5 ${
        tile.style === "green"
          ? "bg-green"
          : tile.style === "dark"
            ? "bg-dark-card"
            : tile.style === "mint"
              ? "bg-green-bg"
              : "bg-surface"
      }`}
    >
      <span
        className={`line-clamp-3 font-display text-[11px] leading-[1.05] font-extrabold md:text-[13px] ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        {tile.title}
      </span>
      <span className="absolute bottom-2 left-2 h-0.5 w-[22px] bg-lime" />
    </div>
  );
}
