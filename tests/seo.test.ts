import { describe, it, expect } from 'vitest';
import { organizationLd, websiteLd, siteUrl, musicGroupLd, musicEventLd } from '../lib/seo';
import { artists, shows } from '../lib/content';

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
  });});

describe('structured data', () => {
  it('musicGroupLd describes the artist', () => {
    const g = musicGroupLd(artists[0], 'en') as any;
    expect(g['@type']).toBe('MusicGroup');
    expect(g.name).toBe(artists[0].name);
    expect(Array.isArray(g.genre)).toBe(true);
    expect(g.url).toContain('/en/artists/');
    expect(g.image).toContain('opengraph-image');
  });
  it('musicEventLd describes a show', () => {
    const e = musicEventLd(shows[0], 'en') as any;
    expect(e['@type']).toBe('MusicEvent');
    expect(e.startDate).toBe(shows[0].date);
    expect(e.location['@type']).toBe('Place');
    expect(e.location.address.addressLocality).toBe(shows[0].city);
    expect(e.performer['@type']).toBe('MusicGroup');
    expect(e.eventStatus).toContain('schema.org');
    expect(e.eventAttendanceMode).toContain('Offline');
  });
});
