import { describe, expect, it } from "vitest";

import { safeHref } from "@/lib/safe-href";

/**
 * Every destination on `/links` is editor-supplied and most are rendered
 * straight into an `href`, so this guard is the page's last line of defence.
 */
describe("safeHref", () => {
  it("passes through the schemes the page actually uses", () => {
    for (const href of [
      "/free-audit",
      "https://calendly.com/x",
      "http://example.com",
      "mailto:team@keewee.in",
      "tel:+910000000000",
      "#subscribe",
    ]) {
      expect(safeHref(href)).toBe(href);
    }
  });

  it("neutralises script and data URLs", () => {
    for (const href of [
      "javascript:alert(1)",
      "JaVaScRiPt:alert(1)",
      "data:text/html,<script>alert(1)</script>",
      "vbscript:msgbox(1)",
    ]) {
      expect(safeHref(href)).toBe("#");
    }
  });

  it("neutralises an absent or empty href", () => {
    expect(safeHref(undefined)).toBe("#");
    expect(safeHref(null)).toBe("#");
    expect(safeHref("")).toBe("#");
  });
});
