import Link from 'next/link';
import type { Artist, Locale } from '../lib/types';
import Monogram from './Monogram';

export default function ArtistCard({ artist, lang }: { artist: Artist; lang: Locale }) {
  return (
    <Link href={`/${lang}/artists/${artist.slug}`} className="acard">
      <div className="acard-top">
        <Monogram name={artist.name} accent={artist.accent} size={56} />
        {artist.flagship && <span className="flag">Flagship</span>}
      </div>
      <h3>{artist.name}</h3>
      <p className="acard-tag">{artist.tagline[lang]}</p>
      <div className="acard-genres">
        {artist.genres.map((g) => (
          <span key={g} className="tag">
            {g}
          </span>
        ))}
      </div>
      <span className="acard-go">{artist.basedIn} →</span>
    </Link>
  );
}
