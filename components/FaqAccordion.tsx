"use client";

import { useId, useState } from "react";
import Reveal from "./Reveal";
import Copy from "./sanity/Copy";
import type { FaqItem } from "@/sanity/lib/types";

/**
 * One accordion used by every FAQ on the site.
 *
 * `card` gives each question its own bordered panel (home page, FAQ page);
 * `flush` stacks them with hairline rules inside an existing surface (free audit,
 * service pages). Keeping both here means the open/close behaviour and the
 * `aria-expanded` wiring only exist once.
 */
export default function FaqAccordion({
  items,
  variant = "card",
  defaultOpen = 0,
  animate = true,
}: {
  items: FaqItem[];
  variant?: "card" | "flush";
  /** Index open on first paint. Pass -1 for all closed. */
  defaultOpen?: number;
  animate?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const baseId = useId();

  if (!items?.length) return null;

  if (variant === "flush") {
    return (
      <div className="flex flex-col">
        {items.map((item, i) => {
          const open = openIndex === i;
          const panelId = `${baseId}-panel-${i}`;
          return (
            <div key={item.question} className={i > 0 ? "border-t border-[#E0DACC]" : ""}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : i)}
                aria-expanded={open}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-extrabold leading-tight tracking-[-0.02em] text-ink transition-colors duration-150 hover:text-green focus-visible:rounded-lg focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-2 focus-visible:outline-lime-bright sm:text-xl"
              >
                {item.question}
                <span
                  className="flex-shrink-0 font-sticker text-2xl leading-none text-green transition-transform duration-300 ease-out"
                  style={{ transform: open ? "rotate(135deg)" : "rotate(0deg)" }}
                >
                  +
                </span>
              </button>
              <div
                id={panelId}
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <Copy
                    value={item.answer}
                    className="max-w-[820px] pb-5 font-body text-[15px] font-medium leading-relaxed text-body"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const open = openIndex === i;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <Reveal
            key={item.question}
            delay={animate ? 120 + i * 40 : 0}
            className={`overflow-hidden rounded-[18px] border bg-white shadow-[0_6px_20px_rgba(28,27,25,0.03)] transition-colors duration-200 ${
              open ? "border-[#D9C9B8]" : "border-border"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : i)}
              aria-expanded={open}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-left font-display text-lg font-bold leading-tight tracking-[-0.02em] text-ink transition-colors duration-150 hover:text-green focus-visible:rounded-xl focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-[3px] focus-visible:outline-lime-bright sm:text-xl"
            >
              {item.question}
              <span
                className="flex-shrink-0 font-sticker text-2xl leading-none text-green transition-transform duration-300 ease-out"
                style={{ transform: open ? "rotate(135deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>
            <div
              id={panelId}
              className="grid transition-[grid-template-rows] duration-300 ease-in-out"
              style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <Copy
                  value={item.answer}
                  className="border-t border-[#EFEAE0] px-6 pb-5 pt-4 font-body text-[15px] font-medium leading-relaxed text-body"
                />
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
