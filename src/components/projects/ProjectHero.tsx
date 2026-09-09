import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/types/project";
import { Container } from "@/components/ui/Container";

export function ProjectHero({ project }: { project: Project }) {
  const { caseStudy } = project;

  return (
    <div className="border-b border-border pb-12 pt-28">
      <Container width="wide">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to Projects
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <span className="rounded-full border border-sage/40 px-3 py-1 text-xs uppercase tracking-[0.15em] text-primary">
              {caseStudy.badge}
            </span>
            <h1 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-foreground/70">
              {caseStudy.subtitle}
            </p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-xs uppercase tracking-[0.15em] text-primary">
                  Role
                </dt>
                <dd className="mt-1 text-sm">{project.role ?? "Contributor"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.15em] text-primary">
                  Timeline
                </dt>
                <dd className="mt-1 text-sm">{caseStudy.timeline}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.15em] text-primary">
                  Stack
                </dt>
                <dd className="mt-1 text-sm">{caseStudy.stackSummary}</dd>
              </div>
            </dl>
          </div>
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-border">
            <Image
              src={project.coverImage}
              alt={project.coverAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
