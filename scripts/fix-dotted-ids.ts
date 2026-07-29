/**
 * One-time migration: renames documents whose `_id` contains a dot.
 *
 *   npm run fix-ids:dry   # print the plan
 *   npm run fix-ids       # apply it
 *
 * Sanity treats a dot in a document ID as a *path separator*, and documents that
 * live under a path prefix are excluded from public reads even when the dataset
 * ACL is `public` — that is the same mechanism that hides `drafts.*`. The seed
 * script minted IDs like `service.analytics`, so every one of those documents was
 * invisible to the website: `sanityFetch` reads the published perspective without
 * a token (by design, see `next-sanity`'s `defineLive`), got an empty result, and
 * the route called `notFound()`. In the Studio, which is authenticated, the same
 * documents looked perfectly fine.
 *
 * The fix is to re-key them with `-` instead of `.`. Documents are recreated
 * under the new ID and every `_ref` pointing at an old ID is rewritten in the
 * same transaction, so nothing is ever left dangling.
 *
 * `drafts.*`, `versions.*` and Sanity's own `system.*` documents are left alone —
 * their prefixes are meaningful to the Content Lake.
 */
import { createClient, type SanityDocument } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const dryRun = process.argv.includes("--dry");

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token && !dryRun) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN. Create an Editor token at sanity.io/manage."
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-07-27",
  token: token ?? process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

/**
 * Paths the Content Lake owns — drafts, release versions, and the `_.` tree that
 * holds ACL groups and retention policies. Renaming under these would break
 * them, and they are meant to be private anyway.
 */
const RESERVED = ["drafts.", "versions.", "_."];

function isReserved(id: string) {
  return RESERVED.some((prefix) => id.startsWith(prefix));
}

/** Rewrites every `_ref` in a value using the old → new ID map. */
function remapRefs<T>(value: T, map: Map<string, string>): T {
  if (Array.isArray(value)) {
    return value.map((item) => remapRefs(item, map)) as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      out[key] =
        key === "_ref" && typeof val === "string"
          ? map.get(val) ?? val
          : remapRefs(val, map);
    }
    return out as T;
  }
  return value;
}

async function main() {
  const docs = await client.fetch<SanityDocument[]>("*[]");

  const existingIds = new Set(docs.map((doc) => doc._id));
  const map = new Map<string, string>();

  for (const doc of docs) {
    if (isReserved(doc._id) || !doc._id.includes(".")) continue;
    const next = doc._id.replace(/\./g, "-");
    if (existingIds.has(next)) {
      throw new Error(
        `Cannot rename ${doc._id} → ${next}: a document with that ID already exists.`
      );
    }
    map.set(doc._id, next);
  }

  if (map.size === 0) {
    console.log("Nothing to do — no document IDs contain a dot.");
    return;
  }

  console.log(`Renaming ${map.size} document(s) in ${projectId}/${dataset}:`);
  for (const [from, to] of map) console.log(`  ${from} → ${to}`);

  // Every document is rewritten, not just the renamed ones: a document with a
  // clean ID can still hold a reference to one that is moving.
  const rewritten = docs
    .filter((doc) => !isReserved(doc._id))
    .map((doc) => {
      const next = { ...remapRefs(doc, map), _id: map.get(doc._id) ?? doc._id };
      delete (next as Partial<SanityDocument>)._rev; // createOrReplace mints its own
      return next;
    });

  console.log(`\nRewriting ${rewritten.length} document(s).`);

  if (dryRun) {
    console.log("\nDry run — nothing written.");
    return;
  }

  // One transaction: the replacements land before the old IDs disappear, so no
  // reference is ever pointing at a deleted document.
  const tx = client.transaction();
  for (const doc of rewritten) tx.createOrReplace(doc as SanityDocument);
  for (const oldId of map.keys()) tx.delete(oldId);

  await tx.commit({ visibility: "sync" });
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
