'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useEffect } from 'react';
import { useUI } from '@/lib/store/ui';
import { useCart } from '@/lib/store/cart';

export function Toast() {
  const toast = useUI((s) => s.toast);
  const showToast = useUI((s) => s.showToast);
  const openCart = useCart((s) => s.open);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => showToast('', ''), 3200);
    return () => clearTimeout(t);
  }, [toast?.key]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {toast && toast.title && (
        <motion.div
          key={toast.key}
          initial={{ x: '120%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '120%', opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          role="status"
          aria-live="polite"
          className="fixed bottom-20 right-4 z-[70] flex w-[calc(100vw-2rem)] max-w-[380px] items-center gap-3 bg-ink px-4 py-3.5 text-white shadow-2xl sm:bottom-6 sm:right-6 sm:w-auto sm:min-w-[300px]"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-cypress">
            <Check className="w-4 h-4" />
          </div>
          <div className="flex-1 text-[13px] leading-tight">
            <p className="font-medium">{toast.title}</p>
            <p className="text-[11px] text-cream/65 mt-0.5">{toast.sub}</p>
          </div>
          <button
            onClick={openCart}
            className="h-10 shrink-0 bg-rice px-3 text-[11px] text-ink transition-colors hover:bg-sand"
          >
            مشاهده
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
