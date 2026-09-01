import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import FeedTileFace, { tileClass } from "@/components/links/FeedTileFace";

import { destination, tile } from "../fixtures";

describe("feed tile face", () => {
  it("gives each ground its own background", () => {
    expect(tileClass("dark")).toContain("bg-dark-card");
    expect(tileClass("green")).toContain("bg-green");
    expect(tileClass("mint")).toContain("bg-green-bg");
    expect(tileClass("surface")).toContain("bg-surface");
    expect(tileClass("paper")).toContain("bg-paper");
    expect(tileClass("image")).toContain("bg-border-soft");
  });

  it("carries the press and focus states the design specifies", () => {
    const cls = tileClass("dark");
    expect(cls).toContain("active:scale-[0.965]");
    expect(cls).toContain("focus-visible:outline-lime-bright");
  });

  it("shows a count badge only when a tile has several destinations", () => {
    const { rerender, container } = render(<FeedTileFace tile={tile()} />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();

    rerender(
      <FeedTileFace
        tile={tile({ destinations: [destination(), destination(), destination()] })}
      />
    );
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders a stat tile with the number and caption", () => {
    render(<FeedTileFace tile={tile({ style: "mint", stat: "60%", title: "of inbound" })} />);
    expect(screen.getByText("60%")).toBeInTheDocument();
    expect(screen.getByText("of inbound")).toBeInTheDocument();
  });

  it("renders a sticker tile centred, with the sticker above the title", () => {
    render(<FeedTileFace tile={tile({ sticker: "SYNERGY", title: "is not a strategy" })} />);
    const sticker = screen.getByText("SYNERGY");
    expect(sticker).toHaveClass("font-sticker");
    expect(screen.getByText("is not a strategy")).toBeInTheDocument();
  });

  it("renders an attribution row on a testimonial tile", () => {
    render(
      <FeedTileFace
        tile={tile({ attribution: { initials: "R", name: "R. Menon · VP Growth" } })}
      />
    );
    expect(screen.getByText("R. Menon · VP Growth")).toBeInTheDocument();
  });

  it("hides the caption on a bare photo but keeps the title for screen readers", () => {
    render(
      <FeedTileFace
        tile={tile({
          style: "image",
          title: "Team photo",
          hideCaption: true,
          image: {
            asset: { _ref: "image-abc-800x800-jpg", _type: "reference" },
            dimensions: { width: 800, height: 800, aspectRatio: 1 },
          },
        })}
      />
    );
    const title = screen.getByText("Team photo");
    expect(title).toHaveClass("sr-only");
  });

  it("shows the caption on an image tile by default", () => {
    render(
      <FeedTileFace
        tile={tile({
          style: "image",
          title: "Teardown night",
          image: {
            asset: { _ref: "image-abc-800x800-jpg", _type: "reference" },
            dimensions: { width: 800, height: 800, aspectRatio: 1 },
          },
        })}
      />
    );
    expect(screen.getByText("Teardown night")).not.toHaveClass("sr-only");
  });

  it("omits eyebrow, footnote and accent bar when unset", () => {
    const { container } = render(<FeedTileFace tile={tile()} />);
    expect(container.textContent).toBe("A post");
  });
});
