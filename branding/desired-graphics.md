# Concordia — Desired Graphics & Branding

## Brand identity

Concordia is a **real-time, federated, decentralized chat and social platform** — an open alternative to Discord. The visual identity should feel modern, trustworthy, and community-driven, without being corporate or sterile.

---

## Colour palette

| Role | Name | Hex |
|---|---|---|
| Primary / Brand | Violet | `#7C3AED` (Tailwind `violet-600`) |
| Primary dark | Violet dark | `#6D28D9` (Tailwind `violet-700`) |
| Accent | Indigo | `#4F46E5` (Tailwind `indigo-600`) |
| Background | White | `#FFFFFF` |
| Surface | Gray 50 | `#F9FAFB` |
| Text primary | Gray 900 | `#111827` |
| Text secondary | Gray 500 | `#6B7280` |

> The existing UI uses `indigo-600` as its primary. This should migrate toward `violet-600` to match the favicon/icon branding.

---

## Logo

### Icon mark
- **Existing asset**: `frontend/public/favicon.svg` — a violet icon created in Canva (Peter D, March 2026), titled **"Concordia Branding — Icon — Violet"**.
- The icon sits on a white/transparent background and is designed as a maskable PWA icon.
- Available sizes: SVG (scalable), 96×96 px, 192×192 px, 512×512 px.

### Wordmark / logotype
- **Desired**: A horizontal lockup of the icon mark + the wordmark **"Concordia"** in a bold, geometric sans-serif (e.g. Inter, DM Sans, or a custom mark).
- Weight: Bold (700).
- Colour: Violet `#7C3AED` on light backgrounds; White on dark/violet backgrounds.
- Spacing: Icon and wordmark separated by `0.5×` the icon height.

### Variations needed
| Variant | Usage |
|---|---|
| Full lockup (icon + wordmark), light | Navbar, landing page hero |
| Full lockup (icon + wordmark), dark | Dark-mode navbar, splash screens |
| Icon only | Favicon, app icon, avatar placeholder |
| Wordmark only | Narrow/mobile contexts where icon is implicit |

---

## Typography

| Role | Typeface | Weight | Notes |
|---|---|---|---|
| Display / Hero headings | Inter | 800 ExtraBold | Used for marketing headlines |
| UI headings | Inter | 700 Bold | Page titles, card headers |
| Body | Inter | 400 Regular | All body copy |
| Monospace | JetBrains Mono | 400 | Code blocks, message timestamps |

> Inter is already the system default for Tailwind projects and works well web-loaded via Google Fonts or Bunny Fonts.

---

## Iconography

- Style: **Outlined**, 1.5 px stroke, rounded caps — consistent with Heroicons or Lucide.
- Size grid: 16 px, 20 px, 24 px.
- Colour: Inherits from text colour (currentColor) unless decorative.

---

## Illustration / imagery

- Style: Flat or lightly isometric, violet/indigo palette, minimal and geometric.
- Themes: Community, networks/nodes, speech bubbles, servers/datacenter racks (federation concept).
- Empty states: Custom spot illustrations (e.g. "No messages yet", "Server offline").

---

## Motion & animation

- Transitions: `150ms ease-out` for micro-interactions (hover, focus).
- Page transitions: Fade `200ms`.
- Loading states: Spinner using brand violet, `animate-spin`.

---

## Assets to create

- [ ] SVG wordmark (standalone)
- [ ] SVG full lockup — light variant
- [ ] SVG full lockup — dark variant
- [ ] OG / social share image (1200×630 px) — hero graphic with logo + tagline *"Chat freely. Stay connected across the federation."*
- [ ] App store icon (1024×1024 px, no alpha)
- [ ] Spot illustrations for empty states (×3)
- [ ] Loading / splash screen graphic
