import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import type { ServicePage } from "@/sanity/lib/types";

export default function ServiceProblem({ doc }: { doc: ServicePage }) {
  return (
    <section className="relative overflow-hidden border-y border-border-soft bg-surface py-13 md:py-14">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#1C1B19 1.3px, transparent 1.7px)",
          backgroundSize: "16px 16px",
        }}
      />
      <Container className="relative">
        <div className="max-w-[820px]">
          <Reveal className="mb-4 font-mono text-xs font-bold uppercase tracking-[1.4px] text-rust">
            {"// The problem"}
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mb-6 font-display text-[28px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink text-pretty sm:text-[36px] lg:text-[44px]">
              {doc.problemHeadline}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <Copy
              value={doc.problemBody}
              className="font-body text-base font-medium leading-relaxed text-body"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
