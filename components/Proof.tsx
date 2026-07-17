import Button from "./Button";
import Container from "./Container";
import Reveal from "./Reveal";

export default function Proof() {
  return (
    <section className="py-14 md:py-16">
      <Container>
        <Reveal className="group relative overflow-hidden rounded-[24px] border border-border bg-white p-8 shadow-[0_16px_40px_rgba(28,27,25,0.07)] transition-shadow duration-300 hover:shadow-[0_22px_50px_rgba(28,27,25,0.1)] sm:p-11">
          <div className="absolute right-6 -top-3.5 z-10 rotate-3 rounded-lg border-2 border-ink bg-lime px-4.5 py-1.5 font-sticker text-2xl text-ink shadow-[3px_3px_0_#1C1B19] transition-transform duration-300 group-hover:rotate-6">
            SOON!
          </div>
          <span className="font-display text-xs font-bold uppercase tracking-[0.09em] text-green">
            Proof &amp; case studies
          </span>
          <h2 className="my-3.5 max-w-[900px] font-display text-[32px] font-extrabold leading-none tracking-[-0.035em] text-ink sm:text-[42px] lg:text-[54px]">
            We could fake the case studies.{" "}
            <span className="text-green">We won&apos;t.</span>
          </h2>
          <p className="mb-6 max-w-[660px] font-body text-base font-medium leading-relaxed text-body">
            The real ones drop Q4 2026 — we&apos;re in our first engagements
            right now. Until then we&apos;ll prove it live: book a free audit
            and we&apos;ll walk your funnel on the call, showing exactly what
            we&apos;d change.{" "}
            <strong className="font-bold text-ink">
              No deck. No borrowed metrics.
            </strong>
          </p>
          <Button href="mailto:team@keewee.in" className="px-7 py-3.5 text-base">
            See what we&apos;d fix →
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
