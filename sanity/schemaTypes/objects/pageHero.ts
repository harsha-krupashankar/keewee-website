import { defineField, defineType } from "sanity";

/**
 * The top-of-page hero shared by About, FAQ, Free audit, Newsletter and Blog.
 * The home page hero is bespoke (two stickers, a footnote) and defines its own
 * fields on `homePage`.
 */
export const pageHero = defineType({
  name: "pageHero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: "The small pill above the headline, e.g. “About us”.",
    }),
    defineField({
      name: "headline",
      type: "headline",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "intro", title: "Intro", type: "richText" }),
    defineField({ name: "cta", title: "Button", type: "link" }),
    defineField({
      name: "sticker",
      title: "Sticker",
      type: "string",
      description: "Optional handwritten-style badge floating in the hero.",
    }),
  ],
  preview: {
    select: { badge: "badge" },
    prepare: ({ badge }) => ({ title: badge ?? "Hero" }),
  },
});
