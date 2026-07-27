import Button from "@/components/Button";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function FaqCta() {
  return (
    <section className="py-12 md:pb-16 md:pt-14">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[24px] bg-ink px-8 py-12 text-center text-paper shadow-[0_20px_48px_rgba(28,27,25,0.2)] sm:px-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
              backgroundSize: "16px 16px",
            }}
          />
          <h2 className="relative z-10 mx-auto mb-4.5 max-w-[760px] font-display text-[28px] font-extrabold leading-[1.12] tracking-[-0.03em] sm:text-[40px] lg:text-[46px]">
            Still have questions? That&apos;s great because it means
            you&apos;re thinking seriously about this.
          </h2>
          <p className="relative z-10 mx-auto mb-6.5 max-w-[620px] font-body text-base font-medium leading-relaxed text-dark-text">
            Book a free 30-minute audit call. We&apos;ll look at your current
            setup, tell you what&apos;s broken, and recommend exactly what
            makes sense for your stage and budget. No pitch, no deck, just a
            straight conversation.
          </p>
          <div className="relative z-10 flex flex-wrap justify-center gap-3.5">
            <Button
              href="mailto:team@keewee.in?subject=Free%20audit"
              className="px-7 py-4 text-[17px]"
            >
              Book your free audit
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
