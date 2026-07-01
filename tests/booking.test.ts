import { describe, it, expect } from 'vitest';
import { isEmail, countUrls, validateInquiry, createRateLimiter, sanitizeInquiry } from '../lib/booking';

describe('email + url helpers', () => {
  it('validates emails', () => {
    expect(isEmail('a@b.co')).toBe(true);
    expect(isEmail('bad')).toBe(false);
    expect(isEmail(123)).toBe(false);
  });
  it('counts urls', () => {
    expect(countUrls('nothing here')).toBe(0);
    expect(countUrls('http://a.com and https://b.com')).toBe(2);
  });
});

describe('validateInquiry', () => {
  const base = { name: 'Nadia', email: 'nadia@promoter.co', message: 'We would love to book for our festival.' };
  it('accepts a valid inquiry', () => {
    const v = validateInquiry({ ...base, _ts: 1_000_000 - 5000 }, 1_000_000);
    expect(v.ok).toBe(true);
    expect(v.drop).toBeUndefined();
  });
  it('rejects missing/invalid fields', () => {
    expect(validateInquiry({ name: '', email: 'x', message: '' }).ok).toBe(false);
    expect(validateInquiry({ ...base, email: 'nope' }).status).toBe(400);
  });
  it('drops honeypot hits silently', () => {
    const v = validateInquiry({ ...base, company_website: 'http://spam.ru' });
    expect(v.ok).toBe(true);
    expect(v.drop).toBe(true);
  });
  it('drops too-fast submissions', () => {
    const v = validateInquiry({ ...base, _ts: 1_000_000 - 500 }, 1_000_000);
    expect(v.drop).toBe(true);
  });
  it('drops link-stuffed spam', () => {
    const v = validateInquiry({ ...base, message: 'http://a http://b http://c http://d http://e' });
    expect(v.drop).toBe(true);
  });
  it('rejects non-object payloads', () => {
    expect(validateInquiry(null).ok).toBe(false);
  });
});

describe('sanitizeInquiry', () => {
  it('caps field lengths and coerces types', () => {
    const out = sanitizeInquiry({ name: 'x'.repeat(999), email: 'a@b.co', message: 42 as unknown as string });
    expect(out.name.length).toBe(120);
    expect(out.message).toBe('');
  });
});

describe('createRateLimiter', () => {
  it('limits after max hits in the window', () => {
    const lim = createRateLimiter(2, 1000);
    expect(lim('1.1.1.1', 5000)).toBe(false);
    expect(lim('1.1.1.1', 5000)).toBe(false);
    expect(lim('1.1.1.1', 5000)).toBe(true);
  });
  it('resets after the window passes', () => {
    const lim = createRateLimiter(1, 1000);
    expect(lim('9.9.9.9', 0)).toBe(false);
    expect(lim('9.9.9.9', 5000)).toBe(false);
  });
  it('tracks IPs independently', () => {
    const lim = createRateLimiter(1, 1000);
    expect(lim('a', 0)).toBe(false);
    expect(lim('b', 0)).toBe(false);
  });
});
