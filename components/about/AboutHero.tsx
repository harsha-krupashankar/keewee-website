import { CSSProperties } from "react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function AboutHero() {
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
        className="pointer-events-none absolute right-0 top-6 hidden select-none font-display text-[190px] font-extrabold leading-[0.8] tracking-[-0.04em] text-transparent [-webkit-text-stroke:2px_#E1DACB] lg:block"
        style={{ transform: "rotate(-4deg)" }}
      >
        *
      </div>
      <div
        className="absolute right-12 top-10 z-[4] hidden animate-bob-a rounded-lg border-2 border-ink bg-lime px-3.5 py-1.5 font-sticker text-xl text-ink shadow-[3px_3px_0_#1C1B19] sm:block"
        style={{ "--r": "6deg" } as CSSProperties}
      >
        NO MUSH!
      </div>
      <div className="pointer-events-none absolute bottom-9 left-16 z-[1] hidden animate-spin-slow text-[30px] text-green sm:block">
        ✱
      </div>

      <Container className="relative z-[2]">
        <div className="mx-auto flex max-w-[820px] flex-col items-center text-center">
          <Reveal className="mb-5.5 inline-flex items-center gap-2.5 rounded-full border border-border bg-white px-4 py-1.5 shadow-[0_6px_18px_rgba(28,27,25,0.05)]">
            <span className="h-2 w-2 rounded-full bg-green" />
            <span className="font-display text-xs font-bold uppercase tracking-[0.1em] text-green">
              About us
            </span>
          </Reveal>

          <Reveal delay={80} y={18}>
            <h1 className="mb-5.5 font-display text-[38px] font-extrabold leading-[1.15] tracking-[-0.035em] text-ink text-pretty sm:text-[52px] lg:text-[64px]">
              Three friends. One phone call.{" "}
              <span className="bg-lime px-1 [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                One very deliberate decision.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160} y={18}>
            <p className="max-w-[640px] font-body text-lg font-medium leading-relaxed text-body sm:text-[19px]">
              We got on a call to catch up. We stayed on it because we&apos;d
              all noticed the same thing: B2B marketing was full of people
              executing and short on people with an actual opinion.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
