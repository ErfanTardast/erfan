'use client';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ChevronLeft, Heart, Minus, Plus, ShoppingBag, ShieldCheck, Truck, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, getProductBySlug, getGallery, getReviews, RICE_NUTRITION, REGION_LABELS, AROMA_LABELS } from '@/lib/products';
import { fmtPackPrice, fmtUnitPrice, toFa } from '@/lib/format';
import { useCart } from '@/lib/store/cart';
import { useWishlist } from '@/lib/store/wishlist';
import { toast } from 'sonner';
import { useHistory } from '@/lib/store/history';
import { EASE } from '@/lib/motion';
import { breadcrumbJsonLd, productJsonLd } from '@/lib/catalog/structured-data';
import { Header } from '@/components/shop/Header';
import { Footer } from '@/components/shop/Footer';
import { ProductGallery } from '@/components/product/ProductGallery';

const CartDrawer = dynamic(() => import('@/components/shop/CartDrawer').then(m => ({ default: m.CartDrawer })), { ssr: false });

const COLLECTION_LABELS: Record<string, string> = {
  'chef-choice': 'انتخاب سرآشپز',
  'rare-harvest': 'برداشت نادر',
  'limited-seasonal': 'فصلی محدود',
  'aged-reserve': 'ذخیره اعلا',
};

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);
  const [hydrated, setHydrated] = useState(false);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const gallery = product ? getGallery(product) : [];

  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);
  const wished = useWishlist((s) => s.ids.includes(product?.id ?? ''));
  const toggleWish = useWishlist((s) => s.toggle);
  const addRecentlyViewed = useHistory((s) => s.addRecentlyViewed);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <p className="section-eyebrow text-olive mb-4">خطا</p>
            <h1 className="title-lg mb-6">محصول یافت نشد</h1>
            <Link href="/shop" className="border border-ink px-8 py-3 text-[13px] tracking-wider hover:bg-ink hover:text-white transition-all">
              بازگشت به فروشگاه
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleAdd = () => {
    setAdding(true);
    for (let i = 0; i < qty; i++) add(product.id);
    openCart();
    toast.success('به سبد اضافه شد', { description: product.title });
    addRecentlyViewed(product.id);
    setTimeout(() => setAdding(false), 600);
  };

  const filled = Math.round(product.rating);
  const stars = Array.from({ length: 5 }, (_, i) => i < filled);

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.type === product.type || p.region === product.region)
  ).slice(0, 3);

  const jsonLd = [
    productJsonLd(product),
    breadcrumbJsonLd([
      { name: 'Keyvan', path: '/' },
      { name: 'Shop', path: '/shop' },
      { name: product.title, path: `/product/${product.slug}` },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Header />
      <main className="min-h-screen bg-cream pb-20 lg:pb-0">
        {/* Breadcrumb */}
        <div className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12 py-5">
          <nav className="flex items-center gap-2 text-[11px] text-muted">
            <Link href="/" className="hover:text-ink transition-colors">خانه</Link>
            <ChevronLeft className="w-3 h-3" />
            <Link href="/shop" className="hover:text-ink transition-colors">فروشگاه</Link>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-ink">{product.title}</span>
          </nav>
        </div>

        {/* Hero — image + purchase panel */}
        <section className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12 pb-20 md:pb-28">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 xl:gap-16 items-start">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <div className="relative">
                <ProductGallery
                  images={gallery}
                  title={product.title}
                  badge={product.collection ? COLLECTION_LABELS[product.collection] : undefined}
                  isNew={product.isNew}
                />
              </div>
              {/* Harvest + origin mini bar */}
              <div className="flex items-center gap-6 mt-5 pt-5 border-t border-line">
                <div>
                  <p className="text-[9px] tracking-[0.18em] text-muted">منطقه کشت</p>
                  <p className="text-[13px] mt-1">{REGION_LABELS[product.region]}</p>
                </div>
                {product.harvestYear && (
                  <div>
                    <p className="text-[9px] tracking-[0.18em] text-muted">سال برداشت</p>
                    <p className="text-[13px] mt-1">{product.harvestYear}</p>
                  </div>
                )}
                <div>
                  <p className="text-[9px] tracking-[0.18em] text-muted">عطر</p>
                  <p className="text-[13px] mt-1">{AROMA_LABELS[product.aroma]}</p>
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.18em] text-muted">وزن</p>
                  <p className="text-[13px] mt-1">{product.weight}</p>
                </div>
              </div>
            </motion.div>

            {/* Purchase panel — sticky on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.9, ease: EASE }}
              className="lg:sticky lg:top-24"
            >
              <span className="block h-px w-12 bg-[var(--terra)] mb-5" />
              <p className="section-eyebrow text-olive mb-3">{product.kicker}</p>
              <h1 className="title-lg !leading-tight">{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-4">
                <div className="flex gap-0.5">
                  {stars.map((f, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${f ? 'text-gold fill-gold' : 'text-[#d9d3ca]'}`} />
                  ))}
                </div>
                <span className="text-[12px] text-muted">({toFa(product.reviewCount)} نظر)</span>
              </div>

              {/* Aroma profile */}
              {product.aromaProfile && (
                <p className="body-copy text-muted italic mt-4 leading-relaxed max-w-[380px]">
                  {product.aromaProfile}
                </p>
              )}

              {/* Price */}
              <div className="mt-7 pb-7 border-b border-line">
                <p className="text-[22px] font-semibold">{fmtUnitPrice(product.price)}</p>
                <p className="mt-2 text-[15px] text-muted">{fmtPackPrice(product.packPrice, product.weightKg)}</p>
              </div>

              {/* Qty + Add to cart */}
              <div className="mt-6 space-y-3">
                <div>
                  <p className="mb-2 text-[12px] text-muted">وزن بسته</p>
                  <button type="button" aria-pressed="true" className="min-h-11 border border-ink bg-paper px-4 text-[13px]">
                    {product.weight}
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-line">
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="w-10 h-11 flex items-center justify-center text-muted hover:text-ink transition-colors text-[18px]"
                      aria-label="کم کردن"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-[14px]">{toFa(qty)}</span>
                    <button
                      onClick={() => setQty(q => q + 1)}
                      className="w-10 h-11 flex items-center justify-center text-muted hover:text-ink transition-colors text-[18px]"
                      aria-label="زیاد کردن"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={handleAdd}
                    data-testid="pdp-add-to-cart"
                    data-hydrated={hydrated ? 'true' : 'false'}
                    disabled={!hydrated || !product.inStock || adding}
                    className="flex-1 h-11 bg-ink text-cream text-[13px] hover:bg-[var(--terra)] transition-colors disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {!product.inStock ? 'ناموجود' : adding ? '…' : 'افزودن به سبد'}
                  </button>
                  <button
                    onClick={() => toggleWish(product.id)}
                    aria-label="علاقه‌مندی"
                    className={`w-11 h-11 border flex items-center justify-center transition-all ${
                      wished ? 'bg-ink text-white border-ink' : 'border-line hover:border-ink'
                    }`}
                  >
                    <Heart className="w-4 h-4" fill={wished ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <Link
                  href="/shop"
                  className="block text-center w-full border border-line py-3 text-[12px] tracking-wider text-muted hover:text-ink hover:border-ink transition-all"
                >
                  بازگشت به فروشگاه
                </Link>
              </div>

              {/* Trust signals */}
              <div className="mt-7 space-y-3 pt-6 border-t border-line">
                <div className="flex items-center gap-3 text-[12px] text-muted">
                  <Truck className="w-4 h-4 text-olive shrink-0" />
                  <span>ارسال رایگان برای سفارش‌های بالای ۵۰۰٬۰۰۰ تومان</span>
                </div>
                <div className="flex items-center gap-3 text-[12px] text-muted">
                  <ShieldCheck className="w-4 h-4 text-olive shrink-0" />
                  <span>تضمین اصالت ۱۰۰٪ — بازگشت رایگان تا ۷ روز</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Flavor notes strip */}
        {product.flavorNotes && (
          <section className="border-y border-sand bg-paper">
            <div className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-16">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16"
              >
                <div className="shrink-0">
                  <p className="section-eyebrow text-olive mb-2">پروفایل طعم</p>
                  <p className="title-md max-w-[260px]">سه یادداشت اصلی</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  {product.flavorNotes.map((note, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                      className="border border-line px-6 py-4 text-center bg-cream"
                    >
                      <p className="text-[11px] tracking-[0.1em] text-muted mb-1">{toFa(i + 1)}</p>
                      <p className="text-[15px] font-light">{note}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Origin story */}
        {product.originStory && (
          <section className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12 py-20 md:py-28">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: EASE }}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover scale-[1.02]"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <p className="section-eyebrow text-olive mb-5">— داستان منشأ —</p>
                <h2 className="title-md mb-6 max-w-[420px]">از کجا می‌آید این دانه؟</h2>
                <p className="body-copy text-muted leading-[2.2] italic max-w-[440px]">
                  {product.originStory}
                </p>
                {product.textureProfile && (
                  <div className="mt-8 pt-8 border-t border-line">
                    <p className="text-[9px] tracking-[0.18em] text-muted mb-2">بافت</p>
                    <p className="body-copy text-ink leading-relaxed">{product.textureProfile}</p>
                  </div>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* Cooking ritual */}
        {(product.cookingTip || product.pairings) && (
          <section className="bg-[#ece5d9]">
            <div className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12 py-20 md:py-28">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="section-eyebrow text-olive mb-5 text-center"
              >
                — آیین پخت —
              </motion.p>
              <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-[900px] mx-auto">
                {product.cookingTip && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="border-t-2 border-olive pt-6"
                  >
                    <p className="text-[9px] tracking-[0.2em] text-olive mb-3">راز پخت</p>
                    <p className="body-copy text-ink leading-[2.1]">{product.cookingTip}</p>
                  </motion.div>
                )}
                {product.pairings && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
                    className="border-t-2 border-sand pt-6"
                  >
                    <p className="text-[9px] tracking-[0.2em] text-muted mb-3">پیشنهاد همراهی</p>
                    <div className="space-y-2">
                      {product.pairings.map((p, i) => (
                        <p key={i} className="body-copy text-ink flex items-center gap-3">
                          <span className="w-1 h-1 rounded-full bg-olive shrink-0" />
                          {p}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="border-y border-line bg-paper">
          <div className="site-shell grid gap-8 py-12 md:grid-cols-2">
            <div>
              <p className="section-eyebrow mb-3 text-cypress">راهنمای پخت</p>
              <p className="body-copy text-muted">{product.cookingNotes}</p>
            </div>
            <div>
              <p className="section-eyebrow mb-3 text-cypress">شرایط نگهداری</p>
              <p className="body-copy text-muted">{product.storageInstructions}</p>
            </div>
          </div>
        </section>

        {/* Chef's note */}
        {product.chefNote && (
          <section className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <p className="latin text-[clamp(48px,7vw,100px)] leading-none text-ink/10 mb-4 select-none">"</p>
              <blockquote className="title-md !font-light text-ink/80 leading-relaxed -mt-4">
                {product.chefNote}
              </blockquote>
              <p className="mt-6 section-eyebrow text-olive">توصیه سرآشپز</p>
            </motion.div>
          </section>
        )}

        {/* Nutrition + Reviews */}
        <section className="border-t border-sand bg-cream">
          <div className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
            {/* Nutrition */}
            <div>
              <p className="section-eyebrow text-olive mb-3">ارزش غذایی</p>
              <h2 className="title-md mb-7">در هر ۱۰۰ گرم</h2>
              <div className="divide-y divide-line border-y border-line">
                {RICE_NUTRITION.map((n) => (
                  <div key={n.label} className="flex justify-between py-3.5 text-[13px]">
                    <span className="text-muted">{n.label}</span>
                    <span className="text-ink font-medium">{n.value}</span>
                  </div>
                ))}
              </div>
              <p className="small-copy text-muted mt-5 leading-relaxed">
                مقادیر تقریبی برای برنج پخته‌شده است و بسته به روش پخت کمی متفاوت خواهد بود.
              </p>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-end justify-between mb-7">
                <div>
                  <p className="section-eyebrow text-olive mb-3">نظر مشتریان</p>
                  <h2 className="title-md">{toFa(product.reviewCount)} دیدگاه ثبت‌شده</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold fill-gold" />
                  <span className="text-[22px] font-light">{toFa(product.rating.toFixed(1))}</span>
                </div>
              </div>
              <div className="space-y-5">
                {getReviews(product).map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: i * 0.06, duration: 0.6, ease: EASE }}
                    className="border border-line bg-paper p-5"
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-full bg-ink text-cream text-[12px] flex items-center justify-center">
                          {r.name.charAt(0)}
                        </span>
                        <span className="text-[13px] font-medium">{r.name}</span>
                      </div>
                      <span className="text-[11px] text-muted">{r.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2.5">
                      {Array.from({ length: 5 }, (_, s) => (
                        <Star key={s} className={`w-3 h-3 ${s < r.rating ? 'text-gold fill-gold' : 'text-[#d9d3ca]'}`} />
                      ))}
                    </div>
                    <p className="small-copy text-ink/80 leading-[1.9]">{r.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related products */}
        {related.length > 0 && (
          <section className="border-t border-sand bg-paper">
            <div className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="section-eyebrow text-olive mb-3">محصولات مرتبط</p>
                  <h2 className="title-md">شاید دوست داشته باشید</h2>
                </div>
                <Link
                  href="/shop"
                  className="hidden md:flex items-center gap-2 text-[12px] tracking-wider text-muted hover:text-ink transition-colors"
                >
                  <span>مشاهده همه</span>
                  <span>←</span>
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {related.map((p, i) => (
                  <motion.article
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.75, ease: EASE }}
                    className="group"
                  >
                    <Link href={`/product/${p.slug}`} className="block">
                      <div className="relative aspect-[4/3] overflow-hidden bg-sand mb-4">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="(min-width: 768px) 31vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                      <p className="section-eyebrow text-olive mb-1">{p.kicker}</p>
                      <p className="text-[15px] font-medium group-hover:text-olive transition-colors">
                        {p.title}
                      </p>
                      <p className="mt-1 text-[12px] text-muted">{fmtPackPrice(p.packPrice, p.weightKg)}</p>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <CartDrawer />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/96 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-[640px] items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-medium">{product.title}</p>
            <p className="mt-0.5 text-[11px] text-muted">{fmtPackPrice(product.packPrice, product.weightKg)}</p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!hydrated || !product.inStock || adding}
            className="cta-ink inline-flex min-h-11 items-center justify-center gap-2 px-5 text-[12px] disabled:opacity-50"
          >
            <ShoppingBag className="h-4 w-4" />
            افزودن به سبد
          </button>
        </div>
      </div>
    </>
  );
}
