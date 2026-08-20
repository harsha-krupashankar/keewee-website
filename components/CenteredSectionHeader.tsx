import Reveal from "./Reveal";
import Copy from "./sanity/Copy";
import Headline from "./sanity/Headline";
import type { SectionHeader } from "@/sanity/lib/types";

/** Centered eyebrow + headline + intro, used above the card grids. */
export default function CenteredSectionHeader({
  header,
  className = "mx-auto mb-9 max-w-[680px] text-center",
  tone = "light",
}: {
  header?: SectionHeader | null;
  className?: string;
  tone?: "light" | "dark";
}) {
  if (!header) return null;

  return (
    <Reveal className={className}>
      {header.eyebrow && (
        <span
          className={`mb-3.5 block font-mono text-xs font-bold uppercase tracking-[1.4px] ${
            tone === "dark" ? "text-lime" : "text-green-dark"
          }`}
        >
          {header.eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-[28px] font-extrabold leading-[1.06] tracking-[-0.03em] sm:text-[36px] lg:text-[42px] ${
          tone === "dark" ? "text-paper" : "text-ink"
        }`}
      >
        <Headline value={header.headline} />
      </h2>
      <Copy
        value={header.intro}
        tone={tone}
        className={`mt-4 font-body text-base font-medium leading-relaxed ${
          tone === "dark" ? "text-dark-text" : "text-body"
        }`}
      />
    </Reveal>
  );
}
