'use client';
import { useFilters } from '@/lib/store/filters';
import {
  RICE_TYPE_LABELS,
  REGION_LABELS,
  AROMA_LABELS,
  GRAIN_LABELS,
  type RiceType,
  type Region,
  type Aroma,
  type GrainLength,
} from '@/lib/products';
import { toFa } from '@/lib/format';

type Chip = { key: string; label: string; onRemove: () => void };

export function ActiveFilters() {
  const f = useFilters();
  const chips: Chip[] = [];

  f.types.forEach((t) =>
    chips.push({ key: 't-' + t, label: RICE_TYPE_LABELS[t as RiceType], onRemove: () => f.toggleType(t as RiceType) })
  );
  f.regions.forEach((r) =>
    chips.push({ key: 'r-' + r, label: REGION_LABELS[r as Region], onRemove: () => f.toggleRegion(r as Region) })
  );
  f.aromas.forEach((a) =>
    chips.push({ key: 'a-' + a, label: AROMA_LABELS[a as Aroma], onRemove: () => f.toggleAroma(a as Aroma) })
  );
  f.grains.forEach((g) =>
    chips.push({ key: 'g-' + g, label: GRAIN_LABELS[g as GrainLength], onRemove: () => f.toggleGrain(g as GrainLength) })
  );
  f.weights.forEach((w) =>
    chips.push({ key: 'w-' + w, label: `${toFa(w)} کیلوگرم`, onRemove: () => f.toggleWeight(w) })
  );
  if (f.organic) chips.push({ key: 'org', label: 'ارگانیک', onRemove: () => f.setOrganic(false) });
  if (f.premium) chips.push({ key: 'prem', label: 'ممتاز', onRemove: () => f.setPremium(false) });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {chips.map((c) => (
        <button
          key={c.key}
          onClick={c.onRemove}
          className="inline-flex items-center gap-1.5 border border-line px-3 py-1.5 text-[11px] hover:border-olive transition-colors"
        >
          {c.label}
          <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-line text-[9px] leading-none">
            ×
          </span>
        </button>
      ))}
    </div>
  );
}
