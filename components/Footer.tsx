import Link from "next/link";
import Container from "./Container";
import type { SiteSettings, SocialLink } from "@/sanity/lib/types";

/**
 * Social marks, keyed by the `platform` value in the Studio's picker. Anything
 * without a path here still renders — as the first two letters of its platform —
 * so a new network never leaves a blank square, it just waits for artwork.
 */
const SOCIAL_ICONS: Record<string, string> = {
  linkedin:
    "M4.98 3.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM.5 21h4V8h-4v13ZM8 8h3.8v1.8h.05a4.2 4.2 0 0 1 3.78-2.08c4.04 0 4.79 2.66 4.79 6.12V21h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.37 1.61-2.37 3.27V21H8V8Z",
  x: "M17.53 3h3.04l-6.64 7.59L21.75 21h-6.12l-4.79-6.26L5.35 21H2.3l7.1-8.12L2.25 3h6.28l4.33 5.72L17.53 3Zm-1.07 16.17h1.68L7.62 4.74H5.82l10.64 14.43Z",
  twitter:
    "M17.53 3h3.04l-6.64 7.59L21.75 21h-6.12l-4.79-6.26L5.35 21H2.3l7.1-8.12L2.25 3h6.28l4.33 5.72L17.53 3Zm-1.07 16.17h1.68L7.62 4.74H5.82l10.64 14.43Z",
  instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z",
  youtube:
    "M23.5 6.5a3 3 0 0 0-2.1-2.13C19.5 3.85 12 3.85 12 3.85s-7.5 0-9.4.52A3 3 0 0 0 .5 6.5C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 0 0 2.1 2.13c1.9.52 9.4.52 9.4.52s7.5 0 9.4-.52a3 3 0 0 0 2.1-2.13C24 15.6 24 12 24 12s0-3.6-.5-5.5ZM9.6 15.6V8.4l6.25 3.6-6.25 3.6Z",
};

function SocialIcon({ link }: { link: SocialLink }) {
  const path = SOCIAL_ICONS[link.platform];

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.platform}
      title={link.platform}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-body transition-colors duration-150 hover:border-green hover:bg-green-bg hover:text-green"
    >
      {path ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[17px] w-[17px]">
          <path d={path} fill="currentColor" />
        </svg>
      ) : (
        <span className="font-display text-[11px] font-bold uppercase">
          {link.platform.slice(0, 2)}
        </span>
      )}
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
              {settings.logoMark && (
                <span className="text-green">{settings.logoMark}</span>
              )}{" "}
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
                      href={item.href}
                      className="hover:text-green"
                    >
                      {item.label}
                    </Link>
                  ))}
                  {group.cta && (
                    <a
                      href={group.cta.href}
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
        <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-border pt-4 font-mono text-[11px] font-bold uppercase tracking-wide text-faint">
          {settings.footerNote && <span>{settings.footerNote}</span>}
        </div>
      </Container>
    </footer>
  );
}
