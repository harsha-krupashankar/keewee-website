import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Meta" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dek",
      title: "Dek",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "The one or two sentence summary under the headline. Also used as the card excerpt on the blog index.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      type: "figure",
      group: "content",
    }),
    defineField({
      name: "body",
      type: "postBody",
      group: "content",
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      group: "meta",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "person" }],
      group: "meta",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "meta",
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "readTime",
      title: "Read time (minutes)",
      type: "number",
      group: "meta",
      description: "Leave blank to estimate from the body at 220 words a minute.",
      validation: (rule) => rule.min(1).max(120),
    }),
    defineField({
      name: "featured",
      title: "Feature in Top Reads",
      type: "boolean",
      group: "meta",
      description:
        "The blog index shows the three most recent featured posts. Leave off for everything else.",
      initialValue: false,
    }),
    defineField({
      name: "related",
      title: "Related posts",
      type: "array",
      group: "meta",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "post" }],
        }),
      ],
      description:
        "Up to three. Leave empty to fall back to the newest posts in the same category.",
      validation: (rule) => rule.max(3).unique(),
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category.title",
      date: "publishedAt",
      media: "heroImage",
    },
    prepare: ({ title, category, date, media }) => ({
      title,
      subtitle: [category, date ? new Date(date).toLocaleDateString() : null]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
});
