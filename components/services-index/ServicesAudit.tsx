import Button from "@/components/Button";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import Headline from "@/components/sanity/Headline";
import type { ServicesPage } from "@/sanity/lib/types";

/**
 * The closing dark panel. `DarkCtaSection` centres its contents; here the copy
 * stays left-aligned so it reads as the last word of the catalogue rather than
 * as a separate poster.
 */
export default function ServicesAudit({ page }: { page: ServicesPage }) {
  if (!page.auditHeadline && !page.auditButton) return null;

  return (
    <section id="kw-audit" className="bg-paper pb-14 pt-2">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[24px] bg-ink px-10 py-12 text-paper shadow-[0_20px_48px_rgba(28,27,25,0.2)]">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div
            className="pointer-events-none absolute -top-[30px] right-[34px] select-none font-display text-[120px] font-extrabold text-dark-card"
            aria-hidden
          >
            ✱
          </div>

          <div className="relative z-[2] max-w-[720px]">
            <h2 className="mb-[18px] text-pretty font-display text-[clamp(30px,4.6vw,50px)] font-extrabold leading-[1.02] tracking-[-0.035em]">
              <Headline value={page.auditHeadline} />
            </h2>
            <Copy
              value={page.auditBody}
              tone="dark"
              className="mb-6.5 max-w-[640px] font-body text-base font-medium leading-[1.6] text-dark-text"
            />
            {page.auditButton && (
              <Button
                href={page.auditButton.href}
                variant="primary-on-dark"
                className="px-7.5 py-4 text-[17px]"
              >
                {page.auditButton.label}
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
