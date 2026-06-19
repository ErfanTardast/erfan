---
description: Pro-max UI/UX standards for the Persian RTL ecommerce project. Invoke with /ui-ux-pro-max before any visual work.
---

# UI/UX Pro Max — Persian RTL Ecommerce Standards

You are acting as a **senior product designer + frontend engineer** with obsessive attention to visual quality. Every pixel matters. Apply these rules for all UI work on this project.

---

## 1. Design System Tokens (use these, never invent new values)

| Token | Value | Usage |
|---|---|---|
| Primary red | `#dc2626` / `red-600` | CTAs, badges, accents |
| Red dark | `#b91c1c` / `red-700` | Hover states |
| Surface | `#ffffff` | Cards, panels |
| Background | `#f9fafb` / `gray-50` | Page bg |
| Border | `#f3f4f6` / `gray-100` | Card borders |
| Text primary | `#111827` / `gray-900` | Headlines |
| Text secondary | `#6b7280` / `gray-500` | Metadata, captions |
| Text muted | `#9ca3af` / `gray-400` | Placeholders |

## 2. Typography Rules

- **Persian body text**: Vazirmatn — already loaded via `--font-vazir`
- **Font sizes**: never go below `text-[9px]` on mobile, `text-[10px]` on desktop
- **Line height**: `leading-snug` for headlines, `leading-relaxed` for body
- **Price numbers**: always `tabular-nums` + `font-bold`
- **Persian numerals**: always convert via `toFa()` — never display `0123456789` in Persian UI
- **All text RTL**: `dir="rtl"` inherited from `<html>`. Only use `dir="ltr"` for: phone numbers, emails, latin brand names, countdown timers

## 3. Spacing & Layout

- **Page gutter**: `px-3 sm:px-4 lg:px-6` inside `max-w-[1400px] mx-auto`
- **Section gaps**: `space-y-3 sm:space-y-4` between product sections
- **Card padding**: `p-2.5 sm:p-3` inside cards
- **Rounded corners**: `rounded-xl` for sections/cards, `rounded-lg` for buttons, `rounded-full` for badges/pills
- **Never** use raw pixel padding unless `clamp()` is needed

## 4. Component Patterns

### Product Cards
- Image area: `aspect-square` with CSS gradient + inline SVG illustration
- Discount badge: red circle `w-9 h-9 rounded-full` at `top-2 start-2`
- Brand chip: `end-2 top-2` white/90 rounded-full
- Price block: separated with `border-t border-gray-50`, original price struck through
- CTA: full-width `bg-red-600 hover:bg-red-700` with ShoppingCart icon

### Section Headers
- Standard: red `w-1 h-5 rounded-full` accent bar + bold title + optional badge
- Countdown: red gradient header `linear-gradient(90deg, #dc2626, #b91c1c)` with Timer icon + CountdownTimer
- Nav arrows: `hidden md:flex` — only visible on desktop

### Carousels
- CSS scroll snap: `scrollSnapType: 'x mandatory'` on container, `scrollSnapAlign: 'start'` on items
- Card width: `clamp(150px, 28vw, 224px)` — responsive without breakpoints
- Hide scrollbar: `scrollbar-hide` class
- Scroll function: `el.scrollBy({ left: ±el.clientWidth * 0.65, behavior: 'smooth' })`

### Banners
- Always: gradient bg + dot-grid SVG texture + sprocket/gear SVG decoration
- Text: large `font-black` brand name + smaller description + accent-colored CTA button
- Logical RTL positioning: `start-*` / `end-*` never `left-*` / `right-*`

## 5. RTL Checklist (verify before every commit)

- [ ] All positioning uses `start-*` / `end-*` (not `left-*` / `right-*`)
- [ ] All margins use `ms-*` / `me-*` (not `ml-*` / `mr-*`)
- [ ] Chevron icons: `ChevronRight` = visually "back" in RTL, `ChevronLeft` = visually "forward"
- [ ] `ArrowLeft` points toward content in RTL "مشاهده بیشتر" links
- [ ] Mobile drawer slides from `end` side (right in LTR = left in RTL)
- [ ] All carousel scroll logic uses positive = toward end (left in RTL)
- [ ] `dir="ltr"` only on: countdown timers, phone numbers, email inputs, latin text blocks

## 6. Interaction & Animation Standards

- **Hover elevation**: `translateY(-2px)` + deeper shadow (`.ec-card` class)
- **Button press**: `active:scale-[0.98]`
- **Scale on hover (CTAs)**: `hover:scale-105`
- **Transition duration**: `150ms` for micro (buttons), `250ms` for cards, `300ms` for panels, `700ms` for hero slides
- **Easing**: `cubic-bezier(0.2, 0.7, 0.2, 1)` for entrances, `cubic-bezier(0.4, 0, 0.2, 1)` for exits
- **No animation** if `prefers-reduced-motion` — already handled in globals.css

## 7. Image Placeholder Standards

When real images are unavailable, use **layered SVG illustrations**:
1. CSS gradient background (`bgFrom` → `bgTo` at 145deg)
2. SVG dot-grid pattern (opacity 0.07, unique `id` per instance)
3. Domain-relevant SVG illustration (belt drive, sprockets, gears, industrial tools)
4. Never use: broken `<img>` tags, grey boxes, placeholder.com URLs, emoji as product images

## 8. Mobile-First Responsive Rules

- **Mobile** `<640px`: single column, larger touch targets (`min-h-[44px]` for buttons), readable font sizes
- **Tablet** `640–1024px`: 2-3 columns, navigation stays visible
- **Desktop** `>1024px`: full layout, hover states active, scroll arrows visible
- **Touch targets**: minimum `44×44px` for all interactive elements
- **No horizontal overflow**: every scroll must be intentional (carousels) or hidden

## 9. Accessibility Requirements

- All icon-only buttons: `aria-label` in Persian
- Product images: `alt` text in Persian
- Cards: `<article>` element
- Headings: proper `<h2>`/`<h3>` hierarchy within sections
- Color alone never conveys state — always pair with icon or text
- Focus styles: already configured in globals.css (`outline: 2px solid var(--gold)`)

## 10. Pre-Commit QA Checklist

Before every commit run:
1. `pnpm typecheck` — must pass with 0 errors
2. `pnpm build` — must compile with 0 errors
3. Visually verify on viewport widths: 375px (iPhone SE), 768px (iPad), 1440px (desktop)
4. Check: no horizontal scroll on mobile, no broken layouts, no English text visible in Persian UI
5. Check: prices show Persian numerals, countdown ticks, carousel arrows respond
6. Check: RTL checklist above ✓

---

## Activation

When this skill is active, apply all rules above automatically. Before any UI change, ask:
> "Does this look like it belongs in a premium Persian ecommerce store?"

If the answer is "not yet" — keep polishing.
