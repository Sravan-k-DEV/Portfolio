"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/types/project";
import {
  filterProjects,
  projectFilters,
  type ProjectFilter,
} from "@/content/projects";
import { ProjectFilter as FilterBar } from "./ProjectFilter";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectFilter>("All");

  const visible = useMemo(() => {
    if (filter === "All") return projects;
    return filterProjects(filter);
  }, [filter, projects]);

  return (
    <div>
      <FilterBar
        filters={[...projectFilters]}
        active={filter}
        onChange={setFilter}
      />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => (
          <Reveal key={project.slug} delay={index * 70}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="mt-8 text-sm text-foreground/60">
          No projects in this category yet.
        </p>
      ) : null}
    </div>
  );
}
