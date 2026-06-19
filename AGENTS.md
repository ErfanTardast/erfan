# Project Identity

Keyvan is a premium Persian rice ecommerce brand and a product-first luxury
storefront. Persian is the primary language and all customer-facing layouts are
RTL-first. English labels may appear only as subtle premium subtitles.

# Design Principles

- Use luxury minimalism and warm tactile surfaces.
- Keep ecommerce product-first, editorial but fast.
- Use restrained motion and mobile-first layouts.
- Make trust, origin, pricing, and purchase actions explicit.
- Put product discovery within the first two scrolls.
- Reuse working cart, quick view, wishlist, search, shop, and PDP behavior.

# Do Not Rules

- Do not create long cinematic landing pages or delay product discovery.
- Do not overuse parallax, Lenis, GSAP, pinned sections, or loaders.
- Do not create 800vh scroll journeys.
- Do not add decorative sections that do not help selling.
- Do not use ambiguous prices. Show per-kilo and full-pack totals.
- Do not add heavy dependencies without a strong reason.
- Do not break cart, quick view, wishlist, shop, checkout, or PDP.

# Required Verification

After customer-facing changes run:

```powershell
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

Also verify:

- homepage is short and product-first
- products and primary CTA appear quickly
- mobile has no horizontal overflow
- cart, quick view, wishlist, shop, and PDP work
- reduced motion and image fallback work
- no broken imports, dead links, or old Darya branding remain
