import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import Headline from "@/components/sanity/Headline";
import type { ServiceCategory, TitledCard } from "@/sanity/lib/types";

/**
 * One numbered band of the services index.
 *
 * The five bands deliberately do not look alike — the page would read as one
 * undifferentiated list of forty services otherwise — so the card shape comes
 * from `category.layout` while the number, the anchor and the ghost digit come
 * from the band's position in the array.
 */

const CARD_HOVER =
  "transition-all duration-150 hover:-translate-y-1 hover:border-[#D9C9B8] hover:shadow-[0_16px_34px_rgba(28,27,25,0.10)]";

const DOTS_DARK = {
  backgroundImage: "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
  backgroundSize: "16px 16px",
};

const DOTS_LIGHT = {
  backgroundImage: "radial-gradient(#1C1B19 1.3px, transparent 1.7px)",
  backgroundSize: "16px 16px",
};

/** Section padding and background, per layout. */
const SECTION: Record<ServiceCategory["layout"], string> = {
  feature: "bg-paper pb-[58px] pt-11",
  rows: "relative overflow-hidden border-y border-border-soft bg-surface pb-14 pt-13",
  split: "bg-paper pb-14 pt-13",
  dark: "relative overflow-hidden bg-ink py-14 text-paper",
  numbered: "bg-paper pb-15 pt-13",
};

/** The outlined digit bleeding off the top-right of each band. */
const GHOST_STROKE: Record<ServiceCategory["layout"], string> = {
  feature: "[-webkit-text-stroke:2px_#E7E1D3]",
  rows: "[-webkit-text-stroke:2px_#DED7C6]",
  split: "[-webkit-text-stroke:2px_#E7E1D3]",
  dark: "[-webkit-text-stroke:2px_#33322E]",
  numbered: "[-webkit-text-stroke:2px_#E7E1D3]",
};

function two(n: number) {
  return String(n).padStart(2, "0");
}

export default function ServicesCategory({
  category,
  index,
}: {
  category: ServiceCategory;
  index: number;
}) {
  if (!category.items?.length) return null;

  const number = two(index + 1);
  const dark = category.layout === "dark";

  return (
    <section id={`kw-cat${index + 1}`} className={SECTION[category.layout]}>
      {(dark || category.layout === "rows") && (
        <div
          className={`pointer-events-none absolute inset-0 ${dark ? "opacity-[0.05]" : "opacity-[0.04]"}`}
          style={dark ? DOTS_DARK : DOTS_LIGHT}
        />
      )}

      <Container className="relative">
        <div
          className={`relative ${category.layout === "feature" ? "mb-7" : "mb-[30px]"}`}
        >
          <div
            className={`pointer-events-none absolute -top-[30px] right-0 hidden select-none font-display text-[150px] font-extrabold leading-[0.8] tracking-[-0.05em] text-transparent sm:block ${GHOST_STROKE[category.layout]}`}
            aria-hidden
          >
            {number}
          </div>

          <Reveal className="relative">
            <span
              className={`mb-3.5 block font-mono text-xs font-bold uppercase tracking-[1.4px] ${
                dark ? "text-lime" : "text-green"
              }`}
            >
              {number} / {category.name}
            </span>
            <h2
              className={`mb-4 text-pretty font-display text-[clamp(30px,4.4vw,48px)] font-extrabold leading-[1.02] tracking-[-0.03em] ${
                category.layout === "numbered" ? "max-w-[820px]" : "max-w-[760px]"
              } ${dark ? "text-paper" : "text-ink"}`}
            >
              <Headline value={category.headline} />
            </h2>
            <Copy
              value={category.intro}
              tone={dark ? "dark" : "light"}
              className={`max-w-[700px] font-body text-base font-medium leading-[1.6] ${
                dark ? "text-dark-text" : "text-body"
              }`}
            />
          </Reveal>
        </div>

        <Items category={category} />
      </Container>
    </section>
  );
}

function Items({ category }: { category: ServiceCategory }) {
  const { items, layout } = category;

  switch (layout) {
    case "feature":
      return <FeatureLayout category={category} />;

    case "rows":
      return (
        <div className="relative flex flex-col gap-3">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={Math.min(i, 8) * 40}
              className={`grid items-center gap-6 rounded-[18px] border border-border-soft bg-white px-6.5 py-5.5 shadow-[0_8px_24px_rgba(28,27,25,0.05)] sm:grid-cols-[0.9fr_1.6fr] ${CARD_HOVER}`}
            >
              <h3 className="font-display text-[clamp(19px,2.2vw,24px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink">
                {item.title}
              </h3>
              <Description>{item.description}</Description>
            </Reveal>
          ))}
        </div>
      );

    case "split":
      return (
        <div className="grid gap-4.5 sm:grid-cols-2">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={Math.min(i, 8) * 40}
              className={`relative overflow-hidden rounded-[18px] border border-border bg-white px-6.5 pb-6.5 pt-6 shadow-[0_8px_24px_rgba(28,27,25,0.04)] ${CARD_HOVER}`}
            >
              <span className="mb-4 inline-block h-[5px] w-7 rounded-full bg-green" />
              <h3 className="mb-2.5 max-w-[82%] font-display text-[21px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink">
                {item.title}
              </h3>
              <Description>{item.description}</Description>
            </Reveal>
          ))}
        </div>
      );

    case "dark":
      return (
        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={Math.min(i, 8) * 40}
              className="flex flex-col rounded-[18px] border border-dark-border bg-dark-card px-6 pb-6.5 pt-6 transition-all duration-150 hover:-translate-y-1 hover:border-green hover:shadow-[0_16px_34px_rgba(0,0,0,0.3)]"
            >
              <span className="mb-3.5 font-display text-[30px] font-extrabold leading-none tracking-[-0.03em] text-lime">
                {two(i + 1)}
              </span>
              <h3 className="mb-2.5 font-display text-xl font-bold leading-[1.14] tracking-[-0.02em] text-paper">
                {item.title}
              </h3>
              <p className="font-body text-sm font-medium leading-[1.58] text-dark-text-soft">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      );

    case "numbered":
      return (
        <div className="grid gap-4.5 sm:grid-cols-2">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={Math.min(i, 8) * 40}
              className={`grid grid-cols-[auto_1fr] items-start gap-5 rounded-[18px] border border-border bg-white px-6.5 py-6 shadow-[0_8px_24px_rgba(28,27,25,0.04)] ${CARD_HOVER}`}
            >
              <span className="font-display text-[44px] font-extrabold leading-[0.9] tracking-[-0.04em] text-green">
                {two(i + 1)}
              </span>
              <div>
                <h3 className="mb-[9px] font-display text-xl font-extrabold leading-[1.1] tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>
                <Description>{item.description}</Description>
              </div>
            </Reveal>
          ))}
        </div>
      );
  }
}

/**
 * The first service in this band is the one to read first, so it gets the dark
 * panel and the sticker; the rest fall into the auto-filling card grid, picking
 * their numbers up where the lead left off.
 */
function FeatureLayout({ category }: { category: ServiceCategory }) {
  const [lead, ...rest] = category.items;

  return (
    <>
      <Reveal className="relative mb-4.5 grid grid-cols-[auto_1fr] items-start gap-6.5 overflow-hidden rounded-[20px] bg-ink px-8 py-7.5 text-paper shadow-[0_16px_40px_rgba(28,27,25,0.16)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
            backgroundSize: "15px 15px",
          }}
        />
        <div className="relative flex flex-col gap-2.5">
          <span className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-xl border-2 border-ink bg-lime font-display text-lg font-extrabold text-ink shadow-[3px_3px_0_#4E7D2E]">
            {two(1)}
          </span>
          {category.featureSticker && (
            <span
              className="mt-1 self-start rotate-180 font-sticker text-[15px] tracking-[0.5px] text-lime [writing-mode:vertical-rl]"
              aria-hidden
            >
              {category.featureSticker}
            </span>
          )}
        </div>
        <div className="relative">
          <h3 className="mb-3 font-display text-[clamp(22px,2.8vw,30px)] font-extrabold leading-[1.08] tracking-[-0.02em]">
            {lead.title}
          </h3>
          <p className="max-w-[720px] font-body text-[15px] font-medium leading-[1.6] text-dark-text">
            {lead.description}
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4.5 [grid-template-columns:repeat(auto-fill,minmax(min(300px,100%),1fr))]">
        {rest.map((item, i) => (
          <Card key={item.title} item={item} number={two(i + 2)} delay={Math.min(i, 8) * 40} />
        ))}
      </div>
    </>
  );
}

function Card({
  item,
  number,
  delay,
}: {
  item: TitledCard;
  number: string;
  delay: number;
}) {
  return (
    <Reveal
      delay={delay}
      className={`flex flex-col rounded-[18px] border border-border bg-white px-5.5 pb-6 pt-5.5 shadow-[0_8px_24px_rgba(28,27,25,0.04)] ${CARD_HOVER}`}
    >
      <div className="mb-3.5 flex items-center gap-3">
        <span className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px] border-2 border-ink bg-green font-display text-sm font-extrabold text-white shadow-[2px_2px_0_#1C1B19]">
          {number}
        </span>
        <span className="w-full border-b border-dashed border-[#E4DECF]" />
      </div>
      <h3 className="mb-2.5 font-display text-[19px] font-extrabold leading-[1.14] tracking-[-0.02em] text-ink">
        {item.title}
      </h3>
      <Description>{item.description}</Description>
    </Reveal>
  );
}

function Description({ children }: { children: string }) {
  return (
    <p className="font-body text-sm font-medium leading-[1.58] text-body">{children}</p>
  );
}
