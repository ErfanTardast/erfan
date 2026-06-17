# Catalog Foundation

Milestone B starts moving product discovery into typed catalog boundaries while keeping the current UI stable.

## Current boundary

- `lib/products.ts` remains the source of product records for existing UI.
- `lib/catalog/facets.ts` defines public discovery facets:
  - categories: rice type pages under `/category/[slug]`
  - brand lines: Keyvan merchandising lines under `/brand/[slug]`
  - use cases: shopper intent pages under `/use-case/[slug]`
  - collections: existing homepage/shop collection chips
- `lib/catalog/selectors.ts` owns product filtering and sorting.
- `lib/catalog/search.ts` prepares a local search index contract that can later map to Meilisearch or OpenSearch.
- `lib/catalog/structured-data.ts` owns Product and Breadcrumb JSON-LD helpers.

## Migration rule

New catalog work should import from `lib/catalog` first. Existing components can continue to import `lib/products.ts` until their behavior is intentionally migrated.

## Next steps

- Move raw product records into a normalized catalog data module.
- Add category and use-case copy that is written for real SEO pages, not placeholder text.
- Add Product and Breadcrumb structured data validation in CI.
- Add URL-driven shop filters so catalog landing CTAs can preselect filters reliably.
