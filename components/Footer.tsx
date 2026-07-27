import Link from "next/link";
import Container from "./Container";
import type { SiteSettings } from "@/sanity/lib/types";

export default function Footer({ settings }: { settings: SiteSettings | null }) {
  if (!settings) return null;

  return (
    <footer className="border-t border-border bg-white py-8">
      <Container>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-[280px]">
            <div className="flex items-center gap-2 font-display text-[23px] font-extrabold tracking-[-0.03em] text-ink">
              <span className="text-green">✱</span> {settings.title}
            </div>
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
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-border pt-4 font-mono text-[11px] font-bold uppercase tracking-wide text-faint">
          {settings.footerNote && <span>{settings.footerNote}</span>}
          {settings.socialLinks && settings.socialLinks.length > 0 && (
            <span className="flex gap-4">
              {settings.socialLinks.map((social) => (
                <a
                  key={`${social.href}-${social.label}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green"
                >
                  {social.label}
                </a>
              ))}
            </span>
          )}
        </div>
      </Container>
    </footer>
  );
}
