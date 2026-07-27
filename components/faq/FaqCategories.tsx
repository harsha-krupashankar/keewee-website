"use client";

import { useState } from "react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { faqCategories } from "@/lib/faq-data";

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

export default function FaqCategories() {
  const [openKey, setOpenKey] = useState<string | null>("0-0");

  return (
    <>
      {faqCategories.map((cat, ci) => (
        <section key={cat.id} id={cat.id} className="scroll-mt-[130px] py-10 md:py-12">
          <Container>
            <Reveal className="mb-5 flex items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-[1.2px] text-green">
                {pad(ci + 1)}
              </span>
              <span className="flex-1 border-b border-border-line" />
            </Reveal>

            <Reveal delay={40} className="mb-6">
              <h2 className="font-display text-[26px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[34px]">
                {cat.title}
              </h2>
            </Reveal>

            <div className="flex flex-col gap-3">
              {cat.items.map((item, qi) => {
                const key = `${ci}-${qi}`;
                const open = openKey === key;
                return (
                  <Reveal
                    key={item.q}
                    delay={80 + qi * 30}
                    className={`overflow-hidden rounded-[18px] border bg-white shadow-[0_6px_20px_rgba(28,27,25,0.03)] transition-colors duration-200 ${
                      open ? "border-[#D9C9B8]" : "border-border"
                    }`}
                  >
                    <button
                      onClick={() => setOpenKey(open ? null : key)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-4 px-5.5 py-4.5 text-left font-display text-[17px] font-bold leading-tight tracking-[-0.015em] text-ink transition-colors duration-150 hover:text-green focus-visible:rounded-xl focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-[3px] focus-visible:outline-lime-bright sm:text-[18px]"
                    >
                      {item.q}
                      <span className="flex-shrink-0 font-sticker text-2xl leading-none text-green">
                        {open ? "–" : "+"}
                      </span>
                    </button>
                    {open && (
                      <div className="border-t border-[#EFEAE0] px-5.5 pb-5 pt-4 font-body text-[15px] font-medium leading-relaxed text-body">
                        {item.a}
                      </div>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
