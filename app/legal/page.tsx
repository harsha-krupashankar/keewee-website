import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "@/components/Container";
import PerspectiveGate from "@/components/PerspectiveGate";
import SiteShell from "@/components/SiteShell";
import { formatFullDate } from "@/lib/format";
import { metadataFrom } from "@/lib/metadata";
import { getLegalDocs, getSiteSettings } from "@/sanity/lib/content";
import { PUBLISHED, type FetchOptions } from "@/sanity/lib/live";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings(PUBLISHED);
  return metadataFrom({
    settings,
    title: `Legal — ${settings?.title ?? "keewee.in"}`,
    description: "Privacy policy, terms of service, and the other fine print.",
    path: "/legal",
  });
}

export default function LegalIndexRoute() {
  return <PerspectiveGate render={(opts) => <Content opts={opts} />} />;
}

/**
 * A real index rather than a redirect to whichever document sorts first: a
 * visitor clicking "Legal" expecting an overview shouldn't land straight on
 * Terms of Service with no sign Privacy Policy exists too.
 */
async function Content({ opts }: { opts: FetchOptions }) {
  const docs = await getLegalDocs(opts);
  if (!docs.length) notFound();

  return (
    <SiteShell opts={opts}>
      <section className="relative overflow-hidden bg-ink py-14 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(#F6F4EF 1.2px, transparent 1.6px)",
            backgroundSize: "18px 18px",
          }}
        />
        <Container className="relative z-10">
          <h1 className="m-0 font-display text-[40px] font-extrabold leading-[0.98] tracking-[-0.035em] text-paper sm:text-[56px]">
            Legal
          </h1>
          <p className="mt-4 max-w-[560px] font-body text-lg font-medium leading-[1.6] text-dark-text">
            Privacy policy, terms of service, and the other fine print.
          </p>
        </Container>
      </section>

      <Container className="py-12 lg:py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {docs.map((doc) => (
            <Link
              key={doc._id}
              href={`/legal/${doc.slug}`}
              className="group flex flex-col rounded-[18px] border border-border bg-white p-7 shadow-[0_8px_24px_rgba(28,27,25,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-[#D9C9B8] hover:shadow-[0_16px_34px_rgba(28,27,25,0.10)]"
            >
              <h2 className="mb-2.5 font-display text-xl font-extrabold leading-tight tracking-[-0.02em] text-ink group-hover:text-green">
                {doc.label || doc.title}
              </h2>
              <p className="mb-4 flex-1 font-body text-[15px] font-medium leading-relaxed text-body">
                {doc.intro}
              </p>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wide text-faint">
                Last updated: {formatFullDate(doc.updatedAt)}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </SiteShell>
  );
}
