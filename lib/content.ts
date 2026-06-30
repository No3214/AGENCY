import type { Artist, Show, Venue } from './types';

// ---------------------------------------------------------------------------
// BRAND
// ---------------------------------------------------------------------------
export const brand = {
  name: 'AFTERHOUSE',
  short: 'AFTR',
  email: 'bookings@afterhouse.agency',
  instagram: 'https://instagram.com/',
  baseCity: 'İzmir',
};

// ---------------------------------------------------------------------------
// ROSTER
// Swap names, bios, socials and mixes with the real ones. `mixes[].embedUrl`
// is optional — set it to a real SoundCloud/Spotify embed to render a player.
// ---------------------------------------------------------------------------
export const artists: Artist[] = [
  {
    slug: 'after-papi',
    name: 'After Papi',
    flagship: true,
    tagline: {
      en: 'Afro & melodic house — the flagship sound of the studio.',
      tr: 'Afro & melodic house — stüdyonun amiral sesi.',
    },
    bio: {
      en: 'After Papi is the founding voice of AFTERHOUSE: hypnotic Afro-house grooves, organic percussion and late-night melodic builds. Equally at home in an intimate terrace at sunrise and a festival main stage, the sets are built to keep the floor moving long after midnight.',
      tr: 'After Papi, AFTERHOUSE’un kurucu sesi: hipnotik Afro-house grooveları, organik perküsyon ve gece geç saat melodik geçişler. Gün doğumunda küçük bir terasta da festival ana sahnesinde de aynı rahatlıkla; setler pisti gece yarısından çok sonrasına kadar ayakta tutmak için kurgulanır.',
    },
    genres: ['Afro House', 'Melodic House', 'Organic'],
    basedIn: 'İzmir, TR',
    accent: ['#E8B04B', '#C8881F'],
    socials: {
      instagram: 'https://instagram.com/',
      soundcloud: 'https://soundcloud.com/',
      spotify: 'https://open.spotify.com/',
    },
    mixes: [
      { title: 'Sunrise Terrace — Live Set', platform: 'soundcloud', url: 'https://soundcloud.com/', duration: '62 min', genre: 'Afro House' },
      { title: 'After Hours 001', platform: 'soundcloud', url: 'https://soundcloud.com/', duration: '74 min', genre: 'Melodic House' },
      { title: 'Aegean Nights (Promo Mix)', platform: 'spotify', url: 'https://open.spotify.com/', duration: '58 min', genre: 'Organic House' },
    ],
  },
  {
    slug: 'mira-solace',
    name: 'Mira Solace',
    tagline: {
      en: 'Deep, vocal-led melodic house with a hypnotic pulse.',
      tr: 'Derin, vokal eksenli melodic house ve hipnotik bir nabız.',
    },
    bio: {
      en: 'Mira Solace threads emotive vocals through rolling basslines and wide, cinematic pads. A peak-time selector who never loses the melody.',
      tr: 'Mira Solace, duygusal vokalleri yuvarlanan basslinelar ve geniş, sinematik padlerin arasından geçirir. Melodiyi asla kaybetmeyen bir peak-time selektörü.',
    },
    genres: ['Melodic House', 'Progressive'],
    basedIn: 'Berlin, DE',
    accent: ['#7AA0FF', '#3F5BD1'],
    socials: { instagram: 'https://instagram.com/', soundcloud: 'https://soundcloud.com/' },
    mixes: [
      { title: 'Nightform — Club Mix', platform: 'soundcloud', url: 'https://soundcloud.com/', duration: '68 min', genre: 'Melodic House' },
      { title: 'Pulse 02', platform: 'spotify', url: 'https://open.spotify.com/', duration: '55 min', genre: 'Progressive' },
    ],
  },
  {
    slug: 'kavi',
    name: 'KAVI',
    tagline: {
      en: 'Raw, driving techno for the deep end of the night.',
      tr: 'Gecenin derinliği için ham, sürükleyici techno.',
    },
    bio: {
      en: 'KAVI plays fast, physical techno — hardware-driven, hypnotic and relentless. Built for dark rooms and warehouse hours.',
      tr: 'KAVI hızlı, fiziksel techno çalar — hardware odaklı, hipnotik ve durdurulamaz. Karanlık odalar ve depo saatleri için.',
    },
    genres: ['Techno', 'Hard Groove'],
    basedIn: 'İstanbul, TR',
    accent: ['#C9CDD6', '#6B7080'],
    socials: { instagram: 'https://instagram.com/', soundcloud: 'https://soundcloud.com/' },
    mixes: [
      { title: 'Warehouse Transmission', platform: 'soundcloud', url: 'https://soundcloud.com/', duration: '71 min', genre: 'Techno' },
    ],
  },
  {
    slug: 'lunaria',
    name: 'Lunaria',
    tagline: {
      en: 'Organic, downtempo-to-house journeys for golden hour.',
      tr: 'Golden hour için organik, downtempo’dan house’a yolculuklar.',
    },
    bio: {
      en: 'Lunaria curates the warm-up and the sunset — organic textures, ethnic percussion and slow-burning house that opens the night.',
      tr: 'Lunaria warm-up ve gün batımını kürate eder — organik dokular, etnik perküsyon ve geceyi açan yavaş yükselen house.',
    },
    genres: ['Organic House', 'Downtempo'],
    basedIn: 'Lisbon, PT',
    accent: ['#E79A6B', '#B5552F'],
    socials: { instagram: 'https://instagram.com/', spotify: 'https://open.spotify.com/' },
    mixes: [
      { title: 'Golden Hour 01', platform: 'spotify', url: 'https://open.spotify.com/', duration: '64 min', genre: 'Organic House' },
    ],
  },
];

// ---------------------------------------------------------------------------
// SHOWS / DATES
// ---------------------------------------------------------------------------
export const shows: Show[] = [
  { id: 's1', date: '2026-07-18', city: 'İzmir', country: 'TR', venue: 'Kıyı Open Air', artistSlug: 'after-papi', status: 'confirmed' },
  { id: 's2', date: '2026-07-25', city: 'İstanbul', country: 'TR', venue: 'Zorlu PSM', artistSlug: 'kavi', status: 'limited' },
  { id: 's3', date: '2026-08-02', city: 'Mykonos', country: 'GR', venue: 'Scorpios', artistSlug: 'after-papi', status: 'holding' },
  { id: 's4', date: '2026-08-09', city: 'Berlin', country: 'DE', venue: 'Watergate', artistSlug: 'mira-solace', status: 'confirmed' },
  { id: 's5', date: '2026-08-16', city: 'Lisbon', country: 'PT', venue: 'Lux Frágil', artistSlug: 'lunaria', status: 'confirmed' },
  { id: 's6', date: '2026-08-23', city: 'Ibiza', country: 'ES', venue: 'Pacha (Terrace)', artistSlug: 'after-papi', status: 'sold' },
  { id: 's7', date: '2026-09-06', city: 'Amsterdam', country: 'NL', venue: 'Shelter', artistSlug: 'kavi', status: 'holding' },
  { id: 's8', date: '2026-09-13', city: 'Bodrum', country: 'TR', venue: 'Vine Garden', artistSlug: 'lunaria', status: 'confirmed' },
  { id: 's9', date: '2026-06-14', city: 'Athens', country: 'GR', venue: 'Lohan', artistSlug: 'mira-solace', status: 'past' },
];

export const venues: Venue[] = [
  { name: 'Scorpios', city: 'Mykonos' },
  { name: 'Watergate', city: 'Berlin' },
  { name: 'Lux Frágil', city: 'Lisbon' },
  { name: 'Pacha', city: 'Ibiza' },
  { name: 'Zorlu PSM', city: 'İstanbul' },
  { name: 'Shelter', city: 'Amsterdam' },
  { name: 'Kıyı Open Air', city: 'İzmir' },
  { name: 'Lohan', city: 'Athens' },
];

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
export function getArtist(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

export function upcomingShows(): Show[] {
  return shows
    .filter((s) => s.status !== 'past')
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function showsByArtist(slug: string): Show[] {
  return shows
    .filter((s) => s.artistSlug === slug && s.status !== 'past')
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function artistName(slug: string): string {
  return getArtist(slug)?.name ?? slug;
}

export function formatDate(iso: string, lang: 'en' | 'tr'): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
