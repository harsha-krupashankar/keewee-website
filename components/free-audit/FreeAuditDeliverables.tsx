import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { deliverables } from "@/lib/free-audit-data";

export default function FreeAuditDeliverables() {
  return (
    <section className="bg-paper pb-3 pt-14 md:pt-16">
      <Container>
        <Reveal className="mx-auto mb-9 max-w-[680px] text-center">
          <span className="mb-3.5 block font-mono text-xs font-bold uppercase tracking-[1.4px] text-green">
            {"// What you walk away with"}
          </span>
          <h2 className="font-display text-[28px] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink sm:text-[42px]">
            Definitely not a stupid sales pitch!
          </h2>
        </Reveal>
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {deliverables.map((d, i) => (
            <Reveal
              key={d.title}
              delay={i * 60}
              className="flex flex-col rounded-[18px] border border-green-border bg-green-bg p-7"
            >
              <h3 className="mb-2.5 font-display text-[19px] font-extrabold leading-tight tracking-[-0.02em] text-ink">
                {d.title}
              </h3>
              <p className="font-body text-[15px] font-medium leading-relaxed text-green-deep">
                {d.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
