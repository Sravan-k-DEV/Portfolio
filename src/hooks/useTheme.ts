"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useMountedTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = resolvedTheme ?? theme;

  return {
    mounted,
    theme: current,
    setTheme,
    toggleTheme: () => setTheme(current === "dark" ? "light" : "dark"),
  };
}
