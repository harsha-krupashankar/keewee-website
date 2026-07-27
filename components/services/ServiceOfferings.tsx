import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import type { ServiceDoc } from "@/lib/service-data";

export default function ServiceOfferings({ doc }: { doc: ServiceDoc }) {
  return (
    <section className="py-14 md:py-16">
      <Container>
        <Reveal className="mb-7">
          <span className="mb-3.5 block font-mono text-xs font-bold uppercase tracking-[1.4px] text-green">
            // What we do
          </span>
          <h2 className="font-display text-[28px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[36px] lg:text-[42px]">
            The work, spelled out.
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {doc.services.map((s, i) => (
            <Reveal
              key={s.title}
              delay={Math.min(i, 8) * 40}
              className="flex flex-col rounded-[18px] border border-border bg-white p-6 shadow-[0_8px_24px_rgba(28,27,25,0.04)] transition-all duration-150 hover:-translate-y-1 hover:border-[#D9C9B8] hover:shadow-[0_16px_34px_rgba(28,27,25,0.1)]"
            >
              <div className="mb-3.5 flex items-center gap-3">
                <span className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px] border-2 border-ink bg-green font-display text-sm font-extrabold text-white shadow-[2px_2px_0_#1C1B19]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 border-b border-dashed border-border-soft" />
              </div>
              <h3 className="mb-2.5 font-display text-[19px] font-extrabold leading-tight tracking-[-0.02em] text-ink">
                {s.title}
              </h3>
              <p className="font-body text-sm font-medium leading-relaxed text-body">
                {s.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
