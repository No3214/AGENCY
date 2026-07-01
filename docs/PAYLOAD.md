# Payload CMS integration (branch: `payload-cms`)

This branch adds a **Payload 3** content backend so the roster, dates, mixes and
venues can be edited from an admin panel instead of `lib/content.ts` — without
changing any page shapes.

Why it lives on a branch: a live CMS needs a persistent database and secrets that
only you can provision. `main`/production is intentionally left reading the static
`lib/content.ts` (zero-DB, always up). Activate the CMS when you have a database.

## What's included

- `payload.config.ts` — Payload config (SQLite by default; swap to Postgres for prod).
- `cms/collections/` — `Users` (auth), `Artists`, `Venues`, `Shows` mirroring `lib/types.ts`.
- `lib/cms.ts` — data-access layer. `USE_CMS=false` → returns static content (current
  behaviour). `USE_CMS=true` → reads Payload via the Local API. Same return shapes.
- `seed.ts` — imports everything from `lib/content.ts` into the CMS.

## Activate locally (SQLite, zero cost)

```bash
# 1) Install the CMS dependencies (already in package.json on this branch)
npm install

# 2) Env
cp .env.example .env.local
#   set PAYLOAD_SECRET=<32+ random chars>, USE_CMS=true, DATABASE_URI=file:./afterhouse.db

# 3) Add the admin UI route group for your exact Payload version (one-time):
npx create-payload-app@latest --help   # or copy the app/(payload) group from a fresh scaffold

# 4) Generate types + seed from the static content
npx payload generate:types
npx payload run ./seed.ts

# 5) Run
npm run dev      # site at /  ·  admin at /admin
```

## Wire the pages to the CMS

Pages currently import from `lib/content.ts`. To read from the CMS, switch those
imports to the async getters in `lib/cms.ts` (the pages are already `async` server
components), e.g. `const artists = await getArtists()`. With `USE_CMS=false` these
return the exact same static data, so you can migrate page-by-page safely.

## Production (Vercel + Postgres)

1. Provision Postgres (e.g. Supabase) and set `DATABASE_URI` to the pooled URL.
2. Swap `@payloadcms/db-sqlite` for `@payloadcms/db-postgres` in `payload.config.ts`.
3. Set `PAYLOAD_SECRET`, `USE_CMS=true`, `DATABASE_URI` in Vercel env.
4. Exclude `/admin` and `/api` from the strict CSP (the middleware already skips them
   on this branch) so the Payload admin UI can load its own assets.
5. Deploy, then `payload migrate` + `payload run ./seed.ts` once.

## Compatibility note

Payload 3.85 declares a `next` peer range that (at time of writing) covers
`15.4.x` and `16.2.6+` but not `15.5.x`, which this app uses. The branch therefore
ships an `.npmrc` with `legacy-peer-deps=true` so installs resolve cleanly; Payload
runs fine against Next 15.5 in practice. When activating for production, prefer
aligning versions (bump the app to a Payload-supported Next, or pin Payload to a
release whose peer range includes your Next) and drop the override.
