# Architecture & decisions

Lightweight ADRs for the AFTERHOUSE site.

## 1. Next.js 15 App Router + React 19
Server components by default, file-based routing, first-class metadata/SEO APIs,
and a clean path to Vercel. App Router also gives us `sitemap.ts`, `robots.ts`,
`manifest.ts` and `generateStaticParams` for static pre-rendering.

## 2. Plain CSS, no Tailwind
A single design-token-driven `app/globals.css`. Rationale: zero build-toolchain
risk (no PostCSS/Tailwind version coupling), tiny CSS payload, full control of the
“Aegean after-hours” identity. Trade-off: less utility ergonomics — acceptable for
a focused marketing site.

## 3. Internationalisation via `[lang]` segment
`/en` and `/tr` are real routes, statically generated (`generateStaticParams`),
great for SEO and shareable links. UI copy lives in `lib/i18n.ts`; content carries
`{ en, tr }` fields. The root `/` redirects to `/en`.
Known trade-off: the root `<html lang>` is static `en` (Next requires `<html>` in the
root layout, which sits above the `[lang]` param). Visible language and `hreflang`
alternates are correct. Tighten later with middleware if needed.

## 4. Content as code (for v1)
`lib/content.ts` is the single source of truth for artists, shows, mixes and venues.
This keeps v1 deployable with no database. Phase 2 swaps this module for a Payload
CMS backed by Postgres (Supabase) with the same shapes (`lib/types.ts`), so pages
and components don’t change.

## 5. Booking flow
`components/BookingForm.tsx` (client) → `POST /api/book` (route handler). The handler
validates required fields and, if `RESEND_API_KEY` is present, emails the inquiry;
otherwise it logs server-side. No PII is persisted in v1. Phase 2: store inquiries in
the CMS and add a Stripe deposit step for confirmed dates.

## 6. Media embeds
`components/MixCard.tsx` renders a real SoundCloud/Spotify player **only** when a mix
has an explicit `embedUrl`; otherwise a styled outbound “Listen” card. This prevents
broken iframes in the demo while making real embeds a one-line change.

## 7. Security
`next.config.mjs` sets `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy`, HSTS and a Content-Security-Policy that
allows self, Google Fonts and the SoundCloud/Spotify/YouTube frame origins.
The CSP currently allows `'unsafe-inline'`/`'unsafe-eval'` for compatibility with
Next’s runtime and inline JSON-LD; tighten with a nonce in phase 2.

## 8. Testing
Vitest unit suite (`tests/`) covers the pure content/i18n logic (locale detection,
dictionary fallback, show filtering/sorting, artist lookup, date formatting).
Component/E2E (Playwright) and visual regression are phase-2 additions.

## 9. CI
`.github/workflows/ci.yml` runs `npm ci → build → test` on every push/PR to `main`.

---

## Updates (v1.1) — hardening pass

These supersede notes in §7 and §8 above.

### CSP with per-request nonce (§7 update)
`middleware.ts` now issues a fresh nonce per request and sets a strict
`Content-Security-Policy`: `script-src 'self' 'nonce-…' 'strict-dynamic'` — no
more `'unsafe-inline'`/`'unsafe-eval'` for scripts. Next.js applies the nonce to
its own scripts; our inline JSON-LD reads it via `headers().get('x-nonce')` in
`app/layout.tsx`. `style-src` keeps `'unsafe-inline'` (required for inline style
attributes used by the design system). Trade-off: reading `headers()` in the root
layout opts pages into dynamic rendering (SSR) instead of static — acceptable and
still edge-cached on Vercel. The other hardening headers stay static in
`next.config.mjs`.

### Booking anti-abuse (§4 update)
`/api/book` now enforces: input validation + length caps + type coercion
(`lib/booking.ts` → `sanitizeInquiry`), a hidden honeypot field, a
minimum time-to-submit check, a link-stuffing heuristic, and a best-effort
in-memory per-IP sliding-window rate limit (5 / 10 min). Bot/spam hits get a
silent `{ ok: true }` (no detection signal leaked). For durable, multi-instance
rate limiting, back it with Upstash/Vercel KV in phase 2. Logic is pure and
unit-tested.

### Testing (§8 update)
- Unit: `tests/lib.test.ts`, `tests/booking.test.ts` (Vitest, node/jsdom).
- Component: `tests/components.test.tsx` (Vitest + Testing Library + jsdom) for
  Monogram, MixCard, ArtistCard, DatesBoard.
- E2E: `tests/e2e/site.spec.ts` (Playwright) — redirect, hero, roster nav,
  EN/TR toggle, artist EPK, booking submit. Runs against `PLAYWRIGHT_BASE_URL`
  (defaults to production) via `.github/workflows/e2e.yml` (manual + weekly).
