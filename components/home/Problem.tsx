import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import Headline from "@/components/sanity/Headline";
import type { HomePage } from "@/sanity/lib/types";

export default function Problem({ page }: { page: HomePage }) {
  const header = page.problemHeader;
  const lookalikes = page.lookalikes ?? [];

  return (
    <section className="py-14 md:py-16">
      <Container>
        {header?.eyebrow && (
          <Reveal className="mb-5 flex items-center gap-3">
            <span className="font-display text-[13px] font-bold uppercase tracking-[0.09em] text-rust">
              {header.eyebrow}
            </span>
            <span className="flex-1 border-b border-border-line" />
          </Reveal>
        )}

        <Reveal delay={60}>
          <h2 className="mb-7 max-w-[900px] font-display text-[32px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[42px] lg:text-[52px]">
            <Headline value={header?.headline} />
          </h2>
        </Reveal>

        <div className="grid items-stretch gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal
            delay={120}
            className="flex flex-col justify-center rounded-[18px] border border-border bg-white p-7 shadow-[0_10px_30px_rgba(28,27,25,0.05)] transition-all duration-150 hover:border-[#D9C9B8] hover:shadow-[0_16px_34px_rgba(28,27,25,0.1)] sm:p-8"
          >
            <Copy
              value={page.problemBody}
              className="font-body text-base font-medium leading-relaxed text-body"
            />
          </Reveal>

          <Reveal
            delay={200}
            className="group relative flex flex-col overflow-hidden rounded-[18px] border border-border bg-surface p-5"
          >
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "radial-gradient(#1C1B19 1.4px, transparent 1.8px)",
                backgroundSize: "14px 14px",
              }}
            />
            <div className="relative grid flex-1 grid-cols-2 gap-3">
              {lookalikes.map((m, i) => (
                <div
                  key={m}
                  className="flex flex-col gap-1.5 rounded-[11px] border border-border-soft bg-white p-3 shadow-[0_4px_12px_rgba(28,27,25,0.04)] transition-all duration-300 group-hover:opacity-70"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="h-[11px] w-[11px] rounded-[4px] bg-[#D6CEBB]" />
                    <span className="h-1.5 w-[34px] rounded-full bg-[#D6CEBB]" />
                    <span className="ml-auto h-2 w-[22px] rounded-[3px] bg-[#E4DECF]" />
                  </div>
                  <div className="font-display text-xs font-extrabold leading-tight tracking-[-0.02em] text-[#8C8577]">
                    {m}
                  </div>
                  <span className="h-1.5 w-[70%] rounded-full bg-[#E4DECF]" />
                  <span className="h-3.5 self-start rounded-[4px] bg-[#DCE7CB] px-4" />
                </div>
              ))}
            </div>
            {page.problemSticker && (
              <div className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 -rotate-3 whitespace-nowrap rounded-lg border-2 border-ink bg-white px-4 py-1.5 font-sticker text-xl text-ink shadow-[3px_3px_0_#1C1B19] transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-105">
                {page.problemSticker}
              </div>
            )}
            {page.problemCaption && (
              <div className="relative mt-3.5 text-center font-mono text-[11px] font-bold uppercase text-faint">
                {page.problemCaption}
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
