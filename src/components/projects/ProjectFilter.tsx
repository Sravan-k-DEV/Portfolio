"use client";

import { cn } from "@/lib/utils";
import type { ProjectFilter } from "@/content/projects";

export function ProjectFilter({
  filters,
  active,
  onChange,
}: {
  filters: ProjectFilter[];
  active: ProjectFilter;
  onChange: (filter: ProjectFilter) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project filters">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          role="tab"
          aria-selected={active === filter}
          onClick={() => onChange(filter)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm transition-colors",
            active === filter
              ? "border-ink bg-ink text-cream dark:border-cream dark:bg-cream dark:text-ink"
              : "border-border text-foreground hover:border-sage",
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
