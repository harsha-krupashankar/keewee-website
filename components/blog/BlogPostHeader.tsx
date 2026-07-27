import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SanityImage from "@/components/sanity/SanityImage";
import { formatPostDate, formatReadTime } from "@/lib/format";
import type { Post } from "@/sanity/lib/types";

export default function BlogPostHeader({ post }: { post: Post }) {
  return (
    <section className="pb-0 pt-11 md:pt-14">
      <Container>
        <Reveal>
          <Link
            href="/blog"
            className="mb-5.5 inline-flex items-center gap-1.5 font-display text-sm font-bold text-muted hover:text-green"
          >
            ← All blogs
          </Link>
        </Reveal>

        {post.category && (
          <Reveal delay={60}>
            <span className="mb-4.5 inline-block rounded-full bg-surface px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wide text-green-dark">
              {post.category.title}
            </span>
          </Reveal>
        )}

        <Reveal delay={120} y={18}>
          <h1 className="mb-4.5 max-w-[840px] font-display text-[32px] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink text-pretty sm:text-[44px] lg:text-[52px]">
            {post.title}
          </h1>
        </Reveal>

        <Reveal delay={180} y={18}>
          <p className="mb-7 max-w-[740px] font-body text-lg font-medium leading-relaxed text-body">
            {post.dek}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mb-8 flex flex-wrap items-center gap-3.5">
            {post.author?.photo?.asset && (
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-ink shadow-[2px_2px_0_#1C1B19]">
                <SanityImage
                  image={post.author.photo}
                  width={88}
                  sizes="44px"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2 font-body text-sm font-semibold text-body">
              {post.author && (
                <>
                  <span className="font-bold text-ink">{post.author.name}</span>
                  <span className="text-border-line">•</span>
                </>
              )}
              <span className="font-mono text-xs font-bold uppercase tracking-wide text-faint">
                {formatPostDate(post.publishedAt)} · {formatReadTime(post.readTime)}
              </span>
            </div>
          </div>
        </Reveal>
      </Container>

      {post.heroImage?.asset && (
        <Container className="pb-11 md:pb-14">
          <Reveal delay={80}>
            <div className="aspect-16/8 overflow-hidden rounded-[18px] border border-border-soft shadow-[0_18px_44px_rgba(28,27,25,0.1)]">
              <SanityImage
                image={post.heroImage}
                width={1600}
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </Reveal>
        </Container>
      )}
    </section>
  );
}
