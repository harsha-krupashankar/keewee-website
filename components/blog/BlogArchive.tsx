"use client";

import { useMemo, useState } from "react";
import Container from "@/components/Container";
import Headline from "@/components/sanity/Headline";
import BlogPostCard from "./BlogPostCard";
import type { Category, PostSummary, SectionHeader } from "@/sanity/lib/types";

const PAGE_SIZE = 6;
const ALL = "all";

export default function BlogArchive({
  header,
  posts,
  categories,
}: {
  header?: SectionHeader | null;
  posts: PostSummary[];
  categories: Category[];
}) {
  const [activeId, setActiveId] = useState<string>(ALL);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () =>
      activeId === ALL
        ? posts
        : posts.filter((post) => post.category?._id === activeId),
    [activeId, posts]
  );

  const visiblePosts = filtered.slice(0, visibleCount);
  const showLoadMore = visibleCount < filtered.length;

  function selectCategory(id: string) {
    setActiveId(id);
    setVisibleCount(PAGE_SIZE);
  }

  // "All" is not a document — it's a UI affordance, so it is prepended here
  // rather than living as a real category an editor could delete.
  const pills = [{ _id: ALL, title: "All", slug: ALL }, ...categories];

  return (
    <section className="pb-14 sm:pb-16">
      <Container>
        {header?.eyebrow && (
          <div className="mb-5 flex items-center gap-3">
            <span className="font-display text-[13px] font-bold uppercase tracking-[0.09em] text-green">
              {header.eyebrow}
            </span>
            <span className="flex-1 border-b border-border-line" />
          </div>
        )}
        <h2 className="mb-6 font-display text-[28px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink sm:text-4xl lg:text-[44px]">
          <Headline value={header?.headline} />
        </h2>

        <div className="mb-8 flex flex-wrap gap-2.5">
          {pills.map((category) => {
            const on = category._id === activeId;
            return (
              <button
                key={category._id}
                type="button"
                onClick={() => selectCategory(category._id)}
                aria-pressed={on}
                className={`cursor-pointer rounded-full px-4 py-2.5 font-display text-[13px] font-bold tracking-[-0.01em] transition-all duration-150 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-2 ${
                  on
                    ? "border-2 border-ink bg-green text-white shadow-[2px_2px_0_#1C1B19]"
                    : "border border-border bg-white text-body hover:border-border-soft"
                }`}
              >
                {category.title}
              </button>
            );
          })}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </div>

        {showLoadMore && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="cursor-pointer rounded-xl border-2 border-ink bg-transparent px-7.5 py-3.5 font-display text-base font-bold text-ink transition-colors duration-150 hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-[3px]"
            >
              Load more
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
