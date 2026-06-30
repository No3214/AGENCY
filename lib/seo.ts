import { brand } from './content';

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    url: siteUrl(),
    email: brand.email,
    areaServed: 'Worldwide',
    description: 'Boutique DJ booking and event studio for Afro house, melodic house and techno.',
    sameAs: [brand.instagram].filter(Boolean),
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: brand.name,
    url: siteUrl(),
    inLanguage: ['en', 'tr'],
  };
}
