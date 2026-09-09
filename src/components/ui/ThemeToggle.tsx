"use client";

import { Moon, Sun } from "lucide-react";
import { useMountedTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { mounted, theme, toggleTheme } = useMountedTheme();
  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-7 w-12 items-center rounded-full border border-[#B7B0A3] bg-[#EDE7DB] p-0.5 transition-colors duration-300 ease-out",
        "dark:border-[#5A534A] dark:bg-[#2A241F]",
        className,
      )}
    >
      <Sun
        className={cn(
          "absolute left-1.5 size-3.5 transition-opacity duration-300",
          isDark ? "text-[#8A8378] opacity-50" : "text-[#B45309] opacity-100",
        )}
        aria-hidden
      />
      <Moon
        className={cn(
          "absolute right-1.5 size-3.5 transition-opacity duration-300",
          isDark ? "text-[#E8D5A3] opacity-100" : "text-[#8A8378] opacity-50",
        )}
        aria-hidden
      />
      <span
        className={cn(
          "relative z-10 inline-block size-5 rounded-full bg-[#29231E] shadow-sm transition-transform duration-300 ease-out",
          "dark:bg-[#F5F1E8]",
          isDark ? "translate-x-5" : "translate-x-0",
        )}
      />
    </button>
  );
}
