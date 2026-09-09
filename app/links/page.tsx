import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FeedGrid from "@/components/links/FeedGrid";
import LinksFooter from "@/components/links/LinksFooter";
import LinksProfile from "@/components/links/LinksProfile";
import PerspectiveGate from "@/components/PerspectiveGate";
import { metadataFrom } from "@/lib/metadata";
import { getLinksPage, getSiteSettings } from "@/sanity/lib/content";
import { PUBLISHED, type FetchOptions } from "@/sanity/lib/live";

/**
 * `/links` — the link-in-bio page.
 *
 * The one route that does not render `SiteShell`. A visitor lands here from a
 * tap in an Instagram bio, on a phone, wanting one destination; a nav bar with
 * dropdowns and a four-column footer are pure friction on that journey. So the
 * page is its own layout: a single column that is the whole screen on a phone
 * and a centred 520px column on desktop.
 *
 * It is also deliberately two things and no more — a header with one call to
 * action, then the post grid. Every section that once sat between them was a
 * decision standing between the visitor and the tap they came to make.
 *
 * Everything is mobile-first — the base styles are the phone, and `md:` only
 * ever adds.
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
      <div className="relative mx-auto w-full max-w-[520px]">
        <LinksProfile
          logoMark={page.logoMark}
          wordmark={page.wordmark}
          socials={settings?.socialLinks}
          cta={page.cta}
        />

        {page.feedTiles && page.feedTiles.length > 0 && (
          <section className="pt-7">
            <FeedGrid tiles={page.feedTiles} />
          </section>
        )}

        <LinksFooter links={page.footerLinks} note={page.footerNote} />
      </div>
    </main>
  );
}
