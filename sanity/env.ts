/**
 * Environment configuration for the Sanity integration.
 *
 * Everything here is read once at module load so a missing variable fails loudly
 * at boot rather than producing a confusing 404 from the Content Lake later.
 */

function assertValue<T>(value: T | undefined, errorMessage: string): T {
  if (value === undefined) {
    throw new Error(errorMessage);
  }
  return value;
}

/**
 * Pinned API version. Bump this deliberately and re-run `npm run typegen` — never
 * leave it floating, or a Content Lake change can alter query results silently.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-27";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

/** Where the embedded Studio is mounted. Used for stega click-to-edit links. */
export const studioUrl = "/studio";

/**
 * Server-only token with Viewer rights. Required for draft perspectives and
 * stega encoding; absent in the browser bundle.
 */
export const readToken = process.env.SANITY_API_READ_TOKEN;
