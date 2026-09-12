import Link from "next/link";
import { ConfusedBot } from "@/components/ui/ConfusedBot";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
      <ConfusedBot className="h-44 w-auto text-foreground md:h-56" />
      <p className="text-eyebrow mt-2">404</p>
      <h1 className="mt-3 font-serif text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 max-w-md text-foreground/70">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="btn-primary hover-pop mt-8 inline-flex h-10 items-center justify-center rounded-lg px-6 text-sm font-medium"
      >
        Back home
      </Link>
    </div>
  );
}
