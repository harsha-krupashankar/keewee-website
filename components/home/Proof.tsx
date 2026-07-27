import Button from "@/components/Button";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import Headline from "@/components/sanity/Headline";
import type { HomePage } from "@/sanity/lib/types";

export default function Proof({ page }: { page: HomePage }) {
  const header = page.proofHeader;

  return (
    <section className="py-14 md:py-16">
      <Container>
        <Reveal className="group relative overflow-hidden rounded-[24px] border border-border bg-white p-8 shadow-[0_16px_40px_rgba(28,27,25,0.07)] transition-shadow duration-300 hover:shadow-[0_22px_50px_rgba(28,27,25,0.1)] sm:p-11">
          {page.proofSticker && (
            <div className="absolute right-6 -top-3.5 z-10 rotate-3 rounded-lg border-2 border-ink bg-lime px-4.5 py-1.5 font-sticker text-2xl text-ink shadow-[3px_3px_0_#1C1B19] transition-transform duration-300 group-hover:rotate-6">
              {page.proofSticker}
            </div>
          )}
          {header?.eyebrow && (
            <span className="font-display text-xs font-bold uppercase tracking-[0.09em] text-green">
              {header.eyebrow}
            </span>
          )}
          <h2 className="my-3.5 max-w-[900px] font-display text-[32px] font-extrabold leading-none tracking-[-0.035em] text-ink sm:text-[42px] lg:text-[54px]">
            <Headline value={header?.headline} />
          </h2>
          <Copy
            value={page.proofBody}
            className="mb-6 max-w-[660px] font-body text-base font-medium leading-relaxed text-body"
          />
          {page.proofCta && (
            <Button href={page.proofCta.href} className="px-7 py-3.5 text-base">
              {page.proofCta.label}
            </Button>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
