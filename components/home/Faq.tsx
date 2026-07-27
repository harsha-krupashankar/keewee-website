import Container from "@/components/Container";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import Headline from "@/components/sanity/Headline";
import type { HomePage } from "@/sanity/lib/types";

export default function Faq({ page }: { page: HomePage }) {
  const header = page.faqHeader;
  if (!page.faqItems?.length) return null;

  return (
    <section className="py-14 md:py-16">
      <Container>
        {header?.eyebrow && (
          <Reveal className="mb-5 flex items-center gap-3">
            <span className="font-display text-[13px] font-bold uppercase tracking-[0.09em] text-green">
              {header.eyebrow}
            </span>
            <span className="flex-1 border-b border-border-line" />
          </Reveal>
        )}

        <Reveal delay={60} className="mb-6 flex flex-wrap items-baseline gap-3.5">
          <h2 className="font-display text-[32px] font-extrabold leading-none tracking-[-0.035em] text-ink sm:text-[42px] lg:text-[52px]">
            <Headline value={header?.headline} />
          </h2>
          {header?.sticker && (
            <span className="font-sticker text-2xl text-green">{header.sticker}</span>
          )}
        </Reveal>

        <FaqAccordion items={page.faqItems} />
      </Container>
    </section>
  );
}
