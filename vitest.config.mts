import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/**
 * Two projects, because they answer different questions.
 *
 * `unit` (jsdom) covers rendering and content logic — what appears, what is
 * omitted when a field is empty, which variant a tile gets. Fast, and enough
 * for anything that is just markup.
 *
 * `browser` (real Chromium) covers the tile sheet. jsdom does not implement
 * `HTMLDialogElement.showModal` at all — not in v30, the version installed
 * here — so a jsdom test of the sheet would only ever exercise a polyfill.
 * Esc-to-close, the focus trap and modal focus return are the browser's
 * behaviour, and the whole reason the component uses a native `<dialog>`, so
 * they are verified where they actually run.
 *
 * Known cosmetic noise: browser mode prints React's "not wrapped in act(...)"
 * warning when the browser itself fires a dialog `close`. The tests wait on the
 * DOM, not on act, so it is harmless — chase it only if it starts hiding real
 * output.
 */
const root = fileURLToPath(new URL(".", import.meta.url));

const shared = {
  resolve: { alias: { "@": root } },
};

export default defineConfig({
  ...shared,
  test: {
    projects: [
      {
        ...shared,
        test: {
          name: "unit",
          environment: "jsdom",
          globals: true,
          include: ["tests/unit/**/*.test.{ts,tsx}"],
          setupFiles: ["tests/setup.tsx"],
        },
      },
      {
        ...shared,
        test: {
          name: "browser",
          globals: true,
          include: ["tests/browser/**/*.test.{ts,tsx}"],
          setupFiles: ["tests/setup.tsx"],
          browser: {
            enabled: true,
            provider: "playwright",
            headless: true,
            screenshotFailures: false,
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
