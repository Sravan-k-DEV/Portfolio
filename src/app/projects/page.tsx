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
import { Reveal, WordReveal } from "@/components/ui/Reveal";

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
        <WordReveal
          as="h1"
          text={projectsPage.heading}
          className="mt-3 font-serif text-4xl font-semibold leading-[1.2] md:text-5xl"
        />
        <Reveal>
          <p className="mt-4 max-w-3xl text-base text-foreground/70">
            {projectsPage.intro}
          </p>
        </Reveal>

        <section className="mt-14">
          <p className="text-eyebrow mb-6">{projectsPage.featuredEyebrow}</p>
          <div className="grid gap-6">
            {featured.map((project, index) => (
              <Reveal key={project.slug} delay={index * 80}>
                <FeaturedProject project={project} priority={index === 0} />
              </Reveal>
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
