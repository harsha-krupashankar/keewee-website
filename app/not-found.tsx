import Button from "@/components/Button";
import Container from "@/components/Container";
import LogoMark from "@/components/LogoMark";
import PerspectiveGate from "@/components/PerspectiveGate";
import SiteShell from "@/components/SiteShell";
import { SocialGlyph, socialLabel } from "@/components/SocialIcons";
import Headline from "@/components/sanity/Headline";
import { safeHref } from "@/lib/safe-href";
import { getNotFoundPage, getSiteSettings } from "@/sanity/lib/content";
import type { FetchOptions } from "@/sanity/lib/live";

export default function NotFound() {
  return <PerspectiveGate render={(opts) => <Content opts={opts} />} />;
}

async function Content({ opts }: { opts: FetchOptions }) {
  const [page, settings] = await Promise.all([
    getNotFoundPage(opts),
    getSiteSettings(opts),
  ]);
  const socials = settings?.socialLinks ?? [];

  return (
    <SiteShell opts={opts}>
      <section className="relative overflow-hidden bg-paper pb-16 pt-14 sm:pt-[72px]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: "radial-gradient(#1C1B19 1.3px, transparent 1.7px)",
            backgroundSize: "17px 17px",
          }}
        />
        <Container className="relative">
          {page?.sticker && (
            <div className="absolute left-[72%] top-[-45px] z-[3] hidden animate-bob-a -rotate-6 rounded-lg border-2 border-ink bg-lime px-3 py-1.5 font-sticker text-[26px] leading-none tracking-[1.5px] text-ink shadow-[2px_2px_0_#1C1B19] md:block">
              {page.sticker}
            </div>
          )}

          <div className="relative z-[2] mx-auto flex max-w-[820px] flex-col items-center text-center">
            <div
              aria-label="404"
              role="img"
              className="mb-9 flex items-center justify-center gap-1.5 font-display text-[120px] font-extrabold leading-[0.85] tracking-[-0.05em] text-ink sm:text-[240px]"
            >
              <span aria-hidden="true">4</span>
              <span
                aria-hidden="true"
                className="inline-flex size-[105px] items-center justify-center rounded-full border-[3px] border-ink bg-green text-[85px] leading-none tracking-normal text-white shadow-[4px_4px_0_#1C1B19] sm:size-[210px] sm:text-[170px] sm:shadow-[6px_6px_0_#1C1B19]"
              >
                {/* The glyph's ink sits slightly above its line box; nudge it to
                    centre, and spin around the ink rather than the box. */}
                <span className="block translate-y-[3px]">
                  <LogoMark className="block origin-[50%_48%] animate-[kw-spin_14s_linear_infinite] motion-reduce:animate-none" />
                </span>
              </span>
              <span aria-hidden="true">4</span>
            </div>

            <h1 className="mb-5 font-display text-[clamp(38px,6vw,60px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink">
              <Headline value={page?.headline} />
            </h1>
            {page?.intro && (
              <p className="mb-3.5 max-w-[600px] font-body text-[19px] font-medium leading-[1.55] text-body text-pretty">
                {page.intro}
              </p>
            )}
            {page?.signoff && (
              <p className="flex items-center gap-1.5 font-mono text-[13px] font-bold uppercase tracking-[1px] text-green-dark">
                <LogoMark />
                {page.signoff}
              </p>
            )}
          </div>
        </Container>
      </section>

      <section className="bg-paper pb-16 pt-2">
        <Container className="grid gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-3xl bg-ink p-8 text-paper shadow-[0_20px_48px_rgba(28,27,25,0.2)] sm:p-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
                backgroundSize: "16px 16px",
              }}
            />
            <LogoMark className="pointer-events-none absolute -bottom-[60px] -right-[30px] select-none text-[260px] font-extrabold leading-none text-transparent [-webkit-text-stroke:2px_#34322D]" />
            {page?.blogHeadline && (
              <h2 className="relative max-w-[420px] font-display text-[30px] font-extrabold leading-[1.08] tracking-[-0.03em] text-pretty sm:text-[34px]">
                {page.blogHeadline}
              </h2>
            )}
            {page?.blogButton && (
              <Button
                href={page.blogButton.href}
                variant="primary-on-dark"
                className="relative px-7 py-[15px] text-[17px] hover:text-white"
              >
                {page.blogButton.label}
              </Button>
            )}
          </div>

          <div className="flex flex-col items-start gap-6 rounded-3xl border border-border bg-white p-8 shadow-[0_8px_24px_rgba(28,27,25,0.04)] sm:p-10">
            {page?.socialsHeadline && (
              <h2 className="font-display text-[26px] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink text-pretty sm:text-[28px]">
                {page.socialsHeadline}
              </h2>
            )}
            {socials.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {socials.map((social) => {
                  const label = socialLabel(social.platform);
                  return (
                    <a
                      key={`${social.href}-${social.platform}`}
                      href={safeHref(social.href)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className="flex size-12 items-center justify-center rounded-xl border-2 border-ink bg-white text-ink shadow-[3px_3px_0_#1C1B19] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-lime hover:text-ink hover:shadow-[1px_1px_0_#1C1B19] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-lime-bright"
                    >
                      <SocialGlyph platform={social.platform} className="size-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
