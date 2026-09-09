import type { ProjectMetric } from "@/types/project";

export function ProjectResults({ metrics }: { metrics: ProjectMetric[] }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-2xl border border-border bg-card p-5"
        >
          <p className="font-serif text-2xl font-semibold text-primary">
            {metric.value}
          </p>
          <p className="mt-1 text-sm text-foreground/70">{metric.label}</p>
        </div>
      ))}
    </div>
  );
}
