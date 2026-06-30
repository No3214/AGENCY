import Link from 'next/link';
import type { Locale, Show } from '../lib/types';
import { getDict } from '../lib/i18n';
import { artistName, formatDate } from '../lib/content';

export default function DatesBoard({ shows, lang }: { shows: Show[]; lang: Locale }) {
  const d = getDict(lang);
  if (!shows.length) return <p className="muted">{d.board.empty}</p>;
  return (
    <div className="board">
      <div className="board-head">
        <span>{d.board.date}</span>
        <span>{d.board.city}</span>
        <span>{d.board.artist}</span>
        <span className="hide-sm">{d.board.venue}</span>
        <span>{d.board.status}</span>
      </div>
      {shows.map((s) => (
        <div className="board-row" key={s.id}>
          <span className="b-date">{formatDate(s.date, lang)}</span>
          <span className="b-city">
            {s.city}
            <em>{s.country}</em>
          </span>
          <span className="b-artist">
            <Link href={`/${lang}/artists/${s.artistSlug}`}>{artistName(s.artistSlug)}</Link>
          </span>
          <span className="b-venue hide-sm">{s.venue}</span>
          <span className={`b-status st-${s.status}`}>{d.status[s.status]}</span>
        </div>
      ))}
    </div>
  );
}
