export type ProjectCategory = "GenAI" | "AI/ML" | "Data" | "Cloud";

export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectSection = {
  id: string;
  heading: string;
  body?: string;
  items?: string[];
  metrics?: ProjectMetric[];
};

export type ProjectArchitecture = {
  caption: string;
  steps: string[];
};

export type ProjectCaseStudy = {
  badge: string;
  subtitle: string;
  timeline: string;
  stackSummary: string;
  toc: { id: string; label: string }[];
  sections: ProjectSection[];
  architecture?: ProjectArchitecture;
  howItWorks?: string[];
  stack: string[];
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  summaryShort?: string;
  role: string | null;
  metric: string | null;
  tags: string[];
  category: ProjectCategory;
  featured: boolean;
  coverImage: string;
  coverAlt: string;
  order: number;
  caseStudy: ProjectCaseStudy;
};
