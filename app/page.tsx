import dynamic from 'next/dynamic';
import { Header } from '@/components/shop/Header';
import { HomeHero } from '@/components/home/HomeHero';
import { FeaturedProducts } from '@/components/landing/FeaturedProducts';
import { CollectionsStrip } from '@/components/home/CollectionsStrip';
import { HomeFootnote } from '@/components/home/HomeFootnote';
import { HomeFooter } from '@/components/home/HomeFooter';

const CartDrawer = dynamic(() => import('@/components/shop/CartDrawer').then((m) => ({ default: m.CartDrawer })), { ssr: false });
const QuickViewModal = dynamic(() => import('@/components/shop/QuickViewModal').then((m) => ({ default: m.QuickViewModal })), { ssr: false });
const SearchOverlay = dynamic(() => import('@/components/shop/SearchOverlay').then((m) => ({ default: m.SearchOverlay })), { ssr: false });
const Toast = dynamic(() => import('@/components/shop/Toast').then((m) => ({ default: m.Toast })), { ssr: false });
const MobileMenuDrawer = dynamic(() => import('@/components/shop/MobileMenuDrawer').then((m) => ({ default: m.MobileMenuDrawer })), { ssr: false });

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        <HomeHero />
        <FeaturedProducts />
        <CollectionsStrip />
        <HomeFootnote />
      </main>
      <HomeFooter />

      {/* Portals / Overlays */}
      <CartDrawer />
      <QuickViewModal />
      <SearchOverlay />
      <MobileMenuDrawer />
      <Toast />
    </>
  );
}
