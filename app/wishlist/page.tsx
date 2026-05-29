'use client';
import { Header } from '@/components/shop/Header';
import { useWishlist } from '@/lib/store/wishlist';
import { useCart } from '@/lib/store/cart';
import { useUI } from '@/lib/store/ui';
import { PRODUCTS } from '@/lib/products';
import { fmtPriceShort } from '@/lib/format';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';

const CartDrawer = dynamic(() => import('@/components/shop/CartDrawer').then(m => ({ default: m.CartDrawer })), { ssr: false });
const Toast = dynamic(() => import('@/components/shop/Toast').then(m => ({ default: m.Toast })), { ssr: false });
const SearchOverlay = dynamic(() => import('@/components/shop/SearchOverlay').then(m => ({ default: m.SearchOverlay })), { ssr: false });

export default function WishlistPage() {
  const { ids, toggle } = useWishlist();
  const add = useCart(s => s.add);
  const openCart = useCart(s => s.open);
  const showToast = useUI(s => s.showToast);

  const products = ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  return (
    <>
      <Header />
      <main className="bg-[var(--cream)] min-h-screen">
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-12 py-12 md:py-16">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <p className="section-eyebrow text-[var(--olive)] mb-3">— لیست علاقه‌مندی‌ها —</p>
              <h1 className="title-lg">محصولات دلخواه</h1>
            </div>
            {products.length > 0 && (
              <span className="text-[13px] text-[var(--muted)]">{products.length} محصول</span>
            )}
          </div>

          {products.length === 0 ? (
            <div className="text-center py-24">
              <Heart className="w-10 h-10 text-[var(--line)] mx-auto mb-4" />
              <p className="text-[var(--muted)] text-[15px] mb-6">هنوز محصولی به لیست اضافه نکرده‌اید</p>
              <Link href="/shop" className="inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--cream)] text-[12px] tracking-[0.1em] px-7 py-3.5 hover:bg-[var(--deep)] transition-colors">
                مشاهده محصولات
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map(product => (
                  <article key={product!.id} className="group">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[var(--sand)] mb-4">
                      <Link href={`/product/${product!.slug}`}>
                        <img
                          src={product!.image}
                          alt={product!.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <button
                        onClick={() => toggle(product!.id)}
                        className="absolute top-3 left-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                        aria-label="حذف از علاقه‌مندی‌ها"
                      >
                        <Heart className="w-3.5 h-3.5 text-[var(--ink)]" fill="currentColor" />
                      </button>
                    </div>
                    <p className="section-eyebrow text-[var(--olive)] mb-1">{product!.kicker}</p>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <Link href={`/product/${product!.slug}`} className="text-[15px] font-medium hover:text-[var(--olive)] transition-colors">
                        {product!.title}
                      </Link>
                      <span className="text-[13px] text-[var(--muted)] whitespace-nowrap">{fmtPriceShort(product!.price)} ت</span>
                    </div>
                    <button
                      onClick={() => { add(product!.id); openCart(); showToast('به سبد اضافه شد', product!.title); }}
                      disabled={!product!.inStock}
                      className="w-full py-3 text-[12px] tracking-[0.08em] bg-[var(--ink)] text-[var(--cream)] hover:bg-[var(--olive)] transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      {product!.inStock ? 'افزودن به سبد' : 'ناموجود'}
                    </button>
                  </article>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-[var(--line)]">
                <Link href="/shop" className="inline-flex items-center gap-2 text-[13px] text-[var(--olive)] hover:text-[var(--ink)] transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  ادامه خرید
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <CartDrawer />
      <Toast />
      <SearchOverlay />
    </>
  );
}
