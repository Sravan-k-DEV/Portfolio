import type { Project, ProjectCategory } from "@/types/project";
import {
  agenticRagPlatform,
  rfpMultiAgentPlatform,
  documentIngestionPipeline,
  hybridRagCompliance,
  deckPilot,
} from "./sravan-projects";

export const projectsPage = {
  eyebrow: "Selected Work",
  heading: "Projects",
  intro:
    "Production AI systems I have designed and shipped — Agentic RAG platforms, multi-agent RFP workflows, enterprise ingestion pipelines, and personal tools like DeckPilot.",
  featuredEyebrow: "Featured",
  allEyebrow: "All Projects",
  homeEyebrow: "The Work",
  homeHeading: "Projects",
  homeSubheading: "Systems I am proud to have built.",
  viewAllLabel: "View All Projects",
  viewCaseStudyLabel: "View Case Study",
} as const;

export const projectFilters = [
  "All",
  "GenAI",
  "AI/ML",
  "Data",
  "Cloud",
] as const;

export type ProjectFilter = (typeof projectFilters)[number];

export const projects: Project[] = [
  agenticRagPlatform,
  rfpMultiAgentPlatform,
  documentIngestionPipeline,
  hybridRagCompliance,
  deckPilot,
].sort((a, b) => a.order - b.order);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getHomeProjects(limit = 3): Project[] {
  return projects.slice(0, limit);
}

export function filterProjects(filter: ProjectFilter): Project[] {
  if (filter === "All") return projects;
  if (filter === "Cloud") {
    return projects.filter(
      (p) =>
        p.category === "Cloud" ||
        p.tags.some((t) =>
          ["AWS", "Azure", "Docker", "GitHub Actions"].includes(t),
        ),
    );
  }
  if (filter === "Data") {
    return projects.filter(
      (p) =>
        p.category === "Data" ||
        p.tags.some((t) =>
          ["Embeddings", "Data", "Hybrid Search"].includes(t),
        ),
    );
  }
  return projects.filter((p) => p.category === (filter as ProjectCategory));
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}
