import type { LegalBlock } from "@/lib/legal-data";

export default function LegalBlocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if ("p" in b) {
          return (
            <p
              key={i}
              className="m-0 font-body text-base font-medium leading-[1.72] text-[#40382E]"
            >
              {b.p}
            </p>
          );
        }

        if ("c" in b) {
          const [num, head, text] = b.c;
          return (
            <div key={i} className="border-l-[3px] border-[#E1DACB] pl-5">
              <div className="mb-[5px] flex items-baseline gap-[9px]">
                <span className="font-mono text-xs font-bold text-rust">{num}</span>
                <span className="font-display text-base font-extrabold tracking-[-0.01em] text-ink">
                  {head}
                </span>
              </div>
              <p className="m-0 font-body text-base font-medium leading-[1.72] text-[#40382E]">
                {text}
              </p>
            </div>
          );
        }

        if ("sub" in b) {
          const [num, head] = b.sub;
          return (
            <div key={i} className="mt-1 flex items-baseline gap-[9px]">
              <span className="font-mono text-xs font-bold text-rust">{num}</span>
              <span className="font-display text-base font-extrabold tracking-[-0.01em] text-ink">
                {head}
              </span>
            </div>
          );
        }

        if ("d" in b) {
          const [term, text] = b.d;
          return (
            <p
              key={i}
              className="m-0 font-body text-base font-medium leading-[1.72] text-[#40382E]"
            >
              <strong className="font-display font-extrabold text-ink">{term}</strong> {text}
            </p>
          );
        }

        if ("ul" in b) {
          return (
            <ul key={i} className="m-0 flex list-none flex-col gap-[10px] p-0">
              {b.ul.map((item, j) => (
                <li
                  key={j}
                  className="relative pl-[26px] font-body text-base font-medium leading-[1.65] text-[#40382E]"
                >
                  <span className="absolute left-0 top-[9px] h-[9px] w-[9px] rotate-45 rounded-[3px] border-[1.5px] border-ink bg-lime" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        if ("note" in b) {
          return (
            <div
              key={i}
              className="flex items-start gap-[14px] rounded-[14px] border border-green-border bg-green-bg px-[22px] py-[18px]"
            >
              <span className="shrink-0 font-display text-[15px] font-extrabold text-green">
                ✱
              </span>
              <p className="m-0 font-body text-[15px] font-semibold leading-[1.65] text-[#33401F]">
                {b.note}
              </p>
            </div>
          );
        }

        if ("contact" in b) {
          const [name, city, email] = b.contact;
          return (
            <div
              key={i}
              className="flex flex-wrap items-center justify-between gap-[18px] rounded-2xl bg-ink px-7 py-[26px]"
            >
              <div>
                <div className="mb-1 font-display text-lg font-extrabold tracking-[-0.02em] text-paper">
                  {name}
                </div>
                <div className="font-body text-sm font-medium text-faint">{city}</div>
              </div>
              <a
                href={`mailto:${email}`}
                className="rounded-xl bg-green px-6 py-3 font-display text-[15px] font-bold text-white shadow-[3px_3px_0_#C6F000] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#C6F000]"
              >
                {email}
              </a>
            </div>
          );
        }

        return null;
      })}
    </>
  );
}
