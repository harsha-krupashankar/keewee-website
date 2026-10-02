import { defineField, defineType } from "sanity";

/**
 * Copy for the 404 page. The "404" numerals and the spinning mark in the middle
 * are part of the design, not fields; the social buttons come from
 * `siteSettings.socialLinks` so they always match the footer.
 */
export const notFoundPage = defineType({
  name: "notFoundPage",
  title: "404 page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "blog", title: "Blog card" },
    { name: "socials", title: "Socials card" },
  ],
  fields: [
    defineField({
      name: "sticker",
      title: "Sticker",
      type: "string",
      group: "hero",
      description: "The tilted label floating top-right, e.g. “OOPS!”",
    }),
    defineField({ name: "headline", type: "headline", group: "hero" }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 2,
      group: "hero",
    }),
    defineField({
      name: "signoff",
      title: "Sign-off",
      type: "string",
      group: "hero",
      description: "Small monospace line under the intro.",
    }),

    defineField({
      name: "blogHeadline",
      title: "Headline",
      type: "string",
      group: "blog",
    }),
    defineField({ name: "blogButton", title: "Button", type: "link", group: "blog" }),

    defineField({
      name: "socialsHeadline",
      title: "Headline",
      type: "string",
      group: "socials",
      description: "The buttons below it are the social links in Site settings.",
    }),
  ],
  preview: { prepare: () => ({ title: "404 page" }) },
});
