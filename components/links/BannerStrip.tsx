import type { BannerCard } from "@/sanity/lib/types";

import { SafeLink } from "./shared";

/**
 * The "Closing soon" strip.
 *
 * Swipes horizontally on phones — that is the gesture the audience arrives
 * with — and pairs up two-across from `md`, where swiping is not a thing. The
 * dark card carries anything live or time-boxed; the paper card carries
 * deadlines, tagged in clay.
 */
export default function BannerStrip({ banners }: { banners: BannerCard[] }) {
  return (
    <div className="kw-noscroll flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1.5 md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
      {banners.map((banner) => (
        <Banner key={banner.href + banner.title} banner={banner} />
      ))}
    </div>
  );
}

function Banner({ banner }: { banner: BannerCard }) {
  const dark = banner.tone === "dark";

  return (
    <SafeLink
      href={banner.href}
      openInNewTab={banner.openInNewTab}
      className={`w-[296px] shrink-0 snap-start rounded-[18px] p-4 transition-transform duration-150 active:scale-[0.985] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-2 md:w-auto md:shrink ${
        dark ? "bg-dark-card" : "border border-border-soft bg-paper"
      }`}
    >
      {(banner.badge || banner.meta) && (
        <span className="flex items-center gap-2">
          {banner.badge && (
            <span
              className={`inline-flex h-5 items-center rounded-md px-2 font-body text-[9px] font-bold tracking-[0.12em] ${
                dark ? "bg-lime text-ink" : "bg-rust/12 text-rust"
              }`}
            >
              {banner.badge}
            </span>
          )}
          {banner.meta && (
            <span
              className={`font-body text-[11px] font-semibold ${
                dark ? "text-faint" : "text-muted"
              }`}
            >
              {banner.meta}
            </span>
          )}
        </span>
      )}

      <span
        className={`mt-2.5 block font-display text-xl leading-[1.08] font-extrabold tracking-[-0.02em] text-pretty ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        {banner.title}
      </span>

      {banner.subtitle && (
        <span
          className={`mt-1.5 block font-body text-[13px] font-medium ${
            dark ? "text-dark-text" : "text-body"
          }`}
        >
          {banner.subtitle}
        </span>
      )}

      {(banner.linkLabel || banner.footnote) && (
        <span className="mt-3 flex items-center justify-between gap-3">
          {banner.linkLabel && (
            <span
              className={`font-display text-sm font-bold ${
                dark ? "text-lime" : "text-green"
              }`}
            >
              {banner.linkLabel} <span aria-hidden>→</span>
            </span>
          )}
          {banner.footnote && (
            <span
              className={`font-body text-[11px] ${dark ? "text-faint" : "text-muted"}`}
            >
              {banner.footnote}
            </span>
          )}
        </span>
      )}
    </SafeLink>
  );
}
