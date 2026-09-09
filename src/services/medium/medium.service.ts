import { XMLParser } from "fast-xml-parser";
import { blogs } from "@/content/blogs";
import { MEDIUM_REVALIDATE_SECONDS } from "@/lib/constants";
import type { BlogPost } from "@/types/blog";
import type { MediumServiceResult } from "./medium.types";

function estimateReadTime(text: string): string {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(3, Math.round(words / 200));
  return `${minutes} min read`;
}

function toSlug(title: string, index: number): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return base || `medium-post-${index + 1}`;
}

function normalizeItems(channel: unknown): Array<Record<string, unknown>> {
  if (!channel || typeof channel !== "object") return [];
  const item = (channel as { item?: unknown }).item;
  if (!item) return [];
  return Array.isArray(item) ? item : [item as Record<string, unknown>];
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractCoverImage(html: string, fallback: string): string {
  const matches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)];
  for (const match of matches) {
    const src = match[1];
    if (!src) continue;
    if (src.includes("medium.com/_/stat")) continue;
    if (src.includes("cdn-images") || src.includes("miro.medium.com")) {
      return src.replace(/\/max\/\d+\//, "/max/1200/");
    }
    if (src.startsWith("https://")) return src;
  }
  return fallback;
}

import { normalizeTag } from "@/lib/tags";

function cleanTag(raw: string): string {
  return normalizeTag(raw);
}

/** Medium RSS exposes hashtags as <category> on each item. */
function extractTags(item: Record<string, unknown>): string[] {
  const category = item.category;
  if (!category) return [];

  const values = Array.isArray(category) ? category : [category];
  const tags = values
    .map((value) => {
      if (typeof value === "string") return cleanTag(value);
      if (value && typeof value === "object" && "#text" in value) {
        return cleanTag(String((value as { "#text": string })["#text"]));
      }
      return cleanTag(String(value));
    })
    .filter(Boolean);

  return [...new Set(tags)];
}

function mapRssToPosts(items: Array<Record<string, unknown>>): BlogPost[] {
  return items.slice(0, 12).map((item, index) => {
    const title = String(item.title ?? "Untitled");
    const link = String(item.link ?? "https://medium.com");
    const rawHtml = String(item["content:encoded"] ?? item.description ?? "");
    const description = stripHtml(rawHtml);
    const pubDate = item.pubDate ? new Date(String(item.pubDate)) : null;
    const date =
      pubDate && !Number.isNaN(pubDate.getTime())
        ? pubDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "Recent";

    const fallbackCover =
      blogs[index % blogs.length]?.coverImage ?? blogs[0].coverImage;
    const tags = extractTags(item);
    const category = tags[0] ?? "general";

    return {
      slug: toSlug(title, index),
      title,
      excerpt: description.slice(0, 180) || "Read on Medium.",
      excerptShort: description.slice(0, 110) || "Read on Medium.",
      date,
      readTime: estimateReadTime(description),
      tags,
      category,
      featured: index === 0,
      coverImage: extractCoverImage(rawHtml, fallbackCover),
      coverAlt: title,
      mediumUrl: link,
    };
  });
}

export async function getBlogPosts(): Promise<MediumServiceResult> {
  const username = process.env.MEDIUM_USERNAME?.trim();

  if (!username) {
    return { posts: blogs, source: "static" };
  }

  try {
    const feedUrl = `https://medium.com/feed/@${username.replace(/^@/, "")}`;
    const response = await fetch(feedUrl, {
      next: { revalidate: MEDIUM_REVALIDATE_SECONDS },
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml, */*",
        "User-Agent":
          "Mozilla/5.0 (compatible; SravanPortfolio/1.0; +https://localhost)",
      },
    });

    if (!response.ok) {
      throw new Error(`Medium RSS responded with ${response.status}`);
    }

    const xml = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
    });
    const parsed = parser.parse(xml);
    const items = normalizeItems(parsed?.rss?.channel);
    const posts = mapRssToPosts(items);

    if (posts.length === 0) {
      return { posts: blogs, source: "static" };
    }

    return { posts, source: "medium" };
  } catch {
    return { posts: blogs, source: "static" };
  }
}
