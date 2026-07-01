import { ImageResponse } from 'next/og';

export const alt = 'AFTERHOUSE — Boutique DJ booking & events';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
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
          backgroundImage: 'radial-gradient(900px 420px at 50% 0%, rgba(232,176,75,0.22), transparent 70%)',
        }}
      >
        <div style={{ display: 'flex', color: '#e8b04b', fontSize: 28, letterSpacing: 4 }}>
          BOUTIQUE BOOKING &amp; EVENTS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 150, fontWeight: 800, letterSpacing: 2, lineHeight: 1 }}>
            AFTERHOUSE
          </div>
          <div style={{ display: 'flex', fontSize: 34, color: '#a7a8b2', marginTop: 22 }}>
            Afro / Melodic House · Techno — booked worldwide
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#74757f' }}>afterhouse.agency</div>
      </div>
    ),
    { ...size }
  );
}
