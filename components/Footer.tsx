import Link from "next/link";
import Container from "./Container";
import LogoMark from "./LogoMark";
import { SocialGlyph, socialLabel } from "./SocialIcons";
import { safeHref } from "@/lib/safe-href";
import type { SiteSettings, SocialLink } from "@/sanity/lib/types";

function SocialIcon({ link }: { link: SocialLink }) {
  const label = socialLabel(link.platform);

  return (
    <a
      href={safeHref(link.href)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-body transition-colors duration-150 hover:border-green hover:bg-green-bg hover:text-green"
    >
      <SocialGlyph platform={link.platform} />
    </a>
  );
}

export default function Footer({ settings }: { settings: SiteSettings | null }) {
  if (!settings) return null;

  return (
    <footer className="border-t border-border bg-white py-8">
      <Container>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-[280px]">
            <div className="flex items-center gap-2 font-display text-[23px] font-extrabold tracking-[-0.03em] text-ink">
              <LogoMark className="text-green" />
              {settings.title}
            </div>
            {!!settings.socialLinks?.length && (
              <div className="mt-3.5 flex flex-wrap gap-2">
                {settings.socialLinks.map((social) => (
                  <SocialIcon key={`${social.href}-${social.platform}`} link={social} />
                ))}
              </div>
            )}
            {settings.tagline && (
              <p className="my-2.5 font-display text-lg font-extrabold tracking-[-0.02em] text-ink">
                {settings.tagline}
              </p>
            )}
            <a
              href={`mailto:${settings.contactEmail}`}
              className="border-b-2 border-lime font-display text-sm font-bold text-green"
            >
              {settings.contactEmail}
            </a>
          </div>

          <div className="flex flex-wrap gap-11 font-body text-sm">
            {settings.footerGroups?.map((group) => (
              <div key={group.title}>
                <div className="mb-3 font-display text-xs font-bold uppercase tracking-wide text-ink">
                  {group.title}
                </div>
                <div className="flex flex-col gap-2 font-medium text-body">
                  {group.links?.map((item) => (
                    <Link
                      key={`${item.href}-${item.label}`}
                      href={safeHref(item.href)}
                      className="hover:text-green"
                    >
                      {item.label}
                    </Link>
                  ))}
                  {group.cta && (
                    <a
                      href={safeHref(group.cta.href)}
                      target={group.cta.openInNewTab ? "_blank" : undefined}
                      rel={group.cta.openInNewTab ? "noopener noreferrer" : undefined}
                      className="mt-3 font-display font-bold text-green hover:text-green-dark"
                    >
                      {group.cta.label} →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Socials sit with the logo above; this bar is just the copyright. */}
        <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-border pt-4 font-mono text-[11px] font-bold uppercase tracking-wide text-muted">
          {settings.footerNote && <span>{settings.footerNote}</span>}
        </div>
      </Container>
    </footer>
  );
}
