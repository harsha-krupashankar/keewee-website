"use client";

import { useState } from "react";
import Container from "./Container";
import { faqs } from "@/lib/data";
import Reveal from "./Reveal";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-14 md:py-16">
      <Container>
        <Reveal className="mb-5 flex items-center gap-3">
          <span className="font-display text-[13px] font-bold uppercase tracking-[0.09em] text-green">
            FAQ
          </span>
          <span className="flex-1 border-b border-border-line" />
        </Reveal>

        <Reveal delay={60} className="mb-6 flex flex-wrap items-baseline gap-3.5">
          <h2 className="font-display text-[32px] font-extrabold leading-none tracking-[-0.035em] text-ink sm:text-[42px] lg:text-[52px]">
            Got questions?
          </h2>
          <span className="font-sticker text-2xl text-green">
            We have the answers.
          </span>
        </Reveal>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const open = openIndex === i;
            return (
              <Reveal
                key={f.q}
                delay={120 + i * 40}
                className={`overflow-hidden rounded-[18px] border bg-white shadow-[0_6px_20px_rgba(28,27,25,0.03)] transition-colors duration-200 ${
                  open ? "border-[#D9C9B8]" : "border-border"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-left font-display text-lg font-bold leading-tight tracking-[-0.02em] text-ink transition-colors duration-150 hover:text-green focus-visible:rounded-xl focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-[3px] focus-visible:outline-lime-bright sm:text-xl"
                >
                  {f.q}
                  <span
                    className="flex-shrink-0 font-sticker text-2xl leading-none text-green transition-transform duration-300 ease-out"
                    style={{ transform: open ? "rotate(135deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[#EFEAE0] px-6 pb-5 pt-4 font-body text-[15px] font-medium leading-relaxed text-body">
                      {f.a}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
