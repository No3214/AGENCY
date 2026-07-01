import { describe, it, expect } from 'vitest';
import { organizationLd, websiteLd, siteUrl } from '../lib/seo';

describe('seo helpers', () => {
  it('siteUrl returns an absolute url', () => {
    expect(siteUrl()).toMatch(/^https?:\/\//);
  });
  it('organizationLd has the right shape', () => {
    const o = organizationLd();
    expect(o['@type']).toBe('Organization');
    expect(o.name).toBe('AFTERHOUSE');
    expect(o.url).toMatch(/^https?:\/\//);
  });
  it('websiteLd advertises both languages', () => {
    const w = websiteLd();
    expect(w['@type']).toBe('WebSite');
    expect(w.inLanguage).toContain('en');
    expect(w.inLanguage).toContain('tr');
  });
  it('organizationLd.sameAs contains no empty entries', () => {
    const o = organizationLd() as { sameAs: string[] };
    expect(Array.isArray(o.sameAs)).toBe(true);
    expect(o.sameAs.every((x) => !!x)).toBe(true);
  });
});
