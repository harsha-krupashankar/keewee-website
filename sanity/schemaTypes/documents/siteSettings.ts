import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Singleton. Everything that appears on every page: the marquee, the nav, the
 * footer, contact details, and the SEO defaults each page falls back to.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "navigation", title: "Navigation" },
    { name: "seo", title: "SEO defaults" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Site name",
      type: "string",
      group: "general",
      validation: (rule) => rule.required(),
      initialValue: "keewee.in",
    }),
    defineField({
      name: "tagline",
      type: "string",
      group: "general",
      description: "Short descriptor used in the footer.",
    }),
    defineField({
      name: "contactEmail",
      type: "string",
      group: "general",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "marqueeText",
      title: "Marquee text",
      type: "string",
      group: "general",
      description:
        "The scrolling ticker under the hero. Separate phrases with ✱ and end with a trailing separator so the loop reads cleanly.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headerNav",
      title: "Header navigation",
      type: "array",
      group: "navigation",
      of: [defineArrayMember({ type: "link" })],
    }),
    defineField({
      name: "headerCta",
      title: "Header button",
      type: "link",
      group: "navigation",
    }),
    defineField({
      name: "footerGroups",
      title: "Footer link groups",
      type: "array",
      group: "navigation",
      of: [
        defineArrayMember({
          name: "footerGroup",
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "links",
              type: "array",
              of: [defineArrayMember({ type: "link" })],
            }),
          ],
          preview: {
            select: { title: "title", links: "links" },
            prepare: ({ title, links }) => ({
              title,
              subtitle: `${(links as unknown[] | undefined)?.length ?? 0} links`,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "footerNote",
      title: "Footer note",
      type: "string",
      group: "navigation",
      description: "Copyright or closing line. The year is added automatically.",
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      group: "navigation",
      of: [defineArrayMember({ type: "link" })],
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seo",
      group: "seo",
      description: "Used whenever a page has not set its own.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
