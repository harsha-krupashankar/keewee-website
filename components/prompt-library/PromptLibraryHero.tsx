import { CSSProperties } from "react";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import Headline from "@/components/sanity/Headline";
import type { PromptLibraryPage } from "@/sanity/lib/types";

export default function PromptLibraryHero({ page }: { page: PromptLibraryPage }) {
  return (
    <section className="relative overflow-hidden bg-paper pb-16 pt-16 md:pb-16 md:pt-[72px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: "radial-gradient(#1C1B19 1.3px, transparent 1.7px)",
          backgroundSize: "17px 17px",
        }}
      />
      <Container className="relative">
        <div
          className="pointer-events-none absolute right-0 top-5 hidden select-none font-display text-[220px] font-extrabold leading-[0.8] tracking-[-0.04em] text-transparent [-webkit-text-stroke:2px_#E1DACB] lg:block"
          style={{ transform: "rotate(-4deg)" }}
          aria-hidden
        >
          *
        </div>

        {page.heroStickerA && (
          <div
            className="absolute left-0 top-[52px] z-[4] hidden animate-bob-a -rotate-6 rounded-lg border-2 border-ink bg-lime px-3.5 py-1.5 font-sticker text-xl text-ink shadow-[3px_3px_0_#1C1B19] sm:block"
            style={{ "--r": "-7deg" } as CSSProperties}
          >
            {page.heroStickerA}
          </div>
        )}
        {page.heroStickerB && (
          <div
            className="absolute bottom-8 right-0 z-[4] hidden animate-bob-b rounded-lg border-2 border-ink bg-white px-3 py-1.5 font-sticker text-lg text-rust line-through shadow-[3px_3px_0_#1C1B19] sm:block"
            style={{ "--r": "5deg" } as CSSProperties}
          >
            {page.heroStickerB}
          </div>
        )}

        <div className="relative z-[3] mx-auto flex max-w-[820px] flex-col items-center text-center">
          {page.heroBadge && (
            <Reveal
              y={14}
              className="mb-5.5 inline-flex items-center gap-2.5 rounded-full border border-border bg-white px-4 py-1.5 shadow-[0_6px_18px_rgba(28,27,25,0.05)]"
            >
              <span className="h-2 w-2 rounded-full bg-green" />
              <span className="font-display text-xs font-bold uppercase tracking-[0.1em] text-green">
                {page.heroBadge}
              </span>
            </Reveal>
          )}

          <Reveal eager delay={80} y={18}>
            <h1 className="mb-6 text-pretty font-display text-[clamp(42px,6vw,72px)] font-extrabold leading-[0.96] tracking-[-0.04em] text-ink">
              <Headline value={page.heroHeadline} />
            </h1>
          </Reveal>

          <Reveal delay={160} y={18}>
            <Copy
              value={page.heroIntro}
              className="mb-7.5 max-w-[640px] font-body text-lg font-medium leading-[1.58] text-body"
            />
          </Reveal>

          {page.heroCta && (
            <Reveal delay={240} y={18}>
              <Button href={page.heroCta.href} className="px-8 py-4 text-lg">
                {page.heroCta.label}
              </Button>
            </Reveal>
          )}

          {!!page.heroBadges?.length && (
            <Reveal
              delay={300}
              y={14}
              className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
            >
              {page.heroBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-border bg-white px-4 py-1.5 font-display text-[13px] font-bold text-green"
                >
                  {badge}
                </span>
              ))}
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
