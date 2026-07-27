import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import type { AboutPage } from "@/sanity/lib/types";

export default function AboutWhatWeAre({ page }: { page: AboutPage }) {
  return (
    <section className="py-14 md:py-16">
      <Container>
        {page.whatWeAreEyebrow && (
          <Reveal className="mb-7">
            <span className="mb-3.5 block font-mono text-xs font-bold uppercase tracking-[1.4px] text-green">
              {page.whatWeAreEyebrow}
            </span>
          </Reveal>
        )}

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="rounded-[18px] border border-border bg-white p-7.5 shadow-[0_10px_30px_rgba(28,27,25,0.05)] sm:p-8">
            <Copy
              value={page.whatWeAreBody}
              className="font-body text-base font-medium leading-relaxed text-body"
            />
          </Reveal>

          <Reveal
            delay={80}
            className="relative overflow-hidden rounded-[18px] bg-ink p-7.5 text-paper shadow-[0_16px_40px_rgba(28,27,25,0.18)] sm:p-8"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
                backgroundSize: "15px 15px",
              }}
            />
            {page.missionEyebrow && (
              <div className="relative mb-3 font-mono text-[11px] font-bold uppercase tracking-[1.2px] text-lime">
                {page.missionEyebrow}
              </div>
            )}
            {page.missionStatement && (
              <p className="relative font-display text-[20px] font-bold leading-[1.35] tracking-[-0.015em] text-paper sm:text-[23px]">
                {page.missionStatement}
              </p>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
