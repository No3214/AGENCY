import type { Metadata } from 'next';
import { getDict } from '../../../lib/i18n';
import type { Locale } from '../../../lib/types';
import { upcomingShows } from '../../../lib/content';
import DatesBoard from '../../../components/DatesBoard';
import Reveal from '../../../components/Reveal';

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
  return (
    <section className="section page-top">
      <div className="container">
        <Reveal>
          <h1 className="page-title">{d.sections.next}</h1>
          <p className="sec-sub">{d.sections.nextSub}</p>
        </Reveal>
        <Reveal delay={80}>
          <DatesBoard shows={upcomingShows()} lang={lang} />
        </Reveal>
      </div>
    </section>
  );
}
