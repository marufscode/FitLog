"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dumbbell, Clock, Flame, Star, Check, X, Layers } from "lucide-react";
import { usePlan, PLAN_CAP } from "@/context/PlanContext";
import StatCard from "@/components/StatCard";
import type { PlanEntry } from "@/types/workout";

type Tab = "plan" | "saved";

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-border-soft bg-surface py-20 text-center">
      <Dumbbell size={28} className="text-ink-faint" />
      <h3 className="font-display text-xl font-bold uppercase text-white">
        Nothing here yet
      </h3>
      <p className="max-w-xs text-sm text-ink-muted">
        Browse the library and lock in a few lifts to see them here.
      </p>
      <Link
        href="/#library"
        className="mt-3 rounded-pill bg-accent px-5 py-2.5 text-sm font-bold text-black transition-transform hover:scale-105"
      >
        Go to workouts
      </Link>
    </div>
  );
}

function PlanRow({
  entry,
  list,
}: {
  entry: PlanEntry;
  list: "plan" | "saved";
}) {
  const { toggleDone, removeFromPlan, removeFromSaved } = usePlan();
  const { workout, done } = entry;
  const img = workout.image || workout.thumbnail;

  return (
    <div
      className={`flex flex-col gap-4 rounded-card border p-4 transition-colors sm:flex-row sm:items-center ${
        done
          ? "border-accent/50 bg-accent/5"
          : "border-border-soft bg-surface"
      }`}
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-raised">
        {img && (
          <Image src={img} alt={workout.name} fill className="object-cover" unoptimized />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={`font-display text-base font-semibold ${
            done ? "text-ink-muted line-through" : "text-white"
          }`}
        >
          {workout.name}
        </h3>
        <p className="text-xs text-ink-muted">{workout.equipment}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink-soft">
          <span className="flex items-center gap-1">
            <Clock size={13} className="text-ink-faint" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={13} className="text-ink-faint" /> {workout.calories} cal
          </span>
          <span className="flex items-center gap-1">
            <Star size={13} className="fill-accent text-accent" /> {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-pill border border-border px-3 py-2 text-xs font-semibold text-ink-soft transition-colors hover:border-white hover:text-white"
        >
          View Details
        </Link>
        <button
          onClick={() => toggleDone(entry.id, list)}
          className={`flex items-center gap-1.5 rounded-pill px-3 py-2 text-xs font-semibold transition-colors ${
            done
              ? "bg-accent text-black"
              : "border border-border text-ink-soft hover:border-accent hover:text-accent"
          }`}
        >
          <Check size={14} />
          {done ? "Done" : "Mark as Done"}
        </button>
        <button
          onClick={() =>
            list === "plan" ? removeFromPlan(entry.id) : removeFromSaved(entry.id)
          }
          className="flex items-center gap-1.5 rounded-pill border border-border px-3 py-2 text-xs font-semibold text-ink-soft transition-colors hover:border-red-400 hover:text-red-400"
        >
          <X size={14} />
          Remove
        </button>
      </div>
    </div>
  );
}

export default function MyPlanPage() {
  const [tab, setTab] = useState<Tab>("plan");
  const { plan, saved, totals, hydrated } = usePlan();

  const list = tab === "plan" ? plan : saved;

  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        Cap of {PLAN_CAP} lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Exercises" value={totals.exercises} icon={Layers} />
        <StatCard label="Minutes" value={totals.minutes} icon={Clock} />
        <StatCard label="Calories" value={totals.calories} icon={Flame} />
      </div>

      <div className="mt-10 flex gap-2 border-b border-border-soft">
        <button
          onClick={() => setTab("plan")}
          className={`border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
            tab === "plan"
              ? "border-accent text-white"
              : "border-transparent text-ink-muted hover:text-white"
          }`}
        >
          Today&apos;s Plan ({plan.length})
        </button>
        <button
          onClick={() => setTab("saved")}
          className={`border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
            tab === "saved"
              ? "border-accent text-white"
              : "border-transparent text-ink-muted hover:text-white"
          }`}
        >
          Saved ({saved.length})
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {!hydrated ? null : list.length === 0 ? (
          <EmptyState />
        ) : (
          list.map((entry) => <PlanRow key={entry.id} entry={entry} list={tab} />)
        )}
      </div>
    </div>
  );
}
