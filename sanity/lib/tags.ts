/**
 * Cache tags attached to every query, so the webhook route can invalidate by
 * document type without knowing which pages consumed it.
 *
 * The Live Content API already revalidates open sessions via its own sync tags;
 * these coarse tags are what keep a fully static build fresh when nobody has the
 * site open. See `app/api/revalidate/route.ts`.
 */
export const TAG = {
  siteSettings: "siteSettings",
  navigation: "navigation",
  person: "person",
  post: "post",
  category: "category",
  servicePage: "servicePage",
  legalDoc: "legalDoc",
  faqGroup: "faqGroup",
  homePage: "homePage",
  aboutPage: "aboutPage",
  blogIndexPage: "blogIndexPage",
  faqPage: "faqPage",
  freeAuditPage: "freeAuditPage",
  newsletterPage: "newsletterPage",
  servicesPage: "servicesPage",
} as const;

export type Tag = (typeof TAG)[keyof typeof TAG];
