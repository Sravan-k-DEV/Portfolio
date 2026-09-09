"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import type { NavItem } from "@/types/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NavSocialLinks } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";

export function MobileNav({
  open,
  onClose,
  items,
  activeSection,
  pathname,
  onNavClick,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  activeSection?: string;
  pathname: string;
  onNavClick?: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  if (!open) return null;

  return (
    <div className="border-t border-[#C4BDB0] bg-background lg:hidden dark:border-[#4A433C]">
      <nav className="flex flex-col gap-1 px-6 py-4" aria-label="Mobile">
        {items.map((item) => {
          const isActive = activeSection
            ? item.section === activeSection
            : item.href === "/#contact"
              ? false
              : pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              onClick={(event) => {
                onNavClick?.(event, item.href);
                if (!item.href.includes("#")) onClose();
              }}
              className={cn(
                "rounded-md px-3 py-2 text-sm",
                isActive
                  ? "bg-sage/15 font-medium text-primary"
                  : "text-foreground",
              )}
            >
              {item.label}
            </Link>
          );
        })}
        <div className="mt-3 flex items-center justify-between border-t border-[#C4BDB0] px-3 pt-4 dark:border-[#4A433C]">
          <NavSocialLinks />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
