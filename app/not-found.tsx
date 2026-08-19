import Link from "next/link";

import Button from "@/components/Button";
import Container from "@/components/Container";
import PerspectiveGate from "@/components/PerspectiveGate";
import SiteShell from "@/components/SiteShell";
import { getSiteSettings } from "@/sanity/lib/content";
import type { FetchOptions } from "@/sanity/lib/live";

export default function NotFound() {
  return <PerspectiveGate render={(opts) => <Content opts={opts} />} />;
}

async function Content({ opts }: { opts: FetchOptions }) {
  const settings = await getSiteSettings(opts);

  const links = [
    { href: "/blog", label: "Blog" },
    { href: "/services", label: "Services" },
    { href: "/free-audit", label: "Free audit" },
    { href: "/faq", label: "FAQs" },
  ];

  return (
    <SiteShell opts={opts}>
      <section className="relative overflow-hidden bg-paper py-20 md:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: "radial-gradient(#1C1B19 1.3px, transparent 1.7px)",
            backgroundSize: "17px 17px",
          }}
        />
        <Container className="relative z-[2]">
          <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
            <span className="mb-5 font-display text-[15px] font-extrabold uppercase tracking-[0.09em] text-green">
              404
            </span>
            <h1 className="mb-5 font-display text-[38px] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink text-pretty sm:text-[52px]">
              This page doesn&apos;t exist.
            </h1>
            <p className="mb-8 max-w-[520px] font-body text-lg font-medium leading-relaxed text-body">
              The link may be broken, or the page may have moved. Here&apos;s
              where you probably meant to go.
            </p>
            <div className="mb-9 flex flex-wrap items-center justify-center gap-3.5">
              <Button href="/" className="px-7 py-3.5 text-base">
                Back to homepage
              </Button>
              {settings?.contactEmail && (
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="border-b-2 border-border-soft pb-0.5 font-display text-base font-bold text-ink transition-colors duration-150 hover:border-green hover:text-green"
                >
                  {settings.contactEmail}
                </a>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-body text-sm font-semibold text-muted">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-green">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
