import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * One copyable prompt. `promptText` is plain text (not rich text) because it's
 * copied verbatim to the clipboard — line breaks are meaningful, marks are not.
 */
export const promptEntry = defineType({
  name: "promptEntry",
  title: "Prompt",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bestTool",
      title: "Best used in",
      type: "string",
      description: "e.g. “ChatGPT or Claude”. A preference shown as a pill, not a rule.",
    }),
    defineField({
      name: "useCase",
      title: "Use case",
      type: "text",
      rows: 2,
      description: "One sentence: when you'd reach for this prompt.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "promptText",
      title: "Prompt text",
      type: "text",
      rows: 10,
      description: "The full prompt, copied to the clipboard as-is. Keep [bracket] placeholders.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tip",
      title: "Keewee tip",
      type: "text",
      rows: 2,
      description: "Optional callout under the prompt. Leave blank to hide it.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "bestTool" },
  },
});

/**
 * One numbered section of the prompt library, e.g. “Positioning & Messaging”.
 * Numbering and the pill filter list are derived from array position at render
 * time — reordering categories in the Studio renumbers and re-anchors on its own.
 */
export const promptCategory = defineType({
  name: "promptCategory",
  title: "Prompt category",
  type: "object",
  fields: [
    defineField({
      name: "name",
      type: "string",
      description: "Follows the number in the eyebrow, e.g. “Positioning & Messaging”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "prompts",
      title: "Prompts",
      type: "array",
      of: [defineArrayMember({ type: "promptEntry" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "name", prompts: "prompts" },
    prepare: ({ title, prompts }) => ({
      title: title ?? "Prompt category",
      subtitle: `${Array.isArray(prompts) ? prompts.length : 0} prompts`,
    }),
  },
});
