"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { experience, experienceSection } from "@/content/experience";
import { Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/** Sticky offset below the fixed navbar (`top-20`). */
const STICKY_TOP_PX = 80;
/** Fraction of the sticky lifetime used for stop scrubbing; rest is a soft release. */
const HOLD_END = 0.9;
/** Scroll distance per stop after the first (works for many entries). */
const SCRUB_VH_PER_STEP = 75;
/** Extra runway after the last stop so sticky releases into Skills without a jump. */
const RELEASE_BUFFER_VH = 20;

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

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Linear raw sticky progress → stop progress, holding the last stop before release. */
function scrubProgress(raw: number) {
  if (raw <= HOLD_END) return raw / HOLD_END;
  return 1;
}

export function Experience() {
  const count = experience.length;
  const runwayRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const panelStackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  /** Locked scrub pixels so mobile chrome show/hide doesn't resize the runway mid-scroll. */
  const scrubPxRef = useRef<number | null>(null);
  const pinBaseRef = useRef(0);

  const [progress, setProgress] = useState(0);
  const [runwayHeight, setRunwayHeight] = useState<number | null>(null);
  const [panelStackHeight, setPanelStackHeight] = useState<number | null>(null);

  const activeIndex = nearestIndex(progress, count);
  const liveIndex = experience.findIndex((item) => item.live);
  const parkedAtLive =
    liveIndex >= 0 &&
    Math.abs(progress - progressForIndex(liveIndex, count)) < 0.08;
  const nowLogo = experience[0];
  const thenLogo = experience[1];

  const ensureScrubPx = useCallback(
    (force = false) => {
      if (!force && scrubPxRef.current != null) return scrubPxRef.current;
      const vh = window.innerHeight;
      scrubPxRef.current =
        Math.max(1, count - 1) * ((SCRUB_VH_PER_STEP / 100) * vh) +
        (RELEASE_BUFFER_VH / 100) * vh;
      return scrubPxRef.current;
    },
    [count],
  );

  const measureLayout = useCallback(
    (opts?: { resetScrub?: boolean }) => {
      const pin = pinRef.current;
      const stack = panelStackRef.current;
      if (!pin || !stack) return;

      // Measure every panel while visible to size a stable stack height.
      const articles = stack.querySelectorAll<HTMLElement>("[data-journey-panel]");
      let maxPanel = 0;
      articles.forEach((article) => {
        maxPanel = Math.max(maxPanel, article.scrollHeight);
      });
      if (maxPanel > 0) {
        setPanelStackHeight((prev) =>
          prev == null ? maxPanel : Math.max(prev, maxPanel),
        );
      }

      // Never shrink the pin base mid-scrub — only grow if content needs it.
      pinBaseRef.current = Math.max(pinBaseRef.current, pin.offsetHeight);
      const scrub = ensureScrubPx(opts?.resetScrub);
      setRunwayHeight(pinBaseRef.current + scrub);
    },
    [ensureScrubPx],
  );

  useLayoutEffect(() => {
    measureLayout({ resetScrub: true });

    const onOrientation = () => {
      pinBaseRef.current = 0;
      scrubPxRef.current = null;
      setPanelStackHeight(null);
      measureLayout({ resetScrub: true });
    };

    window.addEventListener("orientationchange", onOrientation);
    return () => window.removeEventListener("orientationchange", onOrientation);
  }, [measureLayout]);

  // After the panel stack gets a real height, re-lock the runway to the taller pin.
  useLayoutEffect(() => {
    if (panelStackHeight == null) return;
    const pin = pinRef.current;
    if (!pin) return;
    pinBaseRef.current = Math.max(pinBaseRef.current, pin.offsetHeight);
    setRunwayHeight(pinBaseRef.current + ensureScrubPx());
  }, [panelStackHeight, ensureScrubPx]);

  const scrubRange = useCallback(() => {
    const runway = runwayRef.current;
    const pin = pinRef.current;
    if (!runway || !pin) return 1;
    return Math.max(1, runway.offsetHeight - pin.offsetHeight);
  }, []);

  const readProgress = useCallback(() => {
    const runway = runwayRef.current;
    if (!runway) return 0;

    const rect = runway.getBoundingClientRect();
    const range = scrubRange();
    const raw = clamp((STICKY_TOP_PX - rect.top) / range, 0, 1);
    return scrubProgress(raw);
  }, [scrubRange]);

  const syncProgress = useCallback(() => {
    setProgress(readProgress());
  }, [readProgress]);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(syncProgress);
    };

    syncProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, [syncProgress]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const runway = runwayRef.current;
      if (!runway) return;

      const rect = runway.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      const range = scrubRange();
      const targetRaw = progressForIndex(index, count) * HOLD_END;
      const target = absoluteTop - STICKY_TOP_PX + targetRaw * range;

      window.scrollTo({
        top: target,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    },
    [count, scrubRange],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(Math.min(count - 1, activeIndex + 1));
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(Math.max(0, activeIndex - 1));
    }
  };

  return (
    <Section id="experience">
      <SectionHeading
        eyebrow={experienceSection.eyebrow}
        title={experienceSection.heading}
        subtitle={experienceSection.subheading}
      />

      <div
        ref={runwayRef}
        className="relative"
        style={runwayHeight ? { height: runwayHeight } : undefined}
      >
        <div
          ref={pinRef}
          className="journey-track sticky top-20 outline-none"
          onKeyDown={onKeyDown}
          tabIndex={0}
          aria-label="Career journey. Scroll to move between now and earlier, or use the stops and arrow keys."
        >
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
              className="journey-progress-line absolute top-1/2 left-1.5 h-px origin-left bg-primary"
              style={{
                width: "calc(100% - 0.75rem)",
                transform: `translateY(-50%) scaleX(${progress})`,
              }}
              aria-hidden
            />
            <div
              className={cn(
                "journey-mark pointer-events-none absolute top-1/2 z-20 size-12 will-change-transform",
                parkedAtLive && "journey-mark-play journey-pulse",
              )}
              style={{
                left: `calc(0.375rem + (100% - 0.75rem) * ${progress})`,
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
                  onClick={() => scrollToIndex(index)}
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
                  onClick={() => scrollToIndex(index)}
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

          <div
            ref={panelStackRef}
            className="relative mt-8"
            style={panelStackHeight ? { height: panelStackHeight } : undefined}
          >
            {experience.map((item, index) => {
              const selected = index === activeIndex;
              return (
                <article
                  key={item.id}
                  data-journey-panel
                  id={`journey-panel-${item.id}`}
                  role="tabpanel"
                  aria-labelledby={`journey-tab-${item.id}`}
                  aria-hidden={!selected}
                  className={cn(
                    "absolute inset-x-0 top-0 max-w-3xl transition-opacity duration-500 ease-out",
                    selected
                      ? "opacity-100"
                      : "pointer-events-none opacity-0",
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
      </div>
    </Section>
  );
}
