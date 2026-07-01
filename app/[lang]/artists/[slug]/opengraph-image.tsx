import { ImageResponse } from 'next/og';
import { getArtist } from '../../../../lib/content';

export const alt = 'AFTERHOUSE artist';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function ArtistOG({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { slug } = await params;
  const a = getArtist(slug);
  const name = a?.name ?? 'AFTERHOUSE';
  const tag = a?.tagline.en ?? 'Boutique DJ booking & events';
  const genres = a?.genres.join('  ·  ') ?? '';
  const accentA = a?.accent[0] ?? '#e8b04b';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0b0b0d',
          color: '#f4f1ea',
          padding: 72,
          backgroundImage: `radial-gradient(900px 460px at 15% -10%, ${accentA}44, transparent 70%)`,
        }}
      >
        <div style={{ display: 'flex', color: '#e8b04b', fontSize: 26, letterSpacing: 4 }}>AFTERHOUSE — ARTIST</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 116, fontWeight: 800, letterSpacing: 1, lineHeight: 1 }}>{name}</div>
          <div style={{ display: 'flex', fontSize: 32, color: '#a7a8b2', marginTop: 22, maxWidth: 960 }}>{tag}</div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#e8b04b' }}>{genres}</div>
      </div>
    ),
    { ...size }
  );
}
