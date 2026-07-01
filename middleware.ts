import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { artists } from './lib/content';

const ARTIST_SLUGS = new Set(artists.map((a) => a.slug));

function notFoundHtml(lang: string, csp: string): NextResponse {
  const html = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><meta name="robots" content="noindex"/><title>404 · AFTERHOUSE</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0b0b0d;color:#f4f1ea;font-family:system-ui,-apple-system,sans-serif;text-align:center}h1{font-size:5rem;margin:0;letter-spacing:2px}p{color:#a7a8b2}a{display:inline-block;margin-top:16px;padding:12px 22px;border-radius:999px;background:linear-gradient(135deg,#e8b04b,#c8881f);color:#1a1305;font-weight:600;text-decoration:none}</style></head><body><div><h1>404</h1><p>This page could not be found.</p><a href="/${lang}">Back home</a></div></body></html>`;
  return new NextResponse(html, {
    status: 404,
    headers: { 'content-type': 'text/html; charset=utf-8', 'content-security-policy': csp },
  });
}

export function middleware(request: NextRequest) {
  // Payload admin/API manage their own headers — keep them out of the strict app CSP.
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  const nonce = btoa(crypto.randomUUID());

  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https:",
    "frame-src https://w.soundcloud.com https://open.spotify.com https://www.youtube.com https://youtube.com",
    "connect-src 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ].join('; ');

  // Hard 404 (correct HTTP status) for unknown artist slugs. Because the app is
  // dynamically rendered for the CSP nonce, notFound() would otherwise return a
  // soft 404 (HTTP 200). Handling it here keeps the status honest for SEO.
  const m = request.nextUrl.pathname.match(/^\/(en|tr)\/artists\/([^/]+)\/?$/);
  if (m && !ARTIST_SLUGS.has(m[2])) {
    return notFoundHtml(m[1], csp);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('content-security-policy', csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('content-security-policy', csp);
  return response;
}

export const config = {
  matcher: [
    {
      source:
        '/((?!_next/static|_next/image|favicon.svg|robots.txt|sitemap.xml|manifest.webmanifest).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
