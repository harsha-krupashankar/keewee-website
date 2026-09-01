import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import LinksProfile from "@/components/links/LinksProfile";
import { SOCIAL_ICON_PATHS, socialLabel } from "@/components/SocialIcons";

import { social } from "../fixtures";

/**
 * The `/links` row and the site footer read the same `siteSettings.socialLinks`
 * and draw the same marks, so these guard the shared module rather than either
 * call site.
 */
describe("social marks", () => {
  it("announces a friendly name, not the stored slug", () => {
    expect(socialLabel("linkedin")).toBe("LinkedIn");
    expect(socialLabel("youtube")).toBe("YouTube");
    expect(socialLabel("x")).toBe("X");
  });

  it("falls back to the raw platform for an unknown network", () => {
    expect(socialLabel("mastodon")).toBe("mastodon");
  });

  it("has artwork for every platform the Studio offers", () => {
    for (const platform of ["linkedin", "x", "instagram", "facebook", "youtube"]) {
      expect(SOCIAL_ICON_PATHS[platform]).toBeTruthy();
    }
  });

  it("renders an svg mark, not two letters", () => {
    const { container } = render(
      <LinksProfile wordmark="w" bio="b" socials={[social({ platform: "instagram" })]} />
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/\bIG\b/);
  });

  it("degrades to two letters for a network with no artwork yet", () => {
    render(<LinksProfile wordmark="w" bio="b" socials={[social({ platform: "mastodon" })]} />);
    expect(screen.getAllByText("ma")[0]).toBeInTheDocument();
  });

  it("labels each chip and opens it in a new tab", () => {
    render(
      <LinksProfile
        wordmark="w"
        bio="b"
        socials={[social({ platform: "linkedin", href: "https://linkedin.com/company/x" })]}
      />
    );
    const [link] = screen.getAllByRole("link", { name: "LinkedIn" });
    expect(link).toHaveAttribute("href", "https://linkedin.com/company/x");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
