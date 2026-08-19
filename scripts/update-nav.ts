/**
 * Rewrites the header nav and footer columns on the `siteSettings` singleton.
 *
 *   npm run update-nav -- --dry    # print the patch, write nothing
 *   npm run update-nav
 *
 * Only `headerNav`, `footerGroups` and `socialLinks` are touched; every other field on the
 * document is left alone, so this is safe to run after real editing has started
 * (unlike `seed.ts`, which replaces whole documents).
 *
 * Every value the header and footer render is a field on this document — the
 * booking link is the "What we offer" column's highlighted link, and the social
 * profiles are `socialLinks`. Nothing about the nav lives in code.
 */
import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const dryRun = process.argv.includes("--dry");

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token && !dryRun) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN. Create an Editor token at sanity.io/manage.",
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  useCdn: false,
  token,
});

/** Array members need a `_key`; the value only has to be unique in the array. */
const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

const link = (label: string, href: string) => ({
  _key: key(),
  _type: "link",
  label,
  href,
});

const navGroup = (label: string, links: ReturnType<typeof link>[]) => ({
  _key: key(),
  _type: "navGroup",
  label,
  links,
});

const footerGroup = (
  title: string,
  links: ReturnType<typeof link>[],
  cta?: { label: string; href: string },
) => ({
  _key: key(),
  _type: "footerGroup",
  title,
  links,
  ...(cta ? { cta: { _type: "link", ...cta } } : {}),
});

const social = (platform: string, href: string) => ({
  _key: key(),
  _type: "socialLink",
  platform,
  href,
});

/**
 * Kept in sync with `scripts/update-socials.ts`, which patches these alone —
 * update both if the profiles change, or a rerun here regresses them.
 */
const socialLinks = [
  social("linkedin", "https://www.linkedin.com/company/keewee-in/"),
  social("instagram", "https://www.instagram.com/just.keewee"),
  social("facebook", "https://www.facebook.com/people/Keewee/61592250895741/"),
  social("x", "https://x.com/justkeewee"),
];

// ---------------------------------------------------------------------------
// The nav
// ---------------------------------------------------------------------------

const headerNav = [
  link("Services", "/services"),
  navGroup("Resources", [
    link("Blogs", "/blog"),
    link("Prompt Library", "/prompt-library"),
    link("Free Audit", "/free-audit"),
    link("FAQs", "/faq"),
    link("Subscribe to Our Newsletter", "/newsletter"),
  ]),
  link("About", "/about"),
];

const footerGroups = [
  footerGroup("What we offer", [
    link("Awareness & Brand", "/services/b2b-saas-awareness-brand-agency"),
    link("Demand Generation", "/services/b2b-saas-demand-generation-agency"),
    link("Conversion", "/services/b2b-saas-conversion-agency"),
    link("Retention & Expansion", "/services/b2b-saas-retention-expansion-agency"),
    link("Analytics & Operations", "/services/b2b-saas-marketing-analytics-ops-agency"),
  ], { label: "Book a call", href: "https://calendly.com/keewee/intro-call" }),
  footerGroup("Resources", [
    link("Blog", "/blog"),
    link("Prompt Library", "/prompt-library"),
    link("Free Audit", "/free-audit"),
    link("Subscribe to Our Newsletter", "/newsletter"),
  ]),
  footerGroup("Company", [
    link("About", "/about"),
    link("Frequently Asked Questions", "/faq"),
    link("Privacy Policy", "/legal/privacy-policy"),
    link("Terms of Service", "/legal/terms-of-service"),
    link("Legal", "/legal"),
  ]),
];

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------

async function main() {
  // Explicitly excludes `drafts.*`: an unqualified `*[_type == "siteSettings"][0]`
  // lets GROQ hand back whichever of the draft/published pair sorts first, which
  // previously sent this script's patch into a draft that never got published —
  // the live site kept the old nav while the fix sat invisible in the Studio.
  const doc = await client.fetch<{ _id: string } | null>(
    '*[_type == "siteSettings" && !(_id in path("drafts.**"))][0]{ _id }',
  );
  if (!doc) throw new Error("No published siteSettings document found. Run `npm run seed` first.");

  if (dryRun) {
    console.log(`Would patch ${doc._id} in ${projectId}/${dataset}:\n`);
    console.log(JSON.stringify({ headerNav, footerGroups, socialLinks }, null, 2));
    return;
  }

  await client
    .patch(doc._id)
    // `initialValue` only fires for new documents, so the existing singleton
    // needs the mark backfilled — without clobbering an editor's own choice.
    .setIfMissing({ logoMark: "✱" })
    .set({ headerNav, footerGroups, socialLinks })
    .commit();
  console.log(
    `Patched ${doc._id}: headerNav (${headerNav.length} items), footerGroups (${footerGroups.length} columns), socialLinks (${socialLinks.length}).`,
  );

  // The stale `drafts.siteSettings` sitting in the Studio is a superset of what
  // this script already writes (it's how the earlier, never-published run was
  // discovered) — remove it so an editor doesn't see a misleading "unpublished
  // changes" banner for a draft that's now fully subsumed by the published doc.
  const stale = await client.getDocument(`drafts.${doc._id}`).catch(() => null);
  if (stale) {
    await client.delete(`drafts.${doc._id}`);
    console.log(`Discarded stale drafts.${doc._id} (superseded by this patch).`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
