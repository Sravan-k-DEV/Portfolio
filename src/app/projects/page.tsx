import type { Metadata } from "next";
import {
  getFeaturedProjects,
  projects,
  projectsPage,
} from "@/content/projects";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description: projectsPage.intro,
  path: "/projects",
});

export default function ProjectsPage() {
  const featured = getFeaturedProjects();

  return (
    <div className="pb-20 pt-28">
      <Container>
        <p className="text-eyebrow">{projectsPage.eyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
          {projectsPage.heading}
        </h1>
        <p className="mt-4 max-w-3xl text-base text-foreground/70">
          {projectsPage.intro}
        </p>

        <section className="mt-14">
          <p className="text-eyebrow mb-6">{projectsPage.featuredEyebrow}</p>
          <div className="grid gap-6">
            {featured.map((project) => (
              <FeaturedProject key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <p className="text-eyebrow mb-6">{projectsPage.allEyebrow}</p>
          <ProjectGrid projects={projects} />
        </section>
      </Container>
    </div>
  );
}
