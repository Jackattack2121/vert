import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

const baseUrl = 'https://vertcapital.com.au';

// All public routes that should be in the sitemap
const routes = [
  '',
  '/about',
  '/services',
  '/companies',
  '/sponsorships',
  '/news',
  '/contact',
];

// Priority mapping for different page types
const getPriority = (path: string): number => {
  if (path === '') return 1.0;
  if (path === '/about') return 0.9;
  if (path === '/services') return 0.9;
  if (path === '/companies') return 0.8;
  return 0.6;
};

// Change frequency mapping
const getChangeFrequency = (path: string): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' => {
  if (path === '/news') return 'daily';
  if (path === '') return 'weekly';
  return 'monthly';
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale and route combination
  locales.forEach((locale) => {
    routes.forEach((route) => {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: getChangeFrequency(route),
        priority: getPriority(route),
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${route}`])
          ),
        },
      });
    });
  });

  return entries;
}
