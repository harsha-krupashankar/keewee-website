import Container from "@/components/Container";
import type { ReferralPage } from "@/sanity/lib/types";

export default function ReferralTerms({ page }: { page: ReferralPage }) {
  if (!page.terms?.length) return null;

  return (
    <section id="terms" className="scroll-mt-24 pb-20 md:pb-32">
      <Container className="flex flex-col gap-12">
        <h2 className="font-display text-[34px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[52px]">
          {page.termsHeadline}
        </h2>
        <ul className="grid gap-x-16 gap-y-9 rounded-[24px] bg-white p-8 shadow-[0_8px_24px_rgba(28,27,25,0.04)] sm:p-12 md:grid-cols-2 lg:p-16">
          {page.terms.map((term) => (
            <li
              key={term}
              className="flex items-start gap-3 font-body text-[15px] font-medium leading-relaxed text-body"
            >
              <span
                aria-hidden
                className="flex-shrink-0 font-display text-lg font-extrabold leading-[1.4] text-green"
              >
                ✱
              </span>
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
