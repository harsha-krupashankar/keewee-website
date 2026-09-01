import { render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { describe, expect, it } from "vitest";

import FeedGrid from "@/components/links/FeedGrid";

import { destination, tile } from "../fixtures";

/**
 * Runs in real Chromium. Every assertion below depends on native
 * `<dialog>` + `showModal()` semantics — Esc, the focus trap, focus return —
 * which jsdom does not implement, so these cannot be trusted anywhere else.
 */

const multi = tile({
  _key: "carousel",
  style: "green",
  title: "5 lines that kill your homepage",
  meta: "carousel · 5 slides",
  destinationsLabel: "{count} links in this post",
  destinations: [
    destination({ label: "Read the full teardown", source: "keewee.in/blog · 7 min" }),
    destination({ label: "Download the checklist", href: "/free-audit" }),
    destination({ label: "Watch the walkthrough", href: "https://youtube.com/x" }),
  ],
});

const single = tile({ _key: "solo", title: "A single link", destinations: [destination()] });

async function openSheet() {
  const trigger = screen.getByRole("button", { name: /5 lines that kill/ });
  await userEvent.click(trigger);
  return await screen.findByRole("dialog");
}

describe("tile sheet", () => {
  it("navigates directly when a tile has one destination", () => {
    render(<FeedGrid tiles={[single]} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/blog");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("opens a modal dialog when a tile has several", async () => {
    render(<FeedGrid tiles={[multi]} />);
    const dialog = await openSheet();
    expect(dialog).toBeVisible();
    // `open` plus a backdrop means showModal(), not show().
    expect(dialog).toHaveAttribute("open");
  });

  it("lists every destination, in order, with the first as primary", async () => {
    render(<FeedGrid tiles={[multi]} />);
    const dialog = await openSheet();

    const links = within(dialog).getAllByRole("link");
    expect(links.map((l) => l.textContent?.trim().split("\n")[0])).toEqual([
      expect.stringContaining("Read the full teardown"),
      expect.stringContaining("Download the checklist"),
      expect.stringContaining("Watch the walkthrough"),
    ]);
    expect(links[0].className).toContain("bg-green");
    expect(links[1].className).not.toContain("bg-green");
  });

  it("substitutes the destination count into the list label", async () => {
    render(<FeedGrid tiles={[multi]} />);
    await openSheet();
    expect(screen.getByText("3 links in this post")).toBeInTheDocument();
  });

  it("puts initial focus on the first destination, not the close button", async () => {
    render(<FeedGrid tiles={[multi]} />);
    await openSheet();
    await waitFor(() =>
      expect(document.activeElement?.textContent).toContain("Read the full teardown")
    );
  });

  it("traps focus inside the dialog", async () => {
    render(<FeedGrid tiles={[multi]} />);
    const dialog = await openSheet();
    for (let i = 0; i < 8; i++) await userEvent.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it("closes on Escape", async () => {
    render(<FeedGrid tiles={[multi]} />);
    await openSheet();
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("closes on a click outside the panel", async () => {
    render(<FeedGrid tiles={[multi]} />);
    const dialog = await openSheet();
    // The backdrop dispatches its click on the dialog element itself.
    dialog.click();
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("closes on the close button", async () => {
    render(<FeedGrid tiles={[multi]} />);
    const dialog = await openSheet();
    await userEvent.click(within(dialog).getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("returns focus to the tile that opened it", async () => {
    render(<FeedGrid tiles={[multi]} />);
    const trigger = screen.getByRole("button", { name: /5 lines that kill/ });
    await userEvent.click(trigger);
    await screen.findByRole("dialog");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it("omits the list label and hint when they have no content", async () => {
    const bare = tile({
      _key: "bare",
      title: "Bare tile",
      destinations: [destination(), destination({ label: "Second" })],
    });
    render(<FeedGrid tiles={[bare]} />);
    await userEvent.click(screen.getByRole("button", { name: /Bare tile/ }));
    const dialog = await screen.findByRole("dialog");
    expect(dialog.textContent).not.toContain("links in this post");
    expect(dialog.textContent).not.toContain("Esc or click outside");
  });

  it("still closes when an exit animation is running", async () => {
    // The suite runs without `globals.css`, so the other close tests exercise
    // the no-animation path. This one injects a real animation to prove the
    // sheet also waits it out rather than closing early or hanging.
    const style = document.createElement("style");
    style.textContent = `
      @keyframes t-out { from { opacity: 1 } to { opacity: 0 } }
      dialog[data-closing="true"] > * { animation: t-out 120ms linear both; }
    `;
    document.head.appendChild(style);

    try {
      render(<FeedGrid tiles={[multi]} />);
      await openSheet();
      await userEvent.keyboard("{Escape}");
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    } finally {
      style.remove();
    }
  });

  it("shows the hint only when supplied", async () => {
    render(<FeedGrid tiles={[multi]} sheetHint="Esc or click outside to close" />);
    await openSheet();
    expect(screen.getByText("Esc or click outside to close")).toBeInTheDocument();
  });
});

describe("feed grid pagination", () => {
  const many = Array.from({ length: 9 }, (_, i) =>
    tile({ _key: `t${i}`, title: `Tile ${i}` })
  );

  it("shows every tile when no reveal label is set", () => {
    render(<FeedGrid tiles={many} initialCount={3} />);
    expect(screen.getAllByRole("link")).toHaveLength(9);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("paginates when a reveal label is set, and counts in the label", async () => {
    render(<FeedGrid tiles={many} initialCount={3} moreLabel="See all {count} posts" />);
    expect(screen.getAllByRole("link")).toHaveLength(3);

    const more = screen.getByRole("button", { name: /See all 9 posts/ });
    await userEvent.click(more);
    expect(screen.getAllByRole("link")).toHaveLength(6);

    await userEvent.click(screen.getByRole("button", { name: /See all 9 posts/ }));
    expect(screen.getAllByRole("link")).toHaveLength(9);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
