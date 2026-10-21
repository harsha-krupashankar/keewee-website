import Button from "@/components/Button";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import Headline from "@/components/sanity/Headline";
import type { ReferralPage } from "@/sanity/lib/types";

/** Full-bleed ink close: headline, a jump back to the form, and who to ask. */
export default function ReferralCta({ page }: { page: ReferralPage }) {
  return (
    <section className="bg-ink text-paper">
      <Container className="flex flex-col items-start gap-10 pb-24 pt-28 md:pb-30 md:pt-40">
        <Reveal>
          <h2 className="max-w-[900px] font-display text-[40px] font-extrabold leading-[0.96] tracking-[-0.04em] text-pretty sm:text-[60px] lg:text-[76px]">
            <Headline value={page.ctaHeadline} />
          </h2>
        </Reveal>
        {page.ctaBody && (
          <p className="font-body text-lg font-medium leading-relaxed text-dark-text-softer sm:text-xl">
            {page.ctaBody}
          </p>
        )}
        {page.ctaButton && (
          <Button
            href={page.ctaButton.href}
            className="px-7 py-3.5 text-lg shadow-[3px_3px_0_#D9F25C]! hover:shadow-[1px_1px_0_#D9F25C]!"
          >
            {page.ctaButton.label}
          </Button>
        )}
        <Copy
          value={page.ctaContact}
          tone="dark"
          className="mt-14 w-full border-t border-dark-border pt-10 font-body text-base font-medium leading-relaxed text-dark-text [&_a]:border-lime [&_a]:text-lime"
        />
      </Container>
    </section>
  );
}
