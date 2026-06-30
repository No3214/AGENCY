import { describe, it, expect } from 'vitest';
import { isLocale, getDict } from '../lib/i18n';
import { upcomingShows, showsByArtist, getArtist, artistName, formatDate, artists } from '../lib/content';

describe('i18n', () => {
  it('detects valid locales', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('tr')).toBe(true);
    expect(isLocale('de')).toBe(false);
  });

  it('returns a dictionary and falls back to en for unknown', () => {
    expect(getDict('tr').nav.book).toBeTruthy();
    // @ts-expect-error invalid locale should fall back at runtime
    expect(getDict('xx').nav.book).toBe(getDict('en').nav.book);
  });
});

describe('shows', () => {
  it('upcomingShows excludes past and is sorted ascending', () => {
    const up = upcomingShows();
    expect(up.length).toBeGreaterThan(0);
    expect(up.every((s) => s.status !== 'past')).toBe(true);
    for (let i = 1; i < up.length; i++) {
      expect(up[i].date >= up[i - 1].date).toBe(true);
    }
  });

  it('showsByArtist filters by slug and drops past dates', () => {
    const rows = showsByArtist('after-papi');
    expect(rows.every((s) => s.artistSlug === 'after-papi' && s.status !== 'past')).toBe(true);
  });
});

describe('artists', () => {
  it('getArtist returns the flagship and undefined for unknown', () => {
    expect(getArtist('after-papi')?.flagship).toBe(true);
    expect(getArtist('does-not-exist')).toBeUndefined();
  });

  it('artistName resolves names and falls back to slug', () => {
    expect(artistName('after-papi')).toBe('After Papi');
    expect(artistName('ghost')).toBe('ghost');
  });

  it('every artist has bilingual content and at least one mix', () => {
    for (const a of artists) {
      expect(a.tagline.en).toBeTruthy();
      expect(a.tagline.tr).toBeTruthy();
      expect(a.bio.en).toBeTruthy();
      expect(a.bio.tr).toBeTruthy();
      expect(a.mixes.length).toBeGreaterThan(0);
    }
  });
});

describe('formatDate', () => {
  it('formats an ISO date and includes the year', () => {
    const s = formatDate('2026-07-18', 'en');
    expect(typeof s).toBe('string');
    expect(s).toContain('2026');
  });
});
