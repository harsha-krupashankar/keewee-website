"use client";

import { useState } from "react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function NewsletterHero() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section className="relative overflow-hidden bg-paper pb-16 pt-14 md:pb-[64px] md:pt-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: "radial-gradient(#1C1B19 1.3px, transparent 1.7px)",
          backgroundSize: "17px 17px",
        }}
      />
      <svg
        className="pointer-events-none absolute bottom-5 right-[60px] hidden rotate-6 select-none lg:block"
        width="170"
        height="170"
        viewBox="0 0 240 240"
        fill="none"
        aria-hidden
      >
        <rect x="40" y="44" width="160" height="152" rx="6" stroke="#E1DACB" strokeWidth="3" />
        <path d="M56 68h128" stroke="#E1DACB" strokeWidth="6" strokeLinecap="round" />
        <path d="M56 84h128" stroke="#E1DACB" strokeWidth="2" strokeLinecap="round" />
        <rect x="56" y="98" width="50" height="44" rx="2" stroke="#E1DACB" strokeWidth="3" />
        <path
          d="M118 100h66M118 112h66M118 124h66M118 136h48"
          stroke="#E1DACB"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M56 154h128M56 166h128M56 178h90" stroke="#E1DACB" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <Container className="relative z-[2]">
        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal className="mb-5.5 inline-flex items-center gap-2.5 rounded-full border border-border bg-white px-4 py-1.5 shadow-[0_6px_18px_rgba(28,27,25,0.05)]">
              <span className="h-2 w-2 rounded-full bg-green" />
              <span className="font-display text-xs font-bold uppercase tracking-[0.1em] text-green">
                Newsletter
              </span>
            </Reveal>

            <Reveal delay={80} y={18}>
              <h1 className="mb-5.5 max-w-[640px] font-display text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink text-pretty sm:text-[46px] lg:text-[52px]">
                Subscribe to Keewee Club, marketing tips for B2B SaaS, every{" "}
                <span className="relative inline-block">
                  <span className="absolute -bottom-1.5 left-[-6px] right-[-8px] h-[34%] -rotate-1 rounded-sm bg-lime" />
                  <span className="relative">Thursday</span>
                </span>
                .
              </h1>
            </Reveal>

            <Reveal delay={160} y={18}>
              <p className="max-w-[520px] font-body text-lg font-medium leading-relaxed text-body">
                One tactic we used this quarter, what&apos;s happening in B2B
                SaaS this week, and one thing worth stealing before your
                competitors find it. Five minutes, once a week.
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={120}
            id="subscribe-form"
            className="scroll-mt-6 rounded-[18px] border border-border bg-white p-7.5 pb-6.5 shadow-[0_16px_40px_rgba(28,27,25,0.08)]"
          >
            {subscribed ? (
              <div className="flex flex-col items-start gap-1.5">
                <span className="font-sticker text-2xl text-green">
                  You&apos;re in!
                </span>
                <p className="font-body text-[15px] font-medium leading-relaxed text-body">
                  First issue lands this Thursday. Check your inbox.
                </p>
              </div>
            ) : (
              <form
                className="flex flex-col gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSubscribed(true);
                }}
              >
                <label className="font-display text-[15px] font-extrabold tracking-[-0.01em] text-ink">
                  Get the next issue
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-[10px] border border-border-soft bg-paper px-3.5 py-3.5 font-body text-[15px] font-medium text-ink outline-none placeholder:text-faint focus:border-green focus:shadow-[0_0_0_3px_rgba(198,240,0,0.35)]"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-green px-5.5 py-3.5 font-display text-base font-bold text-white shadow-[3px_3px_0_#1C1B19] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#1C1B19] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-[3px]"
                >
                  Subscribe now
                </button>
                <p className="mt-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-faint">
                  Free. One email a week. Leave whenever you want.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
