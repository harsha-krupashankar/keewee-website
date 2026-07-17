import Button from "./Button";
import Container from "./Container";
import Reveal from "./Reveal";

export default function FinalCta() {
  return (
    <section className="py-14 md:pb-20 md:pt-16">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[24px] bg-ink px-8 py-12 text-center text-paper shadow-[0_20px_48px_rgba(28,27,25,0.2)] sm:px-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
              backgroundSize: "16px 16px",
            }}
          />
          <h2 className="relative z-10 mb-4.5 font-display text-[32px] font-extrabold leading-none tracking-[-0.035em] sm:text-[44px] lg:text-[56px]">
            Most B2B budgets are being <span className="text-rust">wasted</span>{" "}
            right now.
          </h2>
          <p className="relative z-10 mx-auto mb-6 max-w-[640px] font-body text-base font-medium leading-relaxed text-dark-text">
            Let&apos;s find out if yours is one of them. Free 30-minute audit
            — we look at your positioning, funnel and content, and tell you
            exactly what&apos;s broken.
          </p>
          <div className="relative z-10 flex flex-wrap justify-center gap-3.5">
            <Button href="mailto:team@keewee.in" className="px-7 py-4 text-[17px]">
              Book your free audit
            </Button>
            <Button href="#full-funnel" variant="ghost" className="px-7 py-3.5 text-[17px]">
              See what we do
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
