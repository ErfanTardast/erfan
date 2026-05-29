import type { Variants } from 'framer-motion';

export const EASE = [0.2, 0.7, 0.2, 1] as const;
export const EASE_FAST = [0.4, 0, 0.2, 1] as const;
export const EASE_OUT = [0, 0, 0.3, 1] as const;
export const EASE_SPRING = { type: 'spring', stiffness: 280, damping: 24, mass: 0.5 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

export const stagger = (delay = 0.08, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay, delayChildren } },
});

export const wordReveal: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.85, ease: EASE },
  },
};

export const drawerSlideRight: Variants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { duration: 0.4, ease: EASE_FAST } },
  exit: { x: '100%', transition: { duration: 0.35, ease: EASE_FAST } },
};

export const modalScale: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
  exit: { opacity: 0, scale: 0.97, y: 8, transition: { duration: 0.25, ease: EASE_FAST } },
};
