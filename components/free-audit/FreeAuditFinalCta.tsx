import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function FreeAuditFinalCta() {
  return (
    <section className="bg-paper pb-14 pt-2 md:pb-16">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[24px] bg-ink px-8 py-13 text-center text-paper shadow-[0_20px_48px_rgba(28,27,25,0.2)] sm:px-11">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
              backgroundSize: "16px 16px",
            }}
          />
          <h2 className="relative z-[2] mx-auto mb-4.5 max-w-[760px] text-pretty font-display text-[28px] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-[46px]">
            Thirty minutes from now, you could know exactly what&apos;s
            holding your marketing back.
          </h2>
          <p className="relative z-[2] mx-auto mb-7 max-w-[560px] font-body text-base font-medium leading-relaxed text-dark-text">
            Book the call. We&apos;ve done the prep before you even show up.
            All you need to do is pick a time.
          </p>
          <div className="relative z-[2]">
            <a
              href="mailto:team@keewee.in?subject=Free%20audit%20call"
              className="inline-block rounded-xl bg-green px-8 py-4 font-display text-lg font-bold text-white shadow-[3px_3px_0_rgba(0,0,0,0.5)] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-[3px]"
            >
              Book your free audit
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
