export type Locale = 'en' | 'tr';

export type Social = {
  instagram?: string;
  soundcloud?: string;
  spotify?: string;
  website?: string;
};

export type Mix = {
  title: string;
  platform: 'soundcloud' | 'spotify' | 'youtube';
  url: string;        // external link (always works)
  embedUrl?: string;  // optional: when set, an iframe player is rendered
  duration?: string;
  genre?: string;
};

export type Artist = {
  slug: string;
  name: string;
  flagship?: boolean;
  tagline: Record<Locale, string>;
  bio: Record<Locale, string>;
  genres: string[];
  basedIn: string;
  accent: [string, string]; // gradient stops for the monogram / hero
  socials: Social;
  mixes: Mix[];
  setFormats?: string[];
  pressQuotes?: { quote: string; source: string }[];
  videoUrl?: string;
  riderUrl?: string;
};

export type ShowStatus = 'confirmed' | 'holding' | 'limited' | 'sold' | 'past';

export type Show = {
  id: string;
  date: string;       // ISO yyyy-mm-dd
  city: string;
  country: string;
  venue: string;
  artistSlug: string;
  status: ShowStatus;
  ticketUrl?: string;
};

export type Venue = { name: string; city: string };
