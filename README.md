# FitLog

A dark, no-nonsense gym companion built with Next.js. Browse a library of
lifts, lock a few into today's plan, track them as you finish, and save
others for later — all persisted locally in your browser.

## Description

FitLog pulls its workout catalog from a public API
(`https://api.abcz.workers.dev/api/fitlog`) and lets you build a daily
training plan capped at five lifts. Mark lifts done as you complete them,
save others for another day, and watch a live summary of exercises,
minutes, and calories update as you go.

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript, `src/` layout)
- **Styling:** Tailwind CSS, `lucide-react` icons
- **Notifications:** `sonner` toasts
- **State & Persistence:** React Context API + `localStorage`
- **Fonts:** Inter (body) and Oswald (display/headings)

## Key Features

1. **Workout Library** — a searchable, sortable grid (by duration, calories,
   or rating) of every lift in the catalog, with a loading skeleton while
   the API responds.
2. **Workout Details** — full specs (equipment, difficulty, sets, reps,
   duration, calories, rating) and step-by-step instructions for each lift.
3. **Today's Plan, capped at five** — add lifts to a daily plan; the "Add"
   action disables once the cap is reached so the day stays realistic.
4. **Saved for later** — a separate list for lifts you want to come back to,
   independent of today's plan.
5. **My Plan dashboard** — live totals for exercises, minutes, and calories,
   plus per-item "Mark as Done" and "Remove" actions with toast feedback.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/            # Routes (home, my-plan, workout/[id], not-found)
├── components/     # Navbar, Hero, Library, WorkoutCard, StatCard, Footer
├── context/         # PlanContext — plan/saved state + localStorage
├── lib/             # api.ts — fetch helpers for the FitLog API
└── types/           # Shared TypeScript interfaces
```

All imports use the `@/` alias, mapped to `./src/*`.
