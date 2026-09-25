/**
 * Core domain types for FitLog.
 *
 * The shape here is intentionally permissive on a few fields (optional /
 * nullable) because the upstream API (https://api.abcz.workers.dev/api/fitlog)
 * is a third-party data source and individual records may omit fields.
 */

export interface Workout {
  id: string | number;
  name: string;
  description?: string;
  image?: string;
  thumbnail?: string;
  category?: string;
  tags?: string[];
  equipment?: string;
  difficulty?: string;
  sets?: number;
  reps?: string | number;
  duration?: number; // minutes
  calories?: number;
  rating?: number;
  instructions?: string[];
}

/** Sort options exposed by the Library's "Sort By" control (Challenge C1). */
export type SortKey = "duration" | "calories" | "rating";

export interface SortOption {
  key: SortKey;
  label: string;
}

/** An entry stored in the user's Plan or Saved list. */
export interface PlanEntry {
  id: string | number;
  workout: Workout;
  done: boolean;
  addedAt: number;
}

/** Shape persisted to localStorage by PlanContext. */
export interface PersistedPlanState {
  plan: PlanEntry[];
  saved: PlanEntry[];
}
