import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DarkCtaSection from "@/components/DarkCtaSection";
import PerspectiveGate from "@/components/PerspectiveGate";
import SiteShell from "@/components/SiteShell";
import BlogArchive from "@/components/blog/BlogArchive";
import BlogHero from "@/components/blog/BlogHero";
import BlogNewsletterBanner from "@/components/blog/BlogNewsletterBanner";
import BlogTopReads from "@/components/blog/BlogTopReads";
import { metadataFrom } from "@/lib/metadata";
import { getBlogIndex, getSiteSettings } from "@/sanity/lib/content";
import { PUBLISHED, type FetchOptions } from "@/sanity/lib/live";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getBlogIndex(PUBLISHED),
    getSiteSettings(PUBLISHED),
  ]);
  return metadataFrom({ seo: page?.seo, settings, path: "/blog" });
}

export default function BlogRoute() {
  return <PerspectiveGate render={(opts) => <Content opts={opts} />} />;
}

async function Content({ opts }: { opts: FetchOptions }) {
  const page = await getBlogIndex(opts);
  if (!page) notFound();

  return (
    <SiteShell opts={opts}>
      <BlogHero hero={page.hero} />
      <BlogTopReads header={page.topReadsHeader} posts={page.topReads} />
      <BlogNewsletterBanner page={page} />
      <BlogArchive
        header={page.archiveHeader}
        posts={page.posts}
        categories={page.categories}
      />
      <DarkCtaSection
        headline={page.ctaHeadline}
        body={page.ctaBody}
        buttons={page.ctaButtons}
        className="pb-16 pt-2 sm:pb-20"
      />
    </SiteShell>
  );
}
