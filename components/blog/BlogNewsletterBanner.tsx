"use client";

import { useState } from "react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function BlogNewsletterBanner() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section className="pb-12 sm:pb-14">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl bg-ink px-8 py-11 text-paper shadow-[0_20px_48px_rgba(28,27,25,0.2)] sm:px-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative z-[2] grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="font-display text-[13px] font-bold uppercase tracking-[0.09em] text-lime">
                Stay in the loop
              </span>
              <h2 className="my-3.5 font-display text-[28px] font-extrabold leading-[1.06] tracking-[-0.03em] sm:text-4xl lg:text-[42px]">
                No roundups and recycled takes.
              </h2>
              <p className="mb-3.5 font-sticker text-lg text-lime">
                One newsletter every week.
              </p>
              <p className="max-w-[460px] font-body text-[15px] font-medium leading-relaxed text-dark-text">
                What&apos;s actually working in B2B SaaS marketing right now,
                frameworks we&apos;re using with clients, and the occasional
                unpopular opinion. No filler, no sponsored content, no
                AI-generated summaries of things you already know.
              </p>
            </div>

            <div>
              {subscribed ? (
                <div className="rounded-2xl border border-dark-border bg-dark-card p-6 text-center">
                  <div className="mb-2 font-sticker text-2xl text-lime">
                    You&apos;re in!
                  </div>
                  <p className="font-body text-sm font-medium text-dark-text-soft">
                    First issue lands next week.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubscribed(true);
                  }}
                >
                  <div className="mb-3 flex gap-2.5">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@workemail.com"
                      className="flex-1 rounded-xl border border-dark-border bg-dark-card px-4 py-3.5 font-body text-[15px] text-paper outline-none placeholder:text-faint focus:border-lime focus:shadow-[0_0_0_3px_rgba(198,240,0,0.25)]"
                    />
                    <button
                      type="submit"
                      className="whitespace-nowrap rounded-xl bg-green px-6.5 py-3.5 font-display text-[15px] font-bold text-white shadow-[3px_3px_0_rgba(0,0,0,0.5)] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-[3px]"
                    >
                      Subscribe
                    </button>
                  </div>
                  <p className="font-body text-[12.5px] font-medium text-faint">
                    Read by B2B SaaS founders and marketing teams. Unsubscribe
                    anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
