import { defineField, defineType } from "sanity";

/**
 * One record per human. The About page team grid and blog post bylines both read
 * from here, so a role change is edited once rather than in two places.
 */
export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      description: "e.g. CEO, CTO",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "initials",
      type: "string",
      description:
        "Shown in the avatar circle when no photo is set. Usually two letters.",
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "photo",
      type: "figure",
    }),
    defineField({
      name: "bio",
      type: "text",
      rows: 4,
      description: "Shown on the About page team card and under blog posts.",
    }),
    defineField({
      name: "funFact",
      title: "Fun fact",
      type: "object",
      fields: [
        defineField({
          name: "label",
          type: "string",
          description: "e.g. “Maybe a fun fact”",
        }),
        defineField({ name: "text", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "onTeamPage",
      title: "Show on the About page",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first in the team grid.",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Team order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
