# Engineering Rules

## Rendering

* Server Components by default
* Client Components only when necessary
* Keep `use client` as low in the tree as possible
* Never make route layouts client components without a clear reason

## Performance

* Send less JavaScript
* Dynamic import heavy features
* Virtualize large lists and grids
* Optimize images before optimizing CSS
* Measure before optimizing

## UI

* Keep DOM trees shallow
* Avoid unnecessary animations
* Avoid mounting hidden dialogs, sheets, and popovers at scale
* Mobile-first design

## Architecture

* Feature-first organization
* Business logic belongs to features
* Shared code must be reusable and generic
* No circular dependencies
* No duplicated business logic

## State Management

* React Query for server state
* Zustand for UI state
* Local state before global state

## Dependencies

* Every dependency must justify its existence
* Prefer platform APIs when possible
* No giant icon packs
* No unnecessary libraries

## Imports

* No barrel imports (`index.ts`)
* Prefer direct imports
* Avoid importing entire libraries for a single utility

## Localization

* RTL-first
* Persian-first
* Self-hosted fonts only
* Persian dates and numbers by default

## Code Quality

* TypeScript strict mode
* No `any`
* Validate external data
* Keep components small and focused
