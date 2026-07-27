import Reveal from "./Reveal";
import type { TitledCard } from "@/sanity/lib/types";

/**
 * Grid of title + description cards.
 *
 * `green` is the tinted panel used for "what you get" lists; `numbered` is the
 * white card with a counter badge. Numbering comes from array position, so
 * reordering in the Studio renumbers automatically.
 */
export default function TitledCardGrid({
  cards,
  variant = "green",
  columns = "sm:grid-cols-2",
}: {
  cards?: TitledCard[] | null;
  variant?: "green" | "numbered";
  columns?: string;
}) {
  if (!cards?.length) return null;

  return (
    <div className={`grid gap-4 ${columns}`}>
      {cards.map((card, i) =>
        variant === "green" ? (
          <Reveal
            key={card.title}
            delay={i * 60}
            className="flex flex-col rounded-[18px] border border-green-border bg-green-bg p-7"
          >
            <h3 className="mb-2.5 font-display text-[19px] font-extrabold leading-tight tracking-[-0.02em] text-ink">
              {card.title}
            </h3>
            <p className="font-body text-[15px] font-medium leading-relaxed text-green-deep">
              {card.description}
            </p>
          </Reveal>
        ) : (
          <Reveal
            key={card.title}
            delay={i * 60}
            className="flex flex-col rounded-[18px] border border-border bg-white p-6.5 shadow-[0_8px_24px_rgba(28,27,25,0.04)] transition-all duration-150 hover:-translate-y-1 hover:border-[#D9C9B8] hover:shadow-[0_16px_34px_rgba(28,27,25,0.1)]"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px] border-2 border-ink bg-green font-display text-sm font-extrabold text-white shadow-[2px_2px_0_#1C1B19]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 border-b border-dashed border-border-soft" />
            </div>
            <h3 className="mb-2.5 font-display text-[19px] font-extrabold leading-tight tracking-[-0.02em] text-ink">
              {card.title}
            </h3>
            <p className="font-body text-[15px] font-medium leading-relaxed text-body">
              {card.description}
            </p>
          </Reveal>
        )
      )}
    </div>
  );
}
