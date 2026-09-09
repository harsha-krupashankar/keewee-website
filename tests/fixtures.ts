import type { FeedTile, Link, SanityImage, SocialLink } from "@/sanity/lib/types";

/** Minimal valid shapes, overridable per test. */

export function image(over: Partial<SanityImage> = {}): SanityImage {
  return {
    asset: { _ref: "image-abc-800x800-jpg", _type: "reference" },
    dimensions: { width: 800, height: 800, aspectRatio: 1 },
    ...over,
  };
}

export function tile(over: Partial<FeedTile> = {}): FeedTile {
  return {
    _key: over._key ?? "k1",
    image: image(),
    postUrl: "https://www.instagram.com/p/abc/",
    ...over,
  };
}

export function cta(over: Partial<Link> = {}): Link {
  return { label: "Book a free audit", href: "/free-audit", ...over };
}

export function social(over: Partial<SocialLink> = {}): SocialLink {
  return { platform: "instagram", href: "https://instagram.com/x", ...over };
}
