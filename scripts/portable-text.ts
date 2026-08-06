import { randomUUID } from "node:crypto";

/**
 * Minimal helpers for building Portable Text from plain strings, used by the
 * seed script. Not used at runtime — the app only ever reads Portable Text.
 */

export type Mark = "strong" | "em" | "highlight" | "green" | "lime" | "rust";

/** A run of text, optionally carrying marks. */
export type Span = string | [text: string, ...marks: Mark[]];

type Child = {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
};

export type Block = {
  _type: "block";
  _key: string;
  style: string;
  markDefs: never[];
  children: Child[];
};

function key() {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

function toChild(span: Span): Child {
  const [text, ...marks] = Array.isArray(span) ? span : [span];
  return { _type: "span", _key: key(), text, marks };
}

/** One block. Spans let you mark part of the line, e.g. `["spine.", "highlight"]`. */
export function block(spans: Span[], style = "normal"): Block {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: spans.map(toChild),
  };
}

/** A single-line headline. */
export function headline(...spans: Span[]): Block[] {
  return [block(spans)];
}

/** Body copy: each argument becomes one paragraph. */
export function richText(...paragraphs: (string | Span[])[]): Block[] {
  return paragraphs.map((p) => block(typeof p === "string" ? [p] : p));
}
