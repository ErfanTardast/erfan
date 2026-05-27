'use client';
import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setTouch(isTouch);
    if (isTouch) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx;
    let dy = my;
    let rx = mx;
    let ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) setVisible(true);
    };
    const onEnter = (e: MouseEvent) => {
      const tgt = e.target as HTMLElement;
      if (tgt?.closest('a, button, [role="button"]')) {
        ringRef.current?.classList.add('expand');
      }
    };
    const onLeave = (e: MouseEvent) => {
      const tgt = e.target as HTMLElement;
      if (tgt?.closest('a, button, [role="button"]')) {
        ringRef.current?.classList.remove('expand');
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    let raf = 0;
    const tick = () => {
      dx += (mx - dx) * 0.6;
      dy += (my - dy) * 0.6;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dx - 4}px, ${dy - 4}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  if (touch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-cream mix-blend-difference"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity .3s' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-9 h-9 rounded-full border border-cream mix-blend-difference cursor-ring"
        style={{ opacity: visible ? 0.6 : 0, transition: 'opacity .3s, width .25s, height .25s' }}
      />
      <style jsx>{`
        .cursor-ring.expand {
          width: 64px;
          height: 64px;
          margin: -14px 0 0 -14px;
        }
      `}</style>
    </>
  );
}
