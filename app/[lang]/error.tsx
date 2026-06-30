'use client';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="section page-top">
      <div className="container narrow" style={{ textAlign: 'center' }}>
        <h1 className="page-title">Something went wrong</h1>
        <p className="sec-sub">An unexpected error occurred. Please try again.</p>
        <button className="btn btn-gold" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </section>
  );
}
