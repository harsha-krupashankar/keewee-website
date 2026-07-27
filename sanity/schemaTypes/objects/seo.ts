import { defineField, defineType } from "sanity";

/**
 * Per-document metadata overrides. Every field is optional — the page falls back
 * to its own content (title, dek) and then to the defaults on Site settings.
 */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Meta title",
      type: "string",
      description:
        "Overrides the browser tab and search result title. Aim for under 60 characters.",
      validation: (rule) => rule.max(70).warning("Titles over 70 characters get truncated."),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Shown in search results. Aim for 120–160 characters.",
      validation: (rule) =>
        rule.max(180).warning("Descriptions over 180 characters get truncated."),
    }),
    defineField({
      name: "image",
      title: "Social share image",
      type: "figure",
      description: "1200×630 works best. Falls back to the site default.",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
