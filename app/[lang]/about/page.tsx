import type { Metadata } from 'next';
import { getDict } from '../../../lib/i18n';
import type { Locale } from '../../../lib/types';
import { artists, shows, venues } from '../../../lib/content';
import Reveal from '../../../components/Reveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang as Locale).nav.about };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = raw as Locale;
  const d = getDict(lang);
  const cities = new Set(shows.map((s) => s.city + s.country)).size;
  return (
    <section className="section page-top">
      <div className="container narrow">
        <Reveal>
          <h1 className="page-title">{d.about.title}</h1>
        </Reveal>
        <div className="prose">
          {d.about.body.map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div className="stats">
            <div className="stat">
              <strong>{shows.length}+</strong>
              <span>{d.about.statShows}</span>
            </div>
            <div className="stat">
              <strong>{cities}</strong>
              <span>{d.about.statCities}</span>
            </div>
            <div className="stat">
              <strong>{artists.length}</strong>
              <span>{d.about.statRoster}</span>
            </div>
            <div className="stat">
              <strong>{venues.length}</strong>
              <span>{d.sections.venues}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
