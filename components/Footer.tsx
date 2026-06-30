import Link from 'next/link';
import { getDict } from '../lib/i18n';
import type { Locale } from '../lib/types';
import { brand } from '../lib/content';

export default function Footer({ lang }: { lang: Locale }) {
  const d = getDict(lang);
  const base = `/${lang}`;
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="brand-mark lg">{brand.name}</div>
          <p>{d.footer.tag}</p>
        </div>
        <div className="footer-cols">
          <div>
            <h4>{d.nav.roster}</h4>
            <Link href={`${base}/roster`}>{d.nav.roster}</Link>
            <Link href={`${base}/dates`}>{d.nav.dates}</Link>
            <Link href={`${base}/about`}>{d.nav.about}</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <Link href={`${base}/book`}>{d.nav.book}</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {year} {brand.name}. {d.footer.rights}
        </span>
        <span>
          {d.footer.built} · {brand.baseCity}
        </span>
      </div>
    </footer>
  );
}
