import Link from "next/link";
import Container from "./Container";
import LogoMark from "./LogoMark";
import type { SiteSettings, SocialLink } from "@/sanity/lib/types";

/**
 * Social marks, keyed by the `platform` value in the Studio's picker. Anything
 * without a path here still renders — as the first two letters of its platform —
 * so a new network never leaves a blank square, it just waits for artwork.
 */
const SOCIAL_ICONS: Record<string, string> = {
  linkedin:
    "M4.983 3.5a2.492 2.492 0 1 1-4.983 0 2.492 2.492 0 0 1 4.983 0zM.237 8.16h4.49V23.5H.237V8.16zm7.183 0h4.303v2.098h.062c.599-1.135 2.063-2.33 4.247-2.33 4.542 0 5.38 2.988 5.38 6.874V23.5h-4.49v-6.807c0-1.623-.03-3.71-2.26-3.71-2.263 0-2.609 1.767-2.609 3.593V23.5H7.42V8.16z",
  x: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  twitter:
    "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 1.17.055 1.805.249 2.227.415.56.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.059 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.248 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.82.679-1.382.896-.422.164-1.057.36-2.227.413-1.265.059-1.645.07-4.85.07s-3.585-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.413a3.716 3.716 0 0 1-1.382-.896 3.716 3.716 0 0 1-.896-1.382c-.164-.422-.36-1.057-.413-2.227-.059-1.265-.07-1.645-.07-4.85s.012-3.585.07-4.85c.054-1.17.249-1.805.413-2.227.217-.562.477-.96.896-1.382.42-.419.82-.679 1.382-.896.422-.164 1.057-.36 2.227-.413 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.332.014 7.052.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.052.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.06 1.277.261 2.147.558 2.913.306.788.717 1.459 1.384 2.126s1.336 1.077 2.126 1.383c.766.296 1.636.499 2.913.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.06 2.147-.262 2.913-.558a5.884 5.884 0 0 0 2.126-1.383 5.884 5.884 0 0 0 1.383-2.126c.296-.766.499-1.636.558-2.913.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.06-1.277-.262-2.147-.558-2.913a5.884 5.884 0 0 0-1.383-2.126A5.884 5.884 0 0 0 19.86.63c-.766-.296-1.636-.499-2.913-.558C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  facebook:
    "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.13H9.101z",
  youtube:
    "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
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
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-body transition-colors duration-150 hover:border-green hover:bg-green-bg hover:text-green"
    >
      {path ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]">
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
        <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-border pt-4 font-mono text-[11px] font-bold uppercase tracking-wide text-muted">
          {settings.footerNote && <span>{settings.footerNote}</span>}
        </div>
      </Container>
    </footer>
  );
}
