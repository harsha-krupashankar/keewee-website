import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import FeedGrid from "@/components/links/FeedGrid";

import { image, tile } from "../fixtures";

/**
 * A tile is one post and one link. These pin the two rules that decision
 * carries: where the tap goes, and what a screen reader is told it is.
 */
describe("post grid", () => {
  it("sends the tap to the tile's own link, in the same tab", () => {
    render(<FeedGrid tiles={[tile({ href: "/free-audit" })]} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/free-audit");
    expect(link).not.toHaveAttribute("target");
  });

  it("falls back to the post itself, in a new tab, when there is no link", () => {
    render(<FeedGrid tiles={[tile({ postUrl: "https://www.instagram.com/p/xyz/" })]} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://www.instagram.com/p/xyz/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("refuses an unsafe href rather than rendering it", () => {
    render(<FeedGrid tiles={[tile({ href: "javascript:alert(1)" })]} />);
    expect(screen.getByRole("link")).not.toHaveAttribute("href", "javascript:alert(1)");
  });

  it("names the tile with the image's alt text", () => {
    render(<FeedGrid tiles={[tile({ image: image({ alt: "Teardown night" }) })]} />);
    expect(screen.getByRole("link", { name: "Teardown night" })).toBeInTheDocument();
  });

  it("prints no text of its own — the picture is the whole tile", () => {
    const { container } = render(<FeedGrid tiles={[tile()]} />);
    expect(container.textContent).toBe("");
  });

  it("keeps the tiles in the order the editor set", () => {
    render(
      <FeedGrid
        tiles={[
          tile({ _key: "a", image: image({ alt: "First" }) }),
          tile({ _key: "b", image: image({ alt: "Second" }) }),
        ]}
      />
    );
    const alts = screen.getAllByRole("img").map((img) => img.getAttribute("alt"));
    expect(alts).toEqual(["First", "Second"]);
  });
});
