'use client';
import { ShieldCheck, Truck, X } from 'lucide-react';
import { useState } from 'react';

export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="relative bg-ink text-rice px-12 py-2.5 text-center text-[12px] leading-relaxed">
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-center gap-x-5 gap-y-1">
        <span className="inline-flex items-center gap-2">
          <Truck className="h-4 w-4 text-saffron" />
          ارسال رایگان سفارش‌های بالای ۵۰۰ هزار تومان
        </span>
        <span className="hidden h-1 w-1 rounded-full bg-saffron/80 sm:inline-block" />
        <span className="inline-flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-saffron" />
          ضمانت اصالت و سلامت بسته‌بندی
        </span>
      </div>
      <button
        aria-label="بستن"
        onClick={() => setOpen(false)}
        className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-rice/65 transition-colors hover:text-rice"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
