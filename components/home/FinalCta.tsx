import Button from "@/components/Button";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import Headline from "@/components/sanity/Headline";
import type { HomePage } from "@/sanity/lib/types";

export default function FinalCta({ page }: { page: HomePage }) {
  return (
    <section className="py-14 md:pb-20 md:pt-16">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[24px] bg-ink px-8 py-12 text-center text-paper shadow-[0_20px_48px_rgba(28,27,25,0.2)] sm:px-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
              backgroundSize: "16px 16px",
            }}
          />
          <h2 className="relative z-10 mb-4.5 font-display text-[32px] font-extrabold leading-none tracking-[-0.035em] sm:text-[44px] lg:text-[56px]">
            <Headline value={page.ctaHeadline} />
          </h2>
          <Copy
            value={page.ctaBody}
            tone="dark"
            className="relative z-10 mx-auto mb-6 max-w-[640px] font-body text-base font-medium leading-relaxed text-dark-text"
          />
          <div className="relative z-10 flex flex-wrap justify-center gap-3.5">
            {page.ctaButtons?.primary && (
              <Button
                href={page.ctaButtons.primary.href}
                className="px-7 py-4 text-[17px]"
              >
                {page.ctaButtons.primary.label}
              </Button>
            )}
            {page.ctaButtons?.secondary && (
              <Button
                href={page.ctaButtons.secondary.href}
                variant="ghost"
                className="px-7 py-3.5 text-[17px]"
              >
                {page.ctaButtons.secondary.label}
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
