import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Legal documents keep a typed block union rather than free portable text.
 *
 * Clause numbers, definition terms, and the contact block are structured data
 * the renderer lays out precisely — flattening them into prose would lose the
 * numbering and make cross-referencing a clause impossible.
 */

export const legalClause = defineType({
  name: "legalClause",
  title: "Numbered clause",
  type: "object",
  fields: [
    defineField({
      name: "number",
      title: "Clause number",
      type: "string",
      description: "e.g. 4.1",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { number: "number", heading: "heading", subtitle: "text" },
    prepare: ({ number, heading, subtitle }) => ({
      title: `${number} ${heading}`,
      subtitle,
    }),
  },
});

export const legalSubheading = defineType({
  name: "legalSubheading",
  title: "Sub-heading",
  type: "object",
  fields: [
    defineField({
      name: "number",
      title: "Clause number",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { number: "number", heading: "heading" },
    prepare: ({ number, heading }) => ({
      title: `${number} ${heading}`,
      subtitle: "Sub-heading",
    }),
  },
});

export const legalParagraph = defineType({
  name: "legalParagraph",
  title: "Paragraph",
  type: "object",
  fields: [
    defineField({
      name: "text",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "text" },
    prepare: ({ title }) => ({ title, subtitle: "Paragraph" }),
  },
});

export const legalDefinition = defineType({
  name: "legalDefinition",
  title: "Definition",
  type: "object",
  fields: [
    defineField({
      name: "term",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "term", subtitle: "text" },
    prepare: ({ title, subtitle }) => ({ title, subtitle: `Definition — ${subtitle}` }),
  },
});

export const legalList = defineType({
  name: "legalList",
  title: "Bulleted list",
  type: "object",
  fields: [
    defineField({
      name: "items",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: (items as string[] | undefined)?.[0] ?? "List",
      subtitle: `List — ${(items as string[] | undefined)?.length ?? 0} items`,
    }),
  },
});

export const legalNote = defineType({
  name: "legalNote",
  title: "Note",
  type: "object",
  fields: [
    defineField({
      name: "text",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "text" },
    prepare: ({ title }) => ({ title, subtitle: "Note" }),
  },
});

export const legalContact = defineType({
  name: "legalContact",
  title: "Contact block",
  type: "object",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "city", type: "string" }),
    defineField({
      name: "email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "email" },
  },
});

/** One titled section of a legal document. */
export const legalSection = defineType({
  name: "legalSection",
  title: "Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "blocks",
      type: "array",
      of: [
        defineArrayMember({ type: "legalParagraph" }),
        defineArrayMember({ type: "legalClause" }),
        defineArrayMember({ type: "legalSubheading" }),
        defineArrayMember({ type: "legalDefinition" }),
        defineArrayMember({ type: "legalList" }),
        defineArrayMember({ type: "legalNote" }),
        defineArrayMember({ type: "legalContact" }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", blocks: "blocks" },
    prepare: ({ title, blocks }) => ({
      title,
      subtitle: `${(blocks as unknown[] | undefined)?.length ?? 0} blocks`,
    }),
  },
});
