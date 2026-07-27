import { defineArrayMember, defineField, defineType } from "sanity";

export const newsletterPage = defineType({
  name: "newsletterPage",
  title: "Newsletter page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "why", title: "Why subscribe" },
    { name: "inside", title: "What's inside" },
    { name: "afterHours", title: "After Hours" },
    { name: "cta", title: "Closing CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "hero", type: "pageHero", group: "hero" }),
    defineField({
      name: "formTitle",
      title: "Form label",
      type: "string",
      group: "hero",
      description: "e.g. “Get the next issue”",
    }),
    defineField({
      name: "formButtonLabel",
      title: "Form button",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "formDisclaimer",
      title: "Form disclaimer",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "formSuccessSticker",
      title: "Success sticker",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "formSuccessText",
      title: "Success message",
      type: "text",
      rows: 2,
      group: "hero",
    }),

    defineField({
      name: "whyHeader",
      title: "Header",
      type: "sectionHeader",
      group: "why",
    }),
    defineField({
      name: "whyReasons",
      title: "Reasons",
      type: "array",
      group: "why",
      of: [defineArrayMember({ type: "titledCard" })],
    }),

    defineField({
      name: "insideHeader",
      title: "Header",
      type: "sectionHeader",
      group: "inside",
    }),
    defineField({
      name: "insideItems",
      title: "Items",
      type: "array",
      group: "inside",
      of: [defineArrayMember({ type: "titledCard" })],
    }),

    defineField({
      name: "afterHoursHeader",
      title: "Header",
      type: "sectionHeader",
      group: "afterHours",
    }),
    defineField({
      name: "afterHoursBody",
      title: "Body",
      type: "richText",
      group: "afterHours",
    }),

    defineField({
      name: "ctaEyebrow",
      title: "Eyebrow",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaHeadline",
      title: "Headline",
      type: "headline",
      group: "cta",
    }),
    defineField({ name: "ctaBody", title: "Body", type: "richText", group: "cta" }),
    defineField({ name: "ctaButton", title: "Button", type: "link", group: "cta" }),
    defineField({
      name: "ctaSecondaryLabel",
      title: "Secondary link label",
      type: "string",
      group: "cta",
      description: "Scrolls back to the subscribe form.",
    }),

    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Newsletter page" }) },
});
