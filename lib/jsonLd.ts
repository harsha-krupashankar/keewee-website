import { richTextToPlainText } from "@/lib/format";
import { SITE_URL } from "@/lib/site";
import { urlFor } from "@/sanity/lib/image";
import type { FaqItem, HomePage, Post, ServicePage, SiteSettings } from "@/sanity/lib/types";

/**
 * schema.org builders. The root layout emits the Organization and WebSite
 * nodes under stable `@id`s; page-level nodes reference them by id instead of
 * repeating them, so crawlers see one entity graph across the site.
 */

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const ref = (id: string) => ({ "@id": id });

export function siteGraph(settings?: SiteSettings | null) {
  const name = settings?.title ?? "keewee.in";
  const description = settings?.defaultSeo?.description ?? undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name,
        url: SITE_URL,
        description,
        slogan: settings?.tagline ?? undefined,
        email: settings?.contactEmail ?? undefined,
        sameAs: settings?.socialLinks?.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name,
        url: SITE_URL,
        description,
        inLanguage: "en",
        publisher: ref(ORGANIZATION_ID),
      },
    ],
  };
}

export function faqPage(items?: FaqItem[] | null) {
  if (!items?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: richTextToPlainText(item.answer),
      },
    })),
  };
}

export function homeWebPage(page: HomePage) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: page.seo?.title?.trim() ?? undefined,
    description: page.seo?.description?.trim() ?? undefined,
    dateModified: page._updatedAt,
    isPartOf: ref(WEBSITE_ID),
    about: ref(ORGANIZATION_ID),
  };
}

export function blogPosting(post: Post) {
  const url = `${SITE_URL}/blogs/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline: post.title,
    description: post.dek,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    image: post.heroImage?.asset?._ref
      ? urlFor(post.heroImage).width(1200).height(630).fit("crop").url()
      : undefined,
    articleSection: post.category?.title,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          jobTitle: post.author.role ?? undefined,
          worksFor: ref(ORGANIZATION_ID),
        }
      : undefined,
    publisher: ref(ORGANIZATION_ID),
    isPartOf: ref(WEBSITE_ID),
    inLanguage: "en",
  };
}

export function service(doc: ServicePage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${doc.slug}#service`,
    url: `${SITE_URL}/services/${doc.slug}`,
    name: doc.category,
    serviceType: doc.category,
    description: doc.heroSub,
    provider: ref(ORGANIZATION_ID),
    hasOfferCatalog: doc.offerings?.length
      ? {
          "@type": "OfferCatalog",
          name: doc.category,
          itemListElement: doc.offerings.map((o) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: o.title, description: o.description },
          })),
        }
      : undefined,
  };
}
