import { aboutContent } from "@/content/about";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow={aboutContent.eyebrow}
        title={aboutContent.heading}
        subtitle={aboutContent.subheading}
      />
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4 text-base leading-relaxed text-foreground/70">
          {aboutContent.paragraphs.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 24)} delay={index * 90}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
        <aside className="space-y-4">
          {aboutContent.facts.map((fact, index) => (
            <Reveal key={fact.label} delay={120 + index * 80}>
              <div className="hover-pop rounded-xl border border-border bg-card p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-primary">
                  {fact.label}
                </p>
                <p className="mt-1 font-medium text-foreground">{fact.value}</p>
              </div>
            </Reveal>
          ))}
        </aside>
      </div>
    </Section>
  );
}
