import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, projectId } from "@/sanity/env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * On-demand image transforms off the Sanity CDN.
 *
 * @example urlFor(image).width(1200).height(630).fit("crop").url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}

/**
 * Extracts intrinsic dimensions from a Sanity asset `_ref`, so `next/image` can
 * reserve layout space without a network round trip.
 *
 * Asset refs look like: `image-<hash>-<width>x<height>-<format>`
 */
export function dimensionsFromRef(
  ref: string | undefined
): { width: number; height: number } | null {
  if (!ref) return null;
  const dimensions = ref.split("-")[2];
  if (!dimensions) return null;
  const [width, height] = dimensions.split("x").map(Number);
  if (!Number.isFinite(width) || !Number.isFinite(height)) return null;
  return { width, height };
}
