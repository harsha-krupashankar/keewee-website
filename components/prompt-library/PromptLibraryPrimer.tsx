import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import type { PromptLibraryPage } from "@/sanity/lib/types";

export default function PromptLibraryPrimer({ page }: { page: PromptLibraryPage }) {
  return (
    <section className="relative overflow-hidden border-y border-border-soft bg-surface py-14 md:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#1C1B19 1.3px, transparent 1.7px)",
          backgroundSize: "16px 16px",
        }}
      />
      <Container className="relative flex flex-col items-center">
        <Reveal className="mb-13 max-w-[800px]">
          {page.whyLabel && (
            <span className="mb-3.5 block font-mono text-xs font-bold uppercase tracking-[1.4px] text-green">
              {page.whyLabel}
            </span>
          )}
          <h2 className="mb-5 font-display text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink">
            {page.whyHeadline}
          </h2>
          <Copy
            value={page.whyBody}
            className="font-body text-base leading-[1.65] text-body"
          />
        </Reveal>

        <Reveal delay={60} className="mb-12 max-w-[800px]">
          {page.aiLabel && (
            <span className="mb-3.5 block font-mono text-xs font-bold uppercase tracking-[1.4px] text-green">
              {page.aiLabel}
            </span>
          )}
          {page.aiHeadline && (
            <h2 className="mb-2.5 font-display text-[clamp(24px,3.2vw,34px)] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink">
              {page.aiHeadline}
            </h2>
          )}
          {page.aiIntro && (
            <p className="mb-5.5 font-body text-[15px] leading-[1.6] text-body">
              {page.aiIntro}
            </p>
          )}

          {!!page.aiPlatforms?.length && (
            <div className="grid gap-3.5 sm:grid-cols-2">
              {page.aiPlatforms.map((platform) => (
                <div
                  key={platform.title}
                  className="rounded-[18px] border border-border bg-white px-6 py-5.5"
                >
                  <div className="mb-2 font-display text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                    {platform.title}
                  </div>
                  <p className="font-body text-sm leading-[1.58] text-body">
                    {platform.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Reveal>

        {(page.warningHeadline || page.warningBody) && (
          <Reveal
            delay={100}
            className="flex max-w-[800px] items-start gap-4 rounded-[18px] border border-[#E8C9BC] bg-[#F9ECE6] px-7 py-6"
          >
            <span className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px] bg-rust font-display text-base font-extrabold text-white">
              !
            </span>
            <div>
              {page.warningHeadline && (
                <div className="mb-1.5 font-display text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                  {page.warningHeadline}
                </div>
              )}
              {page.warningBody && (
                <p className="font-body text-sm leading-[1.6] text-body">
                  {page.warningBody}
                </p>
              )}
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
