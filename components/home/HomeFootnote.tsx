const TRUST_ITEMS = ['ارسال رایگان', 'تضمین اصالت', 'بسته‌بندی حرفه‌ای'];

export function HomeFootnote() {
  return (
    <section className="bg-cream border-t border-ink/10 py-5">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Trust row */}
        <div className="flex items-center gap-0 flex-wrap">
          {TRUST_ITEMS.map((item, i) => (
            <span key={item} className="flex items-center text-[11px] tracking-[0.16em] text-muted">
              {i > 0 && <span className="mx-3 text-ink/25">·</span>}
              {item}
            </span>
          ))}
        </div>

        {/* Brand copy */}
        <p className="text-[12px] text-muted leading-relaxed max-w-[340px] sm:text-right">
          از ۱۳۸۷ با کشاورزان شمال ایران کار می‌کنیم — هر دانه بدون واسطه به سفره شما می‌رسد.
        </p>
      </div>
    </section>
  );
}
