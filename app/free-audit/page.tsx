import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CenteredSectionHeader from "@/components/CenteredSectionHeader";
import Container from "@/components/Container";
import DarkCtaSection from "@/components/DarkCtaSection";
import PageHeroCentered from "@/components/PageHeroCentered";
import PerspectiveGate from "@/components/PerspectiveGate";
import SiteShell from "@/components/SiteShell";
import TitledCardGrid from "@/components/TitledCardGrid";
import FreeAuditCover from "@/components/free-audit/FreeAuditCover";
import FreeAuditFaq from "@/components/free-audit/FreeAuditFaq";
import FreeAuditForYou from "@/components/free-audit/FreeAuditForYou";
import FreeAuditProof from "@/components/free-audit/FreeAuditProof";
import { metadataFrom } from "@/lib/metadata";
import { getFreeAuditPage, getSiteSettings } from "@/sanity/lib/content";
import { PUBLISHED, type FetchOptions } from "@/sanity/lib/live";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getFreeAuditPage(PUBLISHED),
    getSiteSettings(PUBLISHED),
  ]);
  return metadataFrom({ seo: page?.seo, settings });
}

export default function FreeAuditRoute() {
  return <PerspectiveGate render={(opts) => <Content opts={opts} />} />;
}

async function Content({ opts }: { opts: FetchOptions }) {
  const page = await getFreeAuditPage(opts);
  if (!page) notFound();

  // This is a landing page: the nav drops its links so the single booking CTA
  // is the only way out.
  const navCta =
    page.navCtaLabel && page.hero?.cta
      ? { label: page.navCtaLabel, href: page.hero.cta.href }
      : page.hero?.cta;

  return (
    <SiteShell opts={opts} minimalNav navCta={navCta}>
      <PageHeroCentered
        hero={page.hero}
        className="pb-14 pt-16 md:pb-16 md:pt-20"
      />
      <FreeAuditCover page={page} />
      <FreeAuditForYou page={page} />

      <section className="bg-paper pb-3 pt-14 md:pt-16">
        <Container>
          <CenteredSectionHeader header={page.deliverablesHeader} />
          <div className="mb-12">
            <TitledCardGrid cards={page.deliverables} variant="green" />
          </div>
        </Container>
      </section>

      <FreeAuditFaq page={page} />
      <FreeAuditProof page={page} />
      <DarkCtaSection
        headline={page.ctaHeadline}
        body={page.ctaBody}
        button={page.ctaButton}
        className="bg-paper pb-14 pt-2 md:pb-16"
      />
    </SiteShell>
  );
}
