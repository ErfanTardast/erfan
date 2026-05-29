'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { Variants } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

type Props = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  amount?: number;
  once?: boolean;
};

export function AnimateIn({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  amount = 0.2,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={delay ? { delay } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
