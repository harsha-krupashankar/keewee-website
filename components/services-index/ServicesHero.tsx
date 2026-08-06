import Button from "@/components/Button";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import Headline from "@/components/sanity/Headline";
import type { Link as LinkValue, PageHero } from "@/sanity/lib/types";

/**
 * Left-aligned hero for the services index. Unlike the shared
 * `PageHeroCentered`, this one carries a second, underlined text link through to
 * the quote form further down the page.
 */
export default function ServicesHero({
  hero,
  secondaryCta,
}: {
  hero?: PageHero | null;
  secondaryCta?: LinkValue | null;
}) {
  if (!hero) return null;

  return (
    <section
      id="kw-services"
      className="relative overflow-hidden bg-paper pb-14 pt-16 md:pb-[60px] md:pt-[72px]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: "radial-gradient(#1C1B19 1.3px, transparent 1.7px)",
          backgroundSize: "17px 17px",
        }}
      />
      <div
        className="pointer-events-none absolute right-[-20px] top-5 hidden select-none font-display text-[220px] font-extrabold leading-[0.8] tracking-[-0.04em] text-transparent [-webkit-text-stroke:2px_#E1DACB] lg:block"
        style={{ transform: "rotate(-4deg)" }}
        aria-hidden
      >
        *
      </div>

      <Container className="relative z-[2]">
        <div className="max-w-[860px]">
          {hero.badge && (
            <Reveal className="mb-5.5 inline-flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-green" />
              <span className="font-display text-[13px] font-bold uppercase tracking-[1.6px] text-green">
                {hero.badge}
              </span>
            </Reveal>
          )}

          <Reveal delay={80} y={18}>
            <h1 className="mb-6 text-pretty font-display text-[clamp(42px,6vw,74px)] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink">
              <Headline value={hero.headline} />
            </h1>
          </Reveal>

          <Reveal delay={160} y={18}>
            <Copy
              value={hero.intro}
              className="mb-7.5 max-w-[660px] font-body text-[19px] font-medium leading-[1.55] text-body"
            />
          </Reveal>

          {(hero.cta || secondaryCta) && (
            <Reveal delay={240} y={18} className="flex flex-wrap items-center gap-4">
              {hero.cta && (
                <Button href={hero.cta.href} className="px-7.5 py-4 text-[17px]">
                  {hero.cta.label}
                </Button>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="border-b-[2.5px] border-border-soft pb-0.5 font-display text-[17px] font-bold text-ink transition-colors duration-150 hover:border-green hover:text-green"
                >
                  {secondaryCta.label}
                </a>
              )}
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
