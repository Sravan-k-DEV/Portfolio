import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/types/project";

export function ProjectNavigation({
  prev,
  next,
}: {
  prev: Project | null;
  next: Project | null;
}) {
  return (
    <nav
      className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
      aria-label="Project navigation"
    >
      {prev ? (
        <Link
          href={`/projects/${prev.slug}`}
          className="rounded-xl border border-border p-5 transition-colors hover:border-sage"
        >
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-primary">
            <ArrowLeft className="size-3.5" /> Previous
          </span>
          <p className="mt-2 font-serif text-lg font-semibold">{prev.title}</p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/projects/${next.slug}`}
          className="rounded-xl border border-border p-5 text-right transition-colors hover:border-sage sm:justify-self-end"
        >
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-primary">
            Next <ArrowRight className="size-3.5" />
          </span>
          <p className="mt-2 font-serif text-lg font-semibold">{next.title}</p>
        </Link>
      ) : null}
    </nav>
  );
}
