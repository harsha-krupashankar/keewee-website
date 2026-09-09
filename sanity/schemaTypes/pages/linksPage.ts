import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * `/links` — the link-in-bio page.
 *
 * Standalone by design: it renders without the site header and footer, so its
 * own call to action and footer live here. The page is a header and a grid of
 * posts, nothing between them.
 *
 * Two things deliberately are not fields. Social profiles come from
 * `siteSettings.socialLinks`, the same list the site footer uses, so the two can
 * never drift. The logo mark and wordmark are hardcoded in the component — they
 * are the brand, not content about it.
 */
export const linksPage = defineType({
  name: "linksPage",
  title: "Links page",
  type: "document",
  groups: [
    { name: "profile", title: "Header", default: true },
    { name: "feed", title: "Posts" },
    { name: "footer", title: "Footer" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // --- Header ----------------------------------------------------------
    // The logo mark and the wordmark are not fields. They are the identity of
    // the site rather than copy about it, they have never changed, and an
    // editable brand is an editable brand to get wrong. Both live in
    // `components/links/LinksProfile.tsx`.
    defineField({
      name: "cta",
      title: "CTA button",
      type: "link",
      group: "profile",
      description:
        "The one call to action on the page. Prefilled with the booking link — change the label or point it elsewhere, but leave it set: the header has nothing else to tap.",
      initialValue: {
        label: "Book a free audit",
        href: "https://calendly.com/kanan-keewee/30min",
        openInNewTab: true,
      },
    }),

    // --- Posts -----------------------------------------------------------
    defineField({
      name: "feedTiles",
      title: "Posts",
      type: "array",
      group: "feed",
      of: [defineArrayMember({ type: "feedTile" })],
      description: "The grid, in order. Three to a row.",
    }),

    // --- Footer ----------------------------------------------------------
    defineField({
      name: "footerLinks",
      title: "Footer links",
      type: "array",
      group: "footer",
      of: [defineArrayMember({ type: "link" })],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "footerNote",
      title: "Footer note",
      type: "string",
      group: "footer",
      description: "e.g. “© 2026 Keewee Marketing Pvt Ltd.”",
    }),

    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Links page" }) },
});
