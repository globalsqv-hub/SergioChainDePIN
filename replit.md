# SergioChain DePIN

## Overview

SergioChain DePIN is a showcase/directory web application for Decentralized Physical Infrastructure Network (DePIN) projects. It displays crypto/blockchain projects related to physical infrastructure (sensors, compute, WiFi, storage, AI) and earning opportunities (hardware mining, mobile apps, staking, validation). The UI has a cyberpunk/neon aesthetic with Spanish-language content. It functions as a read-only catalog seeded with demo data on startup.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework:** React 18 with TypeScript
- **Routing:** Wouter (lightweight client-side router)
- **State/Data Fetching:** TanStack React Query for server state management
- **Styling:** Tailwind CSS with a custom cyberpunk dark theme (neon cyan primary, neon green secondary, electric purple accent). Uses CSS variables defined in `client/src/index.css`
- **UI Components:** shadcn/ui component library (new-york style) built on Radix UI primitives, located in `client/src/components/ui/`
- **Animations:** Framer Motion
- **Build Tool:** Vite with React plugin
- **Path Aliases:** `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

### Pages
- `/` and `/projects` — Project listing with category filters and search
- `/earn` — Earning opportunities listing with type filters
- `/community` — Redirects to home (placeholder)

### Backend
- **Framework:** Express 5 on Node.js with TypeScript (run via `tsx`)
- **API Pattern:** RESTful JSON API under `/api/` prefix
- **Endpoints:**
  - `GET /api/projects` — List projects (optional `search`, `category` query params)
  - `GET /api/projects/:id` — Get single project
  - `GET /api/earn` — List earning opportunities (optional `type` query param)
- **Route Definitions:** Shared between frontend and backend in `shared/routes.ts` using Zod schemas
- **Data Seeding:** On startup, `storage.seedData()` populates the database with demo projects and earning opportunities if the tables are empty

### Shared Layer (`shared/`)
- `schema.ts` — Drizzle ORM table definitions and Zod insert schemas for `projects` and `earn_opportunities` tables
- `routes.ts` — API route definitions with Zod validation schemas, used by both client and server

### Database
- **ORM:** Drizzle ORM with PostgreSQL dialect
- **Database:** PostgreSQL (requires `DATABASE_URL` environment variable)
- **Connection:** `pg` Pool in `server/db.ts`
- **Schema Management:** `drizzle-kit push` via `npm run db:push`
- **Tables:**
  - `projects` — id, name, slug, description, category, chain, token, market_cap, image_url, featured
  - `earn_opportunities` — id, project_name, category, type, estimated_earnings, hardware_cost, roi, difficulty

### Build & Deploy
- Development: `npm run dev` runs Vite dev server with HMR proxied through Express
- Production build: `npm run build` builds client with Vite and bundles server with esbuild into `dist/`
- Production start: `npm start` serves the built assets

## External Dependencies

### Database
- **PostgreSQL** — Primary data store, connected via `DATABASE_URL` environment variable

### Key NPM Packages
- `express` v5 — HTTP server
- `drizzle-orm` + `drizzle-zod` + `drizzle-kit` — ORM and schema management
- `pg` — PostgreSQL client
- `@tanstack/react-query` — Client-side data fetching/caching
- `wouter` — Client-side routing
- `framer-motion` — Animations
- `zod` — Schema validation (shared between client and server)
- Full shadcn/ui component suite via Radix UI primitives
- `connect-pg-simple` — PostgreSQL session store (available but sessions not actively used)

### Fonts (External CDN)
- Space Grotesk, Inter, JetBrains Mono (via Google Fonts in `index.css`)
- Architects Daughter, DM Sans, Fira Code, Geist Mono (via Google Fonts in `index.html`)

### Static Assets
- Logo and background images stored in `attached_assets/` directory, imported via `@assets/` alias