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
          className="fixed bottom-6 right-6 z-[70] bg-ink text-white px-4 py-3.5 flex items-center gap-3 min-w-[300px] max-w-[380px] shadow-2xl"
        >
          <div className="w-9 h-9 rounded-full bg-deep flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div className="flex-1 text-[13px] leading-tight">
            <p className="font-medium">{toast.title}</p>
            <p className="text-[11px] text-cream/65 mt-0.5">{toast.sub}</p>
          </div>
          <button
            onClick={openCart}
            className="bg-white text-ink px-3 py-2 text-[11px] hover:bg-paper transition-colors shrink-0"
          >
            مشاهده
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
