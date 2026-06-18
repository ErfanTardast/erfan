'use client';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';

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
  const { ref, inView } = useIntersectionReveal({ threshold: amount, triggerOnce: once });

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
