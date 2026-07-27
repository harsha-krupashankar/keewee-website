import Link from "next/link";

import SanityImage from "@/components/sanity/SanityImage";
import { formatPostDate, formatReadTime } from "@/lib/format";
import type { PostSummary } from "@/sanity/lib/types";

export default function BlogPostCard({
  post,
  size = "md",
}: {
  post: PostSummary;
  size?: "md" | "lg";
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-border bg-white text-ink shadow-[0_8px_24px_rgba(28,27,25,0.04)] transition-all duration-150 hover:-translate-y-1 hover:border-border-soft hover:shadow-[0_16px_34px_rgba(28,27,25,0.10)]"
    >
      <div className="aspect-[16/10] overflow-hidden border-b border-border bg-surface">
        {post.heroImage?.asset && (
          <SanityImage
            image={post.heroImage}
            width={640}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {post.category && (
          <span className="mb-3 self-start rounded-full bg-surface px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-green-dark">
            {post.category.title}
          </span>
        )}
        <h3
          className={`mb-2.5 font-display font-extrabold tracking-[-0.02em] text-ink ${
            size === "lg" ? "text-[19px] leading-[1.2]" : "text-[18px] leading-[1.22]"
          }`}
        >
          {post.title}
        </h3>
        <p
          className={`mb-4 flex-1 font-body font-medium leading-relaxed text-body ${
            size === "lg" ? "text-sm" : "text-[13.5px]"
          }`}
        >
          {post.dek}
        </p>
        <div className="font-mono text-[11px] font-bold uppercase tracking-wide text-faint">
          {formatPostDate(post.publishedAt)} · {formatReadTime(post.readTime)}
        </div>
      </div>
    </Link>
  );
}
