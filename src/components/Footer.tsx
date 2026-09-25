import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border-soft bg-base">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog" width={22} height={22} />
          <span className="font-display text-sm font-semibold tracking-wide text-white">
            FITLOG
          </span>
        </div>
        <p className="text-center text-xs text-ink-muted sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
