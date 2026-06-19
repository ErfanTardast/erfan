import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const STATS = [
  { num: '۱۸', label: 'سال انتخاب برنج' },
  { num: '۸', label: 'رقم در فروشگاه' },
  { num: '۳', label: 'استان شمالی' },
];

export function LandingBrand() {
  return (
    <section className="relative overflow-hidden bg-indigo text-rice">
      <div className="tile-rule h-2 w-full" />
      <div className="site-shell grid gap-12 py-16 md:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="section-eyebrow mb-5 text-saffron">کیوان از ۱۳۸۷</p>
          <h2 className="max-w-[800px] text-[clamp(34px,5.2vw,72px)] font-semibold leading-[1.2]">
            برنج ایرانی را ساده‌تر، روشن‌تر و دقیق‌تر انتخاب کنید.
          </h2>
          <p className="mt-6 max-w-[650px] text-[15px] leading-8 text-rice/68">
            هر محموله با اطلاعات کاربردی عرضه می‌شود؛ نه فقط یک نام. عطر، نوع پخت، منطقه کشت و قیمت کامل بسته کنار هم قرار می‌گیرند.
          </p>
          <Link href="/about" className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-saffron text-[13px] font-semibold text-rice transition-colors hover:text-saffron">
            داستان و روش انتخاب کیوان
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-3 border-y border-rice/22">
          {STATS.map((stat) => (
            <div key={stat.label} className="border-l border-rice/18 py-6 text-center last:border-l-0">
              <p className="text-[clamp(30px,4vw,50px)] font-semibold text-saffron">{stat.num}</p>
              <p className="mt-2 text-[11px] leading-6 text-rice/58">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
