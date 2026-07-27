import Image from "next/image";

import { dimensionsFromRef, urlFor } from "@/sanity/lib/image";
import type { SanityImage as SanityImageValue } from "@/sanity/lib/types";

/**
 * `next/image` fed from the Sanity CDN.
 *
 * Intrinsic dimensions come from the asset `_ref` (or the queried metadata), so
 * layout space is reserved without a network round trip. `lqip` from the same
 * metadata gives us a real blur placeholder rather than a grey box.
 */
export default function SanityImage({
  image,
  width = 1600,
  sizes = "100vw",
  className,
  priority = false,
}: {
  image?: SanityImageValue | null;
  width?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  if (!image?.asset?._ref) return null;

  const intrinsic = image.dimensions ?? dimensionsFromRef(image.asset._ref);
  if (!intrinsic) return null;

  const height = Math.round((width / intrinsic.width) * intrinsic.height);

  return (
    <Image
      src={urlFor(image).width(width).url()}
      alt={image.alt ?? ""}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      priority={priority}
      placeholder={image.lqip ? "blur" : undefined}
      blurDataURL={image.lqip ?? undefined}
    />
  );
}
