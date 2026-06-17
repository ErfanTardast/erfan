# Keyvan Design Tokens

Milestone A keeps the storefront RTL-first and Persian-first. New pages should reuse these tokens before adding new colors.

## Canonical colors

| Token | Hex | Use |
| --- | --- | --- |
| `--ink` | `#1C160E` | Primary text, primary buttons, dark surfaces |
| `--deep` | `#281E12` | Button hover, deeper text accents |
| `--olive` | `#6B7C5A` | Natural accents, trust markers, section labels |
| `--olive2` | `#8A9B78` | Secondary natural accents |
| `--cream` | `#F2E8CC` | Main warm background and text on dark hero |
| `--paper` | `#F8F2E0` | Light content surfaces |
| `--sand` | `#E2D5B8` | Subtle bands, image placeholders |
| `--line` | `#D0C5A8` | Borders and dividers |
| `--muted` | `#7D7260` | Secondary copy |
| `--gold` | `#C49040` | Rating, premium detail, small emphasis |
| `--terra` | `#B8623A` | Primary conversion accent and hover |

## Typography

- Persian UI: Vazirmatn.
- Latin brand marks: Fraunces.
- Keep body copy calm and readable: 13-15px, generous line height for Persian text.
- Reserve large display type for the homepage hero or strong page headers.

## Layout rules

- RTL is the default; avoid LTR-only spacing assumptions.
- Use full-width sections and constrained inner content.
- Keep commerce surfaces direct: product image, name, price, action, trust signal.
- Avoid adding cinematic scroll layers to the homepage.
