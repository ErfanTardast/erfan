import { AnnouncementBar } from '@/components/shop/AnnouncementBar';
import { Header } from '@/components/shop/Header';
import { ShopHero } from '@/components/shop/ShopHero';
import { TrustBar } from '@/components/shop/TrustBar';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { RecentlyViewed } from '@/components/shop/RecentlyViewed';
import { EducationalSection } from '@/components/shop/EducationalSection';
import { Newsletter } from '@/components/shop/Newsletter';
import { Footer } from '@/components/shop/Footer';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { QuickViewModal } from '@/components/shop/QuickViewModal';
import { SearchOverlay } from '@/components/shop/SearchOverlay';
import { MobileMenuDrawer } from '@/components/shop/MobileMenuDrawer';
import { MobileFilterDrawer } from '@/components/shop/MobileFilterDrawer';
import { MobileFilterBarWrapper } from '@/components/shop/MobileFilterBarWrapper';
import { StickyMobileBar } from '@/components/shop/StickyMobileBar';

export default function ShopPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="pb-16 lg:pb-0">
        <ShopHero />
        <TrustBar />
        <section className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12 py-10 md:py-16">
          <MobileFilterBarWrapper />
          <div className="grid lg:grid-cols-[260px_1fr] gap-10 xl:gap-16">
            <FilterSidebar />
            <ProductGrid />
          </div>
        </section>
        <RecentlyViewed />
        <EducationalSection />
        <Newsletter />
      </main>
      <Footer />
      <StickyMobileBar />

      {/* Portals / Overlays */}
      <CartDrawer />
      <QuickViewModal />
      <SearchOverlay />
      <MobileMenuDrawer />
      <MobileFilterDrawer />
    </>
  );
}
