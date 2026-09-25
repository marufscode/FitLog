"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Flame,
  Star,
  Dumbbell,
  BarChart3,
  Repeat,
  Layers,
  Bookmark,
  Plus,
  Check,
} from "lucide-react";
import { fetchWorkoutById } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/types/workout";

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border-soft py-3 last:border-b-0">
      <Icon size={16} className="shrink-0 text-accent" />
      <span className="text-xs uppercase tracking-wide text-ink-muted">{label}</span>
      <span className="ml-auto text-sm font-medium text-white">{value}</span>
    </div>
  );
}

export default function WorkoutDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { addToPlan, addToSaved, isInPlan, isSaved, isPlanFull } = usePlan();

  const [workout, setWorkout] = useState<Workout | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    fetchWorkoutById(id)
      .then((data) => {
        if (!cancelled) setWorkout(data);
      })
      .catch(() => {
        if (!cancelled) setWorkout(null);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (workout === undefined) {
    return (
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid animate-pulse gap-10 md:grid-cols-2">
          <div className="aspect-square rounded-card bg-surface" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 rounded bg-surface" />
            <div className="h-4 w-full rounded bg-surface" />
            <div className="h-4 w-5/6 rounded bg-surface" />
            <div className="h-40 w-full rounded bg-surface" />
          </div>
        </div>
      </div>
    );
  }

  if (workout === null) {
    return (
      <div className="mx-auto max-w-content px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-white">
          Workout not found
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          It may have been removed from the library.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-pill bg-accent px-5 py-2.5 text-sm font-bold text-black"
        >
          Back to workouts
        </Link>
      </div>
    );
  }

  const alreadyInPlan = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);
  const disableAdd = alreadyInPlan || (isPlanFull && !alreadyInPlan);
  const img = workout.image || workout.thumbnail;

  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-card border border-border-soft bg-surface">
          {img ? (
            <Image
              src={img}
              alt={workout.name}
              fill
              className="object-cover"
              unoptimized
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-ink-faint">
              No image available
            </div>
          )}
        </div>

        <div>
          {workout.category && (
            <div className="flex flex-wrap gap-2">
              <span className="rounded-pill bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                {workout.category}
              </span>
              {workout.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-pill border border-border px-3 py-1 text-xs text-ink-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="mt-4 font-display text-3xl font-bold uppercase text-white sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {workout.description || "No description provided for this lift yet."}
          </p>

          <div className="mt-6 rounded-card border border-border-soft bg-surface p-4">
            <Spec icon={Dumbbell} label="Equipment" value={workout.equipment ?? "—"} />
            <Spec icon={BarChart3} label="Difficulty" value={workout.difficulty ?? "—"} />
            <Spec icon={Layers} label="Sets" value={workout.sets ?? "—"} />
            <Spec icon={Repeat} label="Reps" value={workout.reps ?? "—"} />
            <Spec icon={Clock} label="Duration" value={`${workout.duration ?? 0} min`} />
            <Spec icon={Flame} label="Calories" value={`${workout.calories ?? 0} cal`} />
            <Spec icon={Star} label="Rating" value={workout.rating ?? "—"} />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => addToPlan(workout)}
              disabled={disableAdd}
              className="flex flex-1 items-center justify-center gap-2 rounded-pill bg-accent px-6 py-3 text-sm font-bold text-black transition-transform enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {alreadyInPlan ? <Check size={16} /> : <Plus size={16} />}
              {alreadyInPlan
                ? "In today's plan"
                : isPlanFull
                ? "Plan is full"
                : "Add to today's plan"}
            </button>
            <button
              onClick={() => addToSaved(workout)}
              disabled={alreadySaved}
              className="flex flex-1 items-center justify-center gap-2 rounded-pill border border-border px-6 py-3 text-sm font-bold text-white transition-colors enabled:hover:border-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Bookmark size={16} className={alreadySaved ? "fill-white" : ""} />
              {alreadySaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>

      {workout.instructions && workout.instructions.length > 0 && (
        <div className="mt-14 max-w-2xl">
          <h2 className="font-display text-2xl font-bold uppercase text-white">
            Instructions
          </h2>
          <ol className="mt-4 space-y-3">
            {workout.instructions.map((step, idx) => (
              <li key={idx} className="flex gap-4 text-sm text-ink-soft">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
                  {idx + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
