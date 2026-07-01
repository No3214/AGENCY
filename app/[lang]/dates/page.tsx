import type { Metadata } from 'next';
import { getDict } from '../../../lib/i18n';
import type { Locale } from '../../../lib/types';
import { upcomingShows } from '../../../lib/content';
import { musicEventLd } from '../../../lib/seo';
import DatesBoard from '../../../components/DatesBoard';
import Reveal from '../../../components/Reveal';
import JsonLd from '../../../components/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang as Locale).nav.dates };
}

export default async function DatesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = raw as Locale;
  const d = getDict(lang);
  const shows = upcomingShows();
  return (
    <section className="section page-top">
      <div className="container">
        <JsonLd data={shows.map((s) => musicEventLd(s, lang))} />
        <Reveal>
          <h1 className="page-title">{d.sections.next}</h1>
          <p className="sec-sub">{d.sections.nextSub}</p>
        </Reveal>
        <Reveal delay={80}>
          <DatesBoard shows={shows} lang={lang} />
        </Reveal>
      </div>
    </section>
  );
}
