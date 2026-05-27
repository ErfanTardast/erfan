'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { EASE } from '@/lib/motion';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function ScrollReveal({ children, className = '', delay = 0, y = 32, once = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.25 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type WordsProps = {
  text: string;
  className?: string;
  wordClass?: string;
  delay?: number;
  stagger?: number;
};

export function WordsReveal({ text, className = '', wordClass = '', delay = 0, stagger = 0.06 }: WordsProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const words = text.split(' ');
  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" style={{ marginInlineEnd: '0.25em' }}>
          <motion.span
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.85, ease: EASE, delay: delay + i * stagger }}
            className={`inline-block ${wordClass}`}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
