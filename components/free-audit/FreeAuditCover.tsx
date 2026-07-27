import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import Headline from "@/components/sanity/Headline";
import type { FreeAuditPage } from "@/sanity/lib/types";

export default function FreeAuditCover({ page }: { page: FreeAuditPage }) {
  const header = page.coverHeader;

  return (
    <section className="relative overflow-hidden border-y border-border-soft bg-surface py-14 md:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#1C1B19 1.3px, transparent 1.7px)",
          backgroundSize: "16px 16px",
        }}
      />
      <Container className="relative">
        <Reveal className="mx-auto mb-9 max-w-[680px] text-center">
          {header?.eyebrow && (
            <span className="mb-3.5 block font-mono text-xs font-bold uppercase tracking-[1.4px] text-green">
              {header.eyebrow}
            </span>
          )}
          <h2 className="mb-4 font-display text-[28px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink sm:text-[42px]">
            <Headline value={header?.headline} />
          </h2>
          <Copy
            value={header?.intro}
            className="font-body text-base font-medium leading-relaxed text-body"
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {page.coverCards?.map((card, i) => (
            <Reveal
              key={card.title}
              delay={i * 60}
              className="flex flex-col rounded-[18px] border border-border bg-white p-7 shadow-[0_8px_24px_rgba(28,27,25,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-[#D9C9B8] hover:shadow-[0_16px_34px_rgba(28,27,25,0.10)]"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px] border-2 border-ink bg-green font-display text-sm font-extrabold text-white shadow-[2px_2px_0_#1C1B19]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-0 flex-1 border-t border-dashed border-[#E4DECF]" />
              </div>
              <h3 className="mb-2.5 font-display text-xl font-extrabold leading-tight tracking-[-0.02em] text-ink">
                {card.title}
              </h3>
              <p className="font-body text-[15px] font-medium leading-relaxed text-body">
                {card.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
