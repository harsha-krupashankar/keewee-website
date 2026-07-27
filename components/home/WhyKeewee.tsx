import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import Headline from "@/components/sanity/Headline";
import type { HomePage } from "@/sanity/lib/types";

export default function WhyKeewee({ page }: { page: HomePage }) {
  const header = page.whyHeader;

  return (
    <section className="py-14 md:py-16">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[24px] bg-ink p-8 text-paper shadow-[0_20px_48px_rgba(28,27,25,0.18)] sm:p-10">
          <div
            className="pointer-events-none absolute right-0 top-0 h-[220px] w-[280px] opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
              backgroundSize: "15px 15px",
              maskImage:
                "radial-gradient(circle at top right, #000, transparent 72%)",
              WebkitMaskImage:
                "radial-gradient(circle at top right, #000, transparent 72%)",
            }}
          />
          {header?.eyebrow && (
            <div className="relative mb-3.5 font-display text-[13px] font-bold uppercase tracking-[0.09em] text-lime">
              {header.eyebrow}
            </div>
          )}
          <div className="relative mb-2 flex flex-wrap items-baseline gap-3.5">
            <h2 className="font-display text-[28px] font-extrabold leading-none tracking-[-0.03em] sm:text-[38px] lg:text-[48px]">
              <Headline value={header?.headline} />
            </h2>
            {header?.sticker && (
              <span className="font-sticker text-xl text-lime">{header.sticker}</span>
            )}
          </div>
          <Copy
            value={header?.intro}
            tone="dark"
            className="relative mb-6 max-w-[720px] font-body text-[15px] font-medium leading-relaxed text-dark-text"
          />
          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.whyReasons?.map((reason, i) => (
              <Reveal
                key={reason.title}
                delay={i * 60}
                className="rounded-[18px] border border-dark-border bg-dark-card p-5 transition-all duration-150 hover:-translate-y-1 hover:border-lime/40 hover:bg-[#2c2b28]"
              >
                <span className="font-display text-[26px] font-extrabold tracking-[-0.03em] text-lime">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2.5 mt-1.5 font-display text-lg font-bold leading-tight tracking-[-0.02em]">
                  {reason.title}
                </h3>
                <p className="font-body text-sm font-medium leading-relaxed text-dark-text-soft">
                  {reason.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
