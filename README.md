# AFTERHOUSE

Boutique DJ booking & event studio — a fast, bilingual (EN/TR) marketing & booking
site for Afro house, melodic house and techno. Built with Next.js 15 (App Router),
React 19 and TypeScript. **Zero external services required to run.**

> Working brand: **AFTERHOUSE** (evolves the “After Papi” equity). Rename in one
> place: `lib/content.ts → brand`.

---

## Quick start / Hızlı başlangıç

```bash
npm install
npm run dev
# http://localhost:3000  → redirects to /en
```

Build & run production:

```bash
npm run build && npm start
```

Other scripts:

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build (also type-checks pages) |
| `npm run typecheck` | `tsc --noEmit` (run after a build so `next-env.d.ts` exists) |
| `npm test` | Unit + component tests (Vitest) |
| `npm run test:e2e` | End-to-end tests (Playwright) |
| `npm start` | Serve the production build |

---

## What’s in the box

- **Pages** (`/[lang]`): home, `/roster`, `/dates`, `/artists/[slug]` (EPK), `/book`, `/about`
- **i18n**: English + Turkish via the `[lang]` route segment, dictionaries in `lib/i18n.ts`
- **Departures board**: signature upcoming-shows component (`components/DatesBoard.tsx`)
- **EPK / press kit** per artist with bio, genres, sets/mixes and upcoming dates
- **Booking form** → `POST /api/book` (emails via Resend if configured, otherwise logs)
- **Design system**: dark “Aegean after-hours” theme (obsidian + molten gold), plain CSS
- **SEO**: per-page metadata, `sitemap.xml`, `robots.txt`, JSON-LD (Organization + WebSite), OpenGraph/Twitter
- **Security**: hardening headers + Content-Security-Policy in `next.config.mjs`
- **A11y**: skip link, semantic landmarks, focus-visible, `prefers-reduced-motion`
- **Tests**: Vitest unit + component suites, Playwright E2E
- **Security**: per-request nonce CSP (middleware) + booking anti-spam (honeypot, timing, rate limit)
- **CI**: GitHub Actions (`.github/workflows/ci.yml`) → build + tests

---

## Edit the content (no code needed beyond one file)

Everything is data-driven from **`lib/content.ts`**.

**Add / edit an artist** — append to the `artists` array:

```ts
{
  slug: 'your-dj',
  name: 'Your DJ',
  tagline: { en: '…', tr: '…' },
  bio: { en: '…', tr: '…' },
  genres: ['Afro House'],
  basedIn: 'İzmir, TR',
  accent: ['#E8B04B', '#C8881F'], // monogram gradient
  socials: { soundcloud: 'https://…', spotify: 'https://…', instagram: 'https://…' },
  mixes: [{ title: 'Live Set', platform: 'soundcloud', url: 'https://soundcloud.com/…' }],
}
```

**Show a real player** — add `embedUrl` to a mix:

```ts
{ title: 'After Hours 001', platform: 'soundcloud',
  url: 'https://soundcloud.com/you/after-hours-001',
  embedUrl: 'https://soundcloud.com/you/after-hours-001' } // → renders a SoundCloud player
```

Without `embedUrl` the mix renders as a clean “Listen on …” card (never a broken iframe).

**Add a date** — append to `shows` (`status`: `confirmed | holding | limited | sold | past`).

---

## Environment variables

The site runs with **none** of these. They unlock optional features (`.env.example`):

| Var | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used in metadata, sitemap, robots |
| `RESEND_API_KEY` | If set, `/api/book` emails inquiries (via Resend) |
| `BOOKING_NOTIFY_EMAIL` | Destination for booking emails |

---

## Deploy

**Vercel (recommended):** import the repo, set `NEXT_PUBLIC_SITE_URL`, deploy. No config needed.

**Anywhere Node:** `npm run build && npm start` behind a reverse proxy.

---

## Roadmap (phase 2)

The frontend is intentionally backend-free for v1. Planned upgrades:

1. **Payload CMS + Postgres (Supabase)** — move `lib/content.ts` into a CMS so the
   team edits artists/dates without deploys.
2. **Stripe** — 50% deposit checkout for confirmed dates.
3. **Cal.com** — availability holds synced to the dates board.
4. **Auth** — agency dashboard for inquiries & pipeline.

See `docs/ARCHITECTURE.md` for the decisions behind the current structure.
