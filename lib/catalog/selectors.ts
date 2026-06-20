import { PRODUCTS, type Aroma, type GrainLength, type Product, type Region, type RiceType } from '@/lib/products';

export type CatalogSortKey = 'featured' | 'newest' | 'price-asc' | 'price-desc';

export type CatalogFilterInput = {
  types?: Set<RiceType> | RiceType[];
  regions?: Set<Region> | Region[];
  aromas?: Set<Aroma> | Aroma[];
  grains?: Set<GrainLength> | GrainLength[];
  weights?: Set<Product['weightKg']> | Product['weightKg'][];
  priceMin?: number;
  priceMax?: number;
  organic?: boolean;
  premium?: boolean;
  inStockOnly?: boolean;
  search?: string;
};

const hasValue = <T>(values: Set<T> | T[] | undefined, value: T) => {
  if (!values) return false;
  return Array.isArray(values) ? values.includes(value) : values.has(value);
};

const hasAny = <T>(values: Set<T> | T[] | undefined) => {
  if (!values) return false;
  return Array.isArray(values) ? values.length > 0 : values.size > 0;
};

export function filterProducts(products: Product[], filters: CatalogFilterInput = {}): Product[] {
  return products.filter((product) => {
    if (hasAny(filters.types) && !hasValue(filters.types, product.type)) return false;
    if (hasAny(filters.regions) && !hasValue(filters.regions, product.region)) return false;
    if (hasAny(filters.aromas) && !hasValue(filters.aromas, product.aroma)) return false;
    if (hasAny(filters.grains) && !hasValue(filters.grains, product.grain)) return false;
    if (hasAny(filters.weights) && !hasValue(filters.weights, product.weightKg)) return false;
    if (filters.priceMin !== undefined && product.price < filters.priceMin) return false;
    if (filters.priceMax !== undefined && product.price > filters.priceMax) return false;
    if (filters.organic && !product.organic) return false;
    if (filters.premium && !product.premium) return false;
    if (filters.inStockOnly && !product.inStock) return false;

    const query = filters.search?.trim().toLowerCase();
    if (query) {
      const haystack = [
        product.title,
        product.kicker,
        product.shortNote,
        product.copy,
        product.slug,
        product.type,
        product.region,
      ].join(' ').toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    return true;
  });
}

export function sortProducts(products: Product[], sort: CatalogSortKey = 'featured'): Product[] {
  const copy = [...products];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'newest':
      return copy.sort((a, b) => Number(b.isNew || 0) - Number(a.isNew || 0));
    case 'featured':
    default:
      return copy.sort((a, b) => Number(b.isFeatured || 0) - Number(a.isFeatured || 0));
  }
}

export function selectProducts(filters: CatalogFilterInput = {}, sort: CatalogSortKey = 'featured') {
  return sortProducts(filterProducts(PRODUCTS, filters), sort);
}

export function selectProductsByPredicate(predicate: (product: Product) => boolean) {
  return PRODUCTS.filter(predicate);
}

export function countProductsByPredicate(predicate: (product: Product) => boolean) {
  return selectProductsByPredicate(predicate).length;
}
