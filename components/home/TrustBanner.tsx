const ITEMS = [
  'ارسال رایگان از ۳۰۰ هزار تومان',
  'تضمین اصالت محصول',
  'بسته‌بندی حرفه‌ای',
  'پشتیبانی ۷ روزه',
];

export function TrustBanner() {
  return (
    <div className="bg-ink text-cream/60">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 py-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[11px] tracking-[0.16em] list-none m-0 p-0">
          {ITEMS.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-olive/60 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
