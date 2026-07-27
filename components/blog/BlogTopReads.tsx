import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import Headline from "@/components/sanity/Headline";
import BlogPostCard from "./BlogPostCard";
import type { PostSummary, SectionHeader } from "@/sanity/lib/types";

export default function BlogTopReads({
  header,
  posts,
}: {
  header?: SectionHeader | null;
  posts: PostSummary[];
}) {
  if (!posts?.length) return null;

  return (
    <section className="py-12 sm:py-14">
      <Container>
        {header?.eyebrow && (
          <div className="mb-5 flex items-center gap-3">
            <span className="font-display text-[13px] font-bold uppercase tracking-[0.09em] text-green">
              {header.eyebrow}
            </span>
            <span className="flex-1 border-b border-border-line" />
          </div>
        )}
        <h2 className="mb-2.5 font-display text-[28px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink sm:text-4xl lg:text-[44px]">
          <Headline value={header?.headline} />
        </h2>
        <Copy
          value={header?.intro}
          className="mb-7 max-w-[680px] font-body text-base font-medium leading-relaxed text-body"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post._id} delay={i * 80}>
              <BlogPostCard post={post} size="lg" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
