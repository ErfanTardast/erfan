'use client';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import {
  useFilters,
  PRICE_BOUNDS,
} from '@/lib/store/filters';
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

function Accordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-12 w-full items-center justify-between text-right"
      >
        <span className="text-[13px] font-medium">{title}</span>
        <Plus
          className="w-4 h-4 text-muted transition-transform duration-200"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0)' }}
        />
      </button>
      <div
        className="overflow-hidden transition-[max-height] duration-300"
        style={{ maxHeight: open ? 500 : 0 }}
      >
        <div className="pb-5">{children}</div>
      </div>
    </div>
  );
}

function Check({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex min-h-10 cursor-pointer items-center gap-2.5 py-1 transition-colors hover:text-ink">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-cypress" />
      <span>{label}</span>
    </label>
  );
}

export function FilterSidebar() {
  const f = useFilters();

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[98px]">
        <div className="harvest-card mb-4 p-5">
          <p className="section-eyebrow text-cypress mb-2">راهنمای انتخاب</p>
          <p className="text-[13px] leading-7 text-muted">
            با نوع برنج، منطقه کشت و وزن بسته، سریع‌تر به محصول مناسب برسید.
          </p>
        </div>

        <div className="flex items-center justify-between border-b border-line pb-4">
          <h2 className="text-[17px] font-medium">فیلترها</h2>
          <button
            onClick={f.clear}
            className="min-h-9 text-[12px] text-cypress underline transition-colors hover:text-ink"
          >
            پاک کردن همه
          </button>
        </div>

        <Accordion title="نوع برنج" defaultOpen>
          <div className="space-y-1 text-[12px] text-muted">
            {(Object.keys(RICE_TYPE_LABELS) as RiceType[]).map((t) => (
              <Check
                key={t}
                label={RICE_TYPE_LABELS[t]}
                checked={f.types.has(t)}
                onChange={() => f.toggleType(t)}
              />
            ))}
          </div>
        </Accordion>

        <Accordion title="طول دانه">
          <div className="space-y-1 text-[12px] text-muted">
            {(Object.keys(GRAIN_LABELS) as GrainLength[]).map((g) => (
              <Check
                key={g}
                label={GRAIN_LABELS[g]}
                checked={f.grains.has(g)}
                onChange={() => f.toggleGrain(g)}
              />
            ))}
          </div>
        </Accordion>

        <Accordion title="پروفایل عطر">
          <div className="space-y-1 text-[12px] text-muted">
            {(Object.keys(AROMA_LABELS) as Aroma[]).map((a) => (
              <Check
                key={a}
                label={AROMA_LABELS[a]}
                checked={f.aromas.has(a)}
                onChange={() => f.toggleAroma(a)}
              />
            ))}
          </div>
        </Accordion>

        <Accordion title="منطقه کشت">
          <div className="space-y-1 text-[12px] text-muted">
            {(Object.keys(REGION_LABELS) as Region[]).map((r) => (
              <Check
                key={r}
                label={REGION_LABELS[r]}
                checked={f.regions.has(r)}
                onChange={() => f.toggleRegion(r)}
              />
            ))}
          </div>
        </Accordion>

        <Accordion title="وزن بسته‌بندی">
          <div className="space-y-1 text-[12px] text-muted">
            {([2, 3, 5, 10] as const).map((w) => (
              <Check
                key={w}
                label={`${toFa(w)} کیلوگرم`}
                checked={f.weights.has(w)}
                onChange={() => f.toggleWeight(w)}
              />
            ))}
          </div>
        </Accordion>

        <Accordion title="محدوده قیمت">
          <PriceSlider />
        </Accordion>

        <div className="py-5 border-b border-line flex justify-between items-center">
          <span className="text-[13px]">فقط ارگانیک</span>
          <Toggle on={f.organic} onChange={() => f.setOrganic(!f.organic)} />
        </div>
        <div className="py-5 border-b border-line flex justify-between items-center">
          <span className="text-[13px]">کلکسیون ممتاز</span>
          <Toggle on={f.premium} onChange={() => f.setPremium(!f.premium)} />
        </div>
      </div>
    </aside>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative h-11 w-14 rounded-full transition-colors ${on ? 'bg-cypress' : 'bg-line'}`}
      aria-pressed={on}
    >
      <span
        className="absolute top-3 h-5 w-5 rounded-full bg-white shadow transition-all"
        style={{ right: on ? 8 : 28 }}
      />
    </button>
  );
}

function PriceSlider() {
  const { priceMin, priceMax, setPriceRange } = useFilters();
  const span = PRICE_BOUNDS.max - PRICE_BOUNDS.min;
  const minPct = ((priceMin - PRICE_BOUNDS.min) / span) * 100;
  const maxPct = ((priceMax - PRICE_BOUNDS.min) / span) * 100;
  return (
    <div className="px-1">
      <div className="relative h-[3px] bg-line my-5">
        <div
          className="absolute h-full bg-cypress"
          style={{ right: `${100 - maxPct}%`, left: `${minPct}%` }}
        />
        <input
          type="range"
          min={PRICE_BOUNDS.min}
          max={PRICE_BOUNDS.max}
          step={5000}
          value={priceMax}
          onChange={(e) => setPriceRange(priceMin, Math.max(priceMin + 10000, +e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>
      <div className="flex justify-between text-[11px] text-muted mt-1">
        <span>{toFa(priceMax.toLocaleString('en-US'))} ت</span>
        <span>{toFa(priceMin.toLocaleString('en-US'))} ت</span>
      </div>
    </div>
  );
}
