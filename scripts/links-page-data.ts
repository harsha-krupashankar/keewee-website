/**
 * Starting content for the `/links` page.
 *
 * DELIBERATELY MINIMAL. An earlier version of this file carried the copy from
 * the design artboards, which is mockup filler: a testimonial attributed to a
 * named person, client metrics, a webinar with a registration count, a job
 * opening, subscriber and prompt counts. None of it was true, and seeding it
 * put fabricated claims on the live site — including a testimonial, while the
 * service pages still say "This section will have real names and real results
 * soon."
 *
 * So the seed now lays down only what is structurally real: who the page is,
 * where it links, and the section labels. Social profiles are not here either
 * — the page reads `siteSettings.socialLinks`, the same list as the footer. The featured card, the banners and
 * the feed tiles ship empty, and every one of those sections renders nothing
 * until an editor fills it in. Add real content in the Studio, not here.
 */

/**
 * Real destinations only. No counts — "48 prompts", "2.4k subscribers" and the
 * like are claims, and a claim that drifts out of date is worse than no claim.
 */
export const linksButtons = [
  { label: "Book a free audit", href: "/free-audit" },
  { label: "Read the blog", href: "/blog" },
  { label: "Visit our AI prompt library", href: "/prompt-library" },
  { label: "Subscribe to our newsletter", href: "/newsletter" },
];
