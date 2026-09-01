import Headline from "@/components/sanity/Headline";
import type { Headline as HeadlineValue } from "@/sanity/lib/types";

/**
 * The desktop ground: a dot grid, two oversized cream-on-cream asterisks, the
 * left rail and the margin note.
 *
 * All of it is `fixed`, so it parks while the column scrolls — the layer is
 * scenery, not content. It is `aria-hidden` for the same reason, except the
 * rail, which carries a real headline and stays in the accessibility tree.
 *
 * Nothing here renders on phones: at 390px the column *is* the page.
 */
export default function LinksGround({
  eyebrow,
  headline,
  body,
  note,
  sticker,
}: {
  eyebrow?: string | null;
  headline?: HeadlineValue | null;
  body?: string | null;
  note?: string | null;
  sticker?: string | null;
}) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 hidden md:block"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#c9c3b1_1px,transparent_1px)] bg-[length:24px_24px] opacity-55" />
        <div className="absolute top-[130px] -left-[90px] font-display text-[520px] leading-[0.7] font-extrabold text-[#dbd5c4] select-none">
          ✱
        </div>
        <div className="absolute -right-[70px] -bottom-[120px] font-display text-[420px] leading-[0.7] font-extrabold text-[#dcd7c6] select-none">
          ✱
        </div>
      </div>

      {(eyebrow || headline || body) && (
        <div className="pointer-events-none fixed top-28 left-[104px] hidden w-[210px] flex-col gap-3.5 xl:flex">
          {eyebrow && (
            <p className="font-body text-[11px] font-bold tracking-[0.16em] text-muted uppercase">
              {eyebrow}
            </p>
          )}
          {headline && (
            <h2 className="font-display text-[40px] leading-[0.98] font-extrabold tracking-[-0.035em] text-ink">
              <Headline value={headline} />
            </h2>
          )}
          {body && (
            <p className="font-body text-sm leading-[1.55] font-medium text-body">
              {body}
            </p>
          )}
        </div>
      )}

      {sticker && (
        <div
          aria-hidden
          className="pointer-events-none fixed top-[150px] right-[130px] hidden rotate-6 rounded-lg bg-lime px-3.5 py-2 font-sticker text-[26px] tracking-[0.03em] text-ink shadow-[2px_2px_0_#1C1B19] xl:block"
        >
          {sticker}
        </div>
      )}

      {note && (
        <div
          aria-hidden
          className="pointer-events-none fixed right-[118px] bottom-[150px] hidden w-[230px] flex-col gap-2 xl:flex"
        >
          <span className="h-px bg-[#cfc9b8]" />
          <span className="font-mono text-xs whitespace-pre-line text-muted">{note}</span>
        </div>
      )}
    </>
  );
}
