import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { organizationLd, websiteLd, siteUrl } from '../lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: 'AFTERHOUSE — Boutique DJ booking & events',
    template: '%s · AFTERHOUSE',
  },
  description:
    'Boutique booking and event studio for Afro house, melodic house and techno. Book artists worldwide.',
  applicationName: 'AFTERHOUSE',
  openGraph: {
    type: 'website',
    siteName: 'AFTERHOUSE',
    title: 'AFTERHOUSE — Boutique DJ booking & events',
    description: 'Boutique booking and event studio. Book artists worldwide.',
  },
  twitter: { card: 'summary_large_image', title: 'AFTERHOUSE', description: 'Boutique DJ booking & events.' },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
};

export const viewport = { themeColor: '#0b0b0d' };

export default function RootLayout({ children }: { children: ReactNode }) {
  const ld = [organizationLd(), websiteLd()];
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
