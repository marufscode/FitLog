"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const handleScroll = () => {
    document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden border-b border-border-soft bg-base">
      <div className="mx-auto grid max-w-content items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Workout Library
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-5 max-w-md text-base text-ink-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <button
            onClick={handleScroll}
            className="mt-8 inline-flex items-center gap-2 rounded-pill bg-accent px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95"
          >
            Browse Workouts
            <ArrowDown size={16} strokeWidth={2.5} />
          </button>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="absolute inset-0 rounded-full bg-accent/10 blur-3xl" />
          <Image
            src="/banner.png"
            alt="Anatomical illustration of a lifter on a gym machine"
            fill
            priority
            className="relative object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </section>
  );
}
