import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getHomeProjects, projectsPage } from "@/content/projects";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function FeaturedProjects() {
  const projects = getHomeProjects(3);

  return (
    <Section id="projects">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow={projectsPage.homeEyebrow}
          title={projectsPage.homeHeading}
          subtitle={projectsPage.homeSubheading}
          className="mb-0"
        />
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          {projectsPage.viewAllLabel}
          <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
