import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import Headline from "@/components/sanity/Headline";
import type { ReferralPage } from "@/sanity/lib/types";
import ReferredCompanyCopy from "./ReferredCompanyCopy";
import { CARD_TITLE, LinkButton, Sticker, WRAP } from "./shared";

/** `/referral/thank-you`: what happens next, then two ways to keep going. */
export default function ReferralThankYou({ page }: { page: ReferralPage }) {
  return (
    <div className={`${WRAP} flex flex-col gap-12 pb-24 pt-16`}>
      <Reveal eager className="flex max-w-[820px] flex-col gap-6">
        {page.thankYouSticker && (
          <div>
            <Sticker variant="green" rotate={-3}>
              {page.thankYouSticker}
            </Sticker>
          </div>
        )}
        <h1 className="font-display text-[length:clamp(44px,6.4vw,84px)] font-extrabold leading-[0.94] tracking-[-0.04em] text-ink">
          <Headline value={page.thankYouHeadline} />
        </h1>
        {page.thankYouBody && (
          <p className="font-body text-xl font-medium leading-[1.55] text-body">
            <ReferredCompanyCopy
              template={page.thankYouBody}
              fallback={page.thankYouCompanyFallback ?? ""}
            />
          </p>
        )}
        {page.thankYouNote && (
          <p className="inline-flex items-center gap-2.5 self-start rounded-full bg-green-bg px-[18px] py-3 font-body text-[15px] font-semibold leading-[1.4] text-ink">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4E7D2E"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="flex-shrink-0"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            {page.thankYouNote}
          </p>
        )}
      </Reveal>

      <div className="flex flex-wrap gap-6">
        <Reveal
          delay={80}
          className="box-border flex min-w-0 flex-[1_1_360px] flex-col items-start gap-4 rounded-[24px] bg-ink p-[clamp(28px,4vw,40px)] text-paper"
        >
          <h2 className={`text-[length:clamp(28px,3vw,36px)] leading-[1.05] text-paper ${CARD_TITLE}`}>
            <Headline value={page.anotherHeadline} />
          </h2>
          {page.anotherBody && (
            <p className="font-body text-[17px] font-medium leading-relaxed text-[#E4E0D6]">
              {page.anotherBody}
            </p>
          )}
          {page.anotherButton && (
            <div className="pt-2">
              <LinkButton
                href={page.anotherButton.href}
                openInNewTab={page.anotherButton.openInNewTab}
                variant="primary-on-dark"
                size="large"
              >
                {page.anotherButton.label}
              </LinkButton>
            </div>
          )}
        </Reveal>
        <Reveal
          delay={160}
          className="box-border flex min-w-0 flex-[1_1_360px] flex-col items-start gap-4 rounded-[24px] border-2 border-ink bg-white p-[clamp(28px,4vw,40px)] shadow-[6px_6px_0_#1C1B19]"
        >
          <h2 className={`text-[length:clamp(28px,3vw,36px)] leading-[1.05] text-ink ${CARD_TITLE}`}>
            <Headline value={page.callHeadline} />
          </h2>
          <Copy
            value={page.callBody}
            className="font-body text-[17px] font-medium leading-relaxed text-body [&_a]:text-green"
          />
        </Reveal>
      </div>
    </div>
  );
}
