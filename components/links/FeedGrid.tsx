import SanityImage from "@/components/sanity/SanityImage";
import { safeHref } from "@/lib/safe-href";
import type { FeedTile } from "@/sanity/lib/types";

import { outbound } from "./shared";

/**
 * The post grid.
 *
 * One post, one link — no sheet, no count badge, no branching. A tile is an
 * anchor around the post's picture and navigates on tap. A tile meant to point
 * back at Instagram just takes the post's URL as its link, which is why there
 * is no second field for it.
 *
 * The grid runs edge-to-edge with 4px gutters on phones, which puts the tiles
 * well over the 44px target at any phone width. Not a client component: there
 * is no state left to hold.
 */
export default function FeedGrid({ tiles }: { tiles: FeedTile[] }) {
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-1.5">
      {tiles.map((tile) => {
        // A new tab for anything leaving the site — an Instagram post, Calendly
        // — because this page is usually opened inside Instagram's in-app
        // browser, where navigating away is how you lose it. Internal paths
        // stay in the tab. Derived rather than stored: a per-tile toggle is one
        // more decision for an editor and the right answer is never in doubt.
        const external = /^https?:\/\//i.test(tile.href);

        return (
          <a
            key={tile._key}
            href={safeHref(tile.href)}
            {...outbound(external)}
            className="group relative block aspect-square overflow-hidden bg-border-soft transition-transform duration-100 active:scale-[0.965] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-bright focus-visible:-outline-offset-2 md:rounded-[4px]"
          >
            <SanityImage
              image={tile.image}
              width={520}
              sizes="(min-width: 768px) 174px, 33vw"
              className="absolute inset-0 size-full object-cover"
            />
          </a>
        );
      })}
    </div>
  );
}
