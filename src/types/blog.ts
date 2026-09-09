export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  excerptShort?: string;
  date: string;
  readTime: string;
  /** Medium hashtags / topics for this post */
  tags: string[];
  /** Primary tag used for featured labeling */
  category: string;
  featured: boolean;
  coverImage: string;
  coverAlt: string;
  mediumUrl: string;
};
