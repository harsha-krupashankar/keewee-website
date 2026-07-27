import { defineCliConfig } from "sanity/cli";

/**
 * Config for the `sanity` CLI (typegen, dataset import/export, deploy).
 * The Studio itself is served by Next.js, so `autoUpdates` stays off — the
 * bundled version is whatever `npm install` pinned.
 */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  autoUpdates: false,
  typegen: {
    // Scans these files for `defineQuery` calls, then types each query's result
    // against the extracted schema.
    path: "./{app,components,lib,sanity}/**/*.{ts,tsx}",
    schema: "./sanity/extract.json",
    generates: "./sanity/sanity.types.ts",
    // Makes `client.fetch()` / `sanityFetch()` infer results from the GROQ.
    overloadClientMethods: true,
  },
});
