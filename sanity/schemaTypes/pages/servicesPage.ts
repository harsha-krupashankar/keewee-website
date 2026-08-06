import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The services index at `/services` — the five categories in full, then the
 * audit CTA and the custom-quote form.
 *
 * The individual `servicePage` documents are the deep dives; this page is the
 * catalogue, so its copy is its own rather than assembled from them.
 */
export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "categories", title: "Categories" },
    { name: "audit", title: "Audit CTA" },
    { name: "quote", title: "Quote form" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "hero", type: "pageHero", group: "hero" }),
    defineField({
      name: "heroSecondaryCta",
      title: "Secondary link",
      type: "link",
      group: "hero",
      description: "The underlined text link beside the hero button.",
    }),

    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "categories",
      of: [defineArrayMember({ type: "serviceCategory" })],
      description:
        "Numbered and anchored by position — the first is “01 / …” at #kw-cat1.",
    }),

    defineField({
      name: "auditHeadline",
      title: "Headline",
      type: "headline",
      group: "audit",
    }),
    defineField({ name: "auditBody", title: "Body", type: "richText", group: "audit" }),
    defineField({ name: "auditButton", title: "Button", type: "link", group: "audit" }),

    defineField({
      name: "quoteEyebrow",
      title: "Eyebrow",
      type: "string",
      group: "quote",
    }),
    defineField({
      name: "quoteHeadline",
      title: "Headline",
      type: "headline",
      group: "quote",
    }),
    defineField({ name: "quoteIntro", title: "Intro", type: "richText", group: "quote" }),
    defineField({
      name: "quoteGoalsLabel",
      title: "Goals question",
      type: "string",
      group: "quote",
    }),
    defineField({
      name: "quoteGoals",
      title: "Goal options",
      type: "array",
      group: "quote",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "quoteServicesLabel",
      title: "Services question",
      type: "string",
      group: "quote",
    }),
    defineField({
      name: "quoteServiceGroups",
      title: "Service options",
      type: "array",
      group: "quote",
      of: [defineArrayMember({ type: "checkboxGroup" })],
    }),
    defineField({
      name: "quoteMessagePlaceholder",
      title: "Message placeholder",
      type: "text",
      rows: 3,
      group: "quote",
    }),
    defineField({
      name: "quoteButtonLabel",
      title: "Submit label",
      type: "string",
      group: "quote",
    }),
    defineField({
      name: "quoteNote",
      title: "Note beside the button",
      type: "text",
      rows: 2,
      group: "quote",
    }),
    defineField({
      name: "quoteSuccessSticker",
      title: "Success sticker",
      type: "string",
      group: "quote",
    }),
    defineField({
      name: "quoteSuccessText",
      title: "Success text",
      type: "text",
      rows: 3,
      group: "quote",
    }),

    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Services page" }) },
});
