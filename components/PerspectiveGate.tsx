import { draftMode } from "next/headers";
import { Suspense } from "react";

import { getFetchOptions, PUBLISHED, type FetchOptions } from "@/sanity/lib/live";

/**
 * Picks the content perspective for a route and hands it to `render`.
 *
 * Cache Components forbids reading `cookies()` inside a `'use cache'` scope, and
 * every Sanity read in this app is cached. So the perspective has to be resolved
 * here, above the cache boundary, and threaded down as an argument.
 *
 * Published visitors get `PUBLISHED` synchronously, which keeps the route fully
 * prerenderable. Only draft-mode requests take the Suspense branch and pay for
 * the cookie read at request time.
 */
export default async function PerspectiveGate({
  render,
  fallback = null,
}: {
  render: (opts: FetchOptions) => React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  if (!isDraftMode) return <>{render(PUBLISHED)}</>;

  return (
    <Suspense fallback={fallback}>
      <DraftBranch render={render} />
    </Suspense>
  );
}

async function DraftBranch({
  render,
}: {
  render: (opts: FetchOptions) => React.ReactNode;
}) {
  return <>{render(await getFetchOptions())}</>;
}
