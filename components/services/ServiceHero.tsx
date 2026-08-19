import Button from "@/components/Button";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Headline from "@/components/sanity/Headline";
import type { Link as LinkValue, ServicePage } from "@/sanity/lib/types";

export default function ServiceHero({
  doc,
  cta,
}: {
  doc: ServicePage;
  cta?: LinkValue | null;
}) {
  return (
    <section className="relative overflow-hidden bg-paper pb-14 pt-14 md:pb-16 md:pt-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: "radial-gradient(#1C1B19 1.3px, transparent 1.7px)",
          backgroundSize: "17px 17px",
        }}
      />
      <div
        className="pointer-events-none absolute right-[-24px] top-3.5 hidden select-none font-display text-[230px] font-extrabold leading-[0.8] tracking-[-0.04em] text-transparent [-webkit-text-stroke:2px_#E1DACB] lg:block"
        style={{ transform: "rotate(-4deg)" }}
        aria-hidden
      >
        *
      </div>
      <Container className="relative z-[2]">
        <div className="max-w-[880px]">
          <Reveal className="mb-5.5 inline-flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-green" />
            <span className="font-display text-[13px] font-bold uppercase tracking-[0.09em] text-green">
              {doc.category}
            </span>
          </Reveal>

          <Reveal eager delay={80} y={18}>
            <h1 className="mb-6 font-display text-[42px] font-extrabold leading-[0.99] tracking-[-0.035em] text-ink text-pretty sm:text-[56px] lg:text-[72px]">
              <Headline value={doc.heroHeadline} />
            </h1>
          </Reveal>

          <Reveal delay={160} y={18}>
            <p className="mb-7.5 max-w-[680px] font-body text-lg font-medium leading-relaxed text-body sm:text-[19px]">
              {doc.heroSub}
            </p>
          </Reveal>

          {cta && (
            <Reveal delay={240} y={18}>
              <Button href={cta.href} className="px-7.5 py-4 text-[17px]">
                {cta.label}
              </Button>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
