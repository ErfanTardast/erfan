'use client';

import React, { useState, useEffect } from 'react';
import { toFa } from '@/lib/format';

interface CountdownTimerProps {
  initialH?: number;
  initialM?: number;
  initialS?: number;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function CountdownTimer({ initialH = 12, initialM = 44, initialS = 23 }: CountdownTimerProps) {
  const [secs, setSecs] = useState(initialH * 3600 + initialM * 60 + initialS);

  useEffect(() => {
    if (secs <= 0) return;
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [secs]);

  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const segments = [h, m, s];

  return (
    <div className="flex items-center gap-1 sm:gap-1.5" dir="ltr" aria-label="شمارش معکوس تخفیف">
      {segments.map((v, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <span className="text-red-300 font-black text-xs sm:text-sm leading-none select-none">
              :
            </span>
          )}
          <span className="bg-red-900/80 text-white text-[11px] sm:text-sm font-black rounded px-1.5 sm:px-2 py-1 min-w-[26px] sm:min-w-[32px] text-center tabular-nums leading-none">
            {toFa(pad(v))}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}
