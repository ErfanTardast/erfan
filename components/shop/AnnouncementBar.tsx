'use client';
import { X } from 'lucide-react';
import { useState } from 'react';

export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="bg-deep text-cream/85 text-[12px] py-2.5 px-10 relative text-center leading-relaxed">
      <span>ارسال رایگان برای سفارش‌های بالای ۵۰۰،۰۰۰ تومان</span>
      <span className="mx-3 inline-block w-1 h-1 rounded-full bg-gold align-middle" />
      <span>
        کد تخفیف ۱۵٪: <strong className="text-cream tracking-wider">DARYA15</strong>
      </span>
      <span className="mx-3 inline-block w-1 h-1 rounded-full bg-gold align-middle" />
      <span>تضمین اصالت محصول</span>
      <button
        aria-label="بستن"
        onClick={() => setOpen(false)}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream p-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
