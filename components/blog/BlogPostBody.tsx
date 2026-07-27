import Container from "@/components/Container";
import BlogImagePlaceholder from "./BlogImagePlaceholder";
import type { BlogBlock, BlogPost } from "@/lib/blog-data";

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="font-body text-[17px] font-medium leading-[1.72] text-ink/85">
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h2 className="mt-3.5 font-display text-2xl font-extrabold leading-tight tracking-[-0.025em] text-ink sm:text-[30px]">
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote className="border-l-[3px] border-lime py-1 pl-6 font-display text-xl font-bold leading-snug tracking-[-0.02em] text-ink sm:text-[26px]">
          {block.text}
        </blockquote>
      );
    case "list":
      return (
        <div className="flex flex-col gap-2.5 rounded-2xl border border-border bg-white p-5 sm:p-5.5">
          {block.items.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-green text-xs font-extrabold text-white">
                ✓
              </span>
              <span className="font-body text-[15.5px] font-medium leading-relaxed text-ink/85">
                {item}
              </span>
            </div>
          ))}
        </div>
      );
    case "image":
      return (
        <figure>
          <div className="aspect-video overflow-hidden rounded-2xl border border-border-soft">
            <BlogImagePlaceholder label="Inline image" />
          </div>
          <figcaption className="mt-2.5 text-center font-mono text-xs font-bold uppercase tracking-wide text-faint">
            {block.caption}
          </figcaption>
        </figure>
      );
    case "callout":
      return (
        <div className="relative overflow-hidden rounded-[18px] bg-ink px-7 py-6.5 text-paper">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
              backgroundSize: "15px 15px",
            }}
          />
          <div className="relative mb-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-lime">
            // key takeaway
          </div>
          <p className="relative font-display text-lg font-bold leading-snug tracking-[-0.015em] text-paper sm:text-[22px]">
            {block.text}
          </p>
        </div>
      );
  }
}

export default function BlogPostBody({ post }: { post: BlogPost }) {
  return (
    <section className="pb-2 pt-0">
      <Container>
        <div className="mx-auto flex max-w-[720px] flex-col gap-5.5">
          {post.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </Container>
    </section>
  );
}
