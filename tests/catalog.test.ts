import { describe, expect, it } from 'vitest';
import { PRODUCTS } from '@/lib/products';
import {
  CATALOG_CATEGORIES,
  buildCatalogSearchIndex,
  countProductsByPredicate,
  productJsonLd,
  searchCatalog,
  selectProducts,
} from '@/lib/catalog';

describe('catalog foundation', () => {
  it('maps category facets to real products', () => {
    for (const category of CATALOG_CATEGORIES) {
      expect(countProductsByPredicate(category.match)).toBeGreaterThan(0);
    }
  });

  it('filters and sorts products through the catalog selector', () => {
    const products = selectProducts({ types: ['tarom'], premium: true }, 'price-desc');

    expect(products.length).toBeGreaterThan(0);
    expect(products.every((product) => product.type === 'tarom' && product.premium)).toBe(true);
    expect(products[0].price).toBeGreaterThanOrEqual(products[products.length - 1].price);
  });

  it('builds a deterministic local search index', () => {
    const index = buildCatalogSearchIndex(PRODUCTS);
    const result = searchCatalog(index, 'tarom');

    expect(index).toHaveLength(PRODUCTS.length);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('slug');
  });

  it('creates Product JSON-LD with commerce fields', () => {
    const product = PRODUCTS[0];
    const jsonLd = productJsonLd(product);

    expect(jsonLd['@type']).toBe('Product');
    expect(jsonLd.offers.priceCurrency).toBe('IRR');
    expect(jsonLd.offers.url).toContain(`/product/${product.slug}`);
  });
});
