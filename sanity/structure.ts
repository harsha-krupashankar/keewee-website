import type { StructureResolver } from "sanity/structure";

/**
 * Studio sidebar.
 *
 * Singletons are pinned to a single editable document so nobody can create a
 * second "Home page"; collections keep the normal list + create flow. The order
 * here mirrors how someone thinks about the site: global settings, then pages,
 * then the content that fills them.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),

      S.divider(),

      S.listItem()
        .title("Home page")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("About page")
        .id("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("Blog index page")
        .id("blogIndexPage")
        .child(S.document().schemaType("blogIndexPage").documentId("blogIndexPage")),
      S.listItem()
        .title("FAQ page")
        .id("faqPage")
        .child(S.document().schemaType("faqPage").documentId("faqPage")),
      S.listItem()
        .title("Free audit page")
        .id("freeAuditPage")
        .child(S.document().schemaType("freeAuditPage").documentId("freeAuditPage")),
      S.listItem()
        .title("Services page")
        .id("servicesPage")
        .child(S.document().schemaType("servicesPage").documentId("servicesPage")),
      S.listItem()
        .title("Newsletter page")
        .id("newsletterPage")
        .child(S.document().schemaType("newsletterPage").documentId("newsletterPage")),

      S.divider(),

      S.documentTypeListItem("servicePage").title("Service pages"),

      S.divider(),

      S.listItem()
        .title("Blog")
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("post").title("Posts"),
              S.documentTypeListItem("category").title("Categories"),
            ])
        ),
      S.documentTypeListItem("person").title("People"),
      S.documentTypeListItem("faqGroup").title("FAQ groups"),
      S.documentTypeListItem("legalDoc").title("Legal documents"),
    ]);
