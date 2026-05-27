'use client';
import { useFilters } from '@/lib/store/filters';
import { MobileFilterBar } from './MobileFilterBar';

export function MobileFilterBarWrapper() {
  const f = useFilters();
  const activeCount =
    f.types.size + f.regions.size + f.aromas.size + f.grains.size + f.weights.size + (f.organic ? 1 : 0) + (f.premium ? 1 : 0);
  return <MobileFilterBar activeCount={activeCount} />;
}
