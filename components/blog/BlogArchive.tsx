"use client";

import { useState } from "react";
import Container from "@/components/Container";
import { blogCategories, blogSummaries, type BlogCategory } from "@/lib/blog-data";
import BlogPostCard from "./BlogPostCard";

const PAGE_SIZE = 6;

export default function BlogArchive() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered =
    activeCategory === "All"
      ? blogSummaries
      : blogSummaries.filter((p) => p.category === activeCategory);
  const visiblePosts = filtered.slice(0, visibleCount);
  const showLoadMore = visibleCount < filtered.length;

  function selectCategory(category: BlogCategory) {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <section className="pb-14 sm:pb-16">
      <Container>
        <div className="mb-5 flex items-center gap-3">
          <span className="font-display text-[13px] font-bold uppercase tracking-[0.09em] text-green">
            Browse by topic
          </span>
          <span className="flex-1 border-b border-border-line" />
        </div>
        <h2 className="mb-6 font-display text-[28px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink sm:text-4xl lg:text-[44px]">
          Find exactly what you&apos;re looking for.
        </h2>

        <div className="mb-8 flex flex-wrap gap-2.5">
          {blogCategories.map((category) => {
            const on = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => selectCategory(category)}
                aria-pressed={on}
                className={`cursor-pointer rounded-full px-4 py-2.5 font-display text-[13px] font-bold tracking-[-0.01em] transition-all duration-150 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-2 ${
                  on
                    ? "border-2 border-ink bg-green text-white shadow-[2px_2px_0_#1C1B19]"
                    : "border border-border bg-white text-body hover:border-border-soft"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
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
