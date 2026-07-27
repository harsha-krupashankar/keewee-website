import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import type { ServiceDoc } from "@/lib/service-data";

export default function ServiceTalkToUs({ doc }: { doc: ServiceDoc }) {
  return (
    <section className="py-8 md:pb-16 md:pt-10">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[24px] bg-ink p-8 text-paper shadow-[0_20px_48px_rgba(28,27,25,0.2)] sm:p-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-5"
            style={{
              backgroundImage: "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div
            className="pointer-events-none absolute -top-8 right-8 select-none font-display text-[120px] font-extrabold leading-none text-dark-card"
            aria-hidden
          >
            ✱
          </div>
          <div className="relative z-[2] max-w-[720px]">
            <h2 className="mb-4.5 font-display text-[28px] font-extrabold leading-[1.04] tracking-[-0.035em] text-pretty sm:text-[38px] lg:text-[46px]">
              {doc.talkHeadline}
            </h2>
            <p className="mb-6.5 max-w-[640px] font-body text-base font-medium leading-relaxed text-dark-text">
              {doc.talkBody}
            </p>
            <a
              href="mailto:team@keewee.in"
              className="inline-block rounded-xl bg-green px-7.5 py-4 font-display text-[17px] font-bold text-white shadow-[3px_3px_0_rgba(0,0,0,0.5)] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-[3px]"
            >
              Book a call with us
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
