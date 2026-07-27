import Button from "@/components/Button";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function FreeAuditHero() {
  return (
    <section className="relative overflow-hidden bg-paper pb-14 pt-16 md:pb-16 md:pt-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: "radial-gradient(#1C1B19 1.3px, transparent 1.7px)",
          backgroundSize: "17px 17px",
        }}
      />
      <div
        className="pointer-events-none absolute right-[-24px] top-2.5 hidden select-none font-display text-[230px] font-extrabold leading-[0.8] tracking-[-0.04em] text-transparent [-webkit-text-stroke:2px_#E1DACB] lg:block"
        style={{ transform: "rotate(-4deg)" }}
      >
        *
      </div>
      <Container className="relative z-[2]">
        <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <Reveal className="mb-5.5 inline-flex items-center gap-2.5 rounded-full border border-border bg-white px-4 py-1.5 shadow-[0_6px_18px_rgba(28,27,25,0.05)]">
            <span className="h-2 w-2 rounded-full bg-green" />
            <span className="font-display text-xs font-bold uppercase tracking-[1.4px] text-green">
              Free audit call
            </span>
          </Reveal>

          <Reveal delay={80} y={18}>
            <h1 className="mb-5.5 text-pretty font-display text-[38px] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink sm:text-[52px] lg:text-[64px]">
              Find out exactly what&apos;s{" "}
              <span className="relative inline-block">
                <span className="absolute -bottom-1.5 left-[-6px] right-[-8px] h-[34%] -rotate-1 rounded-sm bg-lime" />
                <span className="relative">broken</span>
              </span>{" "}
              in your marketing in just 30 minutes.
            </h1>
          </Reveal>

          <Reveal delay={160} y={18}>
            <p className="mb-7.5 max-w-[620px] text-pretty font-body text-lg font-medium leading-relaxed text-body sm:text-[19px]">
              We go through your positioning, your funnel, and your content.
              You walk away knowing what to fix, what to cut, and what to
              double down on.
            </p>
          </Reveal>

          <Reveal delay={240} y={18}>
            <Button
              href="mailto:team@keewee.in?subject=Free%20audit%20call"
              className="px-8 py-4 text-lg"
            >
              Book your free audit
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
