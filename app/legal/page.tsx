import { notFound, redirect } from "next/navigation";

import { getLegalSlugs } from "@/sanity/lib/content";

/**
 * `/legal` has no page of its own — it sends you to whichever document is first
 * by sort order in the Studio, so renaming or reordering the legal docs never
 * leaves a dead link here.
 */
export default async function LegalIndexRoute() {
  const slugs = await getLegalSlugs();
  const first = slugs[0]?.slug;
  if (!first) notFound();

  redirect(`/legal/${first}`);
}
