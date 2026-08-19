import { defineArrayMember, defineField, defineType } from "sanity";

import { slugField } from "../shared/slug";

/**
 * A themed set of questions on the FAQ page (Pricing, How We Work, …).
 *
 * Kept as its own document rather than an array on the FAQ page so a group can
 * grow past a comfortable inline-editing size, and so the anchor nav can key off
 * a stable slug.
 */
export const faqGroup = defineType({
  name: "faqGroup",
  title: "FAQ group",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Section heading, e.g. Pricing & Contracts",
      validation: (rule) => rule.required(),
    }),
    slugField({ source: "title", description: "Used as the anchor link target." }),
    defineField({
      name: "navLabel",
      title: "Nav label",
      type: "string",
      description: "Shorter label for the sidebar, e.g. Pricing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [defineArrayMember({ type: "faqItem" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", items: "items" },
    prepare: ({ title, items }) => ({
      title,
      subtitle: `${(items as unknown[] | undefined)?.length ?? 0} questions`,
    }),
  },
});
