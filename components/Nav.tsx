'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { getDict, isLocale, defaultLocale } from '../lib/i18n';
import type { Locale } from '../lib/types';
import { brand } from '../lib/content';
import LangToggle from './LangToggle';

export default function Nav() {
  const pathname = usePathname() || '/';
  const seg = pathname.split('/')[1];
  const lang: Locale = isLocale(seg) ? seg : defaultLocale;
  const d = getDict(lang);
  const [open, setOpen] = useState(false);
  const base = `/${lang}`;
  const links = [
    { href: `${base}/roster`, label: d.nav.roster },
    { href: `${base}/dates`, label: d.nav.dates },
    { href: `${base}/about`, label: d.nav.about },
  ];
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href={base} className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">{brand.name}</span>
        </Link>
        <button
          className={`nav-burger ${open ? 'x' : ''}`}
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(l.href) ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <LangToggle lang={lang} />
          <Link href={`${base}/book`} className="btn btn-gold btn-sm" onClick={() => setOpen(false)}>
            {d.nav.book}
          </Link>
        </nav>
      </div>
    </header>
  );
}
