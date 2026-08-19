import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DarkCtaSection from "@/components/DarkCtaSection";
import PageHeroCentered from "@/components/PageHeroCentered";
import PerspectiveGate from "@/components/PerspectiveGate";
import SiteShell from "@/components/SiteShell";
import FaqGroups from "@/components/faq/FaqGroups";
import { richTextToPlainText } from "@/lib/format";
import { metadataFrom } from "@/lib/metadata";
import { getFaqPage, getSiteSettings } from "@/sanity/lib/content";
import { PUBLISHED, type FetchOptions } from "@/sanity/lib/live";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getFaqPage(PUBLISHED),
    getSiteSettings(PUBLISHED),
  ]);
  return metadataFrom({ seo: page?.seo, settings, path: "/faq" });
}

export default function FaqRoute() {
  return <PerspectiveGate render={(opts) => <Content opts={opts} />} />;
}

async function Content({ opts }: { opts: FetchOptions }) {
  const page = await getFaqPage(opts);
  if (!page) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (page.groups ?? []).flatMap((group) =>
      (group.items ?? []).map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: richTextToPlainText(item.answer),
        },
      })),
    ),
  };

  return (
    <SiteShell opts={opts}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PageHeroCentered hero={page.hero} watermark="?" />
      <FaqGroups groups={page.groups} />
      <DarkCtaSection
        headline={page.ctaHeadline}
        body={page.ctaBody}
        buttons={page.ctaButtons}
        className="py-12 md:pb-16 md:pt-14"
      />
    </SiteShell>
  );
}
