import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function NewsletterFinalCta() {
  return (
    <section className="py-14 md:py-16">
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
          <div
            className="pointer-events-none absolute -top-8 right-8 select-none font-display text-[150px] font-extrabold leading-none text-[#262523]"
            aria-hidden
          >
            ✱
          </div>
          <div className="relative z-[2] mx-auto max-w-[760px]">
            <span className="mb-4 block font-mono text-xs font-bold uppercase tracking-[1.4px] text-lime">
              // Free for B2B SaaS companies
            </span>
            <h2 className="mx-auto mb-4.5 max-w-[700px] font-display text-[28px] font-extrabold leading-[1.1] tracking-[-0.03em] text-paper text-pretty sm:text-[38px] lg:text-[42px]">
              30 minutes. We&apos;ll show you exactly what&apos;s broken and
              how to fix it.
            </h2>
            <p className="mx-auto mb-7 max-w-[600px] font-body text-base font-medium leading-relaxed text-dark-text">
              Book a free positioning and funnel audit with one of
              Keewee&apos;s founders. We go through your messaging, your
              website, your content, and your funnel in 30 minutes and come
              back with specific, prioritized recommendations you can act on
              whether you work with us or not. Don&apos;t worry about the
              follow-up harassment. If we&apos;re a fit, it&apos;ll be
              obvious. If we&apos;re not, you still leave with a real
              diagnosis.
            </p>
            <a
              href="mailto:team@keewee.in?subject=Free%20audit%20call"
              className="inline-block rounded-xl bg-green px-8 py-4 font-display text-lg font-bold text-white shadow-[3px_3px_0_rgba(0,0,0,0.5)] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-[3px]"
            >
              Book the free audit
            </a>
            <div className="mt-4">
              <a
                href="#subscribe-form"
                className="border-b-2 border-lime font-display text-sm font-bold text-paper"
              >
                Not ready for a call? Subscribe to Keewee Club instead.
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
