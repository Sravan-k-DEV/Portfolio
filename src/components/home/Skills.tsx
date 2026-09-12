"use client";

import { useState } from "react";
import {
  defaultSkillCategoryId,
  skillCategories,
  skillsSection,
  type SkillCategoryId,
} from "@/content/skills";
import { Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const PREVIEW_COUNT = 3;

export function Skills() {
  const [activeId, setActiveId] =
    useState<SkillCategoryId>(defaultSkillCategoryId);

  const featured =
    skillCategories.find((category) => category.id === activeId) ??
    skillCategories.find((category) => category.id === defaultSkillCategoryId)!;

  const supporting = skillCategories.filter(
    (category) => category.id !== featured.id,
  );

  return (
    <Section id="skills">
      <SectionHeading
        eyebrow={skillsSection.eyebrow}
        title={skillsSection.heading}
        subtitle={skillsSection.subheading}
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-5">
        <div
          key={featured.id}
          className="hover-pop animate-fade-in rounded-2xl border border-sage/40 bg-card p-6 md:p-8"
          aria-live="polite"
        >
          <p className="text-eyebrow">Core practice</p>
          <h3 className="mt-3 font-serif text-2xl font-semibold tracking-tight md:text-3xl">
            {featured.name}
          </h3>
          <p className="mt-2 max-w-xl text-sm text-foreground/70 md:text-base">
            {featured.blurb}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {featured.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-mist/40 px-3 py-1.5 text-xs text-foreground transition-transform duration-200 hover:scale-105 dark:bg-mist/20 md:text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {supporting.map((category, index) => {
            const preview = category.skills.slice(0, PREVIEW_COUNT);
            const remaining = category.skills.length - preview.length;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveId(category.id)}
                aria-label={`Show ${category.name} skills`}
                className={cn(
                  "hover-pop group rounded-2xl border border-border bg-card p-4 text-left",
                  "hover:border-sage/50 focus-visible:border-sage",
                  "md:p-5",
                )}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="font-serif text-base font-semibold tracking-tight md:text-lg">
                    {category.shortName}
                  </h4>
                  <span className="text-[11px] tabular-nums text-foreground/45">
                    {category.skills.length}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-foreground/55">
                  {category.blurb}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {preview.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-mist/30 px-2 py-0.5 text-[11px] text-foreground/80 dark:bg-mist/15"
                    >
                      {skill}
                    </span>
                  ))}
                  {remaining > 0 ? (
                    <span className="rounded-full px-2 py-0.5 text-[11px] text-foreground/45">
                      +{remaining}
                    </span>
                  ) : null}
                </div>
                <span className="mt-3 block text-[11px] text-sage opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  View stack
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
