import Button from "./Button";
import Container from "./Container";
import Reveal from "./Reveal";
import Copy from "./sanity/Copy";
import Headline from "./sanity/Headline";
import type { Cta, Headline as HeadlineValue, Link, RichText } from "@/sanity/lib/types";

/**
 * The dark closing panel that ends About, FAQ, Free audit, Newsletter and Blog.
 * They were five near-identical blocks; the only real differences were the
 * section padding and whether a second button existed.
 */
export default function DarkCtaSection({
  eyebrow,
  headline,
  body,
  buttons,
  button,
  secondaryLabel,
  secondaryHref,
  className = "py-14 md:pb-20 md:pt-16",
  showAsterisk = false,
}: {
  eyebrow?: string | null;
  headline?: HeadlineValue | null;
  body?: RichText | null;
  /** Two-button variant. */
  buttons?: Cta | null;
  /** Single-button variant. */
  button?: Link | null;
  secondaryLabel?: string | null;
  secondaryHref?: string;
  className?: string;
  showAsterisk?: boolean;
}) {
  return (
    <section className={className}>
      <Container>
        <Reveal className="relative overflow-hidden rounded-[24px] bg-ink px-8 py-12 text-center text-paper shadow-[0_20px_48px_rgba(28,27,25,0.2)] sm:px-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
              backgroundSize: "16px 16px",
            }}
          />
          {showAsterisk && (
            <div
              className="pointer-events-none absolute -top-8 right-8 select-none font-display text-[150px] font-extrabold leading-none text-[#262523]"
              aria-hidden
            >
              ✱
            </div>
          )}

          <div className="relative z-10 mx-auto max-w-[760px]">
            {eyebrow && (
              <span className="mb-4 block font-display text-[13px] font-bold uppercase tracking-[0.09em] text-lime">
                {eyebrow}
              </span>
            )}
            <h2 className="mx-auto mb-4.5 max-w-[720px] font-display text-[28px] font-extrabold leading-[1.08] tracking-[-0.035em] text-pretty sm:text-[42px] lg:text-[48px]">
              <Headline value={headline} />
            </h2>
            <Copy
              value={body}
              tone="dark"
              className="mx-auto mb-7 max-w-[620px] font-body text-base font-medium leading-relaxed text-dark-text"
            />

            <div className="flex flex-wrap justify-center gap-3.5">
              {button && (
                <Button href={button.href} className="px-7 py-4 text-[17px]">
                  {button.label}
                </Button>
              )}
              {buttons?.primary && (
                <Button href={buttons.primary.href} className="px-7 py-4 text-[17px]">
                  {buttons.primary.label}
                </Button>
              )}
              {buttons?.secondary && (
                <Button
                  href={buttons.secondary.href}
                  variant="ghost"
                  className="px-7 py-3.5 text-[17px]"
                >
                  {buttons.secondary.label}
                </Button>
              )}
            </div>

            {secondaryLabel && secondaryHref && (
              <div className="mt-4">
                <a
                  href={secondaryHref}
                  className="border-b-2 border-lime font-display text-sm font-bold text-paper"
                >
                  {secondaryLabel}
                </a>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
