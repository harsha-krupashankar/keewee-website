import BlogImagePlaceholder from "./BlogImagePlaceholder";
import type { BlogSummary } from "@/lib/blog-data";

export default function BlogPostCard({
  post,
  size = "md",
}: {
  post: BlogSummary;
  size?: "md" | "lg";
}) {
  return (
    <a
      href="#"
      className="group flex flex-col overflow-hidden rounded-[18px] border border-border bg-white text-ink shadow-[0_8px_24px_rgba(28,27,25,0.04)] transition-all duration-150 hover:-translate-y-1 hover:border-border-soft hover:shadow-[0_16px_34px_rgba(28,27,25,0.10)]"
    >
      <div className="aspect-[16/10] border-b border-border bg-surface">
        <BlogImagePlaceholder label="Article image" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-3 self-start rounded-full bg-surface px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-green-dark">
          {post.category}
        </span>
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
          {post.excerpt}
        </p>
        <div className="font-mono text-[11px] font-bold uppercase tracking-wide text-faint">
          {post.date} · {post.readTime}
        </div>
      </div>
    </a>
  );
}
