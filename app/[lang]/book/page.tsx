import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getDict } from '../../../lib/i18n';
import type { Locale } from '../../../lib/types';
import Reveal from '../../../components/Reveal';

// Split the interactive form into its own chunk (loaded only on this route).
const BookingForm = dynamic(() => import('../../../components/BookingForm'));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang as Locale).book.title };
}

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ artist?: string }>;
}) {
  const { lang: raw } = await params;
  const sp = await searchParams;
  const lang = raw as Locale;
  const d = getDict(lang);
  return (
    <section className="section page-top">
      <div className="container narrow">
        <Reveal>
          <h1 className="page-title">{d.book.title}</h1>
          <p className="sec-sub">{d.book.sub}</p>
        </Reveal>
        <Reveal delay={80}>
          <BookingForm lang={lang} preset={sp?.artist} />
        </Reveal>
      </div>
    </section>
  );
}
