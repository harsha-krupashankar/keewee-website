import { defineField, defineType } from "sanity";

export const faqPage = defineType({
  name: "faqPage",
  title: "FAQ page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "cta", title: "Closing CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "hero", type: "pageHero", group: "hero" }),
    defineField({
      name: "ctaHeadline",
      title: "Headline",
      type: "headline",
      group: "cta",
    }),
    defineField({ name: "ctaBody", title: "Body", type: "richText", group: "cta" }),
    defineField({ name: "ctaButtons", title: "Buttons", type: "cta", group: "cta" }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "FAQ page" }) },
});
