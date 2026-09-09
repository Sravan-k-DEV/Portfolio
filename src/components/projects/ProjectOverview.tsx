import type { Project } from "@/types/project";
import { ProjectArchitecture } from "./ProjectArchitecture";
import { ProjectResults } from "./ProjectResults";

export function ProjectOverview({ project }: { project: Project }) {
  const { caseStudy } = project;

  return (
    <div className="space-y-14">
      {caseStudy.sections.map((section) => {
        if (section.id === "architecture" && caseStudy.architecture) {
          return (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="font-serif text-2xl font-semibold">
                {section.heading}
              </h2>
              <ProjectArchitecture architecture={caseStudy.architecture} />
            </section>
          );
        }

        if (section.id === "howitworks" && caseStudy.howItWorks) {
          return (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="font-serif text-2xl font-semibold">
                {section.heading}
              </h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-foreground/70">
                {caseStudy.howItWorks.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>
          );
        }

        if (section.id === "stack") {
          return (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="font-serif text-2xl font-semibold">
                {section.heading}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {caseStudy.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-mist/35 px-3 py-1 text-sm dark:bg-mist/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>
          );
        }

        if (section.id === "results" && section.metrics) {
          return (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="font-serif text-2xl font-semibold">
                {section.heading}
              </h2>
              <ProjectResults metrics={section.metrics} />
            </section>
          );
        }

        return (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <h2 className="font-serif text-2xl font-semibold">
              {section.heading}
            </h2>
            {section.body ? (
              <p className="mt-4 max-w-3xl leading-relaxed text-foreground/70">
                {section.body}
              </p>
            ) : null}
            {section.items ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/70">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
