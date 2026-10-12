"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { siteConfig } from "@/config/site";
import { homeNavItems, pageNavItems } from "@/config/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NavSocialLinks } from "@/components/ui/SocialIcons";
import { Container } from "@/components/ui/Container";
import { scrollToHash } from "@/components/layout/HashScrollHandler";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";

function isHashLink(href: string) {
  return href.includes("#");
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const activeSection = useActiveSection(isHome);
  const [open, setOpen] = useState(false);

  const items = isHome ? homeNavItems : pageNavItems;

  function onNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    const isHomeLink =
      href === "/" || href === "/#home" || href === "#home";

    // Home: scroll to hero without writing #home into the URL.
    if (isHomeLink && pathname === "/") {
      event.preventDefault();
      if (window.location.hash) {
        window.history.replaceState(null, "", "/");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      setOpen(false);
      return;
    }

    if (isHomeLink && pathname !== "/") {
      event.preventDefault();
      setOpen(false);
      router.push("/");
      return;
    }

    if (!isHashLink(href)) return;

    const hash = href.slice(href.indexOf("#"));
    if (hash === "#home") {
      event.preventDefault();
      setOpen(false);
      if (pathname === "/") {
        window.history.replaceState(null, "", "/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
      return;
    }

    const targetPath = href.startsWith("/")
      ? href.slice(0, href.indexOf("#")) || "/"
      : pathname;

    // Same-page hash: prevent full remount and scroll manually.
    if (pathname === "/" && (targetPath === "/" || targetPath === "")) {
      event.preventDefault();
      window.history.pushState(null, "", hash);
      window.dispatchEvent(new Event("hashchange"));
      scrollToHash(hash, "smooth");
      setOpen(false);
      return;
    }

    // Cross-route hash (e.g. /projects → /#contact): let Next navigate,
    // HashScrollHandler will scroll once home mounts.
    if (pathname !== "/" && targetPath === "/") {
      event.preventDefault();
      setOpen(false);
      router.push(`/${hash}`);
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#C4BDB0] bg-background/95 backdrop-blur dark:border-[#4A433C]">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="leading-none"
          onClick={(event) => {
            if (pathname !== "/") return;
            event.preventDefault();
            if (window.location.hash) {
              window.history.replaceState(null, "", "/");
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
            setOpen(false);
          }}
        >
          <span className="font-serif text-lg font-semibold text-foreground">
            {siteConfig.shortName}
          </span>
          <span className="mt-1 block text-[10px] uppercase tracking-[0.15em] text-primary">
            {siteConfig.title}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 text-sm lg:flex"
          aria-label="Primary"
        >
          {items.map((item) => {
            const isActive = isHome
              ? item.section === activeSection
              : item.href === "/#contact"
                ? false
                : pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={(event) => onNavClick(event, item.href)}
                className={cn(
                  "pb-1 transition-colors",
                  isActive
                    ? "border-b border-primary font-medium text-primary"
                    : "text-foreground hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <NavSocialLinks className="hidden sm:flex" />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex rounded-md p-2 text-foreground lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <MobileNav
        open={open}
        onClose={() => setOpen(false)}
        items={items}
        activeSection={isHome ? activeSection : undefined}
        pathname={pathname}
        onNavClick={onNavClick}
      />
    </header>
  );
}
