import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function BlogCtaBanner() {
  return (
    <section className="pb-16 pt-2 sm:pb-20">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl bg-ink px-8 py-12 text-center text-paper shadow-[0_20px_48px_rgba(28,27,25,0.2)] sm:px-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
              backgroundSize: "16px 16px",
            }}
          />
          <h2 className="relative z-[2] mx-auto mb-4.5 max-w-[760px] font-display text-[30px] font-extrabold leading-[1.06] tracking-[-0.035em] sm:text-[42px] lg:text-[50px]">
            Your marketing should be doing more than it is right now.
          </h2>
          <p className="relative z-[2] mx-auto mb-7 max-w-[620px] font-body text-base font-medium leading-relaxed text-dark-text">
            Book a free 30-minute audit call. We look at your positioning,
            your funnel, and your content and tell you exactly what&apos;s
            broken and what to fix first.
          </p>
          <div className="relative z-[2] flex flex-col items-center gap-3">
            <a
              href="mailto:team@keewee.in?subject=Free%20audit"
              className="inline-block rounded-xl bg-green px-7.5 py-4 font-display text-[17px] font-bold text-white shadow-[3px_3px_0_rgba(0,0,0,0.5)] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-[3px]"
            >
              Book a free audit call
            </a>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-faint">
              Free. 30 minutes. No obligation.
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
