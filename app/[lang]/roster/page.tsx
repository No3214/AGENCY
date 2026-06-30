import type { Metadata } from 'next';
import { getDict } from '../../../lib/i18n';
import type { Locale } from '../../../lib/types';
import { artists } from '../../../lib/content';
import ArtistCard from '../../../components/ArtistCard';
import Reveal from '../../../components/Reveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang as Locale).nav.roster };
}

export default async function RosterPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = raw as Locale;
  const d = getDict(lang);
  return (
    <section className="section page-top">
      <div className="container">
        <Reveal>
          <h1 className="page-title">{d.sections.roster}</h1>
          <p className="sec-sub">{d.sections.rosterSub}</p>
        </Reveal>
        <div className="acard-grid">
          {artists.map((a, i) => (
            <Reveal key={a.slug} delay={i * 60}>
              <ArtistCard artist={a} lang={lang} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
