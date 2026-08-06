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
 * Placeholders — swap them in the Studio (Site settings → Navigation), no
 * deploy needed.
 */
const socialLinks = [
  social("linkedin", "https://www.linkedin.com/company/keewee"),
  social("x", "https://x.com/keewee"),
];

// ---------------------------------------------------------------------------
// The nav
// ---------------------------------------------------------------------------

const headerNav = [
  link("Services", "/services"),
  navGroup("Resources", [
    link("Blogs", "/blog"),
    link("Free Audit", "/free-audit"),
    link("FAQs", "/faq"),
    link("Subscribe to Our Newsletter", "/newsletter"),
  ]),
  link("About", "/about"),
];

const footerGroups = [
  footerGroup("What we offer", [
    link("Awareness & Brand", "/b2b-saas-awareness-brand-agency"),
    link("Demand Generation", "/b2b-saas-demand-generation-agency"),
    link("Conversion", "/b2b-saas-conversion-agency"),
    link("Retention & Expansion", "/b2b-saas-retention-expansion-agency"),
    link("Analytics & Operations", "/b2b-saas-marketing-analytics-ops-agency"),
  ], { label: "Book a call", href: "https://calendly.com/keewee/intro-call" }),
  footerGroup("Resources", [
    link("Blog", "/blog"),
    link("Free Audit", "/free-audit"),
    link("Subscribe to Our Newsletter", "/newsletter"),
  ]),
  footerGroup("Company", [
    link("About", "/about"),
    link("Frequently Asked Questions", "/faq"),
    link("Privacy Policy", "/legal/privacy-policy"),
    link("Legal", "/legal"),
  ]),
];

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------

async function main() {
  const doc = await client.fetch<{ _id: string } | null>(
    '*[_type == "siteSettings"][0]{ _id }',
  );
  if (!doc) throw new Error("No siteSettings document found. Run `npm run seed` first.");

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
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
