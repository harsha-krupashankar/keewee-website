import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import Container from "@/components/Container";
import SanityImage from "@/components/sanity/SanityImage";
import { safeHref } from "@/lib/safe-href";
import type { Post } from "@/sanity/lib/types";

/**
 * The long-form article renderer. Separate from the shared `Copy` component
 * because posts get the editorial blocks — inline figures, pull quotes,
 * callouts — and a wider, more generous type scale.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-body text-[17px] font-medium leading-[1.72] text-ink/85">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-3.5 font-display text-2xl font-extrabold leading-tight tracking-[-0.025em] text-ink sm:text-[30px]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-2 font-display text-xl font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-2xl">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <div className="flex flex-col gap-2.5 rounded-2xl border border-border bg-white p-5 sm:p-5.5">
        {children}
      </div>
    ),
    number: ({ children }) => (
      <ol className="flex list-decimal flex-col gap-2.5 pl-6 font-body text-[15.5px] font-medium leading-relaxed text-ink/85">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-green text-xs font-extrabold text-white">
          ✓
        </span>
        <span className="font-body text-[15.5px] font-medium leading-relaxed text-ink/85">
          {children}
        </span>
      </div>
    ),
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    highlight: ({ children }) => (
      <strong className="bg-lime px-1 font-bold text-ink [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
        {children}
      </strong>
    ),
    link: ({ children, value }) => {
      const href = safeHref(value?.href as string | undefined);
      const external = /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");
      const className =
        "border-b-2 border-lime font-semibold text-ink transition-colors duration-150 hover:text-green";

      return external ? (
        <a
          href={href}
          className={className}
          target={value?.openInNewTab ? "_blank" : undefined}
          rel={value?.openInNewTab ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    },
  },
  types: {
    figure: ({ value }) => (
      <figure>
        <div className="aspect-video overflow-hidden rounded-2xl border border-border-soft">
          <SanityImage
            image={value}
            width={1440}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-full w-full object-cover"
          />
        </div>
        {value?.caption && (
          <figcaption className="mt-2.5 text-center font-mono text-xs font-bold uppercase tracking-wide text-faint">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    pullQuote: ({ value }) => (
      <blockquote className="border-l-[3px] border-lime py-1 pl-6 font-display text-xl font-bold leading-snug tracking-[-0.02em] text-ink sm:text-[26px]">
        {value?.text}
        {value?.attribution && (
          <cite className="mt-2 block font-body text-sm font-semibold not-italic text-muted">
            — {value.attribution}
          </cite>
        )}
      </blockquote>
    ),
    callout: ({ value }) => (
      <div className="relative overflow-hidden rounded-[18px] bg-ink px-7 py-6.5 text-paper">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
            backgroundSize: "15px 15px",
          }}
        />
        <div className="relative mb-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-lime">
          {"// key takeaway"}
        </div>
        <p className="relative font-display text-lg font-bold leading-snug tracking-[-0.015em] text-paper sm:text-[22px]">
          {value?.text}
        </p>
      </div>
    ),
  },
};

export default function BlogPostBody({ post }: { post: Post }) {
  if (!post.body?.length) {
    return (
      <section className="pb-2 pt-0">
        <Container>
          <div className="mx-auto max-w-[720px] rounded-2xl border border-dashed border-border-soft bg-surface px-6 py-8 text-center">
            <p className="font-body text-[15px] font-medium leading-relaxed text-body">
              This one&apos;s still being written — check back soon, or{" "}
              <Link href="/blog" className="border-b-2 border-lime font-semibold text-ink hover:text-green">
                browse the rest of the blog
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="pb-2 pt-0">
      <Container>
        <div className="mx-auto flex max-w-[720px] flex-col gap-5.5">
          <PortableText value={post.body} components={components} />
        </div>
      </Container>
    </section>
  );
}
