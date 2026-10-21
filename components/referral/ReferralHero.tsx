import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Headline from "@/components/sanity/Headline";
import type { ReferralPage } from "@/sanity/lib/types";

import ReferralForm from "./ReferralForm";
import Sticker from "./Sticker";

/** Pitch on the left, the three-step form on the right; stacks below `lg`. */
export default function ReferralHero({ page }: { page: ReferralPage }) {
  return (
    <section className="pb-20 pt-12 md:pb-28 md:pt-18">
      <Container className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] lg:gap-20">
        <div className="flex flex-col gap-7 lg:pt-8">
          {(page.eyebrow || page.sticker) && (
            <div className="flex flex-wrap items-center gap-4">
              {page.eyebrow && (
                <span className="font-display text-xs font-bold uppercase tracking-[0.12em] text-body">
                  {page.eyebrow}
                </span>
              )}
              {page.sticker && <Sticker>{page.sticker}</Sticker>}
            </div>
          )}
          <Reveal eager y={18}>
            <h1 className="font-display text-[48px] font-extrabold leading-[0.92] tracking-[-0.04em] text-ink sm:text-[72px] lg:text-[92px]">
              <Headline value={page.headline} />
            </h1>
          </Reveal>
          {page.intro && (
            <p className="max-w-[520px] font-body text-lg font-medium leading-relaxed text-body sm:text-xl">
              {page.intro}
            </p>
          )}
          {page.note && (
            <p className="max-w-[520px] rounded-[18px] bg-green-bg px-5 py-4 font-body text-base font-medium leading-relaxed text-ink">
              {page.note}
            </p>
          )}
        </div>

        <div id="referral-form" className="scroll-mt-24">
          <ReferralForm copy={page.form} />
        </div>
      </Container>
    </section>
  );
}
