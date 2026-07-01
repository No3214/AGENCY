/**
 * Seed Payload from the static content in lib/content.ts.
 * Run:  npx payload run ./seed.ts   (after installing Payload deps + setting env)
 */
import { getPayload } from 'payload';
import config from './payload.config';
import { artists, shows, venues } from './lib/content';

async function seed() {
  const payload = await getPayload({ config });

  for (const v of venues) {
    await payload.create({ collection: 'venues', data: { name: v.name, city: v.city } });
  }
  for (const a of artists) {
    await payload.create({
      collection: 'artists',
      data: {
        slug: a.slug,
        name: a.name,
        flagship: !!a.flagship,
        taglineEn: a.tagline.en,
        taglineTr: a.tagline.tr,
        bioEn: a.bio.en,
        bioTr: a.bio.tr,
        genres: a.genres,
        basedIn: a.basedIn,
        accentA: a.accent[0],
        accentB: a.accent[1],
        setFormats: a.setFormats ?? [],
        socials: a.socials ?? {},
        mixes: (a.mixes ?? []).map((m) => ({
          title: m.title,
          platform: m.platform,
          url: m.url,
          embedUrl: m.embedUrl,
          duration: m.duration,
          genre: m.genre,
        })),
      },
    });
  }
  for (const s of shows) {
    await payload.create({
      collection: 'shows',
      data: {
        sid: s.id,
        date: s.date,
        city: s.city,
        country: s.country,
        venue: s.venue,
        artistSlug: s.artistSlug,
        status: s.status,
        ticketUrl: s.ticketUrl,
      },
    });
  }
  // eslint-disable-next-line no-console
  console.log(`Seeded ${venues.length} venues, ${artists.length} artists, ${shows.length} shows.`);
  process.exit(0);
}

seed();
