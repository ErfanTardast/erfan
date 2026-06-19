# Keyvan Storefront Design System

## Direction

Warm editorial minimalism for a premium Persian rice brand. Product packaging,
origin, price, and purchase action lead every commerce surface. Decorative
cinematic effects are subordinate to shopping.

## Canonical Tokens

| Role | Token | Value |
|---|---|---|
| Primary text | `--ink` | `#17211a` |
| Deep surface | `--deep` | `#0f1712` |
| Brand green | `--cypress` | `#244232` |
| Supporting green | `--olive` | `#60724d` |
| Warm page | `--rice` | `#fbfaf2` |
| Elevated surface | `--paper` | `#fffdf6` |
| Warm section | `--cream` | `#f7f4e8` |
| Image placeholder | `--sand` | `#e4dcc7` |
| Border | `--line` | `#d5ccb6` |
| Secondary text | `--muted` | `#6d7165` |
| Premium accent | `--saffron` | `#d8a02f` |
| Earth accent | `--terra` | `#ad5f3e` |

Use Vazirmatn for Persian UI and Fraunces only for subtle Latin brand labels.
Letter spacing remains `0`; hierarchy comes from size, weight, spacing, and
contrast.

## Layout

- RTL and mobile-first.
- Use `site-shell` for consistent responsive gutters.
- Homepage order: header, product hero, featured products, collections, trust,
  short story, newsletter, footer.
- Products appear within the first two scrolls.
- Cards use square corners or a maximum radius of 8px.
- Never nest cards or float whole page sections as cards.

## Commerce Components

- Product cards show type, region, pack size, aroma, recommended use, per-kilo
  price, full-pack price, wishlist, quick view, and add-to-cart.
- The primary action is add-to-cart; product detail and wishlist are secondary.
- Icon-only controls have visible 44px targets and accessible labels.
- PDP keeps purchase information beside the gallery and adds a sticky mobile CTA.
- Filters and sorting remain quiet and scan-friendly.

## Imagery

- Prefer realistic Keyvan packaging, rice grain macro, serving bowls, and clean
  still life with warm natural light.
- Product edges and rice texture must be clear.
- Avoid generic landscapes, dark atmospheric crops, and unrelated lifestyle
  photography.
- Hero imagery is prioritized; all other imagery is lazy-loaded.

## Motion

- Use opacity and transform only.
- Micro-interactions: 150-300ms.
- One restrained hero entrance is sufficient.
- No scroll hijacking, blocking loaders, Lenis, or multi-section pinning.
- Respect `prefers-reduced-motion`.

## Accessibility And Performance

- Text contrast meets WCAG AA.
- Keyboard focus is always visible.
- Modals and drawers accept Escape and move focus to their close control.
- Images reserve dimensions and use WebP.
- Avoid unnecessary client components and third-party scripts.
