import { LOCATION_DATA } from '../data/locationHierarchy';
import { SAMPLE_PROFILES } from '../data/mockProfiles';
import { getAllPhotos } from './storageService';

export interface SitemapEntry {
  path: string;
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
  title: string;
  category: 'Home' | 'Country' | 'State' | 'City' | 'Profile' | 'Informational';
}

const DEFAULT_BASE_URL = 'https://topcallgirls.onrender.com';

/**
 * Returns list of all approved indexable public URLs for the directory
 * Excludes: /admin, login, private data, drafts, suspended profiles
 */
export function getIndexableSitemapEntries(baseUrl: string = DEFAULT_BASE_URL): SitemapEntry[] {
  const now = new Date().toISOString().split('T')[0];
  const entries: SitemapEntry[] = [];

  // 1. Root Directory Homepage
  entries.push({
    path: '/',
    url: `${baseUrl}/`,
    lastmod: now,
    changefreq: 'daily',
    priority: '1.0',
    title: 'Top Call Girls — Verified Adult Companions & Escorts',
    category: 'Home',
  });

  // 2. Location Silo Hierarchy: Country -> State -> City
  LOCATION_DATA.forEach((country) => {
    // Country Hub
    entries.push({
      path: `/${country.slug}/`,
      url: `${baseUrl}/${country.slug}/`,
      lastmod: now,
      changefreq: 'daily',
      priority: '0.9',
      title: `${country.name} Escorts & Verified Companions Directory`,
      category: 'Country',
    });

    country.states.forEach((state) => {
      // State Hub
      entries.push({
        path: `/${country.slug}/${state.slug}/`,
        url: `${baseUrl}/${country.slug}/${state.slug}/`,
        lastmod: now,
        changefreq: 'daily',
        priority: '0.8',
        title: `${state.name} Verified Companions Directory`,
        category: 'State',
      });

      state.cities.forEach((city) => {
        // Metropolitan City Hub (Primary Search Landing Page)
        entries.push({
          path: `/${country.slug}/${state.slug}/${city.slug}/`,
          url: `${baseUrl}/${country.slug}/${state.slug}/${city.slug}/`,
          lastmod: now,
          changefreq: 'daily',
          priority: '0.9',
          title: `${city.name}, ${city.stateCode} Escorts & Verified Companions`,
          category: 'City',
        });
      });
    });
  });

  // 3. Published Public Profiles (Strictly active & verified)
  SAMPLE_PROFILES.forEach((profile) => {
    entries.push({
      path: `/profiles/${profile.slug}`,
      url: `${baseUrl}/profiles/${profile.slug}`,
      lastmod: now,
      changefreq: 'weekly',
      priority: '0.7',
      title: `${profile.displayName} — Verified Companion in ${profile.city}, ${profile.state}`,
      category: 'Profile',
    });
  });

  return entries;
}

/**
 * Generates standard compliant XML sitemap format (sitemap.xml)
 */
export function generateSitemapXml(baseUrl: string = DEFAULT_BASE_URL): string {
  const entries = getIndexableSitemapEntries(baseUrl);

  const xmlItems = entries
    .map(
      (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`;
}

/**
 * Generates standard compliant robots.txt with search crawler directives
 */
export function generateRobotsTxt(baseUrl: string = DEFAULT_BASE_URL): string {
  return `# robots.txt for AURA Directory Platform
# Clean crawl architecture: index high-value regional hubs & verified public profiles
# Disallow administrative, moderation, authentication, and private backend pathways

User-agent: *

# Allow Public Content
Allow: /
Allow: /united-states/
Allow: /canada/
Allow: /profiles/

# Disallow Private & Administrative Endpoints
Disallow: /admin
Disallow: /admin/
Disallow: /admin/*
Disallow: /api/admin/
Disallow: /moderation/
Disallow: /audit-logs/
Disallow: /reports/new

# Crawl Delay to Prevent Server Overload
Crawl-delay: 1

# XML Sitemap Location
Sitemap: ${baseUrl}/sitemap.xml
`;
}
