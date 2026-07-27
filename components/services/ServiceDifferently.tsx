import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import type { ServiceDoc } from "@/lib/service-data";

export default function ServiceDifferently({ doc }: { doc: ServiceDoc }) {
  return (
    <section className="relative overflow-hidden bg-ink py-14 text-paper md:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div
        className="pointer-events-none absolute -top-8 right-8 select-none font-display text-[150px] font-extrabold leading-none text-dark-card"
        aria-hidden
      >
        ✱
      </div>
      <Container className="relative z-[2]">
        <Reveal className="mb-3.5 font-mono text-xs font-bold uppercase tracking-[1.4px] text-lime">
          // What we do differently
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mb-8 max-w-[720px] font-display text-[28px] font-extrabold leading-[1.02] tracking-[-0.03em] text-paper sm:text-[36px] lg:text-[42px]">
            The part everyone else skips.
          </h2>
        </Reveal>

        <div className="grid gap-x-10 gap-y-3.5 md:grid-cols-2">
          {doc.differently.map((d, i) => (
            <Reveal
              key={i}
              delay={120 + i * 50}
              className="flex items-start gap-3.5 border-t border-dark-border pt-4"
            >
              <span className="mt-px flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-[7px] bg-lime text-[13px] font-extrabold text-ink">
                ✓
              </span>
              <p className="font-body text-[15px] font-medium leading-relaxed text-dark-text">
                {d}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
