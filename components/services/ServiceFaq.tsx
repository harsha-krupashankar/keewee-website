import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import type { ServiceDoc } from "@/lib/service-data";

export default function ServiceFaq({ doc }: { doc: ServiceDoc }) {
  return (
    <section className="py-8 md:py-10">
      <Container>
        <Reveal className="rounded-[24px] border border-border-soft bg-surface p-8 sm:p-10">
          <span className="mb-3.5 block font-mono text-xs font-bold uppercase tracking-[1.4px] text-green">
            // FAQ
          </span>
          <h2 className="mb-6.5 font-display text-[26px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink sm:text-[34px]">
            Questions we get asked.
          </h2>
          <div className="flex flex-col">
            {doc.faq.map((f, i) => (
              <div key={f.q} className={`py-5 ${i > 0 ? "border-t border-border-line" : ""}`}>
                <h3 className="mb-2 font-display text-lg font-extrabold leading-tight tracking-[-0.02em] text-ink">
                  {f.q}
                </h3>
                <p className="max-w-[820px] font-body text-[15px] font-medium leading-relaxed text-body">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
