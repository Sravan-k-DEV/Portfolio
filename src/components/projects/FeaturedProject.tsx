import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types/project";

export function FeaturedProject({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <article className="hover-pop overflow-hidden rounded-2xl bg-featured text-featured-foreground">
      <Link href={`/projects/${project.slug}`} className="group grid md:grid-cols-2">
        <div className="relative min-h-56">
          <Image
            src={project.coverImage}
            alt={project.coverAlt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
          />
        </div>
        <div className="flex flex-col justify-center gap-4 p-8">
          {project.role ? (
            <p className="text-xs uppercase tracking-[0.15em] text-mist">
              {project.role}
            </p>
          ) : null}
          <h3 className="font-serif text-2xl font-semibold">{project.title}</h3>
          <p className="text-sm text-featured-foreground/75">{project.summary}</p>
          {project.metric ? (
            <p className="text-sm font-medium text-mist">{project.metric}</p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px]"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-2 text-sm text-mist">
            View Case Study <ArrowRight className="size-4" />
          </span>
        </div>
      </Link>
    </article>
  );
}
