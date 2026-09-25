"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/types/workout";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  const img = workout.image || workout.thumbnail;

  // Category / equipment ছোট subtitle হিসেবে দেখানো হবে
  const subtitle =
    workout.equipment || workout.category || "Workout";

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="
        group flex h-full flex-col overflow-hidden
        rounded-xl
        border border-zinc-800
        bg-[#121418]
        transition-all duration-200
        hover:border-zinc-700
        hover:bg-[#15181d]
      "
    >
      {/* ================= IMAGE ================= */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
        {img ? (
          <Image
            src={img}
            alt={workout.name}
            fill
            className="
              object-cover
              transition-transform duration-300
              group-hover:scale-105
            "
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              33vw
            "
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-zinc-500">
            No image
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-1 flex-col px-2.5 py-2">
        
        {/* TITLE */}
        <div className="min-w-0">
          <h3
            className="
              truncate
              font-display
              text-[11px]
              font-extrabold
              uppercase
              leading-[1.1]
              tracking-wide
              text-white
            "
          >
            {workout.name}
          </h3>

          {/* CATEGORY / EQUIPMENT */}
          <p className="mt-0.5 truncate text-[8px] font-medium text-zinc-500">
            {subtitle}
          </p>
        </div>

        {/* ================= META ================= */}
        <div
          className="
            mt-auto
            flex
            items-center
            gap-2
            pt-2
            text-[8px]
            font-semibold
            text-zinc-400
          "
        >
          {workout.duration !== undefined && (
            <span className="flex items-center gap-0.5 whitespace-nowrap">
              <Clock
                size={9}
                strokeWidth={2.5}
                className="text-[#CCFF00]"
              />
              {workout.duration} min
            </span>
          )}

          {workout.calories !== undefined && (
            <span className="flex items-center gap-0.5 whitespace-nowrap">
              <Flame
                size={9}
                strokeWidth={2.5}
                className="text-[#CCFF00]"
              />
              {workout.calories} kcal
            </span>
          )}

          {workout.rating !== undefined && (
            <span className="flex items-center gap-0.5 whitespace-nowrap">
              <Star
                size={9}
                strokeWidth={2.5}
                className="text-[#CCFF00]"
              />
              {workout.rating}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}