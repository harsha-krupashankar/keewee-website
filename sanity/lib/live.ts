import { cookies, draftMode } from "next/headers";
import {
  defineLive,
  resolvePerspectiveFromCookies,
  resolveVariantFromCookies,
  type LivePerspective,
} from "next-sanity/live";

import { readToken } from "@/sanity/env";
import { client } from "@/sanity/lib/client";

/**
 * Live Content API wiring.
 *
 * `strict: true` is required by Cache Components: `draftMode()` and `cookies()`
 * cannot be read inside a `'use cache'` scope, so every fetch must be handed its
 * perspective/stega explicitly from outside the cache boundary.
 *
 * `sanityFetch` calls `cacheTag()` and `cacheLife()` internally, which means it
 * may only be called inside a `'use cache'` scope. All call sites live in
 * `sanity/lib/queries/*`, which are cached functions.
 */
export const { sanityFetch, SanityLive } = defineLive({
  client,
  // Never shared with the browser except through <SanityLive includeDrafts />,
  // which only happens when draft mode is already on.
  serverToken: readToken,
  browserToken: readToken,
  strict: true,
});

export type FetchOptions = {
  perspective: LivePerspective;
  variant?: string;
  stega: boolean;
};

/** What published visitors get: cacheable, no stega noise in the markup. */
export const PUBLISHED: FetchOptions = { perspective: "published", stega: false };

/**
 * Resolves the perspective for the current request. Must be called *outside* any
 * `'use cache'` boundary, then threaded down as props.
 */
export async function getFetchOptions(): Promise<FetchOptions> {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return PUBLISHED;

  const jar = await cookies();
  const perspective = await resolvePerspectiveFromCookies({ cookies: jar });
  const variant = await resolveVariantFromCookies({ cookies: jar });

  return { perspective: perspective ?? "drafts", variant, stega: true };
}
