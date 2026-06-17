import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CatalogLandingPage } from '@/components/catalog/CatalogLandingPage';
import { CATALOG_BRANDS, getBrandBySlug, selectProductsByPredicate } from '@/lib/catalog';

export function generateStaticParams() {
  return CATALOG_BRANDS.map((brand) => ({ slug: brand.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const brand = getBrandBySlug(params.slug);
  if (!brand) return {};

  return {
    title: `${brand.label} | Keyvan Rice`,
    description: brand.description,
  };
}

export default function BrandPage({ params }: { params: { slug: string } }) {
  const brand = getBrandBySlug(params.slug);
  if (!brand) notFound();

  return <CatalogLandingPage facet={brand} products={selectProductsByPredicate(brand.match)} />;
}
