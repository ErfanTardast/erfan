import type { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/products';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://keyvanrice.ir';

const staticRoutes = [
  '',
  '/shop',
  '/about',
  '/recipes',
  '/contact',
  '/shipping',
  '/returns',
  '/faq',
  '/privacy',
  '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: route === '' || route === '/shop' ? 'weekly' as const : 'monthly' as const,
      priority: route === '' ? 1 : route === '/shop' ? 0.9 : 0.6,
    })),
    ...PRODUCTS.map((product) => ({
      url: `${siteUrl}/product/${product.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
