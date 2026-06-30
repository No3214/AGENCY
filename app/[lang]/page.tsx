import Link from 'next/link';
import type { Metadata } from 'next';
import { getDict } from '../../lib/i18n';
import type { Locale } from '../../lib/types';
import { artists, upcomingShows, venues, getArtist, brand } from '../../lib/content';
import DatesBoard from '../../components/DatesBoard';
import ArtistCard from '../../components/ArtistCard';
import MixCard from '../../components/MixCard';
import Marquee from '../../components/Marquee';
import Reveal from '../../components/Reveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDict(lang as Locale);
  return {
    title: d.meta.home,
    description: d.meta.homeDesc,
    alternates: { languages: { en: '/en', tr: '/tr' } },
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = raw as Locale;
  const d = getDict(lang);
  const base = `/${lang}`;
  const shows = upcomingShows().slice(0, 6);
  const roster = artists.slice(0, 3);
  const flag = getArtist('after-papi') ?? artists[0];
  const genres = ['Afro House', 'Melodic House', 'Techno', 'Organic House', 'Progressive', 'Deep'];

  return (
    <>
      <section className="hero">
        <div className="hero-glow" />
        <div className="container hero-inner">
          <p className="kicker">{d.hero.kicker}</p>
          <h1 className="hero-title">{brand.name}</h1>
          <p className="hero-sub">{d.hero.sub}</p>
          <div className="hero-cta">
            <Link href={`${base}/book`} className="btn btn-gold">
              {d.cta.book}
            </Link>
            <Link href={`${base}/roster`} className="btn btn-ghost">
              {d.cta.roster}
            </Link>
          </div>
        </div>
        <Marquee items={genres} gold />
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <h2>{d.sections.next}</h2>
              <Link className="sec-link" href={`${base}/dates`}>
                {d.nav.dates} →
              </Link>
            </div>
            <p className="sec-sub">{d.sections.nextSub}</p>
          </Reveal>
          <Reveal delay={80}>
            <DatesBoard shows={shows} lang={lang} />
          </Reveal>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <h2>{d.sections.roster}</h2>
              <Link className="sec-link" href={`${base}/roster`}>
                {d.nav.roster} →
              </Link>
            </div>
            <p className="sec-sub">{d.sections.rosterSub}</p>
          </Reveal>
          <div className="acard-grid">
            {roster.map((a, i) => (
              <Reveal key={a.slug} delay={i * 70}>
                <ArtistCard artist={a} lang={lang} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <h2>{d.sections.sound}</h2>
              <Link className="sec-link" href={`${base}/artists/${flag.slug}`}>
                {flag.name} →
              </Link>
            </div>
            <p className="sec-sub">{d.sections.soundSub}</p>
          </Reveal>
          <div className="mix-grid">
            {flag.mixes.map((m, i) => (
              <Reveal key={i} delay={i * 60}>
                <MixCard mix={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="venues">
        <div className="container">
          <p className="venues-label">{d.sections.venues}</p>
        </div>
        <Marquee items={venues.map((v) => `${v.name} — ${v.city}`)} />
      </section>

      <section className="bandcta">
        <div className="container bandcta-inner">
          <Reveal>
            <h2>{d.sections.bookband}</h2>
            <p>{d.sections.bookbandSub}</p>
            <Link href={`${base}/book`} className="btn btn-gold btn-lg">
              {d.cta.book}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
