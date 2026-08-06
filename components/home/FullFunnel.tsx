"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import Headline from "@/components/sanity/Headline";
import type { HomePage } from "@/sanity/lib/types";

/** Stage numbering is positional, so reordering in the Studio never leaves gaps. */
function stageNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

export default function FullFunnel({ page }: { page: HomePage }) {
  const stages = page.funnelStages ?? [];
  const header = page.funnelHeader;

  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [progress, setProgress] = useState<number[]>(() => stages.map(() => 0));

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      const raf = requestAnimationFrame(() =>
        setProgress(rowRefs.current.map(() => 1))
      );
      return () => cancelAnimationFrame(raf);
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      const triggerY = window.innerHeight * 0.75;
      setProgress(
        rowRefs.current.map((el) => {
          if (!el) return 0;
          const rect = el.getBoundingClientRect();
          const raw = (triggerY - rect.top) / rect.height;
          return Math.min(1, Math.max(0, raw));
        })
      );
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [stages.length]);

  return (
    <section id="full-funnel" className="py-14 md:py-16">
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
          <h2 className="mb-2 max-w-[920px] font-display text-[32px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[42px] lg:text-[52px]">
            <Headline value={header?.headline} />
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <Copy
            value={header?.intro}
            className="mb-7 font-body text-base font-semibold text-body"
          />
        </Reveal>

        <div className="flex flex-col">
          {stages.map((stage, i) => {
            const p = progress[i] ?? 0;
            const reached = p > 0.02;
            const heading = (
              <h3 className="font-display text-xl font-extrabold leading-none tracking-[-0.02em] text-ink sm:text-2xl">
                {stage.title}
              </h3>
            );

            return (
              <div
                key={stage.title}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                className="flex items-stretch gap-4 sm:gap-5"
              >
                <div className="flex flex-shrink-0 flex-col items-center">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border-2 border-ink font-display text-[17px] font-extrabold shadow-[3px_3px_0_#1C1B19] transition-colors duration-300 ${
                      reached ? "bg-green text-white" : "bg-white text-ink"
                    }`}
                  >
                    {stageNumber(i)}
                  </span>
                  {i < stages.length - 1 && (
                    <span className="relative my-1.5 w-[3px] flex-1 overflow-hidden rounded-full bg-[#E1DACB]">
                      <span
                        className="absolute inset-x-0 top-0 w-full rounded-full bg-green"
                        style={{ height: `${p * 100}%` }}
                      />
                    </span>
                  )}
                </div>

                <div
                  className="mb-6 flex-1 rounded-[18px] border border-border bg-white p-6 shadow-[0_8px_24px_rgba(28,27,25,0.04)] transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-1 hover:border-[#D9C9B8] hover:shadow-[0_16px_34px_rgba(28,27,25,0.10)] sm:mb-7 sm:p-7"
                  style={{
                    opacity: 0.45 + p * 0.55,
                    transform: `translateY(${(1 - p) * 20}px) scale(${0.97 + p * 0.03})`,
                    transition:
                      "opacity 300ms ease-out, transform 150ms ease-out",
                  }}
                >
                  <div className="mb-2.5 flex flex-wrap items-baseline gap-3.5">
                    {stage.href ? (
                      <Link
                        href={`/services/${stage.href}`}
                        className="transition-colors duration-150 hover:text-green"
                      >
                        {heading}
                      </Link>
                    ) : (
                      heading
                    )}
                    {stage.tag && (
                      <span className="font-sticker text-lg text-green">{stage.tag}</span>
                    )}
                  </div>
                  <p className="mb-4 max-w-[620px] font-body text-[15px] font-medium leading-relaxed text-body">
                    {stage.description}
                  </p>
                  <div className="mb-5 h-2 max-w-[300px] overflow-hidden rounded-full bg-[#EFEAE0]">
                    <div
                      className="h-full rounded-full bg-green"
                      style={{ width: `${stage.barWidth * p}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stage.bullets?.map((bullet) => (
                      <span
                        key={bullet}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border-soft bg-surface px-3.5 py-1.5 font-body text-[13px] font-semibold text-[#40392E]"
                      >
                        <span className="font-extrabold text-green">✓</span>
                        {bullet}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {(page.funnelOutcomeSticker || page.funnelOutcomeText) && (
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-ink text-xl text-lime shadow-[3px_3px_0_#4E7D2E]">
                ✦
              </div>
              <div className="flex flex-1 flex-wrap items-center gap-3.5 rounded-[18px] bg-ink px-6.5 py-5 text-paper shadow-[0_12px_30px_rgba(28,27,25,0.16)]">
                {page.funnelOutcomeSticker && (
                  <span className="font-sticker text-2xl tracking-wide text-lime">
                    {page.funnelOutcomeSticker}
                  </span>
                )}
                {page.funnelOutcomeText && (
                  <span className="font-body text-[15px] font-semibold text-dark-text">
                    {page.funnelOutcomeText}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
