import type { BlogPost } from "@/types/blog";

export const blogsPage = {
  homeEyebrow: "The Thinking",
  homeHeading: "Blogs",
  homeSubheading: "Notes on building applied AI.",
  viewAllLabel: "View All Blogs",
  pageEyebrow: "Writing",
  pageHeading: "Thoughts and Writings",
  pageIntro:
    "Notes on applied AI engineering: retrieval, agents, evaluation, and the infrastructure that makes ML systems trustworthy in production. Full articles are published on Medium.",
  featuredEyebrow: "Featured Article",
  allEyebrow: "All Articles",
  readOnMediumLabel: "Read on Medium",
} as const;

/** Static fallback when Medium RSS is unavailable. */
export const blogs: BlogPost[] = [
  {
    slug: "rag-generation-report-card",
    title: "How Do You Evaluate a RAG App? (Part 2: The Generation Report Card)",
    excerpt:
      "Part 1 convinced the interviewer that retrieval could be flawless — then the real generation questions show up.",
    excerptShort:
      "Generation metrics that matter after retrieval looks perfect.",
    date: "Aug 23, 2025",
    readTime: "8 min read",
    tags: [
      "agnetic-ai",
      "retrieval-evaluation",
      "rags",
      "llm-evaluation",
      "genai",
    ],
    category: "llm-evaluation",
    featured: true,
    coverImage:
      "https://cdn-images-1.medium.com/max/1200/1*5RbLsMU6muxd4Jd4B16pZw.png",
    coverAlt: "RAG Generation Evaluation Report Card",
    mediumUrl:
      "https://medium.com/@sravankumaryadav/how-do-you-evaluate-a-rag-app-part-2-the-generation-report-card-417f354c5ada",
  },
  {
    slug: "rag-retrieval-report-card",
    title: "How Do You Evaluate a RAG App? (Part 1: The Retrieval Report Card)",
    excerpt:
      "Someone in an interview leans forward and asks how you evaluate a RAG app — start with the retrieval report card.",
    excerptShort: "Precision, recall, and ranking for RAG retrieval.",
    date: "Aug 20, 2025",
    readTime: "8 min read",
    tags: [
      "llm-evaluation",
      "retrieval-evaluation",
      "rags",
      "genai",
      "agentic-ai",
    ],
    category: "retrieval-evaluation",
    featured: false,
    coverImage:
      "https://cdn-images-1.medium.com/max/1200/1*rHVD21MM2L1NH_cvrJw29g.png",
    coverAlt: "RAG Retrieval Evaluation Report Card",
    mediumUrl:
      "https://medium.com/@sravankumaryadav/how-do-you-evaluate-a-rag-app-part-1-the-retrieval-report-card-4a517e4ae090",
  },
];

export function getFeaturedBlogs(limit = 3): BlogPost[] {
  const featured = blogs.filter((b) => b.featured);
  const rest = blogs.filter((b) => !b.featured);
  return [...featured, ...rest].slice(0, limit);
}
