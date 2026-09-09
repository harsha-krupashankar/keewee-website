import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import FeedGrid from "@/components/links/FeedGrid";
import LinksFooter from "@/components/links/LinksFooter";
import LinksProfile from "@/components/links/LinksProfile";

import { cta, social, tile } from "../fixtures";

/**
 * The contract: an absent field renders nothing at all — no empty shell, no
 * stray separator, and above all no hardcoded English standing in for content
 * the editor has not written.
 */
describe("empty content renders nothing", () => {
  it("omits the social row when there are no profiles", () => {
    render(<LinksProfile socials={null} />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("draws the brand without asking Sanity for it", () => {
    const { container } = render(<LinksProfile socials={[]} />);
    // Both are hardcoded, so there is no unset case to handle — the assertion
    // is that they are there at all. The mark is aria-hidden and so drops out
    // of the accessible name, leaving the wordmark to title the page.
    expect(screen.getByRole("heading", { name: "keewee.in" })).toBeInTheDocument();
    expect(container.querySelector("h1")).toHaveTextContent("✱");
  });

  it("omits the call to action when unset", () => {
    render(<LinksProfile socials={[]} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders the call to action with the arrow the design draws", () => {
    render(<LinksProfile socials={[]} cta={cta()} />);
    const link = screen.getByRole("link", { name: /Book a free audit/ });
    expect(link).toHaveTextContent("→");
    expect(link.textContent).not.toMatch(/undefined|null/);
  });

  it("renders no footer at all when it has neither links nor a note", () => {
    const { container } = render(<LinksFooter links={null} note={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the footer when it has only a note", () => {
    render(<LinksFooter links={null} note="© 2026 Keewee" />);
    expect(screen.getByText("© 2026 Keewee")).toBeInTheDocument();
  });

  it("never prints a hardcoded English label anywhere", () => {
    const { container } = render(
      <>
        <LinksProfile socials={[social()]} cta={cta()} />
        <FeedGrid tiles={[tile()]} />
        <LinksFooter links={null} note="n" />
      </>
    );
    const text = container.textContent ?? "";
    for (const phrase of [
      "This week",
      "Closing soon",
      "Start here",
      "From the feed",
      "See all",
      "links in this post",
      "Esc or click outside",
      "See the original post",
      "Instagram",
      "View post",
    ]) {
      expect(text).not.toContain(phrase);
    }
  });
});
