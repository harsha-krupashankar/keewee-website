import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import Headline from "@/components/sanity/Headline";
import type { NewsletterPage } from "@/sanity/lib/types";

export default function NewsletterAfterHours({ page }: { page: NewsletterPage }) {
  const header = page.afterHoursHeader;
  if (!header && !page.afterHoursBody) return null;

  return (
    <section className="relative overflow-hidden bg-green py-14 text-paper md:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
          backgroundSize: "16px 16px",
        }}
      />
      <Container className="relative z-[2] max-w-[720px]">
        {header?.eyebrow && (
          <Reveal className="mb-3.5 font-mono text-xs font-bold uppercase tracking-[1.4px] text-lime">
            {header.eyebrow}
          </Reveal>
        )}
        <Reveal delay={60}>
          <h2 className="mb-5.5 font-display text-[28px] font-extrabold leading-[1.06] tracking-[-0.03em] text-paper sm:text-[36px] lg:text-[42px]">
            <Headline value={header?.headline} />
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <Copy
            value={page.afterHoursBody}
            tone="dark"
            className="font-body text-base font-medium leading-relaxed text-[#E6F0DB]"
          />
        </Reveal>
      </Container>
    </section>
  );
}
