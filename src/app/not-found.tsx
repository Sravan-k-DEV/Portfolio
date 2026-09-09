import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-28 text-center">
      <p className="text-eyebrow">404</p>
      <h1 className="mt-3 font-serif text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 max-w-md text-foreground/70">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-10 items-center rounded-lg bg-ink px-6 text-sm text-cream dark:bg-cream dark:text-ink"
      >
        Back home
      </Link>
    </div>
  );
}
