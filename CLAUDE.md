# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Day of Portugal RI — a community website for the Rhode Island Day of Portugal celebration. It has a React SPA frontend and a separate Express API backend.

## Commands

### Frontend (root directory)
- `npm run dev` — Start Vite dev server on port 8080
- `npm run build` — Production build
- `npm run lint` — ESLint
- `npm run test` — Run vitest once (`npm run test:watch` for watch mode)

### Backend (`server/` directory)
- `cd server && npm run dev` — Start Express server on port 3001 (tsx watch)
- `cd server && npm run migrate` — Run SQL migrations
- `cd server && npm run seed` — Seed database

Both must run simultaneously for local development. The Vite config proxies `/api` requests to `localhost:3001`.

## Architecture

**Frontend:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui (Radix primitives). Uses `@` path alias mapped to `./src/`.

**Backend:** Express + PostgreSQL (`pg` driver, raw SQL) + DigitalOcean Spaces (S3-compatible) for file uploads. JWT auth for admin routes. Server code lives in `server/src/` with its own `package.json` and `node_modules`.

**Key patterns:**
- Pages use a `Layout` component (Navbar + Footer wrapper). Admin pages use `AdminLayout` + `ProtectedRoute` for JWT guard.
- Data fetching uses TanStack React Query. Custom hooks in `src/hooks/` (e.g., `useEvents`, `useSponsors`) wrap the API client at `src/lib/api.ts`.
- `src/lib/api.ts` is the single HTTP client — handles auth headers, token refresh, and redirects to `/admin/login` on 401.
- API routes: `/api/auth`, `/api/events`, `/api/sponsors`, `/api/volunteers`, `/api/scholarships`, `/api/upload`.
- Admin routes use `/admin/*` prefix on the frontend and `/api/*/admin/*` on the backend.
- Migrations are sequential SQL files in `server/src/migrations/`, run manually via `migrate.ts`.

**Environment:** A `.env` file at the project root is read by the server (`DATABASE_URL`, `JWT_SECRET`, `DO_SPACES_*` keys).

## UI Components

`src/components/ui/` contains shadcn/ui generated components — edit these in place when customizing, but prefer using them as-is. Icons come from `lucide-react`.
