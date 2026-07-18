import { MetadataRoute } from 'next';

import { categorySlugs } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://keshavphotography.com';
  
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/booking`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/usa-dubai`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
  ];

  const dynamicCategoryRoutes: MetadataRoute.Sitemap = Object.keys(categorySlugs).map((slug) => ({
    url: `${baseUrl}/gallery/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicCategoryRoutes];
}
