export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center pt-28">
      <div
        className="h-8 w-8 animate-pulse rounded-full border-2 border-sage border-t-transparent"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
