import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The five funnel-stage landing pages, served from the root `/[slug]` route.
 *
 * Adding a sixth service is a Studio action now: create the document, give it a
 * slug, and it appears at that path and in the footer offer list.
 */
export const servicePage = defineType({
  name: "servicePage",
  title: "Service page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "content", title: "Content" },
    { name: "form", title: "Quote form" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "category",
      title: "Service name",
      type: "string",
      group: "hero",
      description: "e.g. Awareness & Brand. Used in the footer and nav.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "hero",
      options: { source: "category", maxLength: 96 },
      description: "Served at the root, e.g. /b2b-saas-demand-generation-agency",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Funnel position",
      type: "number",
      group: "hero",
      description: "1–5, top of funnel first. Orders the footer list.",
      initialValue: 1,
    }),
    defineField({
      name: "heroHeadline",
      title: "Headline",
      type: "headline",
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSub",
      title: "Sub-headline",
      type: "text",
      rows: 3,
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "problemHeadline",
      title: "Problem headline",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "problemBody",
      title: "Problem body",
      type: "richText",
      group: "content",
    }),
    defineField({
      name: "offerings",
      title: "What we do",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "titledCard" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "differently",
      title: "How we do it differently",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "text", rows: 3 })],
    }),
    defineField({
      name: "testimonial",
      title: "Testimonial / placeholder",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "faqItem" })],
    }),
    defineField({
      name: "quoteHeadline",
      title: "Form headline",
      type: "string",
      group: "form",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "serviceScope",
      title: "Scope wording",
      type: "string",
      group: "form",
      description:
        "Slots into the form copy, e.g. “demand gen” in “Tell us about your demand gen”.",
    }),
    defineField({
      name: "serviceCheckboxes",
      title: "Form checkboxes",
      type: "array",
      group: "form",
      of: [defineArrayMember({ type: "string" })],
      description: "The services a prospect can tick on the quote form.",
    }),
    defineField({
      name: "talkHeadline",
      title: "Talk-to-us headline",
      type: "string",
      group: "form",
    }),
    defineField({
      name: "talkBody",
      title: "Talk-to-us body",
      type: "text",
      rows: 3,
      group: "form",
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  orderings: [
    {
      title: "Funnel order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "category", subtitle: "slug.current" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? `/${subtitle}` : "No slug",
    }),
  },
});
