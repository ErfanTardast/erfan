'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function InfoSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-white border-t border-gray-100 py-8 sm:py-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
            فروشگاه اینترنتی تسمه سقا
          </h2>
          <p className="text-[12px] sm:text-[13px] md:text-sm text-gray-600 leading-relaxed sm:leading-loose">
            فروشگاه اینترنتی تسمه سقا با سال‌ها تجربه در فروش تجهیزات صنعتی، تسمه‌های مکانیکی و ابزار
            اندازه‌گیری دقیق، به یکی از پیشروان این حوزه در ایران تبدیل شده است. ما با عرضه محصولات
            باکیفیت از معتبرترین برندهای جهانی مانند Optibelt، SKF، ABB، Fluke، Testo و UNI-T، ارسال
            سریع به سراسر کشور، خدمات مشتریان حرفه‌ای و پشتیبانی مطمئن، تلاش می‌کنیم بهترین تجربه
            خرید را برای شما فراهم کنیم.
          </p>

          {/* Expandable extra text */}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              expanded ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-[12px] sm:text-[13px] md:text-sm text-gray-600 leading-relaxed sm:leading-loose mb-3">
              تسمه‌های تایم، دینام، هیدرولیک، کولر و تسمه‌های صنعتی از جمله محصولاتی هستند که در
              فروشگاه تسمه سقا با بیشترین تنوع و کمترین قیمت ارائه می‌شوند. تمامی محصولات دارای گارانتی
              اصالت کالا بوده و از نمایندگی‌های رسمی تهیه می‌شوند.
            </p>
            <p className="text-[12px] sm:text-[13px] md:text-sm text-gray-600 leading-relaxed sm:leading-loose mb-3">
              امکان خرید اقساطی در ۴ قسط بدون بهره برای تمامی محصولات فراهم است. تیم پشتیبانی ما
              آماده است تا در هر ساعتی از شبانه‌روز و هر روز هفته پاسخگوی سوالات شما باشد. با تجربه
              بیش از یک دهه در زمینه توزیع و فروش تجهیزات صنعتی، ما بهترین مشاوره را برای انتخاب
              صحیح محصول به شما ارائه می‌دهیم.
            </p>
            <p className="text-[12px] sm:text-[13px] md:text-sm text-gray-600 leading-relaxed sm:leading-loose">
              خرید از فروشگاه تسمه سقا به معنای اطمینان از کیفیت، سرعت در تحویل و خدمات پس از فروش
              حرفه‌ای است. ما متعهد به ارائه بهترین قیمت و بالاترین کیفیت محصولات هستیم.
            </p>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 sm:mt-4 flex items-center gap-1.5 text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium transition-colors group"
          >
            {expanded ? 'نمایش کمتر' : 'نمایش بیشتر'}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
