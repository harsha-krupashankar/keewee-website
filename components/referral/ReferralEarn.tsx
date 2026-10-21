import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import type { ReferralPage } from "@/sanity/lib/types";

/** The two panels: how much you earn (ink) and who can refer (green). */
export default function ReferralEarn({ page }: { page: ReferralPage }) {
  return (
    <section className="py-20 md:py-32">
      <Container className="grid gap-8 lg:grid-cols-[1.25fr_1fr]">
        <Reveal className="flex flex-col gap-7 rounded-[24px] bg-ink p-8 text-paper sm:p-12 lg:p-16">
          <h2 className="font-display text-[30px] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[40px]">
            {page.earnHeadline}
          </h2>
          <div className="font-display text-[56px] font-extrabold leading-[0.92] tracking-[-0.04em] text-lime sm:text-[88px]">
            {page.earnAmount}
          </div>
          <p className="font-body text-[17px] font-medium leading-relaxed text-dark-text-softer">
            {page.earnBody}
          </p>
          {page.earnNote && (
            <p className="border-t border-dark-border pt-7 font-display text-xl font-bold leading-snug">
              {page.earnNote}
            </p>
          )}
        </Reveal>
        <Reveal delay={100} className="flex flex-col gap-7 rounded-[24px] bg-green-bg p-8 sm:p-12 lg:p-16">
          <h2 className="font-display text-[30px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[40px]">
            {page.whoHeadline}
          </h2>
          <div className="font-display text-[56px] font-extrabold leading-[0.92] tracking-[-0.04em] text-green sm:text-[88px]">
            {page.whoAmount}
          </div>
          <p className="font-body text-[17px] font-medium leading-relaxed text-ink">{page.whoBody}</p>
        </Reveal>
      </Container>
    </section>
  );
}
