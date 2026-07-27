import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import type { RichText } from "@/sanity/lib/types";

type Tone = "light" | "dark";

/**
 * Body copy from a `richText` field.
 *
 * `tone` exists because the same section copy appears on both the paper
 * background and the ink cards — bolded runs need to darken on one and lighten
 * on the other, and there is no single class that reads correctly on both.
 */
function buildComponents(tone: Tone): PortableTextComponents {
  const strongClass = tone === "dark" ? "font-bold text-paper" : "font-bold text-ink";

  return {
    block: {
      normal: ({ children }) => <p className="[&:not(:last-child)]:mb-4">{children}</p>,
      h3: ({ children }) => (
        <h3 className="mb-2.5 mt-6 font-display text-xl font-bold leading-tight tracking-[-0.02em]">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="mb-2 mt-5 font-display text-lg font-bold leading-tight">{children}</h4>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-5 border-l-[3px] border-green pl-4 font-display text-lg font-bold leading-snug">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mb-4 flex list-disc flex-col gap-1.5 pl-5">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="mb-4 flex list-decimal flex-col gap-1.5 pl-5">{children}</ol>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className={strongClass}>{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      highlight: ({ children }) => (
        <strong className="bg-lime px-1 font-bold text-ink [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
          {children}
        </strong>
      ),
      link: ({ children, value }) => {
        const href = (value?.href as string) ?? "#";
        const external = /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");
        const className =
          "border-b-2 border-border-soft font-semibold transition-colors duration-150 hover:border-green hover:text-green";

        if (external || value?.openInNewTab) {
          return (
            <a
              href={href}
              className={className}
              target={value?.openInNewTab ? "_blank" : undefined}
              rel={value?.openInNewTab ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          );
        }
        return (
          <Link href={href} className={className}>
            {children}
          </Link>
        );
      },
    },
  };
}

const lightComponents = buildComponents("light");
const darkComponents = buildComponents("dark");

export default function Copy({
  value,
  tone = "light",
  className,
}: {
  value?: RichText | null;
  tone?: Tone;
  className?: string;
}) {
  if (!value?.length) return null;
  return (
    <div className={className}>
      <PortableText
        value={value}
        components={tone === "dark" ? darkComponents : lightComponents}
      />
    </div>
  );
}

/** Flattens rich text to a plain string, for meta descriptions and JSON-LD. */
export function toPlainText(value?: RichText): string {
  if (!value?.length) return "";
  return value
    .map((block) => {
      if (block._type !== "block") return "";
      const children = (block.children ?? []) as { text?: string }[];
      return children.map((child) => child.text ?? "").join("");
    })
    .join(" ")
    .trim();
}
