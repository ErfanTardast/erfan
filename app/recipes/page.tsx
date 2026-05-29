import { Header } from '@/components/shop/Header';
import Link from 'next/link';

export const metadata = { title: 'دستور پخت — Darya Rice' };

const RECIPES = [
  { title: 'پلو مجلسی با طارم هاشمی', time: '۴۵ دقیقه', level: 'متوسط' },
  { title: 'کته دمسیاه', time: '۳۰ دقیقه', level: 'آسان' },
  { title: 'لوبیا پلو با شیرودی', time: '۶۰ دقیقه', level: 'متوسط' },
  { title: 'باقالی پلو با علی‌کاظمی', time: '۵۰ دقیقه', level: 'متوسط' },
];

export default function RecipesPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--cream)] min-h-screen">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <p className="text-[var(--olive)] text-[10px] tracking-[0.24em] mb-6">— دستور پخت —</p>
          <h1 className="text-[var(--ink)] font-light mb-12" style={{ fontSize: 'clamp(32px,5vw,56px)' }}>
            راز پخت برنج ایرانی
          </h1>
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {RECIPES.map((r) => (
              <div key={r.title} className="bg-[var(--paper)] border border-[var(--line)] p-6 hover:border-[var(--olive)] transition-colors">
                <h2 className="text-[var(--ink)] text-[16px] font-medium mb-3">{r.title}</h2>
                <div className="flex gap-6 text-[var(--muted)] text-[12px] tracking-[0.1em]">
                  <span>⏱ {r.time}</span>
                  <span>📊 {r.level}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[var(--muted)] text-[13px]">
            دستورهای کامل به زودی منتشر می‌شوند.{' '}
            <Link href="/shop" className="text-[var(--olive)] hover:text-[var(--ink)] transition-colors">
              همین حالا خرید کنید ←
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
