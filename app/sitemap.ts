import type { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/products';
import { CATALOG_BRANDS, CATALOG_CATEGORIES, CATALOG_USE_CASES } from '@/lib/catalog';

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

const catalogRoutes = [
  ...CATALOG_CATEGORIES.map((category) => `/category/${category.slug}`),
  ...CATALOG_BRANDS.map((brand) => `/brand/${brand.slug}`),
  ...CATALOG_USE_CASES.map((useCase) => `/use-case/${useCase.slug}`),
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
    ...catalogRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
    ...PRODUCTS.map((product) => ({
      url: `${siteUrl}/product/${product.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
