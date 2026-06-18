'use client';
import { useInView } from 'react-intersection-observer';

export function useIntersectionReveal(options?: { threshold?: number; triggerOnce?: boolean }) {
  return useInView({
    threshold: options?.threshold ?? 0.15,
    triggerOnce: options?.triggerOnce ?? true,
  });
}
