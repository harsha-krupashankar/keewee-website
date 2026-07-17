import Container from "./Container";
import { phases } from "@/lib/data";
import Reveal from "./Reveal";

export default function HowItWorks() {
  return (
    <section className="py-14 md:py-16">
      <Container>
        <Reveal className="mb-5 flex items-center gap-3">
          <span className="font-display text-[13px] font-bold uppercase tracking-[0.09em] text-green">
            How it works
          </span>
          <span className="flex-1 border-b border-border-line" />
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mb-8 font-display text-[32px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[42px] lg:text-[52px]">
            Three phases. One team. <span className="text-green">No handoffs.</span>
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-3">
          {phases.map((p, i) => (
            <Reveal
              key={p.no}
              delay={i * 80}
              className="rounded-[18px] border border-border bg-white p-6 shadow-[0_8px_24px_rgba(28,27,25,0.04)] transition-all duration-150 hover:-translate-y-1 hover:border-[#D9C9B8] hover:shadow-[0_16px_34px_rgba(28,27,25,0.10)]"
            >
              <div className="inline-block -rotate-1 rounded-lg border-2 border-ink bg-lime px-3 py-0.5 font-sticker text-lg text-ink shadow-[2px_2px_0_#1C1B19]">
                PHASE {p.no}
              </div>
              <h3 className="mb-2.5 mt-4 font-display text-xl font-bold leading-tight tracking-[-0.02em] text-ink">
                {p.title}
              </h3>
              <p className="font-body text-sm font-medium leading-relaxed text-muted">
                {p.desc}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={240}
          className="mt-6 rounded-[18px] bg-green px-6 py-6 text-center font-display text-xl font-extrabold leading-tight tracking-[-0.02em] text-white shadow-[0_10px_26px_rgba(78,125,46,0.24)] sm:text-2xl lg:text-[30px]"
        >
          If the pipeline isn&apos;t moving, the deliverable count doesn&apos;t
          matter.
        </Reveal>
      </Container>
    </section>
  );
}
