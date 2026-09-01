import { SocialGlyph, socialLabel } from "@/components/SocialIcons";
import type { SocialLink } from "@/sanity/lib/types";

import { SafeLink } from "./shared";

/**
 * Wordmark, bio and social row.
 *
 * The links come straight from Site settings — the same list the site footer
 * renders — so there is one place to add or change a profile, and the two can
 * never drift apart. The marks are shared too (`components/SocialIcons.tsx`);
 * only the chip around them differs, a 44px rounded square here against the
 * footer's circle.
 */
export default function LinksProfile({
  logoMark,
  wordmark,
  bio,
  socials,
}: {
  logoMark?: string | null;
  wordmark: string;
  bio: string;
  socials?: SocialLink[] | null;
}) {
  const hasSocials = Boolean(socials?.length);

  return (
    <header className="px-5 pt-7 md:pt-14">
      <div className="flex items-center gap-4 md:justify-between">
        <h1 className="flex items-baseline gap-2.5 font-display text-[33px] leading-none font-extrabold tracking-[-0.03em] text-ink md:text-[37px]">
          {logoMark && (
            <span aria-hidden className="text-green">
              {logoMark}
            </span>
          )}
          {wordmark}
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

      <p className="mt-3.5 max-w-[46ch] font-body text-base leading-[1.55] font-medium text-pretty text-body md:mt-4 md:text-[17px]">
        {bio}
      </p>

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
