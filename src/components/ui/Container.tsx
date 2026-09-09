import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-12",
        width === "default" && "max-w-6xl",
        width === "narrow" && "max-w-3xl",
        width === "wide" && "max-w-[1140px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
