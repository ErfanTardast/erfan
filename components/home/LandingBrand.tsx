import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function LandingBrand() {
  return (
    <section className="bg-[var(--cream)] py-20 md:py-28">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
        <p className="text-[var(--olive)] text-[10px] tracking-[0.24em] mb-6">— داستان دریا —</p>

        <h2
          className="text-[var(--ink)] font-light leading-relaxed mb-6"
          style={{ fontSize: 'clamp(22px, 3.5vw, 36px)' }}
        >
          از ۱۳۸۷، مستقیم از دل مزارع پرآب گیلان و مازندران —<br className="hidden md:block" />
          هر دانه با دقت انتخاب، بدون واسطه به دست شما می‌رسد.
        </h2>

        <p className="text-[var(--muted)] text-[14px] leading-loose max-w-[560px] mx-auto mb-10">
          طارم هاشمی، دمسیاه، شیرودی — هر کدام داستانی از خاک شمال ایران دارند. ما فقط بهترین را انتخاب می‌کنیم.
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-8 md:gap-14 mb-12 text-center">
          {[
            { num: '۸', label: 'نوع برنج' },
            { num: '۳۶', label: 'سال تجربه' },
            { num: '۱۰۰٪', label: 'اصیل' },
          ].map((s) => (
            <div key={s.label}>
              <p className="latin text-[var(--ink)] font-medium leading-none mb-1" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>{s.num}</p>
              <p className="text-[var(--muted)] text-[11px] tracking-[0.14em]">{s.label}</p>
            </div>
          ))}
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-2.5 border border-[var(--ink)] text-[var(--ink)] text-[12px] tracking-[0.12em] px-8 py-3.5 hover:bg-[var(--ink)] hover:text-[var(--cream)] transition-all duration-200"
        >
          مشاهده همه محصولات
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
