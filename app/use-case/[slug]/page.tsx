import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CatalogLandingPage } from '@/components/catalog/CatalogLandingPage';
import { CATALOG_USE_CASES, getUseCaseBySlug, selectProductsByPredicate } from '@/lib/catalog';

export function generateStaticParams() {
  return CATALOG_USE_CASES.map((useCase) => ({ slug: useCase.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const useCase = getUseCaseBySlug(params.slug);
  if (!useCase) return {};

  return {
    title: `${useCase.label} | Keyvan Rice`,
    description: useCase.description,
  };
}

export default function UseCasePage({ params }: { params: { slug: string } }) {
  const useCase = getUseCaseBySlug(params.slug);
  if (!useCase) notFound();

  return <CatalogLandingPage facet={useCase} products={selectProductsByPredicate(useCase.match)} />;
}
