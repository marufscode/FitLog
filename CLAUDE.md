# CLAUDE.md

This file gives Claude project-specific context when working in this repo.
It complements `AGENTS.md`, which holds the general architecture and
coding-standards guidance that applies to any AI assistant — read that
first.

## What FitLog Is

A single-purpose fitness logging app: browse a workout library, add up to
five lifts to "today's plan," mark them done, and save others for later.
There is no backend of our own — the only external dependency is the
read-only FitLog API at `https://api.abcz.workers.dev/api/fitlog`. All
"write" behavior (plan, saved, done status) is local to the browser via
`localStorage`.

## Working in This Repo

- Read `AGENTS.md` for the file layout, the `@/` import alias, and the
  Tailwind token table before writing new UI.
- The five-lift plan cap lives in `PLAN_CAP` in
  `src/context/PlanContext.tsx`. If a task asks you to change the cap,
  change it there — don't hardcode `5` elsewhere.
- When adding a new page, wire it into `src/app/` following the existing
  route names (`/`, `/my-plan`, `/workout/[id]`) unless the task explicitly
  asks for a new route.
- When a task touches copy (button labels, empty states, toasts), match the
  existing voice: short, active, sentence case, and the button's verb
  should match the toast it produces (e.g. "Mark as Done" → "marked done").

## Common Tasks

- **Adding a new field to a workout card:** update `Workout` in
  `src/types/workout.ts`, the normalizer in `src/lib/api.ts`, and the
  relevant component(s) (`WorkoutCard.tsx`, the details page, or
  `PlanRow` in `my-plan/page.tsx`).
- **Changing the plan cap or adding a new list (e.g. "Favorites"):** extend
  `PlanContext` rather than adding a parallel `useState` in a page
  component — the localStorage persistence and toast conventions live
  there.
- **Adjusting the palette or type scale:** edit the tokens in
  `tailwind.config.ts`, not individual component files, so the change
  applies everywhere consistently.

## Things Not to Do

- Don't add a server-side database or API route for plan/saved state — this
  app is intentionally local-first.
- Don't bypass `src/lib/api.ts` with ad-hoc `fetch` calls in components.
- Don't introduce a second icon library alongside `lucide-react`.
