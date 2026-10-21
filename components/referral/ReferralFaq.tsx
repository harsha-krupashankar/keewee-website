import Container from "@/components/Container";
import FaqAccordion from "@/components/FaqAccordion";
import type { ReferralPage } from "@/sanity/lib/types";

export default function ReferralFaq({ page }: { page: ReferralPage }) {
  if (!page.faqItems?.length) return null;

  return (
    <section className="bg-surface py-20 md:py-32">
      <Container className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-16">
        <h2 className="font-display text-[34px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[52px]">
          {page.faqHeadline}
        </h2>
        <FaqAccordion items={page.faqItems} />
      </Container>
    </section>
  );
}
