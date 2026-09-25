# AGENTS.md

Guidance for AI coding assistants (and humans) working in this repository.

## Project Architecture

- **Framework:** Next.js 15, App Router, TypeScript strict mode.
- **Everything lives under `src/`.** Routes in `src/app`, presentational
  components in `src/components`, global state in `src/context`, data
  fetching in `src/lib`, shared types in `src/types`.
- **Import alias:** always use `@/...` (mapped to `./src/*`) instead of
  relative paths that climb more than one directory (`../../`).
- **State:** all plan/saved state lives in `PlanContext`
  (`src/context/PlanContext.tsx`) and persists to `localStorage` under the
  key `fitlog:plan-state:v1`. Do not introduce a second source of truth for
  plan/saved data — extend the existing context instead.
- **Data fetching:** all calls to the FitLog API go through
  `src/lib/api.ts`. Don't call `fetch` against `api.abcz.workers.dev`
  directly from components; add a helper instead so normalization stays in
  one place.

## Coding Standards

- TypeScript strict mode is on — no `any`, no unchecked array/object
  access (`noUncheckedIndexedAccess` is enabled).
- Components that use hooks, browser APIs, or event handlers must be marked
  `"use client"` at the top of the file. Keep layout/metadata files as
  server components where possible.
- Prefer small, single-purpose components over large ones. If a component
  file exceeds ~150 lines, look for a sub-component to extract.
- Name things the way a user would understand them (e.g. "Today's Plan",
  not "planState"), consistent with copy already in the UI.
- Every interactive state change that matters to the user (added, saved,
  removed, marked done) should surface a `sonner` toast using the same verb
  as the button that triggered it.

## Tailwind Dark-Theme Design Conventions

FitLog's palette is defined as named tokens in `tailwind.config.ts` — use
these instead of raw hex values:

| Token | Hex | Use |
|---|---|---|
| `base` | `#0f1115` | Page background |
| `surface` | `#1b1f28` | Cards, inputs |
| `surface-raised` | `#1e2330` | Image placeholders, nested surfaces |
| `border` | `#2d313b` | Default borders |
| `border-soft` | `#20242e` | Subtler dividers |
| `ink` | `#ffffff` | Primary text |
| `ink-muted` | `#9ca3af` | Secondary text |
| `ink-soft` | `#d1d5db` | Body copy on dark surfaces |
| `accent` | `#ccff00` | Primary actions, highlights (always pair with black text) |

- Display/headline text uses `font-display` (Oswald), uppercase, bold.
- Body copy uses `font-sans` (Inter).
- Buttons and badges use `rounded-pill`; cards use `rounded-card` (14px).
- Motion is restrained: hover scale/color transitions only — no
  scroll-triggered fade-ins.

## Before Committing

1. `npm run lint`
2. `npm run build` — must complete with zero TypeScript errors.
3. Confirm any new interactive element has a visible focus state (the
   global `:focus-visible` ring in `globals.css` covers most cases).
