import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/**
 * One project, jsdom. It covers rendering and content logic — what appears, and
 * what is omitted when a field is empty.
 *
 * There was a second, real-Chromium project here for the `/links` tile sheet:
 * jsdom implements no `HTMLDialogElement.showModal`, so Esc-to-close and the
 * focus trap could only ever be verified in a browser. The sheet is gone — a
 * tile is one link now, with nothing to branch to — and with it the only test
 * that needed a browser.
 */
const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  resolve: { alias: { "@": root } },
  test: {
    name: "unit",
    environment: "jsdom",
    globals: true,
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    setupFiles: ["tests/setup.tsx"],
  },
});
