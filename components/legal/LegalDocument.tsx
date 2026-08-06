"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/Container";
import { formatFullDate } from "@/lib/format";
import type { LegalDoc } from "@/sanity/lib/types";
import LegalBlocks from "./LegalBlocks";

export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  // Section numbering and anchors are derived from position, so inserting a
  // clause in the Studio renumbers everything without touching stored ids.
  const sections = doc.sections.map((section, i) => ({
    ...section,
    no: String(i + 1).padStart(2, "0"),
    anchor: `${doc.slug}-${String(i + 1).padStart(2, "0")}`,
  }));

  const [active, setActive] = useState(sections[0]?.anchor ?? "");
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const de = document.documentElement;
        const max = de.scrollHeight - de.clientHeight;
        const p = max > 0 ? de.scrollTop / max : 0;
        if (progressRef.current) progressRef.current.style.width = `${p * 100}%`;

        const secs = Array.from(
          document.querySelectorAll<HTMLElement>("[data-legal-section]")
        );
        const y = window.scrollY + 150;
        let current: string | null = null;
        for (const el of secs) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= y) current = el.dataset.legalSection ?? null;
        }
        setActive(current ?? secs[0]?.dataset.legalSection ?? "");
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [doc.slug]);

  const updated = formatFullDate(doc.updatedAt);

  return (
    <>
      {/* reading progress */}
      <div className="sticky top-[73px] z-30 h-[3px] w-full bg-border">
        <div
          ref={progressRef}
          className="h-full w-0 bg-green transition-[width] duration-100 ease-linear"
        />
      </div>

      <header className="relative overflow-hidden bg-ink py-14 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(#F6F4EF 1.2px, transparent 1.6px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div
          className="pointer-events-none absolute -right-3 -top-10 select-none font-display text-[160px] font-extrabold leading-[0.8] tracking-tight text-transparent sm:text-[230px]"
          style={{ WebkitTextStroke: "2px rgba(246,244,239,0.09)" }}
          aria-hidden
        >
          §
        </div>
        <Container className="relative z-10">
          <div className="max-w-[760px]">
            {doc.eyebrow && (
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/[0.18] bg-white/[0.06] px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-lime-bright" />
                <span className="font-display text-xs font-bold uppercase tracking-[1.6px] text-lime-bright">
                  {doc.eyebrow}
                </span>
              </div>
            )}
            <h1 className="m-0 mb-5 font-display text-[40px] font-extrabold leading-[0.98] tracking-[-0.035em] text-paper sm:text-[64px]">
              {doc.title}
            </h1>
            <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2.5 font-mono text-xs font-bold uppercase tracking-[0.8px] text-[#8C8577]">
              {doc.entity && <span>{doc.entity}</span>}
              <span className="text-green">✱</span>
              <span>Last updated: {updated}</span>
            </div>
            <p className="m-0 max-w-[640px] font-body text-lg font-medium leading-[1.6] text-dark-text">
              {doc.intro}
            </p>
          </div>
        </Container>
      </header>

      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 overflow-clip rounded-[22px] border border-border-soft bg-paper lg:grid-cols-[264px_1fr]">
          <aside className="border-b border-border bg-surface lg:border-b-0 lg:border-r">
            <div className="px-6 py-8 lg:sticky lg:top-24 lg:px-[26px] lg:pb-10 lg:pt-9">
              <div className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[1.2px] text-faint">
                On this page
              </div>
              <nav className="flex flex-col gap-0.5">
                {sections.map((section) => (
                  <a
                    key={section.anchor}
                    href={`#${section.anchor}`}
                    className={`flex items-start gap-2.5 rounded-[9px] px-2.5 py-2 font-body text-[13.5px] font-semibold leading-tight transition-all duration-150 ${
                      section.anchor === active
                        ? "bg-ink text-paper"
                        : "text-body hover:text-green"
                    }`}
                  >
                    <span
                      className={`shrink-0 pt-px font-mono text-[11px] font-bold ${
                        section.anchor === active ? "text-lime-bright" : "text-faint"
                      }`}
                    >
                      {section.no}
                    </span>
                    <span>{section.title}</span>
                  </a>
                ))}
              </nav>
              <button
                type="button"
                onClick={() => window.print()}
                className="mt-6 inline-flex items-center gap-2 border-b-2 border-lime pb-0.5 font-display text-[13px] font-bold text-ink transition-colors hover:border-green hover:text-green"
              >
                Print this page →
              </button>
            </div>
          </aside>

          <div className="max-w-[760px] px-6 py-10 lg:px-14 lg:pb-15 lg:pt-11">
            {sections.map((section) => (
              <section
                key={section.anchor}
                id={section.anchor}
                data-legal-section={section.anchor}
                className="mb-6 scroll-mt-6 border-b border-border pb-3.5"
              >
                <div className="mb-[18px] flex items-baseline gap-3.5">
                  <span className="shrink-0 pt-1 font-mono text-[13px] font-bold text-green">
                    {section.no}
                  </span>
                  <h2 className="m-0 font-display text-2xl font-extrabold leading-tight tracking-[-0.025em] text-ink sm:text-[30px]">
                    {section.title}
                  </h2>
                </div>
                <div className="flex flex-col gap-4">
                  <LegalBlocks blocks={section.blocks} />
                </div>
              </section>
            ))}
            <p className="mt-2 font-mono text-[11px] font-bold uppercase tracking-[0.8px] text-faint">
              End of document ✱ Last updated: {updated}
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
