"use client";

import { useEffect, useMemo, useState } from "React";
import { Search, ChevronDown, AlertTriangle } from "lucide-react";
import { fetchWorkouts } from "@/lib/api";
import type { SortKey, SortOption, Workout } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";

const SORT_OPTIONS: SortOption[] = [
  { key: "duration", label: "Duration" },
  { key: "calories", label: "Calories" },
  { key: "rating", label: "Rating" },
];

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-card border border-border-soft bg-surface">
      <div className="aspect-[4/3] w-full bg-surface-raised" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 rounded bg-surface-raised" />
        <div className="h-3 w-1/2 rounded bg-surface-raised" />
        <div className="h-3 w-full rounded bg-surface-raised" />
      </div>
    </div>
  );
}

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWorkouts();
        if (!cancelled) setWorkouts(data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Couldn't load the workout library."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleWorkouts = useMemo(() => {
    const filtered = query.trim()
      ? workouts.filter((w) => {
          const haystack = `${w.name} ${w.tags?.join(" ") ?? ""} ${
            w.category ?? ""
          }`.toLowerCase();
          return haystack.includes(query.trim().toLowerCase());
        })
      : workouts;

    return [...filtered].sort((a, b) => {
      const av = Number(a[sortKey] ?? 0);
      const bv = Number(b[sortKey] ?? 0);
      return bv - av;
    });
  }, [workouts, query, sortKey]);

  return (
    <section id="library" className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-3xl font-bold uppercase text-white">
          The Library
        </h2>
        <p className="text-sm text-ink-muted">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or tag"
            className="w-full rounded-pill border border-border bg-surface py-2.5 pl-9 pr-4 text-sm text-white placeholder:text-ink-faint focus:border-accent"
          />
        </div>

        <div className="relative w-full sm:w-48">
          <label htmlFor="sort-by" className="sr-only">
            Sort By
          </label>
          <select
            id="sort-by"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="w-full appearance-none rounded-pill border border-border bg-surface py-2.5 pl-4 pr-9 text-sm text-white focus:border-accent"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.key} value={opt.key}>
                Sort by: {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint"
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

        {!loading && error && (
          <div className="col-span-full flex flex-col items-center gap-3 rounded-card border border-border-soft bg-surface py-16 text-center">
            <AlertTriangle size={28} className="text-accent" />
            <p className="text-sm text-ink-muted">{error}</p>
          </div>
        )}

        {!loading &&
          !error &&
          visibleWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}

        {!loading && !error && visibleWorkouts.length === 0 && (
          <div className="col-span-full py-16 text-center text-sm text-ink-muted">
            No workouts match &ldquo;{query}&rdquo;.
          </div>
        )}
      </div>
    </section>
  );
}
