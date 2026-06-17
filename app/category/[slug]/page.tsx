import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CatalogLandingPage } from '@/components/catalog/CatalogLandingPage';
import { CATALOG_CATEGORIES, getCategoryBySlug, selectProductsByPredicate } from '@/lib/catalog';

export function generateStaticParams() {
  return CATALOG_CATEGORIES.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};

  return {
    title: `${category.label} | Keyvan Rice`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  return <CatalogLandingPage facet={category} products={selectProductsByPredicate(category.match)} />;
}
