import { defineField, defineType } from "sanity";

import { slugField } from "../shared/slug";

/** Blog taxonomy. Drives the filter pills on the blog index. */
export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    slugField({ source: "title" }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Controls the order of the filter pills on the blog index.",
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
    select: { title: "title", subtitle: "description" },
  },
});
