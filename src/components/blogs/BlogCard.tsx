import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { blogsPage } from "@/content/blogs";
import { formatMediumTagLabel } from "@/lib/tags";
import { cn } from "@/lib/utils";

export function BlogCard({
  post,
  compact = false,
}: {
  post: BlogPost;
  compact?: boolean;
}) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-border bg-card transition-transform hover:-translate-y-0.5",
      )}
    >
      <a
        href={post.mediumUrl}
        target="_blank"
        rel="noreferrer"
        className="block"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.coverAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-5">
          <p className="text-xs text-foreground/50">
            {post.date} · {post.readTime}
          </p>
          <h3 className="mt-2 font-serif text-lg font-semibold leading-snug">
            {post.title}
          </h3>
          {post.tags.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-mist/35 px-2 py-0.5 text-[11px] text-foreground/70 dark:bg-mist/20"
                >
                  {formatMediumTagLabel(tag)}
                </span>
              ))}
            </div>
          ) : null}
          <p className="mt-2 text-sm text-foreground/70">
            {compact ? (post.excerptShort ?? post.excerpt) : post.excerpt}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
            {blogsPage.readOnMediumLabel}
            <ArrowUpRight className="size-3.5" />
          </span>
        </div>
      </a>
    </article>
  );
}
