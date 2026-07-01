import { describe, it, expect } from 'vitest';
import { dict, locales, isLocale, getDict } from '../lib/i18n';

function paths(obj: unknown, prefix = ''): string[] {
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    return Object.keys(obj as Record<string, unknown>)
      .sort()
      .flatMap((k) => paths((obj as Record<string, unknown>)[k], prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
}

function allStringsNonEmpty(o: unknown): boolean {
  if (Array.isArray(o)) return o.every(allStringsNonEmpty);
  if (o && typeof o === 'object') return Object.values(o).every(allStringsNonEmpty);
  return typeof o === 'string' ? o.length > 0 : true;
}

describe('i18n', () => {
  it('exposes exactly en and tr', () => {
    expect(locales).toEqual(['en', 'tr']);
  });
  it('isLocale recognizes valid/invalid values', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('tr')).toBe(true);
    expect(isLocale('fr')).toBe(false);
    expect(isLocale('')).toBe(false);
  });
  it('getDict returns the matching dictionary', () => {
    expect(getDict('en')).toBe(dict.en);
    expect(getDict('tr')).toBe(dict.tr);
  });
  it('getDict falls back to en for unknown locales', () => {
    // @ts-expect-error intentional invalid locale
    expect(getDict('zz')).toBe(dict.en);
  });
  it('en and tr share an identical key structure', () => {
    expect(paths(dict.tr)).toEqual(paths(dict.en));
  });
  it('book.types option counts match across locales', () => {
    expect(dict.tr.book.types.length).toBe(dict.en.book.types.length);
  });
  it('about.body paragraph counts match across locales', () => {
    expect(dict.tr.about.body.length).toBe(dict.en.about.body.length);
  });
  it('has no empty strings in either locale', () => {
    expect(allStringsNonEmpty(dict.en)).toBe(true);
    expect(allStringsNonEmpty(dict.tr)).toBe(true);
  });
  it('status labels exist for every show status', () => {
    for (const s of ['confirmed', 'holding', 'limited', 'sold', 'past'] as const) {
      expect(dict.en.status[s]).toBeTruthy();
      expect(dict.tr.status[s]).toBeTruthy();
    }
  });
});
