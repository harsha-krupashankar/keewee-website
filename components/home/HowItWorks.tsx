import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Headline from "@/components/sanity/Headline";
import type { HomePage } from "@/sanity/lib/types";

export default function HowItWorks({ page }: { page: HomePage }) {
  const header = page.howHeader;

  return (
    <section className="py-14 md:py-16">
      <Container>
        {header?.eyebrow && (
          <Reveal className="mb-5 flex items-center gap-3">
            <span className="font-display text-[13px] font-bold uppercase tracking-[0.09em] text-green">
              {header.eyebrow}
            </span>
            <span className="flex-1 border-b border-border-line" />
          </Reveal>
        )}

        <Reveal delay={60}>
          <h2 className="mb-8 font-display text-[32px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[42px] lg:text-[52px]">
            <Headline value={header?.headline} />
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-3">
          {page.howPhases?.map((phase, i) => (
            <Reveal
              key={phase.title}
              delay={i * 80}
              className="rounded-[18px] border border-border bg-white p-6 shadow-[0_8px_24px_rgba(28,27,25,0.04)] transition-all duration-150 hover:-translate-y-1 hover:border-[#D9C9B8] hover:shadow-[0_16px_34px_rgba(28,27,25,0.10)]"
            >
              <div className="inline-block -rotate-1 rounded-lg border-2 border-ink bg-lime px-3 py-0.5 font-sticker text-lg text-ink shadow-[2px_2px_0_#1C1B19]">
                {phase.tag ?? `PHASE ${String(i + 1).padStart(2, "0")}`}
              </div>
              <h3 className="mb-2.5 mt-4 font-display text-xl font-bold leading-tight tracking-[-0.02em] text-ink">
                {phase.title}
              </h3>
              <p className="font-body text-sm font-medium leading-relaxed text-muted">
                {phase.description}
              </p>
            </Reveal>
          ))}
        </div>

        {page.howBanner && (
          <Reveal
            delay={240}
            className="mt-6 rounded-[18px] bg-green px-6 py-6 text-center font-display text-xl font-extrabold leading-tight tracking-[-0.02em] text-white shadow-[0_10px_26px_rgba(78,125,46,0.24)] sm:text-2xl lg:text-[30px]"
          >
            {page.howBanner}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
