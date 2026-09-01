import type {
  BannerCard,
  FeaturedCard,
  FeedTile,
  LinkButton,
  LinkDestination,
  SocialLink,
} from "@/sanity/lib/types";

/** Minimal valid shapes, overridable per test. */

export function destination(over: Partial<LinkDestination> = {}): LinkDestination {
  return { label: "Read the teardown", href: "/blog", ...over };
}

export function tile(over: Partial<FeedTile> = {}): FeedTile {
  return {
    _key: over._key ?? "k1",
    style: "surface",
    title: "A post",
    destinations: [destination()],
    ...over,
  };
}

export function button(over: Partial<LinkButton> = {}): LinkButton {
  return { label: "Book a free audit", href: "/free-audit", ...over };
}

export function banner(over: Partial<BannerCard> = {}): BannerCard {
  return { tone: "dark", title: "A banner", href: "/x", ...over };
}

export function featured(over: Partial<FeaturedCard> = {}): FeaturedCard {
  return { title: "A video", href: "https://example.com", ...over };
}

export function social(over: Partial<SocialLink> = {}): SocialLink {
  return { platform: "instagram", href: "https://instagram.com/x", ...over };
}
