import type { BlogPost } from "@/types/blog";

export type MediumFeedItem = {
  title: string;
  link: string;
  pubDate?: string;
  contentSnippet?: string;
};

export type MediumServiceResult = {
  posts: BlogPost[];
  source: "medium" | "static";
};
