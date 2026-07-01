import { NextResponse } from 'next/server';
import { validateInquiry, sanitizeInquiry, createRateLimiter } from '../../../lib/booking';

// Best-effort limiter: 5 inquiries / 10 min / IP (per instance).
const limited = createRateLimiter(5, 10 * 60 * 1000);

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  const data = await req.json().catch(() => null);
  const verdict = validateInquiry(data);
  if (!verdict.ok) {
    return NextResponse.json({ ok: false, error: verdict.error }, { status: verdict.status ?? 400 });
  }
  // Silently drop bots/spam without leaking that they were detected.
  if (verdict.drop) return NextResponse.json({ ok: true });

  const clean = { ...sanitizeInquiry(data as Record<string, unknown>), ip };

  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_NOTIFY_EMAIL || 'bookings@afterhouse.agency';
  if (key) {
    try {
      const lines = Object.entries(clean).map(([k, v]) => `${k}: ${v}`).join('\n');
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'AFTERHOUSE <onboarding@resend.dev>',
          to,
          reply_to: clean.email,
          subject: `Booking — ${clean.artist || 'Any'} — ${clean.city || ''}`,
          text: lines,
        }),
      });
    } catch {
      // Never fail the user-facing request because email delivery hiccuped.
    }
  } else {
    console.log('[AFTERHOUSE booking inquiry]', JSON.stringify(clean));
  }

  return NextResponse.json({ ok: true });
}
