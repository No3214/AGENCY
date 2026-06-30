import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { locales, isLocale } from '../../lib/i18n';
import type { Locale } from '../../lib/types';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer lang={lang as Locale} />
    </>
  );
}
