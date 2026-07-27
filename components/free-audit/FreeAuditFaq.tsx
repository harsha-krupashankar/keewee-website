"use client";

import { useState } from "react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { freeAuditFaqs } from "@/lib/free-audit-data";

export default function FreeAuditFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-paper pb-14 pt-3.5 md:pb-16">
      <Container>
        <Reveal className="rounded-[24px] border border-border-soft bg-surface p-8 sm:p-10">
          <span className="mb-3.5 block font-mono text-xs font-bold uppercase tracking-[1.4px] text-green">
            {"// Since you're wondering"}
          </span>
          <h2 className="mb-6.5 font-display text-[26px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink sm:text-[38px]">
            Questions we already know you have.
          </h2>
          <div className="flex flex-col">
            {freeAuditFaqs.map((f, i) => {
              const open = openIndex === i;
              return (
                <div
                  key={f.q}
                  className={i > 0 ? "border-t border-[#E0DACC]" : ""}
                >
                  <button
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-extrabold leading-tight tracking-[-0.02em] text-ink transition-colors duration-150 hover:text-green focus-visible:rounded-lg focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-2 focus-visible:outline-lime-bright sm:text-xl"
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
                      <p className="max-w-[820px] pb-5 font-body text-[15px] font-medium leading-relaxed text-body">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
