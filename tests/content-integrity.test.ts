import { describe, it, expect } from 'vitest';
import {
  artists,
  shows,
  venues,
  brand,
  getArtist,
  upcomingShows,
  showsByArtist,
  artistName,
  formatDate,
} from '../lib/content';

const STATUSES = ['confirmed', 'holding', 'limited', 'sold', 'past'];

describe('content integrity', () => {
  it('artist slugs are unique', () => {
    const slugs = artists.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it('has exactly one flagship artist', () => {
    expect(artists.filter((a) => a.flagship).length).toBe(1);
  });
  it('every artist has two hex accent colors', () => {
    for (const a of artists) {
      expect(a.accent.length).toBe(2);
      for (const c of a.accent) expect(c).toMatch(/^#[0-9a-fA-F]{3,8}$/);
    }
  });
  it('every artist has genres and a base location', () => {
    for (const a of artists) {
      expect(a.genres.length).toBeGreaterThan(0);
      expect(a.basedIn.length).toBeGreaterThan(0);
    }
  });
  it('every artist has bilingual tagline and bio', () => {
    for (const a of artists) {
      expect(a.tagline.en && a.tagline.tr).toBeTruthy();
      expect(a.bio.en && a.bio.tr).toBeTruthy();
    }
  });
  it('every mix declares a supported platform', () => {
    const ok = ['soundcloud', 'spotify', 'youtube'];
    for (const m of artists.flatMap((a) => a.mixes)) expect(ok).toContain(m.platform);
  });
  it('show ids are unique', () => {
    const ids = shows.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it('every show references a real artist', () => {
    for (const s of shows) expect(getArtist(s.artistSlug)).toBeDefined();
  });
  it('every show has a valid ISO date and status', () => {
    for (const s of shows) {
      expect(s.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(s.date))).toBe(false);
      expect(STATUSES).toContain(s.status);
    }
  });
  it('every show has city, country and venue', () => {
    for (const s of shows) {
      expect(s.city).toBeTruthy();
      expect(s.country).toBeTruthy();
      expect(s.venue).toBeTruthy();
    }
  });
  it('upcomingShows excludes past and sorts ascending', () => {
    const u = upcomingShows();
    expect(u.some((s) => s.status === 'past')).toBe(false);
    for (let i = 1; i < u.length; i++) expect(u[i].date >= u[i - 1].date).toBe(true);
  });
  it('showsByArtist returns only that artist and no past dates', () => {
    for (const a of artists) {
      for (const s of showsByArtist(a.slug)) {
        expect(s.artistSlug).toBe(a.slug);
        expect(s.status).not.toBe('past');
      }
    }
  });
  it('artistName resolves names and falls back to slug', () => {
    expect(artistName('after-papi')).toBe('After Papi');
    expect(artistName('zzz')).toBe('zzz');
  });
  it('venues are all populated', () => {
    expect(venues.length).toBeGreaterThan(0);
    for (const v of venues) {
      expect(v.name).toBeTruthy();
      expect(v.city).toBeTruthy();
    }
  });
  it('brand exposes a contact email', () => {
    expect(brand.email).toMatch(/@/);
  });
  it('formatDate localizes and includes the year', () => {
    expect(formatDate('2026-07-18', 'en')).toContain('2026');
    expect(formatDate('2026-07-18', 'tr')).toContain('2026');
  });
});
