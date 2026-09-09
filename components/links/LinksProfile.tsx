import LogoMark from "@/components/LogoMark";
import { SocialGlyph, socialLabel } from "@/components/SocialIcons";
import type { Link as LinkValue, SocialLink } from "@/sanity/lib/types";

import { Arrow, SafeLink } from "./shared";

/** The brand. Fixed, and set beside the same mark the site header draws. */
const WORDMARK = "keewee.in";

/**
 * The whole header: wordmark, social row, one call to action.
 *
 * The wordmark is hardcoded, and the mark comes from the shared `LogoMark`.
 * Neither is content: they are the identity of the site, they have not changed,
 * and putting a brand behind an editable field only buys the chance to get it
 * wrong. This is the one exception on the page — everything else is Sanity.
 *
 * The social links come straight from Site settings — the same list the site
 * footer renders — so there is one place to add or change a profile, and the
 * two can never drift apart. The marks are shared too
 * (`components/SocialIcons.tsx`); only the chip around them differs, a 44px
 * rounded square here against the footer's circle.
 *
 * Nothing else lives up here. A visitor arriving from a bio tap is one tap from
 * the thing they came for, and a bio line or a second button is a decision
 * standing between them and it.
 */
export default function LinksProfile({
  socials,
  cta,
}: {
  socials?: SocialLink[] | null;
  cta?: LinkValue | null;
}) {
  const hasSocials = Boolean(socials?.length);

  return (
    <header className="px-5 pt-7 md:pt-14">
      <div className="flex items-center gap-4 md:justify-between">
        <h1 className="flex items-baseline gap-2.5 font-display text-[33px] leading-none font-extrabold tracking-[-0.03em] text-ink md:text-[37px]">
          <LogoMark className="text-green" />
          {WORDMARK}
        </h1>

        {hasSocials && (
          <nav aria-label="Social profiles" className="hidden gap-2 md:flex">
            {socials!.map((social) => (
              <SocialChip
                key={`${social.href}-${social.platform}`}
                social={social}
                className="w-11"
              />
            ))}
          </nav>
        )}
      </div>

      {hasSocials && (
        <nav aria-label="Social profiles" className="mt-4 flex gap-2 md:hidden">
          {socials!.map((social) => (
            <SocialChip
              key={`${social.href}-${social.platform}`}
              social={social}
              className="flex-1"
            />
          ))}
        </nav>
      )}

      {cta && (
        <SafeLink
          href={cta.href}
          openInNewTab={cta.openInNewTab}
          className="mt-5 flex min-h-[56px] items-center justify-center gap-2 rounded-xl bg-green px-[18px] py-3 font-display text-[17px] font-bold text-paper shadow-[3px_3px_0_#1C1B19] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-green-dark hover:shadow-[1px_1px_0_#1C1B19] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-[3px]"
        >
          {cta.label}
          <Arrow />
        </SafeLink>
      )}
    </header>
  );
}

function SocialChip({
  social,
  className,
}: {
  social: SocialLink;
  className: string;
}) {
  const label = socialLabel(social.platform);

  return (
    <SafeLink
      href={social.href}
      openInNewTab
      aria-label={label}
      title={label}
      className={`flex h-11 items-center justify-center rounded-xl border border-border-line bg-paper text-ink transition-colors hover:border-green hover:bg-surface hover:text-green focus-visible:border-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-bright focus-visible:outline-offset-2 ${className}`}
    >
      <SocialGlyph platform={social.platform} className="size-[19px]" />
    </SafeLink>
  );
}
