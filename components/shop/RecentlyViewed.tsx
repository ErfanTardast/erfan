'use client';
import { PRODUCTS } from '@/lib/products';
import { fmtPrice } from '@/lib/format';

const IDS = ['1', '3', '7'];

export function RecentlyViewed() {
  const list = IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
  return (
    <section className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-20">
      <div className="flex justify-between items-end mb-9">
        <div>
          <p className="section-eyebrow text-olive mb-3">بازدیدهای اخیر</p>
          <h2 className="title-lg">اخیراً دیده‌اید</h2>
        </div>
        <button className="hidden md:block border-b border-deep pb-1 text-[12px] hover:text-olive transition-colors">
          مشاهده همه
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {list.map((p) => (
          <article key={p!.id} className="flex gap-4 border-t border-line pt-5 cursor-pointer group">
            <img
              src={p!.image}
              alt={p!.title}
              className="w-24 h-28 object-cover shrink-0 transition-opacity group-hover:opacity-90"
            />
            <div>
              <p className="text-[14px] font-medium group-hover:text-olive transition-colors">{p!.title}</p>
              <p className="small-copy text-muted mt-1.5">{p!.shortNote}</p>
              <p className="text-[12px] mt-2.5">{fmtPrice(p!.price)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
