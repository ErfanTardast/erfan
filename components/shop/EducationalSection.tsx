export function EducationalSection() {
  const cards = [
    {
      n: '01',
      t: 'انواع دانه',
      c: 'طارم هاشمی با دانه‌های ظریف و کشیده‌اش، عطری که از مزارع شمال تا سفره شما همراه است. هر نوع، داستانی متفاوت دارد.',
    },
    {
      n: '02',
      t: 'پروفایل عطر',
      c: 'ترکیب طبیعی ۲-استیل-۱-پیرولین، همان مولکولی که عطر منحصربه‌فرد برنج‌های شمالی ایران را می‌سازد.',
    },
    {
      n: '03',
      t: 'هنر پخت',
      c: 'آب مناسب، آبکشی کافی و حرارت ملایم — سه رازی که پلو را به شاهکار تبدیل می‌کنند.',
    },
  ];
  return (
    <section className="bg-[#ece5d9]">
      <div className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12 py-20 md:py-28">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-14 items-start">
          <div>
            <p className="section-eyebrow text-olive mb-4">راهنمای خریدار</p>
            <h2 className="title-lg max-w-[560px]">رازهای برنج ایرانی</h2>
            <p className="body-copy text-[#686c63] max-w-[520px] mt-6 leading-loose">
              آنچه هر دوستدار برنج باید بداند — از طول دانه تا پروفایل عطر، از منطقه کشت تا هنر پخت.
            </p>
            <button className="mt-9 border border-deep px-8 py-3.5 text-[12px] tracking-[0.12em] hover:bg-deep hover:text-white transition-all">
              راهنمای کامل برنج
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((c) => (
              <div key={c.n} className="border-t border-[#bdb5a8] pt-6">
                <span className="latin text-[32px] text-olive font-medium">{c.n}</span>
                <h3 className="text-[18px] mt-4 font-normal">{c.t}</h3>
                <p className="small-copy text-[#71746d] mt-3 leading-loose">{c.c}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
