/**
 * CMS data-access layer.
 *
 * When USE_CMS !== 'true' (default, incl. production today) every getter returns
 * the static content from lib/content.ts — identical behaviour, zero DB needed.
 * When USE_CMS === 'true' the same getters read from Payload via the Local API.
 * Pages can migrate to these async getters with no shape changes; see docs/PAYLOAD.md.
 */
import type { Artist, Show, Venue } from './types';
import * as staticContent from './content';

const USE_CMS = process.env.USE_CMS === 'true';

async function client() {
  const { getPayload } = await import('payload');
  const configModule = await import('../payload.config');
  return getPayload({ config: configModule.default });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapArtist(d: any): Artist {
  return {
    slug: d.slug,
    name: d.name,
    flagship: !!d.flagship,
    tagline: { en: d.taglineEn ?? '', tr: d.taglineTr ?? '' },
    bio: { en: d.bioEn ?? '', tr: d.bioTr ?? '' },
    genres: d.genres ?? [],
    basedIn: d.basedIn ?? '',
    accent: [d.accentA ?? '#E8B04B', d.accentB ?? '#C8881F'],
    socials: d.socials ?? {},
    setFormats: d.setFormats ?? undefined,
    mixes: (d.mixes ?? []).map((m: any) => ({
      title: m.title,
      platform: m.platform,
      url: m.url ?? '',
      embedUrl: m.embedUrl || undefined,
      duration: m.duration || undefined,
      genre: m.genre || undefined,
    })),
  };
}
function mapShow(d: any): Show {
  return {
    id: d.sid,
    date: d.date,
    city: d.city,
    country: d.country,
    venue: d.venue,
    artistSlug: d.artistSlug,
    status: d.status,
    ticketUrl: d.ticketUrl || undefined,
  };
}
function mapVenue(d: any): Venue {
  return { name: d.name, city: d.city };
}

export async function getArtists(): Promise<Artist[]> {
  if (!USE_CMS) return staticContent.artists;
  const p = await client();
  const r = await p.find({ collection: 'artists', limit: 200, sort: 'name' });
  return r.docs.map(mapArtist);
}
export async function getArtist(slug: string): Promise<Artist | undefined> {
  if (!USE_CMS) return staticContent.getArtist(slug);
  const p = await client();
  const r = await p.find({ collection: 'artists', where: { slug: { equals: slug } }, limit: 1 });
  return r.docs[0] ? mapArtist(r.docs[0]) : undefined;
}
export async function getShows(): Promise<Show[]> {
  if (!USE_CMS) return staticContent.shows;
  const p = await client();
  const r = await p.find({ collection: 'shows', limit: 500 });
  return r.docs.map(mapShow);
}
export async function getVenues(): Promise<Venue[]> {
  if (!USE_CMS) return staticContent.venues;
  const p = await client();
  const r = await p.find({ collection: 'venues', limit: 200 });
  return r.docs.map(mapVenue);
}
export async function getUpcomingShows(): Promise<Show[]> {
  return (await getShows()).filter((s) => s.status !== 'past').sort((a, b) => a.date.localeCompare(b.date));
}
export async function getShowsByArtist(slug: string): Promise<Show[]> {
  return (await getShows())
    .filter((s) => s.artistSlug === slug && s.status !== 'past')
    .sort((a, b) => a.date.localeCompare(b.date));
}
