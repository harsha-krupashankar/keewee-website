import type { LinkButton } from "@/sanity/lib/types";

import { SafeLink } from "./shared";

/**
 * The "Start here" stack.
 *
 * The first button is the primary — green with the 3px ink offset — derived
 * from array position rather than a stored flag, so reordering in the Studio
 * moves the emphasis with it. Stacks on phones, pairs two-across from `md`.
 */
export default function LinkButtons({ buttons }: { buttons: LinkButton[] }) {
  return (
    <div className="flex flex-col gap-3 px-5 md:grid md:grid-cols-2">
      {buttons.map((button, i) => {
        const primary = i === 0;

        return (
          <SafeLink
            key={button.href + button.label}
            href={button.href}
            openInNewTab={button.openInNewTab}
            className={`flex min-h-[56px] items-center justify-between gap-3 rounded-xl px-[18px] py-3 transition-all duration-150 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-[3px] ${
              primary
                ? "bg-green shadow-[3px_3px_0_#1C1B19] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-green-dark hover:shadow-[1px_1px_0_#1C1B19]"
                : "border border-border-line bg-paper hover:border-green hover:bg-surface"
            }`}
          >
            <span className="flex flex-col gap-px">
              <span
                className={`font-display font-bold ${
                  primary ? "text-[17px] text-paper" : "text-base text-ink"
                }`}
              >
                {button.label}
              </span>
              {button.sublabel && (
                <span
                  className={`font-body text-[11px] font-medium ${
                    primary ? "text-paper/70" : "text-muted"
                  }`}
                >
                  {button.sublabel}
                </span>
              )}
            </span>

            <span
              className={`flex shrink-0 items-center gap-1.5 font-body text-[11px] font-semibold ${
                primary ? "text-paper" : "text-muted"
              }`}
            >
              {button.meta}
              <span aria-hidden className="font-display text-[18px]">
                →
              </span>
            </span>
          </SafeLink>
        );
      })}
    </div>
  );
}
