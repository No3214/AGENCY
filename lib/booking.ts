// Pure, dependency-free booking validation + spam heuristics (unit-testable).

export function isEmail(s: unknown): s is string {
  return typeof s === 'string' && s.length <= 200 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.slice(0, max) : '';
}

export function countUrls(s: string): number {
  return (s.match(/https?:\/\//gi) || []).length;
}

export type Verdict = { ok: boolean; drop?: boolean; status?: number; error?: string };

// Returns a verdict. `drop:true` => pretend success but discard (bot/spam).
export function validateInquiry(data: unknown, now: number = Date.now()): Verdict {
  if (!data || typeof data !== 'object') return { ok: false, status: 400, error: 'bad_request' };
  const d = data as Record<string, unknown>;

  // Honeypot: humans never fill this hidden field.
  if (typeof d.company_website === 'string' && d.company_website.trim() !== '') {
    return { ok: true, drop: true };
  }

  // Submitted impossibly fast after page load => bot.
  const ts = Number(d._ts);
  if (Number.isFinite(ts) && now - ts < 2000) return { ok: true, drop: true };

  const name = str(d.name, 120);
  const email = str(d.email, 200);
  const message = str(d.message, 4000);
  if (!name || !isEmail(email) || message.length < 5) {
    return { ok: false, status: 400, error: 'invalid' };
  }

  // Link-stuffed messages are almost always spam.
  if (countUrls(message) > 4) return { ok: true, drop: true };

  return { ok: true };
}

export function sanitizeInquiry(data: Record<string, unknown>) {
  return {
    name: str(data.name, 120),
    email: str(data.email, 200),
    org: str(data.org, 160),
    artist: str(data.artist, 120),
    city: str(data.city, 120),
    country: str(data.country, 120),
    date: str(data.date, 40),
    budget: str(data.budget, 80),
    type: str(data.type, 80),
    message: str(data.message, 4000),
  };
}

// Best-effort in-memory sliding-window limiter (per serverless instance).
export function createRateLimiter(maxHits: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return function limited(ip: string, now: number = Date.now()): boolean {
    const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
    arr.push(now);
    hits.set(ip, arr);
    if (hits.size > 5000) hits.clear();
    return arr.length > maxHits;
  };
}
