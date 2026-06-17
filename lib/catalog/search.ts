import type { Product } from '@/lib/products';

export type CatalogSearchRecord = {
  productId: string;
  slug: string;
  title: string;
  text: string;
  facets: {
    type: Product['type'];
    region: Product['region'];
    aroma: Product['aroma'];
    grain: Product['grain'];
    organic: boolean;
    premium: boolean;
    collection?: Product['collection'];
  };
};

export function buildCatalogSearchIndex(products: Product[]): CatalogSearchRecord[] {
  return products.map((product) => ({
    productId: product.id,
    slug: product.slug,
    title: product.title,
    text: [
      product.title,
      product.kicker,
      product.shortNote,
      product.copy,
      product.originStory,
      product.flavorNotes?.join(' '),
      product.pairings?.join(' '),
      product.type,
      product.region,
      product.collection,
    ].filter(Boolean).join(' ').toLowerCase(),
    facets: {
      type: product.type,
      region: product.region,
      aroma: product.aroma,
      grain: product.grain,
      organic: product.organic,
      premium: product.premium,
      collection: product.collection,
    },
  }));
}

export function searchCatalog(index: CatalogSearchRecord[], query: string, limit = 12) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return index
    .map((record) => {
      const exactTitle = record.title.toLowerCase().includes(normalized) ? 2 : 0;
      const textMatch = record.text.includes(normalized) ? 1 : 0;
      return { record, score: exactTitle + textMatch };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.record.title.localeCompare(b.record.title))
    .slice(0, limit)
    .map((result) => result.record);
}
