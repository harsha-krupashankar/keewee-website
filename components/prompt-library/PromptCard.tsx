"use client";

import { useEffect, useRef, useState } from "react";

import Reveal from "@/components/Reveal";
import type { PromptEntry } from "@/sanity/lib/types";

export default function PromptCard({
  num,
  prompt,
  delay = 0,
}: {
  num: string;
  prompt: PromptEntry;
  delay?: number;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  function copy(e: React.MouseEvent) {
    e.stopPropagation();
    navigator.clipboard?.writeText(prompt.promptText).catch(() => {});
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Reveal
      delay={delay}
      className={`overflow-hidden rounded-[18px] border bg-white shadow-[0_8px_24px_rgba(28,27,25,0.04)] transition-colors duration-150 ${
        open ? "border-[#D9C9B8]" : "border-border"
      }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start gap-4 px-6.5 py-6 text-left focus-visible:rounded-[18px] focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-[3px] focus-visible:outline-lime-bright"
      >
        <span className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-[10px] border-2 border-ink bg-green font-display text-sm font-extrabold text-white shadow-[2px_2px_0_#1C1B19]">
          {num}
        </span>
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
            <h3 className="font-display text-xl font-extrabold leading-tight tracking-[-0.02em] text-ink">
              {prompt.title}
            </h3>
            {prompt.bestTool && (
              <span className="whitespace-nowrap rounded-full border border-green-border bg-green-bg px-3 py-0.5 font-body text-xs font-semibold text-green-dark">
                {prompt.bestTool}
              </span>
            )}
          </div>
          <p className="font-body text-sm leading-[1.55] text-body">{prompt.useCase}</p>
        </div>
        <span
          className="mt-1 flex-shrink-0 text-lg text-faint transition-transform duration-200"
          aria-hidden
        >
          {open ? "−" : "+"}
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-dashed border-border-soft px-6.5 pb-6.5 pt-5">
            <div className="mb-3.5 flex items-center justify-between gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-[1px] text-green">
                The prompt:
              </span>
              <button
                onClick={copy}
                className="rounded-[10px] bg-green px-4.5 py-2 font-display text-[13px] font-bold text-white shadow-[2px_2px_0_#1C1B19] transition-all duration-150 hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_#1C1B19]"
              >
                {copied ? "✓ Copied!" : "Copy prompt"}
              </button>
            </div>
            <div className="whitespace-pre-line rounded-[14px] border border-border-soft bg-surface px-6 py-5.5 font-body text-sm font-medium leading-[1.72] text-ink">
              {prompt.promptText}
            </div>
            {prompt.tip && (
              <div className="mt-3.5 flex gap-3 rounded-[14px] border border-green-border bg-green-bg px-5 py-4">
                <span className="flex-shrink-0 whitespace-nowrap font-display text-[13px] font-extrabold text-green-dark">
                  Keewee tip:
                </span>
                <span className="font-body text-sm leading-[1.6] text-green-deep">
                  {prompt.tip}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
