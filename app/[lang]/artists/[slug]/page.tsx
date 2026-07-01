import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getDict, locales } from '../../../../lib/i18n';
import type { Locale } from '../../../../lib/types';
import { artists, getArtist, showsByArtist } from '../../../../lib/content';
import { musicGroupLd, musicEventLd } from '../../../../lib/seo';
import Monogram from '../../../../components/Monogram';
import MixCard from '../../../../components/MixCard';
import DatesBoard from '../../../../components/DatesBoard';
import Reveal from '../../../../components/Reveal';
import JsonLd from '../../../../components/JsonLd';

export function generateStaticParams() {
  return locales.flatMap((lang) => artists.map((a) => ({ lang, slug: a.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const a = getArtist(slug);
  if (!a) return {};
  return { title: a.name, description: a.tagline[lang as Locale] };
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  const lang = raw as Locale;
  const d = getDict(lang);
  const a = getArtist(slug);
  if (!a) notFound();
  const dates = showsByArtist(slug);
  const base = `/${lang}`;
  const ld = [musicGroupLd(a, lang), ...dates.map((s) => musicEventLd(s, lang))];

  return (
    <>
      <JsonLd data={ld} />
      <section
        className="epk-hero"
        style={{
          backgroundImage: `radial-gradient(1100px 380px at 18% -20%, ${a.accent[0]}33, transparent 70%)`,
        }}
      >
        <div className="container epk-hero-inner">
          <Link href={`${base}/roster`} className="back">
            ← {d.artist.back}
          </Link>
          <div className="epk-id">
            <Monogram name={a.name} accent={a.accent} size={104} />
            <div>
              {a.flagship && <span className="flag">Flagship</span>}
              <h1>{a.name}</h1>
              <p className="epk-tag">{a.tagline[lang]}</p>
              <div className="epk-genres">
                {a.genres.map((g) => (
                  <span key={g} className="tag">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="epk-actions">
            <Link href={`${base}/book?artist=${encodeURIComponent(a.name)}`} className="btn btn-gold">
              {d.artist.book}
            </Link>
            {a.socials.soundcloud && (
              <a className="btn btn-ghost" href={a.socials.soundcloud} target="_blank" rel="noopener noreferrer">
                SoundCloud
              </a>
            )}
            {a.socials.spotify && (
              <a className="btn btn-ghost" href={a.socials.spotify} target="_blank" rel="noopener noreferrer">
                Spotify
              </a>
            )}
            {a.socials.instagram && (
              <a className="btn btn-ghost" href={a.socials.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container epk-grid">
          <div className="epk-main">
            <Reveal>
              <h2 className="block-h">{d.artist.bio}</h2>
              <p className="epk-bio">{a.bio[lang]}</p>
            </Reveal>

            {a.videoUrl && (
              <Reveal delay={60}>
                <h2 className="block-h">{d.artist.watch}</h2>
                <div className="epk-video">
                  <iframe src={a.videoUrl} title={`${a.name} — live`} loading="lazy" allowFullScreen />
                </div>
              </Reveal>
            )}

            <Reveal delay={80}>
              <h2 className="block-h">{d.artist.mixes}</h2>
              <div className="mix-grid">
                {a.mixes.map((m, i) => (
                  <MixCard key={i} mix={m} />
                ))}
              </div>
            </Reveal>

            {a.pressQuotes && a.pressQuotes.length > 0 && (
              <Reveal delay={100}>
                <h2 className="block-h">{d.artist.press}</h2>
                <div className="press-grid">
                  {a.pressQuotes.map((q, i) => (
                    <blockquote key={i} className="press-quote">
                      “{q.quote}”<cite>— {q.source}</cite>
                    </blockquote>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <aside className="epk-side">
            <div className="epk-fact">
              <span>{d.artist.based}</span>
              <strong>{a.basedIn}</strong>
            </div>
            <div className="epk-fact">
              <span>{d.artist.genres}</span>
              <strong>{a.genres.join(', ')}</strong>
            </div>
            {a.setFormats && a.setFormats.length > 0 && (
              <div className="epk-fact">
                <span>{d.artist.formats}</span>
                <strong>{a.setFormats.join(', ')}</strong>
              </div>
            )}
            {a.riderUrl && (
              <a className="epk-rider" href={a.riderUrl} target="_blank" rel="noopener noreferrer">
                {d.artist.rider} ↓
              </a>
            )}
            <Link href={`${base}/book?artist=${encodeURIComponent(a.name)}`} className="btn btn-gold full-btn">
              {d.artist.book}
            </Link>
          </aside>
        </div>
      </section>

      {dates.length > 0 && (
        <section className="section alt">
          <div className="container">
            <Reveal>
              <h2 className="block-h">{d.artist.dates}</h2>
              <DatesBoard shows={dates} lang={lang} />
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
