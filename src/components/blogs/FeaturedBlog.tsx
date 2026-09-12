import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { blogsPage } from "@/content/blogs";

export function FeaturedBlog({ post }: { post: BlogPost }) {
  return (
    <article className="hover-pop overflow-hidden rounded-2xl border border-border bg-card">
      <a
        href={post.mediumUrl}
        target="_blank"
        rel="noreferrer"
        className="group grid md:grid-cols-2"
      >
        <div className="relative min-h-64">
          <Image
            src={post.coverImage}
            alt={post.coverAlt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 p-8">
          <p className="text-xs uppercase tracking-[0.15em] text-primary">
            {blogsPage.featuredEyebrow}
          </p>
          <h2 className="font-serif text-2xl font-semibold leading-snug md:text-3xl">
            {post.title}
          </h2>
          <p className="text-sm text-foreground/70">{post.excerpt}</p>
          <p className="text-xs text-foreground/50">
            {post.date} · {post.readTime}
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
            {blogsPage.readOnMediumLabel}
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </a>
    </article>
  );
}
