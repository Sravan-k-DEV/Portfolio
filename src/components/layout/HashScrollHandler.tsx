"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const HEADER_OFFSET = 80;

function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
  const id = hash.replace(/^#/, "");
  if (!id || id === "home") {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  const top =
    el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

  window.scrollTo({ top: Math.max(0, top), behavior });
}

function stripHomeHash() {
  if (window.location.pathname !== "/") return;
  if (window.location.hash !== "#home") return;
  window.history.replaceState(null, "", "/");
}

/**
 * Next.js App Router often updates `/#section` in the URL without scrolling.
 * This keeps hash targets in sync after client navigations.
 * `#home` is never kept — the hero is just `/`.
 */
export function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    stripHomeHash();

    const hash = window.location.hash;
    if (!hash || pathname !== "/") return;
    if (hash === "#home") return;

    let attempts = 0;
    let timer = 0;

    const tryScroll = () => {
      const id = hash.replace(/^#/, "");
      const el = document.getElementById(id);
      if (el) {
        scrollToHash(hash, attempts === 0 ? "auto" : "smooth");
        return;
      }
      attempts += 1;
      if (attempts < 20) {
        timer = window.setTimeout(tryScroll, 50);
      }
    };

    timer = window.setTimeout(tryScroll, 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      stripHomeHash();
      if (pathname !== "/") return;
      if (window.location.hash === "#home" || !window.location.hash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      scrollToHash(window.location.hash, "smooth");
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  return null;
}

export { scrollToHash, stripHomeHash };
