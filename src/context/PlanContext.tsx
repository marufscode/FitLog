"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import type { PersistedPlanState, PlanEntry, Workout } from "@/types/workout";

const STORAGE_KEY = "fitlog:plan-state:v1";
export const PLAN_CAP = 5;

interface PlanContextValue {
  plan: PlanEntry[];
  saved: PlanEntry[];
  planCount: number;
  savedCount: number;
  isPlanFull: boolean;
  hydrated: boolean;
  isInPlan: (id: string | number) => boolean;
  isSaved: (id: string | number) => boolean;
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
  toggleDone: (id: string | number, list: "plan" | "saved") => void;
  totals: { exercises: number; minutes: number; calories: number };
}

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

function readPersisted(): PersistedPlanState {
  if (typeof window === "undefined") {
    return { plan: [], saved: [] };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { plan: [], saved: [] };
    const parsed = JSON.parse(raw) as PersistedPlanState;
    return {
      plan: Array.isArray(parsed.plan) ? parsed.plan : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
    };
  } catch {
    return { plan: [], saved: [] };
  }
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanEntry[]>([]);
  const [saved, setSaved] = useState<PlanEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount (client-only).
  useEffect(() => {
    const persisted = readPersisted();
    setPlan(persisted.plan);
    setSaved(persisted.saved);
    setHydrated(true);
  }, []);

  // Persist on every change, once hydrated.
  useEffect(() => {
    if (!hydrated) return;
    const payload: PersistedPlanState = { plan, saved };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [plan, saved, hydrated]);

  const isInPlan = useCallback(
    (id: string | number) => plan.some((entry) => String(entry.id) === String(id)),
    [plan]
  );

  const isSaved = useCallback(
    (id: string | number) => saved.some((entry) => String(entry.id) === String(id)),
    [saved]
  );

  const addToPlan = useCallback(
    (workout: Workout) => {
      if (isInPlan(workout.id)) {
        toast.info(`${workout.name} is already in today's plan`);
        return;
      }
      if (plan.length >= PLAN_CAP) {
        toast.error(`Today's plan is capped at ${PLAN_CAP} lifts`);
        return;
      }
      setPlan((prev) => [
        ...prev,
        { id: workout.id, workout, done: false, addedAt: Date.now() },
      ]);
      toast.success(`${workout.name} added to today's plan`);
    },
    [plan, isInPlan]
  );

  const addToSaved = useCallback(
    (workout: Workout) => {
      if (isSaved(workout.id)) {
        toast.info(`${workout.name} is already saved`);
        return;
      }
      setSaved((prev) => [
        ...prev,
        { id: workout.id, workout, done: false, addedAt: Date.now() },
      ]);
      toast.success(`${workout.name} saved for later`);
    },
    [isSaved]
  );

  const removeFromPlan = useCallback((id: string | number) => {
    setPlan((prev) => {
      const entry = prev.find((e) => String(e.id) === String(id));
      if (entry) toast(`Removed ${entry.workout.name} from today's plan`);
      return prev.filter((e) => String(e.id) !== String(id));
    });
  }, []);

  const removeFromSaved = useCallback((id: string | number) => {
    setSaved((prev) => {
      const entry = prev.find((e) => String(e.id) === String(id));
      if (entry) toast(`Removed ${entry.workout.name} from saved`);
      return prev.filter((e) => String(e.id) !== String(id));
    });
  }, []);

  const toggleDone = useCallback((id: string | number, list: "plan" | "saved") => {
    const updater = (prev: PlanEntry[]) =>
      prev.map((entry) => {
        if (String(entry.id) !== String(id)) return entry;
        const next = !entry.done;
        toast.success(
          next ? `${entry.workout.name} marked done` : `${entry.workout.name} reopened`
        );
        return { ...entry, done: next };
      });
    if (list === "plan") {
      setPlan(updater);
    } else {
      setSaved(updater);
    }
  }, []);

  const totals = useMemo(() => {
    return plan.reduce(
      (acc, entry) => ({
        exercises: acc.exercises + 1,
        minutes: acc.minutes + (entry.workout.duration ?? 0),
        calories: acc.calories + (entry.workout.calories ?? 0),
      }),
      { exercises: 0, minutes: 0, calories: 0 }
    );
  }, [plan]);

  const value: PlanContextValue = {
    plan,
    saved,
    planCount: plan.length,
    savedCount: saved.length,
    isPlanFull: plan.length >= PLAN_CAP,
    hydrated,
    isInPlan,
    isSaved,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
    totals,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan(): PlanContextValue {
  const ctx = useContext(PlanContext);
  if (!ctx) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return ctx;
}
