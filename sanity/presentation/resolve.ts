import { defineDocuments, defineLocations } from "sanity/presentation";
import type { PresentationPluginOptions } from "sanity/presentation";

/**
 * Wires the Presentation tool in both directions:
 *
 * - `locations` — given a document, which URLs show it. Powers the "Used on"
 *   links in the editor and lets Presentation follow you as you edit.
 * - `mainDocuments` — given a URL, which document is the one to open. Powers
 *   click-to-edit from the preview iframe.
 */
export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: defineDocuments([
    { route: "/", filter: `_type == "homePage"` },
    { route: "/about", filter: `_type == "aboutPage"` },
    { route: "/blog", filter: `_type == "blogIndexPage"` },
    { route: "/faq", filter: `_type == "faqPage"` },
    { route: "/free-audit", filter: `_type == "freeAuditPage"` },
    { route: "/services", filter: `_type == "servicesPage"` },
    { route: "/newsletter", filter: `_type == "newsletterPage"` },
    { route: "/prompt-library", filter: `_type == "promptLibraryPage"` },
    {
      route: "/blog/:slug",
      filter: `_type == "post" && slug.current == $slug`,
    },
    {
      route: "/legal/:slug",
      filter: `_type == "legalDoc" && slug.current == $slug`,
    },
    // Service pages live at the root, so this must come last — it would
    // otherwise swallow every single-segment path above.
    {
      route: "/:slug",
      filter: `_type == "servicePage" && slug.current == $slug`,
    },
  ]),

  locations: {
    homePage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: "Home", href: "/" }] }),
    }),
    aboutPage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: "About", href: "/about" }] }),
    }),
    blogIndexPage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: "Blog", href: "/blog" }] }),
    }),
    faqPage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: "FAQ", href: "/faq" }] }),
    }),
    freeAuditPage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: "Free audit", href: "/free-audit" }] }),
    }),
    servicesPage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: "Services", href: "/services" }] }),
    }),
    newsletterPage: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: "Newsletter", href: "/newsletter" }] }),
    }),
    promptLibraryPage: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: "Prompt library", href: "/prompt-library" }],
      }),
    }),

    post: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Untitled post", href: `/blog/${doc?.slug}` },
          { title: "Blog index", href: "/blog" },
        ],
      }),
    }),
    servicePage: defineLocations({
      select: { title: "category", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Service page", href: `/${doc?.slug}` },
          { title: "Home", href: "/" },
        ],
      }),
    }),
    legalDoc: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Legal document", href: `/legal/${doc?.slug}` },
        ],
      }),
    }),
    faqGroup: defineLocations({
      select: { title: "title" },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || "FAQ", href: "/faq" }],
      }),
    }),
    category: defineLocations({
      select: { title: "title" },
      resolve: () => ({ locations: [{ title: "Blog index", href: "/blog" }] }),
    }),
    person: defineLocations({
      select: { title: "name" },
      resolve: () => ({ locations: [{ title: "About", href: "/about" }] }),
    }),
    siteSettings: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: "Home", href: "/" }],
        message: "Site settings affect the header and footer on every page.",
      }),
    }),
  },
};
