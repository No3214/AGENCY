import { brand, artistName } from './content';
import type { Artist, Show, Locale } from './types';

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    url: siteUrl(),
    email: brand.email,
    areaServed: 'Worldwide',
    description: 'Boutique DJ booking and event studio for Afro house, melodic house and techno.',
    sameAs: [brand.instagram].filter(Boolean),
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: brand.name,
    url: siteUrl(),
    inLanguage: ['en', 'tr'],
  };
}

export function musicGroupLd(a: Artist, lang: Locale) {
  const base = siteUrl();
  const socials = [a.socials.website, a.socials.instagram, a.socials.soundcloud, a.socials.spotify].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: a.name,
    genre: a.genres,
    description: a.tagline[lang],
    url: `${base}/${lang}/artists/${a.slug}`,
    image: `${base}/${lang}/artists/${a.slug}/opengraph-image`,
    ...(socials.length ? { sameAs: socials } : {}),
  };
}

const STATUS_MAP: Record<Show['status'], string> = {
  confirmed: 'https://schema.org/EventScheduled',
  limited: 'https://schema.org/EventScheduled',
  holding: 'https://schema.org/EventScheduled',
  sold: 'https://schema.org/EventScheduled',
  past: 'https://schema.org/EventScheduled',
};

export function musicEventLd(s: Show, lang: Locale) {
  const base = siteUrl();
  const name = `${artistName(s.artistSlug)} — ${s.city}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name,
    startDate: s.date,
    eventStatus: STATUS_MAP[s.status],
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: s.venue,
      address: { '@type': 'PostalAddress', addressLocality: s.city, addressCountry: s.country },
    },
    performer: { '@type': 'MusicGroup', name: artistName(s.artistSlug) },
    organizer: { '@type': 'Organization', name: brand.name, url: base },
    url: `${base}/${lang}/dates`,
    ...(s.ticketUrl
      ? { offers: [{ '@type': 'Offer', url: s.ticketUrl, availability: 'https://schema.org/InStock' }] }
      : {}),
  };
}
