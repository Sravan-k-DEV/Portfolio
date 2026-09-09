"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = [
  "home",
  "about",
  "experience",
  "skills",
  "projects",
  "certificates",
  "blogs",
  "contact",
] as const;

const HEADER_OFFSET = 96;

function sectionFromHash(): string | null {
  if (typeof window === "undefined") return null;
  const id = window.location.hash.replace(/^#/, "");
  if (id === "home") return "home";
  return SECTION_IDS.includes(id as (typeof SECTION_IDS)[number]) ? id : null;
}

/** Active section = last section whose top has crossed the marker under the fixed header. */
function getSectionFromScroll(): string {
  const marker = HEADER_OFFSET + 8;
  let current: string = SECTION_IDS[0];

  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= marker) {
      current = id;
    }
  }

  return current;
}

function syncHash(sectionId: string) {
  if (window.location.pathname !== "/") return;

  // Hero never uses a hash — always clean `/`
  if (sectionId === "home") {
    if (window.location.hash) {
      window.history.replaceState(null, "", "/");
    }
    return;
  }

  // Kill any leftover #home even while scrolling other sections
  if (window.location.hash === "#home") {
    window.history.replaceState(null, "", `/#${sectionId}`);
    return;
  }

  const nextHash = `#${sectionId}`;
  if (window.location.hash === nextHash) return;
  window.history.replaceState(null, "", `/${nextHash}`);
}

function clearHashIfPresent() {
  if (!window.location.hash) return;
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${window.location.search}`,
  );
}

export function useActiveSection(enabled = true) {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    if (!enabled) {
      clearHashIfPresent();
      return;
    }

    // Immediately drop #home on mount (bookmarked / stale URLs)
    if (window.location.hash === "#home") {
      window.history.replaceState(null, "", "/");
    }

    let frame = 0;
    let cancelled = false;

    const update = () => {
      if (cancelled) return;
      const section = getSectionFromScroll();
      setActive((prev) => (prev === section ? prev : section));
      queueMicrotask(() => {
        if (!cancelled) syncHash(section);
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    const onHashChange = () => {
      if (window.location.hash === "#home") {
        window.history.replaceState(null, "", "/");
        setActive("home");
        return;
      }
      const hash = sectionFromHash();
      if (hash) setActive(hash);
      if (!window.location.hash) setActive(getSectionFromScroll());
    };

    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("resize", onScroll);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);

  return active;
}
