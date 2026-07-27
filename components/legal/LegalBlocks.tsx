import type { LegalBlock } from "@/sanity/lib/types";

/**
 * Renders one legal block. The union mirrors the Studio schema exactly, so a new
 * block type surfaces here as a TypeScript exhaustiveness error rather than
 * silently vanishing from the page.
 */
export default function LegalBlocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case "legalParagraph":
            return (
              <p
                key={block._key}
                className="m-0 font-body text-base font-medium leading-[1.72] text-[#40382E]"
              >
                {block.text}
              </p>
            );

          case "legalClause":
            return (
              <div key={block._key} className="border-l-[3px] border-[#E1DACB] pl-5">
                <div className="mb-[5px] flex items-baseline gap-[9px]">
                  <span className="font-mono text-xs font-bold text-rust">
                    {block.number}
                  </span>
                  <span className="font-display text-base font-extrabold tracking-[-0.01em] text-ink">
                    {block.heading}
                  </span>
                </div>
                <p className="m-0 font-body text-base font-medium leading-[1.72] text-[#40382E]">
                  {block.text}
                </p>
              </div>
            );

          case "legalSubheading":
            return (
              <div key={block._key} className="mt-1 flex items-baseline gap-[9px]">
                <span className="font-mono text-xs font-bold text-rust">
                  {block.number}
                </span>
                <span className="font-display text-base font-extrabold tracking-[-0.01em] text-ink">
                  {block.heading}
                </span>
              </div>
            );

          case "legalDefinition":
            return (
              <p
                key={block._key}
                className="m-0 font-body text-base font-medium leading-[1.72] text-[#40382E]"
              >
                <strong className="font-display font-extrabold text-ink">
                  {block.term}
                </strong>{" "}
                {block.text}
              </p>
            );

          case "legalList":
            return (
              <ul key={block._key} className="m-0 flex list-none flex-col gap-[10px] p-0">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="relative pl-[26px] font-body text-base font-medium leading-[1.65] text-[#40382E]"
                  >
                    <span className="absolute left-0 top-[9px] h-[9px] w-[9px] rotate-45 rounded-[3px] border-[1.5px] border-ink bg-lime" />
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "legalNote":
            return (
              <div
                key={block._key}
                className="flex items-start gap-[14px] rounded-[14px] border border-green-border bg-green-bg px-[22px] py-[18px]"
              >
                <span className="shrink-0 font-display text-[15px] font-extrabold text-green">
                  ✱
                </span>
                <p className="m-0 font-body text-[15px] font-semibold leading-[1.65] text-[#33401F]">
                  {block.text}
                </p>
              </div>
            );

          case "legalContact":
            return (
              <div
                key={block._key}
                className="flex flex-wrap items-center justify-between gap-[18px] rounded-2xl bg-ink px-7 py-[26px]"
              >
                <div>
                  <div className="mb-1 font-display text-lg font-extrabold tracking-[-0.02em] text-paper">
                    {block.name}
                  </div>
                  {block.city && (
                    <div className="font-body text-sm font-medium text-faint">
                      {block.city}
                    </div>
                  )}
                </div>
                <a
                  href={`mailto:${block.email}`}
                  className="rounded-xl bg-green px-6 py-3 font-display text-[15px] font-bold text-white shadow-[3px_3px_0_#C6F000] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#C6F000]"
                >
                  {block.email}
                </a>
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
