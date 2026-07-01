import { describe, it, expect, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

vi.mock('next/navigation', () => ({ usePathname: () => '/en' }));
vi.mock('next/link', () => ({
  default: ({ href, children }: any) => <a href={typeof href === 'string' ? href : '#'}>{children}</a>,
}));

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import LangToggle from '../components/LangToggle';
import Marquee from '../components/Marquee';
import Reveal from '../components/Reveal';
import BookingForm from '../components/BookingForm';

describe('Nav', () => {
  it('renders the brand, primary links and a book CTA', () => {
    const h = renderToStaticMarkup(<Nav />);
    expect(h).toContain('AFTERHOUSE');
    expect(h).toContain('href="/en/roster"');
    expect(h).toContain('href="/en/dates"');
    expect(h).toContain('href="/en/about"');
    expect(h).toContain('href="/en/book"');
  });
  it('offers a switch to Turkish', () => {
    const h = renderToStaticMarkup(<Nav />);
    expect(h).toContain('href="/tr"');
  });
});

describe('LangToggle', () => {
  it('links to both locales', () => {
    const h = renderToStaticMarkup(<LangToggle lang="en" />);
    expect(h).toContain('EN');
    expect(h).toContain('TR');
    expect(h).toContain('href="/tr"');
  });
});

describe('Footer', () => {
  it('renders contact email and locale-aware links (tr)', () => {
    const h = renderToStaticMarkup(<Footer lang="tr" />);
    expect(h).toContain('bookings@afterhouse.agency');
    expect(h).toContain('href="/tr/roster"');
    expect(h).toContain('Kadro');
  });
});

describe('Marquee', () => {
  it('duplicates items for a seamless loop', () => {
    const h = renderToStaticMarkup(<Marquee items={['Alpha', 'Beta']} />);
    expect((h.match(/marquee-item/g) || []).length).toBe(4);
  });
  it('applies the gold modifier', () => {
    const h = renderToStaticMarkup(<Marquee items={['X']} gold />);
    expect(h).toContain('marquee gold');
  });
});

describe('Reveal', () => {
  it('renders children with the reveal wrapper', () => {
    const h = renderToStaticMarkup(
      <Reveal>
        <span>hello reveal</span>
      </Reveal>
    );
    expect(h).toContain('hello reveal');
    expect(h).toContain('reveal');
  });
});

describe('BookingForm', () => {
  it('includes the honeypot, timestamp and core fields (en)', () => {
    const h = renderToStaticMarkup(<BookingForm lang="en" />);
    expect(h).toContain('name="company_website"');
    expect(h).toContain('name="_ts"');
    expect(h).toContain('name="email"');
    expect(h).toContain('name="message"');
    expect(h).toContain('Send inquiry');
  });
  it('offers the roster in the artist selector', () => {
    const h = renderToStaticMarkup(<BookingForm lang="en" preset="After Papi" />);
    expect(h).toContain('After Papi');
  });
  it('renders Turkish labels for tr', () => {
    const h = renderToStaticMarkup(<BookingForm lang="tr" />);
    expect(h).toContain('Talebi gönder');
  });
});
