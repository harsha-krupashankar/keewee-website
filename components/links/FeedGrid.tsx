"use client";

import { useState } from "react";

import { safeHref } from "@/lib/safe-href";
import type { FeedTile } from "@/sanity/lib/types";

import FeedTileFace, { tileClass } from "./FeedTileFace";
import TileSheet from "./TileSheet";
import { outbound } from "./shared";

/**
 * The post grid.
 *
 * A tile with a single destination is an anchor and navigates on tap — no sheet
 * for a link that has nowhere to branch. A tile with several is a button that
 * opens `TileSheet`, and wears the count badge. Which one a tile gets is read
 * off the destinations array, never stored.
 *
 * The grid runs edge-to-edge with 4px gutters on phones, which puts the tiles
 * well over the 44px target at any phone width.
 */
export default function FeedGrid({
  tiles,
  initialCount,
  moreLabel,
  sheetHint,
}: {
  tiles: FeedTile[];
  initialCount?: number | null;
  moreLabel?: string | null;
  sheetHint?: string | null;
}) {
  // Pagination is opt-in: without a reveal label there is nothing to write on
  // the button, so the grid simply shows everything rather than stranding
  // tiles behind a control captioned in hardcoded English.
  const batch = initialCount && initialCount > 0 ? initialCount : tiles.length;
  const paginated = Boolean(moreLabel) && batch < tiles.length;
  const [shown, setShown] = useState(paginated ? batch : tiles.length);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const visible = tiles.slice(0, shown);
  const openTile = tiles.find((tile) => tile._key === openKey) ?? null;

  return (
    <>
      <div className="grid grid-cols-3 gap-1 md:gap-1.5">
        {visible.map((tile) => {
          const single = tile.destinations.length === 1;

          if (single) {
            const [destination] = tile.destinations;
            return (
              <a
                key={tile._key}
                href={safeHref(destination.href)}
                {...outbound(destination.openInNewTab)}
                className={tileClass(tile.style)}
              >
                <FeedTileFace tile={tile} />
              </a>
            );
          }

          return (
            <button
              key={tile._key}
              type="button"
              onClick={() => setOpenKey(tile._key)}
              aria-haspopup="dialog"
              className={tileClass(tile.style)}
            >
              <FeedTileFace tile={tile} />
              <span className="sr-only">
                {tile.title} — {tile.destinations.length} links
              </span>
            </button>
          );
        })}
      </div>

      {paginated && shown < tiles.length && (
        <div className="px-5 pt-5">
          <button
            type="button"
            onClick={() => setShown((current) => current + batch)}
            className="flex h-13 w-full items-center justify-center gap-2 rounded-xl border border-border-line bg-paper font-display text-[15px] font-bold text-ink transition-colors hover:border-green hover:bg-surface focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-2"
          >
            {moreLabel?.replace("{count}", String(tiles.length))}
            <span aria-hidden className="font-body text-xs text-muted">
              ↓
            </span>
          </button>
        </div>
      )}

      {openTile && (
        <TileSheet
          tile={openTile}
          hint={sheetHint}
          onClose={() => setOpenKey(null)}
        />
      )}
    </>
  );
}
