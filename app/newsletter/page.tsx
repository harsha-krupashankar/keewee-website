import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CenteredSectionHeader from "@/components/CenteredSectionHeader";
import Container from "@/components/Container";
import DarkCtaSection from "@/components/DarkCtaSection";
import PerspectiveGate from "@/components/PerspectiveGate";
import SiteShell from "@/components/SiteShell";
import TitledCardGrid from "@/components/TitledCardGrid";
import NewsletterAfterHours from "@/components/newsletter/NewsletterAfterHours";
import NewsletterHero from "@/components/newsletter/NewsletterHero";
import { metadataFrom } from "@/lib/metadata";
import { getNewsletterPage, getSiteSettings } from "@/sanity/lib/content";
import { PUBLISHED, type FetchOptions } from "@/sanity/lib/live";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getNewsletterPage(PUBLISHED),
    getSiteSettings(PUBLISHED),
  ]);
  return metadataFrom({ seo: page?.seo, settings, path: "/newsletter" });
}

export default function NewsletterRoute() {
  return <PerspectiveGate render={(opts) => <Content opts={opts} />} />;
}

async function Content({ opts }: { opts: FetchOptions }) {
  const page = await getNewsletterPage(opts);
  if (!page) notFound();

  return (
    <SiteShell opts={opts}>
      <NewsletterHero page={page} />

      <section className="relative overflow-hidden border-y border-border-soft bg-surface py-14 md:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(#1C1B19 1.3px, transparent 1.7px)",
            backgroundSize: "16px 16px",
          }}
        />
        <Container className="relative">
          <CenteredSectionHeader
            header={page.whyHeader}
            className="mx-auto mb-9 max-w-[640px] text-center"
          />
          <TitledCardGrid
            cards={page.whyReasons}
            variant="numbered"
            columns="sm:grid-cols-3"
          />
        </Container>
      </section>

      <section className="py-14 md:py-16">
        <Container>
          <CenteredSectionHeader header={page.insideHeader} />
          <TitledCardGrid cards={page.insideItems} variant="green" />
        </Container>
      </section>

      <NewsletterAfterHours page={page} />

      <DarkCtaSection
        eyebrow={page.ctaEyebrow}
        headline={page.ctaHeadline}
        body={page.ctaBody}
        button={page.ctaButton}
        secondaryLabel={page.ctaSecondaryLabel}
        secondaryHref="#subscribe-form"
        className="py-14 md:py-16"
        showAsterisk
      />
    </SiteShell>
  );
}
