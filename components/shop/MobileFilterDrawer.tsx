'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { useUI } from '@/lib/store/ui';
import { useFilters } from '@/lib/store/filters';
import {
  AROMA_LABELS,
  RICE_TYPE_LABELS,
  REGION_LABELS,
  type Aroma,
  type RiceType,
  type Region,
} from '@/lib/products';
import { toFa } from '@/lib/format';

export function MobileFilterDrawer() {
  const open = useUI((s) => s.mobileFilterOpen);
  const setOpen = useUI((s) => s.setMobileFilter);
  const f = useFilters();

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-ink/45"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
            className="fixed inset-y-0 right-0 z-50 flex w-[90%] max-w-[410px] flex-col border-l border-line bg-rice"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-line bg-paper p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center bg-cypress text-rice">
                  <SlidersHorizontal className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-[20px] font-medium">فیلترها</h2>
                  <p className="mt-1 text-[12px] text-muted">انتخاب دقیق‌تر برای پخت و مصرف شما</p>
                </div>
              </div>
              <button onClick={close} aria-label="بستن" className="flex h-11 w-11 items-center justify-center border border-line bg-rice">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-7 overflow-y-auto p-5 text-[13px]">
              <FilterGroup title="نوع برنج">
                {(Object.keys(RICE_TYPE_LABELS) as RiceType[]).map((t) => (
                  <Check key={t} label={RICE_TYPE_LABELS[t]} checked={f.types.has(t)} onChange={() => f.toggleType(t)} />
                ))}
              </FilterGroup>
              <FilterGroup title="منطقه کشت">
                {(Object.keys(REGION_LABELS) as Region[]).map((r) => (
                  <Check key={r} label={REGION_LABELS[r]} checked={f.regions.has(r)} onChange={() => f.toggleRegion(r)} />
                ))}
              </FilterGroup>
              <FilterGroup title="پروفایل عطر">
                {(Object.keys(AROMA_LABELS) as Aroma[]).map((a) => (
                  <Check key={a} label={AROMA_LABELS[a]} checked={f.aromas.has(a)} onChange={() => f.toggleAroma(a)} />
                ))}
              </FilterGroup>
              <FilterGroup title="وزن">
                {([2, 3, 5, 10] as const).map((w) => (
                  <Check key={w} label={`${toFa(w)} کیلوگرم`} checked={f.weights.has(w)} onChange={() => f.toggleWeight(w)} />
                ))}
              </FilterGroup>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-line bg-paper p-5">
              <button onClick={f.clear} className="cta-outline flex h-12 items-center justify-center text-[13px]">
                پاک کردن
              </button>
              <button onClick={close} className="cta-ink flex h-12 items-center justify-center text-[13px]">
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
    <div className="harvest-card p-4">
      <p className="mb-3.5 font-medium">{title}</p>
      <div className="space-y-2.5 text-muted">{children}</div>
    </div>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex min-h-10 cursor-pointer items-center gap-2.5">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-cypress" />
      <span>{label}</span>
    </label>
  );
}
