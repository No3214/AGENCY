import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  if (!data || !data.name || !data.email || !data.message) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_NOTIFY_EMAIL || 'bookings@afterhouse.agency';

  if (key) {
    try {
      const lines = Object.entries(data)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'AFTERHOUSE <onboarding@resend.dev>',
          to,
          reply_to: data.email,
          subject: `Booking — ${data.artist || 'Any'} — ${data.city || ''}`,
          text: lines,
        }),
      });
    } catch {
      // Recorded anyway; do not fail the user-facing request.
    }
  } else {
    // No email provider configured yet — record to server log.
    console.log('[AFTERHOUSE booking inquiry]', JSON.stringify(data));
  }

  return NextResponse.json({ ok: true });
}
