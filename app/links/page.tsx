import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BannerStrip from "@/components/links/BannerStrip";
import FeaturedCard from "@/components/links/FeaturedCard";
import FeedGrid from "@/components/links/FeedGrid";
import LinkButtons from "@/components/links/LinkButtons";
import LinksFooter from "@/components/links/LinksFooter";
import LinksGround from "@/components/links/LinksGround";
import LinksProfile from "@/components/links/LinksProfile";
import StickyBar from "@/components/links/StickyBar";
import { SectionLabel } from "@/components/links/shared";
import PerspectiveGate from "@/components/PerspectiveGate";
import { metadataFrom } from "@/lib/metadata";
import { getLinksPage, getSiteSettings } from "@/sanity/lib/content";
import { PUBLISHED, type FetchOptions } from "@/sanity/lib/live";

/**
 * `/links` — the link-in-bio page.
 *
 * The one route that does not render `SiteShell`. A visitor lands here from a
 * tap in an Instagram bio, on a phone, wanting one of maybe twenty
 * destinations; a nav bar with dropdowns and a four-column footer are pure
 * friction on that journey. So the page is its own layout: a single column that
 * is the whole screen on a phone and a centred 520px column on desktop, with
 * scenery rather than chrome around it.
 *
 * Everything is mobile-first — the base styles are the phone, and `md:` only
 * ever adds. `LinksGround` is the one piece that exists solely for wide screens.
 */
export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getLinksPage(PUBLISHED),
    getSiteSettings(PUBLISHED),
  ]);
  // Kept out of search for now, and out of `app/sitemap.ts` to match.
  //
  // Deliberately *not* disallowed in `app/robots.ts`: a crawler blocked from
  // fetching the page never sees this tag, and the URL can still be indexed
  // bare from an external link. Letting it crawl and read `noindex` is what
  // actually keeps it out.
  return metadataFrom({
    seo: { ...page?.seo, noIndex: true },
    settings,
    path: "/links",
  });
}

export default function LinksRoute() {
  return <PerspectiveGate render={(opts) => <Content opts={opts} />} />;
}

async function Content({ opts }: { opts: FetchOptions }) {
  // Site settings is read only for the social profiles, so the row here and the
  // one in the site footer are the same list. None of the chrome comes with it.
  const [page, settings] = await Promise.all([
    getLinksPage(opts),
    getSiteSettings(opts),
  ]);
  if (!page) notFound();

  return (
    <main id="main-content" className="min-h-screen bg-cream pb-2">
      <LinksGround
        eyebrow={page.railEyebrow}
        headline={page.railHeadline}
        body={page.railBody}
        note={page.railNote}
        sticker={page.sticker}
      />

      <div className="relative mx-auto w-full max-w-[520px]">
        <LinksProfile
          logoMark={page.logoMark}
          wordmark={page.wordmark}
          bio={page.bio}
          socials={settings?.socialLinks}
        />

        <StickyBar
          logoMark={page.logoMark}
          wordmark={page.wordmark}
          cta={page.stickyCta}
        />

        {page.featured && (
          <section className="pt-6">
            {page.featuredLabel && (
              <div className="px-5 pb-3">
                <SectionLabel>{page.featuredLabel}</SectionLabel>
              </div>
            )}
            <FeaturedCard card={page.featured} />
          </section>
        )}

        {page.banners && page.banners.length > 0 && (
          <section className="pt-6">
            {page.bannersLabel && (
              <div className="px-5 pb-3">
                <SectionLabel
                  tone="clay"
                  trailing={
                    page.bannersSwipeHint && page.banners.length > 1 ? (
                      <span
                        aria-hidden
                        className="font-body text-[10px] font-bold tracking-[0.1em] text-faint uppercase md:hidden"
                      >
                        {page.bannersSwipeHint} →
                      </span>
                    ) : undefined
                  }
                >
                  {page.bannersLabel}
                </SectionLabel>
              </div>
            )}
            <BannerStrip banners={page.banners} />
          </section>
        )}

        {page.buttons && page.buttons.length > 0 && (
          <section className="pt-6">
            {page.buttonsLabel && (
              <div className="px-5 pb-3">
                <SectionLabel>{page.buttonsLabel}</SectionLabel>
              </div>
            )}
            <LinkButtons buttons={page.buttons} />
          </section>
        )}

        {page.feedTiles && page.feedTiles.length > 0 && (
          <section className="pt-6">
            {page.feedLabel && (
              <div className="px-5 pb-3">
                <SectionLabel
                  trailing={
                    page.feedHandle ? (
                      <span className="font-body text-[11px] font-semibold text-green">
                        {page.feedHandle}
                      </span>
                    ) : undefined
                  }
                >
                  {page.feedLabel}
                </SectionLabel>
              </div>
            )}
            <FeedGrid
              tiles={page.feedTiles}
              initialCount={page.feedInitialCount}
              moreLabel={page.feedMoreLabel}
              sheetHint={page.sheetHint}
            />
          </section>
        )}

        <LinksFooter links={page.footerLinks} note={page.footerNote} />
      </div>
    </main>
  );
}
