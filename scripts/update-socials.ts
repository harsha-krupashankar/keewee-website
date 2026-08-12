/**
 * Sets the footer social profiles on the `siteSettings` singleton.
 *
 *   npm run update-socials -- --dry    # print the patch, write nothing
 *   npm run update-socials
 *
 * Only `socialLinks` is touched — unlike `update-nav.ts`, which also rewrites
 * the header nav and footer columns — so this is safe to run without clobbering
 * an editor's nav changes. The icon for each platform lives in
 * `components/Footer.tsx`; the picker values in
 * `sanity/schemaTypes/objects/primitives.ts`.
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

const social = (platform: string, href: string) => ({
  _key: key(),
  _type: "socialLink",
  platform,
  href,
});

/** Order here is the order the icons render in the footer. */
const socialLinks = [
  social("linkedin", "https://www.linkedin.com/company/keewee-in/"),
  social("instagram", "https://www.instagram.com/just.keewee"),
  social("facebook", "https://www.facebook.com/people/Keewee/61592250895741/"),
  social("x", "https://x.com/justkeewee"),
];

async function main() {
  // Target the *published* document explicitly. The site fetches the published
  // perspective without a token, so patching a `drafts.*` overlay (which a
  // plain `[0]` fetch returns when a draft exists) would never reach visitors.
  // Only `socialLinks` is set, so this never publishes unrelated draft edits.
  const doc = await client.fetch<{ _id: string } | null>(
    '*[_type == "siteSettings" && !(_id in path("drafts.**"))][0]{ _id }',
  );
  if (!doc) throw new Error("No published siteSettings document found. Run `npm run seed` first.");

  if (dryRun) {
    console.log(`Would patch ${doc._id} in ${projectId}/${dataset}:\n`);
    console.log(JSON.stringify({ socialLinks }, null, 2));
    return;
  }

  await client.patch(doc._id).set({ socialLinks }).commit();
  console.log(`Patched ${doc._id}: socialLinks (${socialLinks.length}).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
