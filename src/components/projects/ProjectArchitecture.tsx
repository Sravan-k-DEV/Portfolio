import type { ProjectArchitecture as Architecture } from "@/types/project";
import { ArrowDown } from "lucide-react";

export function ProjectArchitecture({
  architecture,
}: {
  architecture: Architecture;
}) {
  return (
    <div className="mt-4">
      <p className="mb-6 max-w-2xl text-sm text-foreground/60">
        {architecture.caption}
      </p>
      <ol className="mx-auto flex max-w-md flex-col items-stretch gap-2">
        {architecture.steps.map((step, index) => (
          <li key={step} className="flex flex-col items-center">
            <div className="w-full rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium">
              {step}
            </div>
            {index < architecture.steps.length - 1 ? (
              <ArrowDown className="my-1 size-4 text-primary" aria-hidden />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
