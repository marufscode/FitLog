import type { Workout } from "@/types/workout";

const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Normalizes a raw API record into the shape the UI expects. The upstream
 * API is not guaranteed to be perfectly consistent, so we defensively coerce
 * fields rather than trust them blindly.
 */
function normalizeWorkout(raw: Record<string, unknown>): Workout {
  return {
    id: (raw.id as string | number) ?? crypto.randomUUID(),
    name: (raw.name as string) ?? "Untitled workout",
    description: (raw.description as string) ?? "",
    image: (raw.image as string) ?? (raw.thumbnail as string) ?? "",
    thumbnail: (raw.thumbnail as string) ?? (raw.image as string) ?? "",
    category: (raw.category as string) ?? "",
    tags: Array.isArray(raw.tags) ? (raw.tags as string[]) : [],
    equipment: (raw.equipment as string) ?? "Bodyweight",
    difficulty: (raw.difficulty as string) ?? "Beginner",
    sets: typeof raw.sets === "number" ? raw.sets : Number(raw.sets) || 3,
    reps: (raw.reps as string | number) ?? "10-12",
    duration:
      typeof raw.duration === "number" ? raw.duration : Number(raw.duration) || 10,
    calories:
      typeof raw.calories === "number" ? raw.calories : Number(raw.calories) || 80,
    rating: typeof raw.rating === "number" ? raw.rating : Number(raw.rating) || 4.5,
    instructions: Array.isArray(raw.instructions)
      ? (raw.instructions as string[])
      : [],
  };
}

/** Fetches the full workout library. */
export async function fetchWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_BASE, { cache: "no-store" });

  if (!res.ok) {
    throw new ApiError(`Failed to load workouts (${res.status})`, res.status);
  }

  const data = await res.json();
  const list: unknown[] = Array.isArray(data) ? data : (data?.workouts ?? data?.data ?? []);

  return list.map((item) => normalizeWorkout(item as Record<string, unknown>));
}

/** Fetches a single workout by id. */
export async function fetchWorkoutById(id: string): Promise<Workout | null> {
  const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new ApiError(`Failed to load workout ${id} (${res.status})`, res.status);
  }

  const data = await res.json();
  const record = data?.workout ?? data?.data ?? data;

  if (!record || typeof record !== "object") {
    return null;
  }

  return normalizeWorkout(record as Record<string, unknown>);
}
