import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import BlogImagePlaceholder from "./BlogImagePlaceholder";
import type { BlogPost } from "@/lib/blog-data";

export default function BlogRelatedPosts({ post }: { post: BlogPost }) {
  if (post.related.length === 0) return null;

  return (
    <section className="pb-2 pt-12">
      <Container>
        <Reveal className="mb-5 flex items-center gap-3">
          <span className="font-display text-[13px] font-bold uppercase tracking-[0.09em] text-green">
            Keep reading
          </span>
          <span className="h-px flex-1 bg-border-line" />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {post.related.map((r, i) => (
            <Reveal key={r.slug} delay={i * 60}>
              <Link
                href={`/blog/${r.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-border bg-white text-ink shadow-[0_8px_24px_rgba(28,27,25,0.04)] transition duration-150 hover:-translate-y-1 hover:border-border-line hover:shadow-[0_16px_34px_rgba(28,27,25,0.10)]"
              >
                <div className="aspect-16/10 border-b border-border">
                  <BlogImagePlaceholder label="Article image" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-3 self-start rounded-full bg-surface px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-green-dark">
                    {r.category}
                  </span>
                  <h3 className="mb-2.5 flex-1 font-display text-base font-extrabold leading-tight tracking-[-0.02em] text-ink">
                    {r.title}
                  </h3>
                  <div className="font-mono text-[11px] font-bold uppercase tracking-wide text-faint">
                    {r.readTime}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
