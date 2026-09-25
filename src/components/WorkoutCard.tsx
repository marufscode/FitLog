"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/types/workout";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  const img = workout.image || workout.thumbnail;

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-card border border-border-soft bg-surface transition-colors hover:border-accent/60"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-raised">
        {img ? (
          <Image
            src={img}
            alt={workout.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-ink-faint">
            No image
          </div>
        )}
        {workout.category && (
          <span className="absolute left-3 top-3 rounded-pill bg-black/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
            {workout.category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-lg font-semibold leading-tight text-white">
          {workout.name}
        </h3>
        <p className="text-xs text-ink-muted">{workout.equipment}</p>

        <div className="mt-auto flex items-center gap-4 pt-3 text-xs text-ink-soft">
          <span className="flex items-center gap-1">
            <Clock size={14} className="text-ink-faint" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} className="text-ink-faint" />
            {workout.calories} cal
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} className="fill-accent text-accent" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
