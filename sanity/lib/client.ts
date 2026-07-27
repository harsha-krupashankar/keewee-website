import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/env";

/**
 * Base client. `sanityFetch` (see `sanity/lib/live.ts`) reconfigures this per
 * call, so prefer that for anything rendered. Use this directly only for
 * one-off server work such as validating a slug in the draft-mode route.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: {
    // Enables click-to-edit overlays in the Presentation tool. Turned on
    // per-fetch by `sanityFetch`; the URL is what makes the overlay resolvable.
    studioUrl,
  },
});
