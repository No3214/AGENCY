import type { MetadataRoute } from 'next';
import { artists } from '../lib/content';
import { locales } from '../lib/i18n';
import { siteUrl } from '../lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const routes = ['', '/roster', '/dates', '/book', '/about'];
  const now = new Date();
  const out: MetadataRoute.Sitemap = [];
  for (const l of locales) {
    for (const r of routes) {
      out.push({ url: `${base}/${l}${r}`, lastModified: now, changeFrequency: 'weekly', priority: r === '' ? 1 : 0.7 });
    }
    for (const a of artists) {
      out.push({ url: `${base}/${l}/artists/${a.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 });
    }
  }
  return out;
}
