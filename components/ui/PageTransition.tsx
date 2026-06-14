'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

type Props = {
  children: (navigate: (href: string) => void) => React.ReactNode;
};

export function PageTransitionTrigger({ children }: Props) {
  const router = useRouter();
  const [active, setActive] = useState(false);

  const navigate = useCallback(
    (href: string) => {
      setActive(true);
      setTimeout(() => router.push(href), 620);
    },
    [router]
  );

  return (
    <>
      {children(navigate)}
      <AnimatePresence>
        {active && (
          <motion.div
            key="page-transition"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.65, ease: [0.7, 0, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-ink flex items-center justify-center"
          >
            <span className="latin text-cream text-5xl tracking-tighter">Keyvan</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
