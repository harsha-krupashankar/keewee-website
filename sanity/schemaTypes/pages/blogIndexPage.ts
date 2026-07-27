import { defineField, defineType } from "sanity";

export const blogIndexPage = defineType({
  name: "blogIndexPage",
  title: "Blog index page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "sections", title: "Sections" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "hero", type: "pageHero", group: "hero" }),

    defineField({
      name: "topReadsHeader",
      title: "Top reads header",
      type: "sectionHeader",
      group: "sections",
      description:
        "The posts themselves come from blog posts flagged “Feature in Top Reads”.",
    }),
    defineField({
      name: "archiveHeader",
      title: "Archive header",
      type: "sectionHeader",
      group: "sections",
    }),

    defineField({
      name: "newsletterHeadline",
      title: "Newsletter banner headline",
      type: "headline",
      group: "sections",
    }),
    defineField({
      name: "newsletterBody",
      title: "Newsletter banner body",
      type: "richText",
      group: "sections",
    }),
    defineField({
      name: "newsletterCta",
      title: "Newsletter banner button",
      type: "link",
      group: "sections",
    }),

    defineField({
      name: "ctaHeadline",
      title: "Closing CTA headline",
      type: "headline",
      group: "sections",
    }),
    defineField({
      name: "ctaBody",
      title: "Closing CTA body",
      type: "richText",
      group: "sections",
    }),
    defineField({
      name: "ctaButtons",
      title: "Closing CTA buttons",
      type: "cta",
      group: "sections",
    }),

    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Blog index page" }) },
});
