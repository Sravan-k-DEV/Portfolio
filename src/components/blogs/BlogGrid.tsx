"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/types/blog";
import { BlogCard } from "./BlogCard";
import { collectUniqueTags, formatMediumTagLabel, normalizeTag } from "@/lib/tags";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export function BlogGrid({
  posts,
  tagSource,
}: {
  posts: BlogPost[];
  /** Use all synced posts so featured article tags still appear in the filter row */
  tagSource?: BlogPost[];
}) {
  const [filter, setFilter] = useState<string>("All");

  const filters = useMemo(() => {
    const source = tagSource ?? posts;
    return ["All", ...collectUniqueTags(source.map((post) => post.tags))];
  }, [posts, tagSource]);

  const visible = useMemo(() => {
    if (filter === "All") return posts;
    return posts.filter((post) =>
      post.tags.some((tag) => normalizeTag(tag) === filter),
    );
  }, [filter, posts]);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Blog hashtag filters from Medium"
      >
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={filter === item}
            onClick={() => setFilter(item)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              filter === item
                ? "border-ink bg-ink text-cream dark:border-cream dark:bg-cream dark:text-ink"
                : "border-border text-foreground hover:border-sage",
            )}
          >
            {item === "All" ? "All" : formatMediumTagLabel(item)}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post, index) => (
          <Reveal key={post.slug} delay={index * 70}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="mt-8 text-sm text-foreground/60">
          No articles with this Medium tag yet.
        </p>
      ) : null}
    </div>
  );
}
