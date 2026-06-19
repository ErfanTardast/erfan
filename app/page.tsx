import { EcomHeader } from '@/components/ecommerce/EcomHeader';
import { StoryStrip } from '@/components/ecommerce/StoryStrip';
import { HeroSlider } from '@/components/ecommerce/HeroSlider';
import { ServiceHighlights } from '@/components/ecommerce/ServiceHighlights';
import { ProductSection } from '@/components/ecommerce/ProductSection';
import { BrandBanner } from '@/components/ecommerce/BrandBanner';
import { VideoStories } from '@/components/ecommerce/VideoStories';
import { PopularBrands } from '@/components/ecommerce/PopularBrands';
import { InfoSection } from '@/components/ecommerce/InfoSection';
import { EcomFooter } from '@/components/ecommerce/EcomFooter';
import {
  DISCOUNT_PRODUCTS,
  INSTALLMENT_PRODUCTS,
  NEW_PRODUCTS,
  TIMING_BELT_PRODUCTS,
  ALTERNATOR_BELT_PRODUCTS,
  HYDRAULIC_BELT_PRODUCTS,
  COOLER_BELT_PRODUCTS,
  INDUSTRIAL_BELT_PRODUCTS,
  BRAND_BANNERS,
} from '@/lib/ecom-data';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EcomHeader />

      <main>
        {/* Story / category strip */}
        <StoryStrip />

        {/* Hero + services in contained layout */}
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6">
          <HeroSlider />
          <ServiceHighlights />
        </div>

        {/* Product sections with separators */}
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 space-y-3 sm:space-y-4 mt-3 sm:mt-4">
          <ProductSection
            title="تخفیف‌های هیجان‌انگیز"
            products={DISCOUNT_PRODUCTS}
            showCountdown
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 mt-3 sm:mt-4">
          <BrandBanner {...BRAND_BANNERS[0]} />
        </div>

        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 space-y-3 sm:space-y-4 mt-3 sm:mt-4">
          <ProductSection
            title="جدیدترین محصولات اقساطی"
            badge="خرید در ۴ قسط"
            products={INSTALLMENT_PRODUCTS}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 mt-3 sm:mt-4">
          <BrandBanner {...BRAND_BANNERS[1]} />
        </div>

        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 space-y-3 sm:space-y-4 mt-3 sm:mt-4">
          <ProductSection
            title="جدیدترین محصولات"
            products={NEW_PRODUCTS}
          />

          <ProductSection
            title="تسمه تایم"
            products={TIMING_BELT_PRODUCTS}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 mt-3 sm:mt-4">
          <BrandBanner {...BRAND_BANNERS[2]} />
        </div>

        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 space-y-3 sm:space-y-4 mt-3 sm:mt-4">
          <ProductSection
            title="تسمه دینام"
            products={ALTERNATOR_BELT_PRODUCTS}
          />

          <ProductSection
            title="تسمه هیدرولیک"
            products={HYDRAULIC_BELT_PRODUCTS}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 mt-3 sm:mt-4">
          <BrandBanner {...BRAND_BANNERS[3]} />
        </div>

        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 space-y-3 sm:space-y-4 mt-3 sm:mt-4 mb-4 sm:mb-6">
          <ProductSection
            title="تسمه کولر"
            products={COOLER_BELT_PRODUCTS}
          />

          <ProductSection
            title="تسمه‌های صنعتی"
            products={INDUSTRIAL_BELT_PRODUCTS}
          />
        </div>

        {/* Full-width sections */}
        <VideoStories />
        <PopularBrands />
        <InfoSection />
      </main>

      <EcomFooter />
    </div>
  );
}
