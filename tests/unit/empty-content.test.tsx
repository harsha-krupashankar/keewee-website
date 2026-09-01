import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import BannerStrip from "@/components/links/BannerStrip";
import FeaturedCard from "@/components/links/FeaturedCard";
import LinkButtons from "@/components/links/LinkButtons";
import LinksFooter from "@/components/links/LinksFooter";
import LinksGround from "@/components/links/LinksGround";
import LinksProfile from "@/components/links/LinksProfile";

import { banner, button, featured, social } from "../fixtures";

/**
 * The contract: an absent field renders nothing at all — no empty shell, no
 * stray separator, and above all no hardcoded English standing in for content
 * the editor has not written.
 */
describe("empty content renders nothing", () => {
  it("omits the social row when there are no profiles", () => {
    render(<LinksProfile wordmark="keewee.in" bio="A bio." socials={null} />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("omits the logo mark when unset", () => {
    const { container } = render(
      <LinksProfile wordmark="keewee.in" bio="A bio." socials={[]} />
    );
    expect(container.querySelector("h1")).toHaveTextContent(/^keewee\.in$/);
  });

  it("renders no footer at all when it has neither links nor a note", () => {
    const { container } = render(<LinksFooter links={null} note={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the footer when it has only a note", () => {
    render(<LinksFooter links={null} note="© 2026 Keewee" />);
    expect(screen.getByText("© 2026 Keewee")).toBeInTheDocument();
  });

  it("omits the desktop rail when it has no headline, eyebrow or body", () => {
    const { container } = render(<LinksGround />);
    // Only the decorative ground layer survives, and it is hidden from AT.
    expect(container.querySelectorAll("[aria-hidden='true']").length).toBe(1);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("omits the sticker and margin note when unset", () => {
    render(<LinksGround eyebrow="Everything we make" />);
    expect(screen.queryByText("NO MUSH!")).not.toBeInTheDocument();
  });

  it("omits a button's meta when unset, keeping the arrow", () => {
    render(<LinkButtons buttons={[button({ meta: undefined })]} />);
    const link = screen.getByRole("link", { name: /Book a free audit/ });
    expect(link).toHaveTextContent("→");
    expect(link.textContent).not.toMatch(/undefined|null/);
  });

  it("omits a button's sublabel when unset", () => {
    render(<LinkButtons buttons={[button()]} />);
    expect(screen.getByRole("link").textContent).not.toMatch(/undefined/);
  });

  it("omits a banner's badge, meta and footnote when unset", () => {
    render(<BannerStrip banners={[banner()]} />);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("A banner");
    expect(link.textContent).not.toMatch(/undefined|null/);
  });

  it("omits the featured badge, source and play icon when unset", () => {
    render(<FeaturedCard card={featured()} />);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("A video");
    expect(link.textContent).not.toMatch(/undefined|null|→/);
  });

  it("never prints a hardcoded English label anywhere", () => {
    const { container } = render(
      <>
        <LinksProfile wordmark="w" bio="b" socials={[social()]} />
        <LinkButtons buttons={[button()]} />
        <BannerStrip banners={[banner()]} />
        <FeaturedCard card={featured()} />
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
    ]) {
      expect(text).not.toContain(phrase);
    }
  });
});
