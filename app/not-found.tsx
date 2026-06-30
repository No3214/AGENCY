import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: 40 }}>
      <div>
        <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: '5rem', margin: 0 }}>404</h1>
        <p style={{ color: '#a7a8b2', marginBottom: 20 }}>This page could not be found.</p>
        <Link href="/en" className="btn btn-gold">
          Back home
        </Link>
      </div>
    </main>
  );
}
