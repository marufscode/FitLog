import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

export default function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-card border border-border-soft bg-surface p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Icon size={20} strokeWidth={2.25} />
      </div>
      <div>
        <p className="font-display text-2xl font-bold text-white">{value}</p>
        <p className="text-xs uppercase tracking-wide text-ink-muted">{label}</p>
      </div>
    </div>
  );
}
