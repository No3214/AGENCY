'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, isLocale } from '../lib/i18n';
import type { Locale } from '../lib/types';

export default function LangToggle({ lang }: { lang: Locale }) {
  const pathname = usePathname() || '/';
  const parts = pathname.split('/');
  const swap = (to: Locale) => {
    const p = [...parts];
    if (isLocale(p[1])) p[1] = to;
    else p.splice(1, 0, to);
    const href = p.join('/');
    return href.startsWith('/') ? href : `/${to}`;
  };
  return (
    <span className="langtoggle">
      {locales.map((l, i) => (
        <span key={l}>
          {i > 0 && <span className="sep">/</span>}
          <Link href={swap(l)} className={l === lang ? 'on' : ''}>
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </span>
  );
}
