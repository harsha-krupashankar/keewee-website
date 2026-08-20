/**
 * The app's entire read surface against Sanity.
 *
 * Every function here is a `'use cache'` boundary. That is not optional:
 * `sanityFetch` calls `cacheTag()` and `cacheLife()` internally, which throw
 * outside a caching scope. It also means `draftMode()` and `cookies()` must be
 * resolved by the caller — pass the result of `getFetchOptions()` down as the
 * `opts` argument, which becomes part of the cache key.
 */
import { sanityFetch, type FetchOptions } from "@/sanity/lib/live";
import { TAG } from "@/sanity/lib/tags";
import * as Q from "@/sanity/lib/queries";
import type * as T from "@/sanity/lib/types";

type Fetch = { query: string; params?: Record<string, unknown>; tags: string[] };

/**
 * Cache Components requires every `generateStaticParams` to return at least one
 * entry — an empty array is a build error, because Next uses the sample param to
 * prove the route makes no un-cached dynamic access.
 *
 * A dataset can legitimately have zero of something: a brand-new project, a
 * fresh preview dataset, or simply no legal documents yet. Rather than let that
 * fail the build, fall back to a slug that cannot exist. The route's own
 * `notFound()` handles it, so the placeholder renders as a 404 and nothing links
 * to it.
 */
const PLACEHOLDER_SLUG = "__placeholder__";

export function toStaticParams(slugs: { slug: string }[]) {
  return slugs.length > 0 ? slugs : [{ slug: PLACEHOLDER_SLUG }];
}

async function run<Result>(opts: FetchOptions, { query, params, tags }: Fetch) {
  const { data } = await sanityFetch({
    query,
    params,
    perspective: opts.perspective,
    variant: opts.variant,
    stega: opts.stega,
    tags,
  });
  return (data ?? null) as Result | null;
}

// --- Global ---------------------------------------------------------------

export async function getSiteSettings(opts: FetchOptions) {
  "use cache";
  return run<T.SiteSettings>(opts, {
    query: Q.SITE_SETTINGS_QUERY,
    tags: [TAG.siteSettings],
  });
}

// --- Pages ----------------------------------------------------------------

export async function getHomePage(opts: FetchOptions) {
  "use cache";
  return run<T.HomePage>(opts, {
    query: Q.HOME_PAGE_QUERY,
    tags: [TAG.homePage, TAG.servicePage],
  });
}

export async function getAboutPage(opts: FetchOptions) {
  "use cache";
  return run<T.AboutPage>(opts, {
    query: Q.ABOUT_PAGE_QUERY,
    tags: [TAG.aboutPage, TAG.person],
  });
}

export async function getFaqPage(opts: FetchOptions) {
  "use cache";
  return run<T.FaqPage>(opts, {
    query: Q.FAQ_PAGE_QUERY,
    tags: [TAG.faqPage, TAG.faqGroup],
  });
}

export async function getFreeAuditPage(opts: FetchOptions) {
  "use cache";
  return run<T.FreeAuditPage>(opts, {
    query: Q.FREE_AUDIT_PAGE_QUERY,
    tags: [TAG.freeAuditPage],
  });
}

export async function getServicesPage(opts: FetchOptions) {
  "use cache";
  return run<T.ServicesPage>(opts, {
    query: Q.SERVICES_PAGE_QUERY,
    tags: [TAG.servicesPage],
  });
}

export async function getNewsletterPage(opts: FetchOptions) {
  "use cache";
  return run<T.NewsletterPage>(opts, {
    query: Q.NEWSLETTER_PAGE_QUERY,
    tags: [TAG.newsletterPage],
  });
}

export async function getPromptLibraryPage(opts: FetchOptions) {
  "use cache";
  return run<T.PromptLibraryPage>(opts, {
    query: Q.PROMPT_LIBRARY_PAGE_QUERY,
    tags: [TAG.promptLibraryPage],
  });
}

// --- Blog -----------------------------------------------------------------

export async function getBlogIndex(opts: FetchOptions) {
  "use cache";
  return run<T.BlogIndexPage>(opts, {
    query: Q.BLOG_INDEX_QUERY,
    tags: [TAG.blogIndexPage, TAG.post, TAG.category],
  });
}

export async function getPost(slug: string, opts: FetchOptions) {
  "use cache";
  // The query dereferences the author and the category, so renaming either has
  // to invalidate the post page too — the webhook only knows document types.
  return run<T.Post>(opts, {
    query: Q.POST_QUERY,
    params: { slug: slug.trim() },
    tags: [TAG.post, TAG.person, TAG.category],
  });
}

export async function getPostSlugs() {
  "use cache";
  const slugs = await run<{ slug: string; updatedAt: string }[]>(
    { perspective: "published", stega: false },
    { query: Q.POST_SLUGS_QUERY, tags: [TAG.post] }
  );
  return slugs ?? [];
}

// --- Service pages --------------------------------------------------------

export async function getServicePage(slug: string, opts: FetchOptions) {
  "use cache";
  return run<T.ServicePage>(opts, {
    query: Q.SERVICE_PAGE_QUERY,
    params: { slug: slug.trim() },
    tags: [TAG.servicePage],
  });
}

export async function getServiceSlugs() {
  "use cache";
  const slugs = await run<{ slug: string; updatedAt: string }[]>(
    { perspective: "published", stega: false },
    { query: Q.SERVICE_SLUGS_QUERY, tags: [TAG.servicePage] }
  );
  return slugs ?? [];
}

// --- Legal ----------------------------------------------------------------

export async function getLegalDoc(slug: string, opts: FetchOptions) {
  "use cache";
  return run<T.LegalDoc>(opts, {
    query: Q.LEGAL_DOC_QUERY,
    params: { slug: slug.trim() },
    tags: [TAG.legalDoc],
  });
}

export async function getLegalDocs(opts: FetchOptions) {
  "use cache";
  const docs = await run<T.LegalDocSummary[]>(opts, {
    query: Q.LEGAL_DOCS_QUERY,
    tags: [TAG.legalDoc],
  });
  return docs ?? [];
}

export async function getLegalSlugs() {
  "use cache";
  const slugs = await run<{ slug: string; updatedAt: string }[]>(
    { perspective: "published", stega: false },
    { query: Q.LEGAL_SLUGS_QUERY, tags: [TAG.legalDoc] }
  );
  return slugs ?? [];
}
