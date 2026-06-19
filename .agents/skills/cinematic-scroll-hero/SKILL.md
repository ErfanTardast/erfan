---
name: cinematic-scroll-hero
description: Use only when implementing a Keyvan cinematic hero, image sequence, canvas rendering, GSAP ScrollTrigger, Lenis, or loading progress.
---

# Instructions

- Keep shopping visible and interactive throughout.
- Limit a pinned hero to 180-260vh and one signature sequence.
- Draw canvas only when frames change; cap DPR at 2.
- Reduce frames on mobile and provide a static fallback.
- Base progress on actual loaded frames and continue when frames fail.
- Respect `prefers-reduced-motion`; disable smooth scrolling where needed.

# Boundaries

Do not use GSAP on ordinary sections, pin multiple sections, hijack scrolling, or
add a blocking preloader. Prefer a static product hero when motion adds little.
