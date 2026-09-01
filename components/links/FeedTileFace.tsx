import SanityImage from "@/components/sanity/SanityImage";
import type { FeedTile, FeedTileStyle } from "@/sanity/lib/types";

import { StackMark } from "./shared";

/**
 * The inside of a feed tile.
 *
 * Split out because a tile is an `<a>` when it has one destination and a
 * `<button>` when it has several — the face is identical either way, only the
 * element that wraps it changes.
 */

const GROUND: Record<FeedTileStyle, string> = {
  dark: "bg-dark-card",
  green: "bg-green",
  mint: "bg-green-bg",
  surface: "bg-surface",
  paper: "bg-paper",
  image: "bg-border-soft",
};

/** True where the ground is dark enough that text has to invert. */
function isDark(style: FeedTileStyle) {
  return style === "dark" || style === "green" || style === "image";
}

function eyebrowClass(style: FeedTileStyle, accent?: boolean | null) {
  if (style === "dark") return accent ? "text-lime" : "text-faint";
  if (style === "green") return accent ? "text-lime" : "text-paper/75";
  if (style === "image") return accent ? "text-lime" : "text-dark-text";
  if (style === "mint") return accent ? "text-rust" : "text-green-deep";
  return accent ? "text-rust" : "text-muted";
}

function footnoteClass(style: FeedTileStyle) {
  if (isDark(style)) return "text-dark-text";
  if (style === "mint") return "text-green-deep";
  return "text-body";
}

/** The ground a tile sits on, plus the press and focus states it shares. */
export function tileClass(style: FeedTileStyle) {
  return `group relative block aspect-square overflow-hidden text-left transition-transform duration-100 active:scale-[0.965] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-bright focus-visible:-outline-offset-2 md:rounded-[4px] ${GROUND[style]}`;
}

export default function FeedTileFace({ tile }: { tile: FeedTile }) {
  const dark = isDark(tile.style);
  const count = tile.destinations.length;
  const captioned = tile.style !== "image" || !tile.hideCaption;

  return (
    <>
      {tile.style === "image" && tile.image && (
        <>
          <SanityImage
            image={tile.image}
            width={520}
            sizes="(min-width: 768px) 174px, 33vw"
            className="absolute inset-0 size-full object-cover"
          />
          {captioned && (
            <span
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(0deg,rgba(28,27,25,.84)_0%,rgba(28,27,25,.20)_44%,rgba(28,27,25,0)_70%)]"
            />
          )}
        </>
      )}

      {/* The sticker tile is the one centred layout in the set. */}
      {tile.sticker ? (
        <span className="absolute inset-0 grid place-items-center p-2.5 text-center">
          <span>
            <span className="inline-block rotate-[-2deg] bg-lime px-1.5 py-px font-sticker text-[22px] tracking-[0.02em] text-ink">
              {tile.sticker}
            </span>
            <span className="mt-2 block font-display text-[13px] leading-[1.15] font-bold text-pretty text-ink">
              {tile.title}
            </span>
          </span>
        </span>
      ) : (
        <span
          className={`relative flex h-full flex-col p-3 md:p-3.5 ${
            tile.style === "image" ? "justify-end" : ""
          }`}
        >
          {tile.stat && (
            <span className="block font-display text-[38px] leading-none font-extrabold tracking-[-0.04em] text-green md:text-[44px]">
              {tile.stat}
            </span>
          )}

          {tile.quote && (
            <span
              aria-hidden
              className="block font-display text-[32px] leading-[0.7] font-extrabold text-lime md:text-[40px]"
            >
              &ldquo;
            </span>
          )}

          {tile.eyebrow && !tile.stat && (
            <span
              className={`block truncate font-body text-[9px] font-bold tracking-[0.16em] md:text-[10px] ${eyebrowClass(
                tile.style,
                tile.eyebrowTone
              )} ${count > 1 ? "pr-9" : ""}`}
            >
              {tile.eyebrow}
            </span>
          )}

          {captioned ? (
            <span
              className={`block font-display leading-[1.06] font-extrabold tracking-[-0.02em] text-pretty ${
                tile.stat || tile.quote ? "mt-1 text-[13px] md:text-[15px]" : ""
              } ${
                tile.eyebrow && !tile.stat ? "mt-2" : ""
              } ${tile.style === "image" ? "text-[13px] font-bold md:text-[15px]" : "text-[15px] md:text-[17px]"} ${
                dark ? "text-paper" : tile.style === "mint" ? "text-green-deep" : "text-ink"
              }`}
            >
              {tile.title}
            </span>
          ) : (
            <span className="sr-only">{tile.title}</span>
          )}

          {tile.footnote && (
            <span
              className={`mt-auto block pt-2 font-body text-[9px] font-semibold ${footnoteClass(
                tile.style
              )}`}
            >
              {tile.footnote}
            </span>
          )}

          {tile.attribution?.name && (
            <span className="mt-auto flex items-center gap-1.5 pt-2">
              {tile.attribution.initials && (
                <span
                  aria-hidden
                  className="grid size-[18px] shrink-0 place-items-center rounded-full bg-green font-body text-[9px] font-bold text-paper"
                >
                  {tile.attribution.initials}
                </span>
              )}
              <span className="truncate font-body text-[9px] font-semibold text-body">
                {tile.attribution.name}
              </span>
            </span>
          )}
        </span>
      )}

      {tile.accentBar && (
        <span aria-hidden className="absolute bottom-3 left-3 h-[3px] w-[30px] bg-lime" />
      )}

      {count > 1 && (
        <span
          aria-hidden
          style={
            { "--kw-stack-fill": dark ? "#f6f4ef" : "#f1ede1" } as React.CSSProperties
          }
          className={`absolute top-2 right-2 flex h-5 items-center gap-1.5 rounded-full px-[7px] font-body text-[9px] font-bold text-ink ${
            dark ? "bg-paper/95" : "border border-border-line bg-surface"
          }`}
        >
          <StackMark />
          {count}
        </span>
      )}
    </>
  );
}
