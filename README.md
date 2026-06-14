# Keyvan Rice — Persian Rice E-commerce

A luxury Persian rice brand site built as a full-stack Next.js 14 application.

- **Landing page** (`/`) — cinematic, viral scroll experience: splash intro, parallax hero, manifesto, three-act story, grain showcase, magnetic CTA → shop.
- **Shop** (`/shop`) — full collection with real-time filters, sort, search, cart drawer, wishlist, quick-view modal, toast notifications.
- **API** (`/api/newsletter`) — Zod-validated newsletter endpoint.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS 3 |
| Motion | Framer Motion + Lenis (smooth scroll) |
| State | Zustand (cart, wishlist, filters, UI) — persisted to `localStorage` |
| Icons | lucide-react |
| Fonts | Vazirmatn + Fraunces via `next/font/google` |
| Validation | Zod |

## Development

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck
pnpm lint
pnpm build        # production build
```

## Deployment

### Vercel (recommended)
Connect the repo on Vercel — automatic preview deploys per branch. API routes work natively.

### GitHub Pages (static)
The `.github/workflows/pages.yml` workflow runs a static export:

```bash
BUILD_TARGET=static GITHUB_PAGES=true pnpm build  # outputs to /out
```

In static mode the newsletter API gracefully degrades to a client-side success message.

## Project structure

```
app/
  layout.tsx          RTL + fonts + Lenis
  page.tsx            Viral landing
  shop/page.tsx       Shop/collection
  api/newsletter/     Route handler
components/
  landing/            Splash, Hero, Manifesto, ThreeActStory, GrainShowcase, MarqueeWall, CTAEnter, MiniFooter
  shop/               Header, FilterSidebar, ProductGrid, ProductCard, CartDrawer, QuickViewModal, …
  ui/                 LenisProvider, MagneticButton, Marquee, ScrollReveal, PageTransition, CustomCursor
lib/
  products.ts         Typed product catalog (single source of truth)
  format.ts           Persian digit + currency helpers
  motion.ts           Shared Framer Motion variants
  store/              Zustand stores (cart, wishlist, filters, ui)
```
