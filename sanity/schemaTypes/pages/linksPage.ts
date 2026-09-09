import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * `/links` — the link-in-bio page.
 *
 * Standalone by design: it renders without the site header and footer, so its
 * own wordmark, call to action and footer all live here. The page is a header
 * and a grid of posts, nothing between them — social profiles are not repeated
 * here either, the row reads `siteSettings.socialLinks`, the same list the site
 * footer uses.
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
    defineField({
      name: "logoMark",
      title: "Logo mark",
      type: "string",
      group: "profile",
      description: "The single glyph before the wordmark, e.g. “✱”.",
      initialValue: "✱",
    }),
    defineField({
      name: "wordmark",
      title: "Wordmark",
      type: "string",
      group: "profile",
      description: "Shown large at the top, e.g. “keewee.in”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cta",
      title: "Button",
      type: "link",
      group: "profile",
      description: "The one call to action on the page, e.g. “Book a free audit”.",
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
