import { PortableText, type PortableTextComponents } from "@portabletext/react";

import type { Headline as HeadlineValue } from "@/sanity/lib/types";

/**
 * Renders a `headline` field.
 *
 * The design's decorations — the lime swash, the green/rust clause — are marks
 * on the text rather than separate fields, so an editor can move the emphasis
 * anywhere in the sentence. Block wrappers are stripped: the caller supplies the
 * `<h1>`/`<h2>` and its sizing.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <>{children}</>,
  },
  marks: {
    highlight: ({ children }) => (
      <span className="relative inline-block">
        <span className="absolute -bottom-1.5 left-[-6px] right-[-8px] h-[34%] -rotate-1 rounded-sm bg-lime" />
        <span className="relative">{children}</span>
      </span>
    ),
    green: ({ children }) => <span className="text-green">{children}</span>,
    // For headlines sitting on an ink band, where the green reads as almost black.
    lime: ({ children }) => <span className="text-lime">{children}</span>,
    rust: ({ children }) => <span className="text-rust">{children}</span>,
    strong: ({ children }) => <strong className="font-extrabold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

export default function Headline({ value }: { value?: HeadlineValue | null }) {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
}
