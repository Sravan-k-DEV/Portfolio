import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogsPage } from "@/content/blogs";
import { getBlogPosts } from "@/services/medium/medium.service";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BlogCard } from "@/components/blogs/BlogCard";

export async function FeaturedBlogs() {
  const { posts } = await getBlogPosts();
  const featured = posts.slice(0, 3);

  return (
    <Section id="blogs">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow={blogsPage.homeEyebrow}
          title={blogsPage.homeHeading}
          subtitle={blogsPage.homeSubheading}
          className="mb-0"
        />
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          {blogsPage.viewAllLabel}
          <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {featured.map((post) => (
          <BlogCard key={post.slug} post={post} compact />
        ))}
      </div>
    </Section>
  );
}
