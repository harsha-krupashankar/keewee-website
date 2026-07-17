import { CSSProperties } from "react";
import Button from "./Button";
import Container from "./Container";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-paper pb-14 pt-16 md:pb-16 md:pt-[66px]">
      <Container className="relative">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: "radial-gradient(#1C1B19 1.3px, transparent 1.7px)",
            backgroundSize: "17px 17px",
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-11 hidden select-none font-display text-[210px] font-extrabold leading-[0.8] tracking-[-0.04em] text-transparent [-webkit-text-stroke:2px_#E1DACB] lg:block"
          style={{ transform: "rotate(-4deg)" }}
        >
          *
        </div>
        <div
          className="absolute left-0 top-[70px] z-[4] hidden animate-bob-a -rotate-6 rounded-lg border-2 border-ink bg-lime px-3.5 py-1.5 font-sticker text-xl text-ink shadow-[3px_3px_0_#1C1B19] sm:block"
          style={{ "--r": "-8deg" } as CSSProperties}
        >
          NO MUSH!
        </div>
        <div
          className="absolute bottom-14 right-0 z-[4] hidden animate-bob-b rounded-lg border-2 border-ink bg-white px-3 py-1.5 font-sticker text-lg text-rust line-through shadow-[3px_3px_0_#1C1B19] sm:block"
          style={{ "--r": "6deg" } as CSSProperties}
        >
          SAME • SAME • SAME
        </div>
        <div className="pointer-events-none absolute bottom-[38px] left-8 z-[1] hidden animate-spin-slow text-[34px] text-green sm:block">
          ✱
        </div>
        <div className="pointer-events-none absolute bottom-[120px] right-16 z-[1] hidden animate-spin-slow-reverse text-[22px] text-rust lg:block">
          ✱
        </div>

        <div className="relative z-[3] mx-auto flex max-w-[900px] flex-col items-center text-center">
          <Reveal y={14} className="mb-5.5 inline-flex items-center gap-2.5 rounded-full border border-border bg-white px-4 py-1.5 shadow-[0_6px_18px_rgba(28,27,25,0.05)]">
            <span className="h-2 w-2 rounded-full bg-rust motion-safe:animate-pulse" />
            <span className="font-display text-xs font-bold uppercase tracking-[0.1em] text-rust">
              Meanwhile, in most B2B companies…
            </span>
          </Reveal>

          <Reveal delay={80} y={18}>
            <h1 className="mb-6 font-display text-[52px] font-extrabold leading-[0.92] tracking-[-0.04em] text-ink sm:text-[72px] lg:text-[104px]">
              B2B marketing with a{" "}
              <span className="relative inline-block">
                <span className="absolute -bottom-2 left-[-6px] right-[-8px] h-[34%] -rotate-1 rounded-sm bg-lime" />
                <span className="relative">spine.</span>
              </span>
              <span className="text-green">*</span>
            </h1>
          </Reveal>

          <Reveal delay={160} y={18}>
            <p className="mb-7.5 max-w-[600px] font-body text-lg font-medium leading-relaxed text-body sm:text-[19px]">
              Most B2B marketing is AI-generated mush in a slide template.{" "}
              <strong className="font-bold text-ink">
                We&apos;re the agency that fixes it
              </strong>{" "}
              — sharp positioning and a full-funnel system that moves pipeline.
            </p>
          </Reveal>

          <Reveal delay={240} y={18} className="mb-7.5 flex flex-wrap items-center justify-center gap-4.5">
            <Button href="mailto:team@keewee.in" className="px-8 py-4 text-lg">
              Talk to us
            </Button>
            <a
              href="#full-funnel"
              className="group border-b-[2.5px] border-border-soft pb-0.5 font-display text-lg font-bold text-ink transition-colors duration-150 hover:border-green hover:text-green"
            >
              Explore services{" "}
              <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>

          <Reveal delay={320} y={12} className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-faint">
            *spine (n.) — a point of view
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
