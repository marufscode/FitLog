"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors ${
        active ? "text-white" : "text-ink-muted hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  const isHome = pathname === "/";
  const isPlan = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-base/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog" width={28} height={28} priority />
          <span className="font-display text-lg font-semibold tracking-wide text-white">
            Maruf
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink href="/#library" label="Workout" active={isHome} />
          <NavLink href="/my-plan" label="My Plan" active={isPlan} />
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-pill bg-accent px-3 py-1.5 text-xs font-semibold text-black transition-transform hover:scale-105"
            aria-label={`Today's plan, ${planCount} exercises`}
          >
            Plan
            <span className="rounded-full bg-black/15 px-1.5 py-0.5 text-[11px]">
              {planCount}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-pill border border-border px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-white hover:text-white"
            aria-label={`Saved workouts, ${savedCount} items`}
          >
            Saved
            <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[11px]">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
