import SanityImage from "@/components/sanity/SanityImage";
import type { FeaturedCard as FeaturedCardValue } from "@/sanity/lib/types";

import { SafeLink } from "./shared";

/**
 * The one large card under "This week".
 *
 * The caption always rides a full-height scrim rather than bare photo, so a
 * washed-out thumbnail can never eat the headline.
 */
export default function FeaturedCard({ card }: { card: FeaturedCardValue }) {
  return (
    <div className="px-5">
      <SafeLink
        href={card.href}
        openInNewTab={card.openInNewTab}
        className="group relative block h-[198px] overflow-hidden rounded-[18px] border border-border-line bg-dark-card transition-transform duration-150 active:scale-[0.99] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-2 md:h-[260px]"
      >
        {card.image && (
          <SanityImage
            image={card.image}
            width={1200}
            sizes="(min-width: 768px) 520px, 100vw"
            className="absolute inset-0 size-full object-cover"
          />
        )}

        <span
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,27,25,.42)_0%,rgba(28,27,25,0)_32%,rgba(28,27,25,.82)_100%)]"
        />

        {card.badge && (
          <span className="absolute top-3 left-3 inline-flex h-[22px] items-center rounded-lg bg-lime px-2.5 font-body text-[10px] font-bold tracking-[0.12em] text-ink md:h-6 md:px-2.5">
            {card.badge}
          </span>
        )}

        {card.showPlayIcon && (
          <span
            aria-hidden
            className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-paper/95 md:hidden"
          >
            <span className="ml-1 border-y-8 border-l-[13px] border-y-transparent border-l-green" />
          </span>
        )}

        <span className="absolute right-3.5 bottom-3 left-3.5 block md:right-[18px] md:bottom-4 md:left-[18px]">
          <span className="block font-display text-[22px] leading-[1.06] font-extrabold tracking-[-0.02em] text-pretty text-paper md:text-[26px]">
            {card.title}
          </span>
          {card.source && (
            <span className="mt-1.5 block font-body text-xs font-semibold text-dark-text md:text-[13px]">
              {card.source} <span aria-hidden>→</span>
            </span>
          )}
        </span>
      </SafeLink>
    </div>
  );
}
