import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col items-center justify-center px-4 py-32 text-center sm:px-6 lg:px-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Dumbbell size={28} strokeWidth={2.25} />
      </div>
      <h1 className="mt-6 font-display text-4xl font-bold uppercase text-white">
        404 — Set not found
      </h1>
      <p className="mt-3 max-w-sm text-sm text-ink-muted">
        The page you&apos;re looking for isn&apos;t in the library. It may have
        been moved or never existed.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-pill bg-accent px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105"
      >
        Back to workouts
      </Link>
    </div>
  );
}
