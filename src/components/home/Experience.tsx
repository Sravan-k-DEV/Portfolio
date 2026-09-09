import { experience, experienceSection } from "@/content/experience";
import { Section, SectionHeading } from "@/components/ui/Section";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow={experienceSection.eyebrow}
        title={experienceSection.heading}
        subtitle={experienceSection.subheading}
      />
      <ol className="space-y-8 border-l border-border pl-6">
        {experience.map((item) => (
          <li key={`${item.company}-${item.dates}`} className="relative">
            <span className="absolute -left-[1.9rem] top-1.5 size-3 rounded-full border-2 border-sage bg-background" />
            <p className="text-xs uppercase tracking-[0.15em] text-primary">
              {item.dates}
            </p>
            <h3 className="mt-2 font-serif text-xl font-semibold">
              {item.title}
            </h3>
            <p className="text-sm text-foreground/70">
              {item.company}
              {item.location ? ` · ${item.location}` : ""}
            </p>
            <p className="mt-2 text-sm text-foreground/70">{item.summary}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground/70">
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
