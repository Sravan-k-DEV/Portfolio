"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects, projectsPage } from "@/content/projects";
import { SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedProjects() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let velocity = 0;
    let lastLeft = scroller.scrollLeft;

    const applyParallax = () => {
      const center = window.innerWidth / 2;

      cardRefs.current.forEach((card) => {
        if (!card) return;
        const media = card.querySelector<HTMLElement>("[data-parallax]");
        if (!media) return;

        if (reduce) {
          media.style.transform = "translate3d(0,0,0) scale(1.12)";
          return;
        }

        const rect = card.getBoundingClientRect();
        const offset = (rect.left + rect.width / 2 - center) / window.innerWidth;
        const shift = Math.max(-56, Math.min(56, offset * -42 - velocity * 0.45));
        media.style.transform = `translate3d(${shift}px, 0, 0) scale(1.18)`;
      });
    };

    const onScroll = () => {
      const next = scroller.scrollLeft;
      const delta = Math.max(-48, Math.min(48, next - lastLeft));
      velocity = velocity * 0.72 + delta * 0.28;
      lastLeft = next;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(applyParallax);
    };

    const SPEED = 0.32;

    const onWheel = (event: WheelEvent) => {
      const isHorizontal =
        Math.abs(event.deltaX) > 4 &&
        Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.25;
      if (!isHorizontal) return;

      event.preventDefault();
      scroller.scrollLeft += event.deltaX * SPEED;
    };

    applyParallax();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", applyParallax);

    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", applyParallax);
    };
  }, []);

  return (
    <section id="projects" className="py-10 md:py-14">
      <Container>
        <Reveal>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={projectsPage.homeEyebrow}
              title={projectsPage.homeHeading}
              subtitle={projectsPage.homeSubheading}
              className="mb-0"
            />
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-transform duration-300 hover:translate-x-0.5"
            >
              {projectsPage.viewAllLabel}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </Container>

      <div
        ref={scrollerRef}
        className="project-rail flex gap-5 overflow-x-auto overscroll-x-contain px-6 pb-4 md:gap-6 md:px-12"
        aria-label="All projects"
      >
        {projects.map((project, index) => (
          <article
            key={project.slug}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            className="hover-pop group w-[min(84vw,22.5rem)] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-card"
          >
            <Link href={`/projects/${project.slug}`} className="block">
              <div className="relative aspect-[16/10] overflow-hidden">
                <div data-parallax className="absolute inset-0 will-change-transform">
                  <Image
                    src={project.coverImage}
                    alt={project.coverAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 84vw, 360px"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold leading-snug">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/70">
                  {project.summaryShort ?? project.summary}
                </p>
                {project.metric ? (
                  <p className="mt-3 text-sm font-medium text-primary">
                    {project.metric}
                  </p>
                ) : null}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-mist/35 px-2.5 py-0.5 text-[11px] dark:bg-mist/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                  {projectsPage.viewCaseStudyLabel}
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
