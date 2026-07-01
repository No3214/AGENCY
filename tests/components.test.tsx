import { describe, it, expect, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

// next/link renders a plain anchor in tests.
vi.mock('next/link', () => ({
  default: ({ href, children }: any) => <a href={typeof href === 'string' ? href : '#'}>{children}</a>,
}));

import Monogram from '../components/Monogram';
import MixCard from '../components/MixCard';
import ArtistCard from '../components/ArtistCard';
import DatesBoard from '../components/DatesBoard';
import type { Artist, Show } from '../lib/types';

const artist: Artist = {
  slug: 'test-one',
  name: 'Test One',
  flagship: true,
  tagline: { en: 'EN tagline', tr: 'TR tagline' },
  bio: { en: 'bio en', tr: 'bio tr' },
  genres: ['Techno', 'Afro House'],
  basedIn: 'İzmir, TR',
  accent: ['#111111', '#222222'],
  socials: {},
  mixes: [],
};

describe('Monogram', () => {
  it('renders up to two initials', () => {
    const h = renderToStaticMarkup(<Monogram name="After Papi" accent={['#1', '#2']} />);
    expect(h).toContain('AP');
  });
});

describe('MixCard', () => {
  it('renders a non-clickable "Soon" card when there is no real url', () => {
    const h = renderToStaticMarkup(<MixCard mix={{ title: 'Set A', platform: 'soundcloud', url: '' }} />);
    expect(h).toContain('Soon');
    expect(h).not.toContain('<a');
  });
  it('treats a bare platform homepage as no link', () => {
    const h = renderToStaticMarkup(<MixCard mix={{ title: 'Set B', platform: 'soundcloud', url: 'https://soundcloud.com/' }} />);
    expect(h).not.toContain('<a');
  });
  it('renders a clickable card for a real url', () => {
    const h = renderToStaticMarkup(<MixCard mix={{ title: 'Set C', platform: 'spotify', url: 'https://open.spotify.com/track/xyz' }} />);
    expect(h).toContain('href="https://open.spotify.com/track/xyz"');
    expect(h).toContain('Spotify');
  });
  it('renders a player iframe when embedUrl is set', () => {
    const h = renderToStaticMarkup(<MixCard mix={{ title: 'Set D', platform: 'spotify', url: '', embedUrl: 'https://open.spotify.com/embed/x' }} />);
    expect(h).toContain('<iframe');
  });
});

describe('ArtistCard', () => {
  it('renders localized tagline and a slug link (en)', () => {
    const h = renderToStaticMarkup(<ArtistCard artist={artist} lang="en" />);
    expect(h).toContain('Test One');
    expect(h).toContain('EN tagline');
    expect(h).toContain('Techno');
    expect(h).toContain('href="/en/artists/test-one"');
  });
  it('uses the Turkish tagline for tr', () => {
    const h = renderToStaticMarkup(<ArtistCard artist={artist} lang="tr" />);
    expect(h).toContain('TR tagline');
  });
});

const shows: Show[] = [
  { id: 'a', date: '2026-07-18', city: 'İzmir', country: 'TR', venue: 'Kıyı', artistSlug: 'after-papi', status: 'confirmed' },
];

describe('DatesBoard', () => {
  it('renders show rows with status', () => {
    const h = renderToStaticMarkup(<DatesBoard shows={shows} lang="en" />);
    expect(h).toContain('İzmir');
    expect(h).toContain('Confirmed');
  });
  it('renders an empty state', () => {
    const h = renderToStaticMarkup(<DatesBoard shows={[]} lang="en" />);
    expect(h.toLowerCase()).toContain('new dates');
  });
});
