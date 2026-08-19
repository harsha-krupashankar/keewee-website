import { defineArrayMember, defineField, defineType } from "sanity";

import { slugField } from "../shared/slug";

export const legalDoc = defineType({
  name: "legalDoc",
  title: "Legal document",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "e.g. Terms of Service",
      validation: (rule) => rule.required(),
    }),
    slugField({ source: "title", description: "Served at /legal/<slug>" }),
    defineField({
      name: "label",
      title: "Short label",
      type: "string",
      description: "Used in the footer and the legal index.",
    }),
    defineField({
      name: "eyebrow",
      type: "string",
      description: "e.g. Legal · Terms of Service",
    }),
    defineField({
      name: "entity",
      title: "Legal entity",
      type: "string",
      description: "The registered company name this document is issued by.",
    }),
    defineField({
      name: "updatedAt",
      title: "Last updated",
      type: "date",
      description: "Shown to readers as the effective date.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sections",
      type: "array",
      of: [defineArrayMember({ type: "legalSection" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      initialValue: 0,
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "updatedAt" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? `Updated ${subtitle}` : undefined,
    }),
  },
});
