import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import Headline from "@/components/sanity/Headline";
import type { HomePage } from "@/sanity/lib/types";

export default function WhoWeWorkWith({ page }: { page: HomePage }) {
  const header = page.whoHeader;

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

        <Reveal delay={60}>
          <h2 className="mb-3 max-w-[940px] font-display text-[30px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink sm:text-[40px] lg:text-[52px]">
            <Headline value={header?.headline} />
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <Copy
            value={header?.intro}
            className="mb-7 max-w-[760px] font-body text-[15px] font-medium leading-relaxed text-body"
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3">
          {page.whoSegments?.map((segment, i) => (
            <Reveal
              key={segment.title}
              delay={180 + i * 80}
              className="rounded-[18px] border border-border bg-white p-6 shadow-[0_8px_24px_rgba(28,27,25,0.04)] transition-all duration-150 hover:-translate-y-1 hover:border-[#D9C9B8] hover:shadow-[0_16px_34px_rgba(28,27,25,0.10)]"
            >
              {segment.tag && (
                <span className="rounded-full bg-surface px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-muted">
                  {segment.tag}
                </span>
              )}
              <h3 className="mb-2 mt-3.5 font-display text-xl font-bold leading-tight tracking-[-0.02em] text-ink">
                {segment.title}
              </h3>
              <p className="font-body text-sm font-medium leading-relaxed text-muted">
                {segment.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
