'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useUI } from '@/lib/store/ui';
import { useFilters } from '@/lib/store/filters';
import {
  RICE_TYPE_LABELS,
  REGION_LABELS,
  AROMA_LABELS,
  type RiceType,
  type Region,
  type Aroma,
} from '@/lib/products';
import { toFa } from '@/lib/format';

export function MobileFilterDrawer() {
  const open = useUI((s) => s.mobileFilterOpen);
  const setOpen = useUI((s) => s.setMobileFilter);
  const f = useFilters();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/30"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-y-0 right-0 z-50 w-[88%] max-w-[390px] bg-paper border-l border-line flex flex-col"
          >
            <div className="p-6 border-b border-line flex items-center justify-between shrink-0">
              <h2 className="text-[20px] font-medium">فیلترها</h2>
              <button onClick={() => setOpen(false)} aria-label="بستن" className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-7 text-[13px]">
              <FilterGroup title="نوع برنج">
                {(Object.keys(RICE_TYPE_LABELS) as RiceType[]).map((t) => (
                  <Check
                    key={t}
                    label={RICE_TYPE_LABELS[t]}
                    checked={f.types.has(t)}
                    onChange={() => f.toggleType(t)}
                  />
                ))}
              </FilterGroup>
              <FilterGroup title="منطقه کشت">
                {(Object.keys(REGION_LABELS) as Region[]).map((r) => (
                  <Check
                    key={r}
                    label={REGION_LABELS[r]}
                    checked={f.regions.has(r)}
                    onChange={() => f.toggleRegion(r)}
                  />
                ))}
              </FilterGroup>
              <FilterGroup title="پروفایل عطر">
                {(Object.keys(AROMA_LABELS) as Aroma[]).map((a) => (
                  <Check
                    key={a}
                    label={AROMA_LABELS[a]}
                    checked={f.aromas.has(a)}
                    onChange={() => f.toggleAroma(a)}
                  />
                ))}
              </FilterGroup>
              <FilterGroup title="وزن">
                {([2, 3, 5, 10] as const).map((w) => (
                  <Check
                    key={w}
                    label={`${toFa(w)} کیلوگرم`}
                    checked={f.weights.has(w)}
                    onChange={() => f.toggleWeight(w)}
                  />
                ))}
              </FilterGroup>
            </div>
            <div className="p-6 border-t border-line shrink-0">
              <button
                onClick={() => setOpen(false)}
                className="w-full bg-ink text-white py-4 text-[13px] hover:bg-deep transition-colors"
              >
                اعمال فیلترها
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-medium mb-3.5">{title}</p>
      <div className="space-y-3 text-[#666b62]">{children}</div>
    </div>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex gap-2.5 cursor-pointer items-center">
      <input type="checkbox" checked={checked} onChange={onChange} className="accent-deep" />
      <span>{label}</span>
    </label>
  );
}
