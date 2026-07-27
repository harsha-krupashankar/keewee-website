/**
 * Sanity Studio configuration.
 *
 * The Studio is served from the Next.js app at `/studio` — see
 * `app/studio/[[...tool]]/page.tsx`.
 */
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/env";
import { resolve } from "@/sanity/presentation/resolve";
import { schemaTypes, SINGLETON_TYPES } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";

const singletons = new Set<string>(SINGLETON_TYPES);

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Singletons are created by the migration script and edited in place; hide
    // them from the global "create new" menu so a second copy can't appear.
    templates: (prev) => prev.filter(({ schemaType }) => !singletons.has(schemaType)),
  },
  document: {
    actions: (prev, { schemaType }) =>
      singletons.has(schemaType)
        ? prev.filter(
            ({ action }) => action && !["unpublish", "delete", "duplicate"].includes(action)
          )
        : prev,
  },
  plugins: [
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
    }),
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
