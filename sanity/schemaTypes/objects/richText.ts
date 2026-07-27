import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Body copy: paragraphs, sub-headings, lists, links, and the emphasis marks the
 * design uses. Used for prose that is a few sentences long.
 */
export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Heading", value: "h3" },
        { title: "Sub-heading", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bulleted", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Lime marker", value: "highlight" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "string",
                description:
                  "External URL, an internal path like /free-audit, or mailto:",
                validation: (rule) => rule.required(),
              }),
              defineField({
                name: "openInNewTab",
                title: "Open in new tab",
                type: "boolean",
                initialValue: false,
              }),
            ],
          }),
        ],
      },
    }),
  ],
});

/**
 * The long-form variant used by blog posts. Adds the editorial blocks the post
 * template renders: inline images, pull quotes, and callouts.
 */
export const postBody = defineType({
  name: "postBody",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Sub-heading", value: "h3" },
      ],
      lists: [
        { title: "Bulleted", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Lime marker", value: "highlight" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "string",
                validation: (rule) => rule.required(),
              }),
              defineField({
                name: "openInNewTab",
                title: "Open in new tab",
                type: "boolean",
                initialValue: false,
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({ type: "figure" }),
    defineArrayMember({
      name: "pullQuote",
      title: "Pull quote",
      type: "object",
      fields: [
        defineField({
          name: "text",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required(),
        }),
        defineField({ name: "attribution", type: "string" }),
      ],
      preview: {
        select: { title: "text" },
        prepare: ({ title }) => ({ title: title ?? "Pull quote", subtitle: "Pull quote" }),
      },
    }),
    defineArrayMember({
      name: "callout",
      title: "Callout",
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
        prepare: ({ title }) => ({ title: title ?? "Callout", subtitle: "Callout" }),
      },
    }),
  ],
});
