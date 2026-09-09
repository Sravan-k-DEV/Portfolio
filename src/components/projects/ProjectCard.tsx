import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-border bg-card transition-transform hover:-translate-y-0.5",
        className,
      )}
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.coverAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-5">
          <h3 className="font-serif text-lg font-semibold leading-snug">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-foreground/70">
            {project.summaryShort ?? project.summary}
          </p>
          {project.metric ? (
            <p className="mt-3 text-sm font-medium text-primary">
              {project.metric}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-mist/35 px-2.5 py-0.5 text-[11px] dark:bg-mist/20"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
            View Case Study <ArrowRight className="size-3.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
