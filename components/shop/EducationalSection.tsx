import { ArrowLeft, Clock3, Flame, Ruler } from 'lucide-react';
import Link from 'next/link';

const GUIDES = [
  {
    icon: Ruler,
    title: 'طول دانه',
    copy: 'دانه بلند و کشیده برای پلو مجلسی بهتر قد می‌کشد؛ دانه متوسط برای مصرف روزانه اقتصادی‌تر است.',
  },
  {
    icon: Flame,
    title: 'عطر و کهنگی',
    copy: 'برنج کهنه‌تر معمولاً آب بیشتری می‌خواهد و بعد از پخت عطر پایدارتر و دانه جدا‌تری دارد.',
  },
  {
    icon: Clock3,
    title: 'زمان پخت',
    copy: 'برای طارم و دمسیاه، خیساندن ۴۵ تا ۶۰ دقیقه کمک می‌کند دانه یکنواخت‌تر بپزد.',
  },
];

export function EducationalSection() {
  return (
    <section className="bg-paper py-14 md:py-20">
      <div className="site-shell">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-end">
          <div>
            <p className="section-eyebrow mb-3 text-cypress">راهنمای خریدار</p>
            <h2 className="title-lg max-w-[520px]">سه نکته قبل از انتخاب برنج</h2>
            <p className="body-copy mt-5 max-w-[520px] text-muted">
              کیوان باید خرید را سریع‌تر کند. این راهنما کمک می‌کند بر اساس پخت، عطر و مصرف روزانه انتخاب کنید.
            </p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <Link href="/recipes" className="cta-outline inline-flex h-11 items-center gap-2 px-5 text-[13px]">
              دستور پخت‌ها
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {GUIDES.map((guide) => {
            const Icon = guide.icon;
            return (
              <article key={guide.title} className="harvest-card p-5">
                <div className="mb-5 flex h-11 w-11 items-center justify-center bg-cypress text-rice">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-[17px] font-medium">{guide.title}</h3>
                <p className="small-copy mt-3 text-muted">{guide.copy}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
