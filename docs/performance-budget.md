# Performance Budget

These are local targets for Keyvan before real hosting. Milestone A documents the budget; later CI can enforce it with Lighthouse or WebPageTest.

## Web vitals

| Metric | Target |
| --- | --- |
| LCP | `< 2.5s` on mobile 4G |
| INP | `< 200ms` |
| CLS | `< 0.1` |
| TTFB | `< 800ms` on production hosting |

## Page budgets

- Homepage initial JavaScript: keep under `170 KB` compressed.
- Shop page initial JavaScript: keep under `230 KB` compressed.
- Hero image: one high-priority image only, `1600px` max source width for desktop.
- Product grid images: lazy load, `720px` max source width until zoom/gallery requires more.
- Avoid scroll-linked animation on commerce-critical pages.

## Rules for future work

- Add new homepage sections only when they directly improve shopping or trust.
- Prefer static content and server components where possible.
- Dynamic import overlays, modals, drawers, and non-critical experiments.
- No remote scripts without a measured business reason and feature flag.
- Track `web_vital_reported` once analytics is enabled.
