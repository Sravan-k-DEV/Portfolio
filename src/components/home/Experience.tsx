"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { experience, experienceSection } from "@/content/experience";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const SNAP_MS = 220;
const WHEEL_SCALE = 720;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function progressForIndex(index: number, count: number) {
  if (count <= 1) return 0;
  return index / (count - 1);
}

function nearestIndex(progress: number, count: number) {
  if (count <= 1) return 0;
  return Math.round(clamp(progress, 0, 1) * (count - 1));
}

export function Experience() {
  const count = experience.length;
  const surfaceRef = useRef<HTMLDivElement>(null);
  const snapTimer = useRef(0);
  const drag = useRef<{
    pointerId: number;
    startX: number;
    startProgress: number;
    moved: boolean;
  } | null>(null);

  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [live, setLive] = useState(false);

  const activeIndex = nearestIndex(progress, count);
  const instant = dragging || live;
  const liveIndex = experience.findIndex((item) => item.live);
  const parkedAtLive =
    liveIndex >= 0 &&
    !dragging &&
    !live &&
    Math.abs(progress - progressForIndex(liveIndex, count)) < 0.08;
  const markMotion = instant
    ? "none"
    : "0.7s cubic-bezier(0.16, 1, 0.3, 1)";
  const nowLogo = experience[0];
  const thenLogo = experience[1];

  const snapTo = useCallback(
    (index: number) => {
      window.clearTimeout(snapTimer.current);
      setLive(false);
      setDragging(false);
      setProgress(progressForIndex(index, count));
    },
    [count],
  );

  const scheduleSnap = useCallback(() => {
    window.clearTimeout(snapTimer.current);
    snapTimer.current = window.setTimeout(() => {
      setLive(false);
      setProgress((current) =>
        progressForIndex(nearestIndex(current, count), count),
      );
    }, SNAP_MS);
  }, [count]);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const onWheel = (event: WheelEvent) => {
      const isHorizontal =
        Math.abs(event.deltaX) > 4 &&
        Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.25;
      if (!isHorizontal) return;

      event.preventDefault();
      setLive(true);
      setProgress((current) =>
        clamp(current + event.deltaX / WHEEL_SCALE, 0, 1),
      );
      scheduleSnap();
    };

    surface.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      surface.removeEventListener("wheel", onWheel);
      window.clearTimeout(snapTimer.current);
    };
  }, [scheduleSnap]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest("button")) return;
    if (!target.closest("[data-journey-rail]")) return;

    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startProgress: progress,
      moved: false,
    };
    surfaceRef.current?.setPointerCapture(event.pointerId);
    setDragging(true);
    window.clearTimeout(snapTimer.current);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const session = drag.current;
    if (!session || session.pointerId !== event.pointerId) return;

    const width = surfaceRef.current?.clientWidth ?? 1;
    const delta = session.startX - event.clientX;
    if (Math.abs(delta) > 6) session.moved = true;
    setProgress(clamp(session.startProgress + delta / width, 0, 1));
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const session = drag.current;
    if (!session || session.pointerId !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
    if (session.moved) {
      setProgress((current) =>
        progressForIndex(nearestIndex(current, count), count),
      );
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      snapTo(Math.min(count - 1, activeIndex + 1));
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      snapTo(Math.max(0, activeIndex - 1));
    }
  };

  return (
    <Section id="experience">
      <SectionHeading
        eyebrow={experienceSection.eyebrow}
        title={experienceSection.heading}
        subtitle={experienceSection.subheading}
      />

      <Reveal>
        <div
          ref={surfaceRef}
          className="journey-track outline-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
          tabIndex={0}
          aria-label="Career journey. Use left and right arrows, or swipe, to move between now and earlier."
        >
          <div data-journey-rail>
          <div
            className="relative h-20 overflow-visible"
            role="tablist"
            aria-label="Journey stops"
          >
            <div
              className="absolute inset-x-1.5 top-1/2 h-px -translate-y-1/2 bg-border"
              aria-hidden
            />
            <div
              className="absolute top-1/2 left-1.5 h-px -translate-y-1/2 bg-primary"
              style={{
                width: `calc((100% - 0.75rem) * ${progress})`,
                transition: instant ? "none" : `width ${markMotion}`,
              }}
              aria-hidden
            />
            <div
              className={cn(
                "journey-mark pointer-events-none absolute top-1/2 z-20 size-12",
                parkedAtLive && "journey-mark-play journey-pulse",
              )}
              style={{
                left: `calc(0.375rem + (100% - 0.75rem) * ${progress})`,
                transition: instant ? "none" : `left ${markMotion}`,
              }}
              aria-hidden
            >
              <span className="relative z-10 block size-12 overflow-hidden rounded-full bg-background shadow-[0_0_0_3px_var(--background)] ring-1 ring-border">
                {nowLogo ? (
                  <img
                    src={nowLogo.logo}
                    alt=""
                    draggable={false}
                    className="absolute inset-0 size-full object-contain p-2"
                    style={{
                      opacity: 1 - progress,
                      transform: `scale(${1.06 - progress * 0.28})`,
                      transition: instant
                        ? "none"
                        : `opacity ${markMotion}, transform ${markMotion}`,
                    }}
                  />
                ) : null}
                {thenLogo ? (
                  <img
                    src={thenLogo.logo}
                    alt=""
                    draggable={false}
                    className="absolute inset-0 size-full object-contain p-[5px]"
                    style={{
                      opacity: progress,
                      transform: `scale(${0.86 + progress * 0.14})`,
                      transition: instant
                        ? "none"
                        : `opacity ${markMotion}, transform ${markMotion}`,
                    }}
                  />
                ) : null}
              </span>
            </div>

            {experience.map((item, index) => {
              const selected = index === activeIndex;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`journey-panel-${item.id}`}
                  id={`journey-tab-${item.id}`}
                  onClick={() => snapTo(index)}
                  className="absolute top-1/2 z-10 size-8 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `calc(0.375rem + (100% - 0.75rem) * ${progressForIndex(index, count)})`,
                  }}
                >
                  <span
                    className={cn(
                      "mx-auto block size-2.5 rounded-full border-2",
                      selected
                        ? "border-primary bg-primary"
                        : "border-sage/70 bg-background",
                    )}
                  />
                  <span className="sr-only">
                    {item.live ? "Now" : item.dates}, {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-start justify-between gap-6">
            {experience.map((item, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={`${item.id}-label`}
                  type="button"
                  onClick={() => snapTo(index)}
                  className={cn(
                    "max-w-[45%] text-left transition-colors",
                    index === count - 1 && "text-right",
                    selected ? "text-foreground" : "text-foreground/40",
                  )}
                >
                  <span className="block text-[11px] uppercase tracking-[0.16em] text-primary">
                    {item.live ? "Now" : item.dates}
                  </span>
                  <span className="mt-1 block font-serif text-sm font-semibold md:text-base">
                    {item.kind === "education" ? "Bachelor's" : "Accellor"}
                  </span>
                </button>
              );
            })}
          </div>
          </div>

          <div className="relative mt-8 min-h-[17rem]">
            {experience.map((item, index) => {
              const selected = index === activeIndex;
              return (
                <article
                  key={item.id}
                  id={`journey-panel-${item.id}`}
                  role="tabpanel"
                  aria-labelledby={`journey-tab-${item.id}`}
                  aria-hidden={!selected}
                  className={cn(
                    "max-w-3xl transition-opacity duration-700 ease-out",
                    selected
                      ? "relative opacity-100"
                      : "pointer-events-none absolute inset-0 opacity-0",
                  )}
                >
                  <p className="text-xs uppercase tracking-[0.15em] text-primary">
                    {item.dates}
                    {item.kind === "education" ? " · Education" : ""}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-foreground/70">
                    {item.company}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-foreground/70">
                    {item.summary}
                  </p>
                  <div
                    className={cn(
                      "mt-6 grid gap-5",
                      item.highlights.length > 1 && "sm:grid-cols-2",
                    )}
                  >
                    {item.highlights.map((highlight) => (
                      <div
                        key={highlight.value}
                        className="border-t border-border pt-3"
                      >
                        <p className="font-serif text-3xl font-semibold text-primary">
                          {highlight.value}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                          {highlight.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
