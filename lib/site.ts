export const SITE_URL = "https://www.keewee.in";

/**
 * Vercel serves production from `www.keewee.in` and redirects the apex to it,
 * but the apex is still a host real requests can arrive on mid-redirect. Both
 * count as canonical so the indexing guards in `proxy.ts` and `app/robots.ts`
 * don't mistake either for a preview deployment.
 */
export const CANONICAL_HOSTS = new Set(["keewee.in", "www.keewee.in"]);
