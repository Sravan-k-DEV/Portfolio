import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAdjacentProjects,
  getProjectBySlug,
  projects,
} from "@/content/projects";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ProjectOverview } from "@/components/projects/ProjectOverview";
import { ProjectNavigation } from "@/components/projects/ProjectNavigation";
import { ProjectToc } from "@/components/projects/ProjectToc";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return buildMetadata({ title: "Project not found", noIndex: true });

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.coverImage,
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <article>
      <ProjectHero project={project} />
      <Container width="wide" className="py-14">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          <ProjectToc items={project.caseStudy.toc} />
          <div>
            <ProjectOverview project={project} />
            <ProjectNavigation prev={prev} next={next} />
          </div>
        </div>
      </Container>
    </article>
  );
}
