import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const guideItems = ['طارم برای مهمانی', 'شیرودی برای مصرف روزانه', 'دمسیاه برای عطر قوی'];

export function EditorialBanner() {
  return (
    <div className="my-2 sm:col-span-2 xl:col-span-3">
      <div className="harvest-card overflow-hidden bg-ink text-rice">
        <div className="grid md:grid-cols-[1fr_0.8fr]">
          <div className="field-pattern p-7 md:p-10">
            <p className="section-eyebrow mb-4 text-saffron">راهنمای سریع خرید</p>
            <h2 className="title-md max-w-[520px] text-rice">
              اگر مطمئن نیستید کدام برنج مناسب سفره شماست، از مصرف شروع کنید.
            </h2>
            <div className="mt-6 grid gap-3 text-[13px] text-rice/78 sm:grid-cols-3">
              {guideItems.map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-saffron" />
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/use-case/guest-table" className="inline-flex h-11 items-center justify-center bg-rice px-5 text-[13px] text-ink transition-colors hover:bg-sand">
                انتخاب برای مهمانی
              </Link>
              <Link href="/recipes" className="inline-flex h-11 items-center gap-2 px-5 text-[13px] text-rice/75 transition-colors hover:text-rice">
                راهنمای پخت
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative min-h-[260px]">
            <img
              src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=82"
              alt="برنج سفید پخته برای راهنمای خرید کیوان"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-ink/55 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
