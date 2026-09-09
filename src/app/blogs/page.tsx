import type { Metadata } from "next";
import { blogsPage } from "@/content/blogs";
import { getBlogPosts } from "@/services/medium/medium.service";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { FeaturedBlog } from "@/components/blogs/FeaturedBlog";
import { BlogGrid } from "@/components/blogs/BlogGrid";

export const metadata: Metadata = buildMetadata({
  title: "Blogs",
  description: blogsPage.pageIntro,
  path: "/blogs",
});

export default async function BlogsPage() {
  const { posts, source } = await getBlogPosts();
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const rest = posts.filter((post) => post.slug !== featured?.slug);

  return (
    <div className="pb-20 pt-28">
      <Container>
        <p className="text-eyebrow">{blogsPage.pageEyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
          {blogsPage.pageHeading}
        </h1>
        <p className="mt-4 max-w-3xl text-base text-foreground/70">
          {blogsPage.pageIntro}
        </p>
        {source === "medium" ? (
          <p className="mt-2 text-xs text-foreground/50">
            Synced from Medium · Substack
          </p>
        ) : null}

        {featured ? (
          <section className="mt-14">
            <FeaturedBlog post={featured} />
          </section>
        ) : null}

        <section className="mt-16">
          <p className="text-eyebrow mb-6">{blogsPage.allEyebrow}</p>
          <BlogGrid
            posts={rest.length > 0 ? rest : posts}
            tagSource={posts}
          />
        </section>
      </Container>
    </div>
  );
}
