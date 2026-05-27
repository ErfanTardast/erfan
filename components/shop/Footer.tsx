import { Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12 py-14">
        <div className="grid md:grid-cols-[1.4fr_0.8fr_0.8fr] gap-10">
          <div>
            <p className="latin text-[34px] tracking-tighter">Darya</p>
            <p className="small-copy text-[#cdd2ca] mt-4 max-w-[330px] leading-loose">
              از مزارع سرسبز شمال ایران، با عشق به سفره شما می‌آوریم.
            </p>
            <div className="flex gap-3 mt-6">
              <button className="w-8 h-8 border border-[#3a4a3a] flex items-center justify-center hover:border-[#7a9b7a] transition-colors" aria-label="اینستاگرام">
                <Instagram className="w-3.5 h-3.5" />
              </button>
              <button className="w-8 h-8 border border-[#3a4a3a] flex items-center justify-center hover:border-[#7a9b7a] transition-colors" aria-label="توییتر">
                <Twitter className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div>
            <p className="section-eyebrow text-[#aab5a5] mb-5">فروشگاه</p>
            <div className="space-y-2.5 text-[13px] text-[#dce0d8]">
              <p className="hover:text-white cursor-pointer transition-colors">همه محصولات</p>
              <p className="hover:text-white cursor-pointer transition-colors">فروش ویژه</p>
              <p className="hover:text-white cursor-pointer transition-colors">بسته‌بندی هدیه</p>
            </div>
          </div>
          <div>
            <p className="section-eyebrow text-[#aab5a5] mb-5">شرکت</p>
            <div className="space-y-2.5 text-[13px] text-[#dce0d8]">
              <p className="hover:text-white cursor-pointer transition-colors">درباره ما</p>
              <p className="hover:text-white cursor-pointer transition-colors">تماس با ما</p>
              <p className="hover:text-white cursor-pointer transition-colors">مجله دریا</p>
            </div>
          </div>
        </div>
        <div className="border-t border-[#2e3e2e] mt-12 pt-5 flex flex-col md:flex-row justify-between gap-3 text-[11px] text-[#aeb8aa]">
          <span>© ۱۴۰۳ دریا رایس — تمام حقوق محفوظ است</span>
          <span>ساخته شده با محبت در ایران</span>
        </div>
      </div>
    </footer>
  );
}
