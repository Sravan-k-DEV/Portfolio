"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-28 text-center">
      <p className="text-eyebrow">Something went wrong</p>
      <h1 className="mt-3 font-serif text-3xl font-semibold">
        We hit an unexpected error
      </h1>
      <p className="mt-3 max-w-md text-foreground/70">
        Try again, or head back home while we sort this out.
      </p>
      <div className="mt-8 flex gap-3">
        <Button type="button" onClick={reset}>
          Try again
        </Button>
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-lg border border-sage px-6 text-sm"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
