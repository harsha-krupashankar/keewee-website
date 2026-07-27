import Container from "@/components/Container";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import Headline from "@/components/sanity/Headline";
import type { FreeAuditPage } from "@/sanity/lib/types";

export default function FreeAuditFaq({ page }: { page: FreeAuditPage }) {
  if (!page.faqItems?.length) return null;

  return (
    <section className="bg-paper pb-14 pt-3.5 md:pb-16">
      <Container>
        <Reveal className="rounded-[24px] border border-border-soft bg-surface p-8 sm:p-10">
          {page.faqHeader?.eyebrow && (
            <span className="mb-3.5 block font-mono text-xs font-bold uppercase tracking-[1.4px] text-green">
              {page.faqHeader.eyebrow}
            </span>
          )}
          <h2 className="mb-6.5 font-display text-[26px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink sm:text-[38px]">
            <Headline value={page.faqHeader?.headline} />
          </h2>
          <FaqAccordion items={page.faqItems} variant="flush" />
        </Reveal>
      </Container>
    </section>
  );
}
