import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://omerudigital.com';
  
  const routes = [
    '',
    '/about',
    '/work',
    '/contact',
    '/services',
    '/blog',
  ];

  const sitemap: MetadataRoute.Sitemap = routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  return sitemap;
} 