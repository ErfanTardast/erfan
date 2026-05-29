const TRUST_ITEMS = [
  'ارسال رایگان',
  'تضمین اصالت',
  'بسته‌بندی حرفه‌ای',
];

export function HomeFootnote() {
  return (
    <section className="bg-cream border-t border-ink/10 py-7">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Trust row */}
        <div className="flex items-center gap-6 flex-wrap">
          {TRUST_ITEMS.map((item, i) => (
            <span key={item} className="flex items-center gap-2 text-[11px] tracking-[0.16em] text-muted">
              {i > 0 && <span className="text-ink/20">·</span>}
              {item}
            </span>
          ))}
        </div>

        {/* Brand copy */}
        <p className="text-[12px] text-muted leading-relaxed max-w-[360px] md:text-right">
          از ۱۳۸۷ با کشاورزان شمال ایران کار می‌کنیم. هر دانه با دقت انتخاب، بدون واسطه به سفره شما می‌رسد.
        </p>
      </div>
    </section>
  );
}
