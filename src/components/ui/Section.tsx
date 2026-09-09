import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  id,
  children,
  className,
  containerClassName,
  width = "default",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  width?: "default" | "narrow" | "wide";
}) {
  return (
    <section id={id} className={cn("py-10 md:py-14", className)}>
      <Container width={width} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-3xl", className)}>
      {eyebrow ? <p className="text-eyebrow mb-3">{eyebrow}</p> : null}
      <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base text-foreground/70 md:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}
