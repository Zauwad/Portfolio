# UI/UX Theme — "Restraint"

A reusable visual & interaction system. **One accent on near-black. Honest motion. Composed from primitives.** Apply to any project — dev tools, dashboards, portfolios, AI products, data surfaces — that wants to feel **calm, dense, technical, and considered**.

> **TL;DR** — Monochromatic near-black canvas. Geist Sans + Geist Mono. White as the sole accent. Hairline borders (6%/12% white). Numeric monospace. One easing curve. Optional grain + grid + radial glow.

Replace every `{{TOKEN}}` below with your project's values:

| Token              | Meaning                              | Example                              |
| ------------------ | ------------------------------------ | ------------------------------------ |
| `{{BRAND}}`        | Your product / project name          | `Acme`, `Portfolio`, `Northwind`     |
| `{{BRAND_LOWER}}`  | Lowercase form for wordmark          | `acme`, `portfolio`, `northwind`     |
| `{{TAG}}`          | Sub-brand or section after slash     | `/workspace`, `/studio`, `/v2`       |
| `{{META}}`         | Short tagline for metadata           | `intelligence workspace`, `design system`, `inc.` |
| `{{VERSION}}`      | Build / version label                | `v0.1`, `2026`, `build 42`           |
| `{{CTA_PRIMARY}}`  | Primary CTA copy                     | `Launch`, `Open`, `Begin`            |
| `{{NAV_ITEMS}}`    | Anchor links in nav                  | `Work`, `About`, `Contact`           |

---

## 1. Core principles

1. **One accent.** White on near-black. Restraint is the brand. No gradient hero, no brand color. Add color only for *state* (success/warn/error), never decoration.
2. **Honest motion.** Every animation ties to scroll, pointer, real render metrics, or a user action. No decorative loops.
3. **Composed, not duplicated.** A small set of primitives compose every surface. Never copy a card layout.
4. **Deterministic first paint.** Seeded RNG for any visual noise. No hydration flicker. Tokens via CSS variables.
5. **Reduced-motion parity.** Every animated surface has a still or simplified fallback.
6. **Keyboard + screen-reader reachable.** Visible focus rings, semantic HTML, `prefers-reduced-motion` honored.
7. **Engineering discipline.** Tokens → Tailwind theme → components. Never hard-code hex or durations.

---

## 2. Color system

### 2.1 Tokens

| Token              | Value                       | Use                                          |
| ------------------ | --------------------------- | -------------------------------------------- |
| `--bg-base`        | `#08080B`                   | App background. Near-black with faint blue undertone. |
| `--bg-elev-1`      | `#0E0E13`                   | First elevation. Cards, sidebars, top bars.  |
| `--bg-elev-2`      | `#14141B`                   | Second elevation. Hover states, headers, inputs. |
| `--fg`             | `#FAFAFA`                   | Primary text & accent. Single accent by design. |
| `--fg-muted`       | `rgba(250,250,250,0.56)`    | Secondary text, descriptions.                |
| `--fg-dim`         | `rgba(250,250,250,0.32)`    | Tertiary text, metadata, captions.           |
| `--border`         | `rgba(255,255,255,0.06)`    | Default hairline border.                     |
| `--border-hi`      | `rgba(255,255,255,0.12)`    | Hover border, active state.                  |
| `--accent`         | `#FAFAFA`                   | Alias for `--fg`. Buttons, active states.    |
| `--accent-glow`    | `rgba(255,255,255,0.08)`    | Soft glows around focal elements.            |
| `--ease-out-quart` | `cubic-bezier(0.22, 1, 0.36, 1)` | The single global easing curve.          |

### 2.2 CSS variables (`:root`)

```css
:root {
  --bg-base: #08080B;
  --bg-elev-1: #0E0E13;
  --bg-elev-2: #14141B;
  --border: rgba(255, 255, 255, 0.06);
  --border-hi: rgba(255, 255, 255, 0.12);
  --fg: #FAFAFA;
  --fg-muted: rgba(250, 250, 250, 0.56);
  --fg-dim: rgba(250, 250, 250, 0.32);
  --accent: #FAFAFA;
  --accent-glow: rgba(255, 255, 255, 0.08);
  --ease-out-quart: cubic-bezier(0.22, 1, 0.36, 1);
}
```

### 2.3 Tailwind mirror

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      bg: {
        base:  '#08080B',
        elev1: '#0E0E13',
        elev2: '#14141B',
      },
      fg: {
        DEFAULT: '#FAFAFA',
        muted:   'rgba(250,250,250,0.56)',
        dim:     'rgba(250,250,250,0.32)',
      },
      border: {
        DEFAULT: 'rgba(255,255,255,0.06)',
        hi:      'rgba(255,255,255,0.12)',
      },
    },
    transitionTimingFunction: {
      'out-quart': 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
  },
}
```

### 2.4 Contrast & accessibility

- Body text on `--bg-base` is **WCAG AAA** (~18:1).
- `--fg-muted` clears **AA Large**; reserve for non-critical descriptions.
- `--fg-dim` is decorative only; never use for required info.
- Focus ring: **1px solid `--fg` with 2px offset, 2px radius**.

### 2.5 Selection, focus, scrollbar

```css
::selection             { background: var(--fg); color: var(--bg-base); }
:focus-visible          { outline: 1px solid var(--fg); outline-offset: 2px; border-radius: 2px; }
html                    { scroll-behavior: smooth; color-scheme: dark; }
::-webkit-scrollbar      { width: 10px; height: 10px; }
::-webkit-scrollbar-thumb{ background: var(--border-hi); border-radius: 8px; }
```

---

## 3. Typography

### 3.1 Fonts

| Role                                | Family       | Notes                                  |
| ----------------------------------- | ------------ | -------------------------------------- |
| Display, body, headings             | **Geist Sans** | Loaded via `geist/font/sans`. Zero CLS. |
| Numerals, labels, metadata, code    | **Geist Mono** | Loaded via `geist/font/mono`. All-caps micro-copy. |

```tsx
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

<html className={`${GeistSans.variable} ${GeistMono.variable} dark`}>
```

### 3.2 Scale

| Token         | Value                                | Use                          |
| ------------- | ------------------------------------ | ---------------------------- |
| Hero display  | `clamp(44px, 7vw, 88px)`             | Hero h1 only                 |
| H2 section    | `clamp(36px, 4.5vw, 60px)`           | Section headings             |
| H3 card       | `clamp(20px, 1.6vw, 24px)`           | Card titles                  |
| H4 sub        | `18px`                                | Sub-card titles, list heads  |
| Body L        | `18px / 1.6`                          | Hero paragraph, lead body    |
| Body          | `14–16px / 1.55–1.65`                 | Default body, descriptions   |
| Body S        | `13px / 1.5`                          | Table rows, dense lists      |
| Mono label    | `11px · uppercase · 0.22em tracking`  | Eyebrows, metadata, captions |
| Mono micro    | `10px · uppercase · 0.22em tracking`  | Sidebar section heads, kbd   |
| Mono data     | `11px · 0.18em tracking`              | Table cells, status rows     |

### 3.3 Settings

```css
html, body {
  font-family: var(--font-geist-sans), system-ui, -apple-system, sans-serif;
  font-feature-settings: 'ss01', 'cv11';   /* Geist stylistic alternates */
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
.tabular { font-variant-numeric: tabular-nums; }   /* apply on numbers */
```

### 3.4 Voice & casing

- **Display:** Sentence case, balanced (`text-balance`), tight tracking (`-0.03em` to `-0.04em`), medium weight (500).
- **Eyebrows / metadata:** All caps, mono, **0.18–0.22em tracking**, `fg-dim` or `fg-muted`.
- **Numbers:** Always tabular. Always mono in dense surfaces.
- **No bold body text.** Use `fg` vs `fg-muted` contrast + medium-weight headings.

---

## 4. Layout & spacing

### 4.1 Containers

- **4pt base grid.** Tailwind defaults suffice.
- **Three container widths:**
  - `narrow` → `max-w-[920px]` — long-form content, query surfaces.
  - `default` → `max-w-[1200px]` — typical sections.
  - `wide` → `max-w-[1440px]` — top nav, hero, dashboards.
- Horizontal padding: `px-6 md:px-10`.
- Section vertical rhythm: `py-16 md:py-24`.
- Sections separated by `border-t border-border` — never heavy dividers.

### 4.2 Radii

| Element                 | Radius                    |
| ----------------------- | ------------------------- |
| Chips, tags, badges     | `2px` (`rounded-sm`)      |
| Buttons, inputs         | `2px` (`rounded-sm`)      |
| Cards, dashboard frames | `6px` (`rounded-md`)      |
| Modals, palette         | `6px` (`rounded-md`)      |
| Avatars                 | `9999px`                  |
| Status dots             | `9999px`                  |

> **Never use `rounded-2xl` or `rounded-full` on rectangles.** Calm rectangles only.

### 4.3 Borders & strokes

- **Default border:** `1px solid --border` (6% white).
- **Hover/active border:** `1px solid --border-hi` (12% white).
- **Active row marker:** `1px × 16px` vertical bar at the left edge.
- **Tab underline:** `1px` horizontal, animated via Framer `layoutId`.
- **Chart strokes:** `1.25px`, `round` caps and joins.

---

## 5. Components

### 5.1 Primitives (build every surface from these)

| Primitive         | Purpose                                       | Key props                             |
| ----------------- | --------------------------------------------- | ------------------------------------- |
| `Container`       | Width + padding wrapper                       | `size: 'narrow' \| 'default' \| 'wide'` |
| `Reveal`          | IntersectionObserver-driven entrance          | `delay`, `as: 'div' \| 'span' \| 'h2' \| ...` |
| `SectionHeading`  | Title + muted line + body, staggered          | `title`, `muted`, `body`, `maxWidth`  |
| `PrimaryCTA`      | Magnetic outline/solid button                 | `variant`, `size`, `strength`         |
| `MagneticButton`  | Pointer-spring anchor or button               | `strength: 0.25` default              |
| `StatusPulse`     | Pulsing dot with optional mono label          | `size`, `variant`, `label`            |
| `Marquee`         | Duplicate-and-scroll CSS marquee              | `items: string[]`                     |
| `BrandMark`       | Wordmark with `/tag`                          | `size`, `showTag`                     |
| `Sparkline`       | Hand-rolled SVG with hover crosshair          | `data`, `height`, `invert`            |
| `CountUp`         | Out-quart number animation                    | `to`, `duration`, `suffix`, `format`  |
| `Card` / `Panel`  | Composed surface (see 5.2)                    | `as`, `hover`                         |

### 5.2 Card / Panel — the most reused surface

```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-10% 0px' }}
  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
  whileHover={{ y: -2 }}
  className="group relative flex flex-col gap-6 border border-border bg-bg-elev1 p-6 transition-colors duration-500 hover:border-border-hi md:p-7"
>
  {/* header: mono eyebrow + optional meta */}
  {/* body: title + description */}
  {/* footer: optional CTA + optional sparkline */}
</motion.div>
```

Card anatomy:
- Border `1px --border` → `--border-hi` on hover (500ms ease-out-quart).
- Background `--bg-elev1`.
- Hover lift `y: -2px`.
- Internal padding `p-6 md:p-7`; hero cards use `p-7 md:p-9`.
- Optional `→` corner tick top-right, fades in on hover.

### 5.3 Multi-pane frame (for app-style surfaces)

```tsx
<div className="relative overflow-hidden rounded-md border border-border bg-bg-elev1">
  <div className="flex h-[640px] md:h-[720px]">
    <Pane side="left" />     {/* w-[200-260px], border-r, optionally hidden on mobile */}
    <div className="flex flex-1 flex-col">
      <Pane top />           {/* h-14, border-b */}
      <Pane tabs />          {/* border-b, layoutId underline */}
      <div className="flex-1 overflow-hidden bg-bg-base p-6">
        {/* Active tab body — AnimatePresence mode="wait" */}
      </div>
    </div>
  </div>
</div>
```

Swap the panes for whatever your app needs: filters, navigation, list, detail, preview. Same anatomy covers portfolios, admin shells, content managers.

### 5.4 Buttons & CTAs

```tsx
<PrimaryCTA variant="outline" size="md">{{CTA_PRIMARY}} →</PrimaryCTA>
<PrimaryCTA variant="solid"   size="md">{{CTA_PRIMARY}}</PrimaryCTA>
```

- Border: `1px --fg` (solid) or `1px --border-hi` (outline).
- Padding: `px-6 py-3` (md), `px-3 py-1.5` (sm).
- **Hover:** white fill slides up from `translate-y-full → translate-y-0` over **500ms ease-out-quart**, text color inverts to `--bg-base`.
- **Magnetic:** `strength: 0.25`. Spring `{ stiffness: 220, damping: 18, mass: 0.4 }`.

### 5.5 Inputs & chips

- **Single-line input:** border `--border`, background `--bg-elev2`, radius `2px`, mono placeholder, `py-3` min height.
- **Chip:** `rounded-sm border border-border bg-bg-base px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em]`.
- **Active chip:** `border-fg bg-fg text-bg-base`.
- **Text caret:** `inline-block h-4 w-[1.5px] bg-fg` blinking `opacity: [1,0,1]` over `1s linear`.

### 5.6 Status & badges

| Variant             | Dot                                  | Use                          |
| ------------------- | ------------------------------------ | ---------------------------- |
| Live / running      | `bg-fg` + pulsing ring `bg-fg/60`    | Active, recent, in-progress  |
| Idle / paused       | `bg-fg-muted` no pulse               | Quiet states                 |
| Attention / error   | `bg-fg-dim` + slower pulse           | Needs human action           |
| "auto" pill         | `border-border-hi bg-bg-elev2`       | Automation indicator         |

### 5.7 Navigation

- **Top nav:** fixed, blurs on scroll. `bg-bg-base/70 backdrop-blur-md`, border-bottom fades from transparent → `--border` after `12px` of scroll.
- **Sidebar items:** `px-3 py-2`, hover `x: 2` via Framer, active item gets `bg-bg-elev2` and a `1px × 16px` left bar in `--fg`.
- **Tabs:** mono caps, `0.18em tracking`, active underline animates via Framer `layoutId="tab-underline"`, transition `0.5s ease-out-quart`.
- **Section anchor links:** mono caps, color `fg-muted → fg` on hover, no underline.
- **Breadcrumbs:** `{{A}} / {{B}} / {{C}}` separated by `/` in `fg-dim`.

### 5.8 Modal / command palette

- **Overlay:** `bg-bg-base/70 backdrop-blur-sm`, fade 180ms.
- **Panel:** `max-w-[620px]`, `rounded-md`, `border-border-hi`, `bg-bg-elev1`, `shadow-2xl`.
- **Input row:** bottom-border-only, mono `⌘K` prefix, `esc` suffix in `fg-dim`.
- **Items:** `rounded-sm px-3 py-2.5`, hover `bg-bg-elev2`.
- **Footer:** mono caps with `↑↓ navigate · ↵ run · esc close`.
- Keyboard: `⌘K` toggle, `/` open, `↑↓` navigate, `Enter` run, `Esc` close.

### 5.9 Sparkline (hand-rolled SVG)

```tsx
<svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
  <defs>
    <linearGradient id="grad-std" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%"   stopColor="rgba(250,250,250,0.18)" />
      <stop offset="100%" stopColor="rgba(250,250,250,0)" />
    </linearGradient>
  </defs>
  <path d={areaPath} fill="url(#grad-std)" />
  <path d={linePath} stroke="#fafafa" strokeWidth="1.25" fill="none"
        strokeLinecap="round" strokeLinejoin="round" />
  {/* hover crosshair: dashed vertical + 3r circle, 1.5px halo */}
</svg>
```

- **No chart library.** ~12 lines. Full control over strokes, gradients, hover.
- Hover: dashed vertical `rgba(250,250,250,0.12)`, 3px dot, 1.5px halo.

---

## 6. Motion

### 6.1 The single easing curve

**`cubic-bezier(0.22, 1, 0.36, 1)` — "out-quart."** Calm, decelerating, never bouncy.

- Framer: `ease: [0.22, 1, 0.36, 1]`
- CSS: `--ease-out-quart`, `ease-out-quart` (Tailwind utility)
- GSAP: prefer raw `[0.22, 1, 0.36, 1]` for exact match.

### 6.2 Duration tokens

| Motion                          | Duration      |
| ------------------------------- | ------------- |
| Micro (hover, color)            | `150–300ms`   |
| Standard (entrance, tab)        | `400–700ms`   |
| Deliberate (hero, section)      | `900–1400ms`  |
| Scroll-tied scrub               | `scrub: 0.6`  |

### 6.3 Entrance pattern (default for everything that enters)

```tsx
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-10% 0px' }}
transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
```

- Stagger children with `delay: i * 0.06–0.12`.
- For stagger-by-row grids: `(idx % cols) * 0.1`.

### 6.4 Layout & presence

- **Tab swap:** `AnimatePresence mode="wait"` + per-tab `{ initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.4 } }`. Shared underline via `layoutId="tab-underline"`.
- **Modal:** `initial: { opacity: 0, y: 16, scale: 0.98 } → animate: { opacity: 1, y: 0, scale: 1 }`, exit mirrors, `duration: 0.24`.

### 6.5 Pointer-driven motion

- **Magnetic buttons:** Framer `useMotionValue` + `useSpring` (stiffness 220, damping 18, mass 0.4).
- **Parallax:** damped springs (stiffness 60, damping 18) at increasing depth multipliers `8, 18, 32, 48`.
- **Typewriter:** `setInterval` at **14ms per char**, then staged reveals (e.g. bullets +200ms, meta +600ms).
- **CountUp:** RAF over **1.1s** with `easeOutQuart = 1 - (1-t)^4`. Integer-round for stability.

### 6.6 Continuous motion (only when state demands it)

- **Status pulse:** `scale: [1, 2.6, 1]`, `opacity: [0.6, 0, 0.6]`, `1.8s easeOut infinite`.
- **Activity ping:** `animate-ping` on `bg-fg/60` halo.
- **Geometric micro-vizes** (rings, nodes, bars): `8–12s linear infinite` rotate, or `2.6s easeInOut` scale loops.
- **Idle CTA opacity breathe:** `[0.45, 1, 0.45]` over `2.4s easeInOut`.
- **Scroll indicator (↓ ↓):** `y: [0, 6, 0]` over `1.8s easeInOut`.

### 6.7 Reduced-motion fallback

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

In components, also gate heavy motion with `useReducedMotion()` (matchMedia-based). Drop particle counts, disable scrub, skip the typewriter.

---

## 7. Atmospheric layers

Three subtle layers compose "depth" on a canvas. Use **one or two** per section — never stack all of them everywhere.

### 7.1 Grain

```css
.grain::after {
  content: '';
  position: fixed; inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.035;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}
```

Apply to `<body>` for a global film-grain texture. Inline SVG, no asset request.

### 7.2 Grid backdrop

```css
.grid-bg {
  background-image:
    linear-gradient(to right,  rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 48px 48px;
  background-position: -1px -1px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
}
```

Apply to section backdrops. Always fade to transparent at edges via `mask-image` radial.

### 7.3 Vignette

```css
.vignette::before {
  content: '';
  position: absolute; inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse at center,
    transparent 0%, transparent 55%,
    rgba(8, 8, 11, 0.6) 100%
  );
}
```

For hero / focal canvases. Pulls the eye to center.

### 7.4 Focal glow

```tsx
<div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_70%)]" />
```

A subtle white radial behind a centerpiece (mesh, hero CTA, photo).

### 7.5 Decorative numerals / glyphs

Floating mono chars (`π`, `φ`, `∇`, `Σ`, `∞`, or your domain's symbols) at `text-fg-dim`, positioned absolutely at section corners. Pure atmosphere, never read.

---

## 8. Iconography

**No icon library.** Use Unicode glyphs and mathematical symbols:

| Glyph            | Meaning                       |
| ---------------- | ----------------------------- |
| ◐ ◑ ◒ ◓         | Quarter states, status        |
| ◆ ◇ ✦ ◈         | Categories, items, sections   |
| ⊡ ⊕ ⊗           | Layouts, settings, toggles    |
| ✕                | Brand mark, close, dismiss    |
| →                | Forward, hover affordance     |
| ↑ ↓ ← →         | Directional                   |
| ⌘ ↵ ⌫ ⌥          | Keyboard keys                 |
| ·                | Separator (mono)              |

**Sizes:** `12–14px` for inline nav, `10–11px` mono for metadata. Color: `fg`, `fg-muted`, or `fg-dim`.

If you must use an icon library (Phosphor, Lucide), constrain to **1.25–1.5px stroke**, **16–20px**, and never recolor away from the white scale.

---

## 9. Section anatomy

Every page section follows this template:

```tsx
<section id="{{SECTION_ID}}" className="relative w-full border-t border-border py-16 md:py-24">
  <OptionalBackground />            {/* grid-bg or vignette, absolute, pointer-events-none */}
  <Container size="wide" className="relative">
    <SectionHeading title="…" muted="…" body="…" />
    {/* content composed from primitives */}
  </Container>
</section>
```

- **Border-top** on every section after the first.
- **Vertical rhythm:** `py-16 md:py-24`.
- **Heading margin:** `mb-16 md:mb-20`; hero sections `mb-20 md:mb-24`.
- **Background layers** sit `absolute inset-0 pointer-events-none`; container sits `relative`.

---

## 10. Surface patterns (generic)

Six reusable patterns. Pick the ones that fit your content — you don't need all of them.

### 10.1 Full-bleed focal surface

For openings, "above the fold" moments.

- Full viewport height: `h-[100svh]`.
- Optional 3D / WebGL canvas absolute-inset behind.
- Mono eyebrow with pulsing dot → `clamp(44–88px)` headline with two-line break (`fg` then `fg-muted`) → short paragraph.
- Magnetic CTA + mono status strip with `·` separators.
- Bottom-edge marquee in mono caps with `◇` separators.
- Scroll hint: double `↓` bobbing on `y: [0, 6, 0]`.

### 10.2 Single-card query surface

For search bars, AI prompts, command inputs.

- Single card `rounded-sm border-border bg-bg-elev1`.
- Header row: pulsing dot + product tag + shortcut hint (`⌘K`).
- Prompt row: `>` glyph + active input + blinking caret.
- Optional answer panel: mono label, then typewriter body, then staggered bullets (`·`), then meta row (sources / confidence / trace).

### 10.3 N-step grid (3–4 columns)

For "how it works," process breakdowns, process pipelines.

- Grid with `gap-px bg-border` for hairline dividers — OR individual `border` cards with `gap-px`.
- Each step: index top-left, optional geometric micro-viz top-right, title, description, mono meta line bottom-right.
- Hover: corner tick `→` fades in over 500ms.
- Optional: SVG connector line above the row, drawn via GSAP `stroke-dashoffset` tied to scroll (`scrub: 0.6`).

### 10.4 Multi-pane workspace frame

For app-style surfaces (dashboards, admin panels, editors).

- Outer frame: `rounded-md border border-border bg-bg-elev1 overflow-hidden`.
- `Sidebar` (200–260px) + `TopBar` (h-14) + tab strip + content area.
- Inner KPI / metric grids: 2 cols mobile / 4 cols desktop, `gap-px bg-border` for hairline separators.
- Tabs swap with `AnimatePresence` + `layoutId` underline.
- Tables: header `bg-bg-elev2`, rows hover `bg-bg-elev2`, left-dot status, tabular numbers right-aligned.
- Lists/feeds: 28px circular icon, title + mono meta row, `divide-[var(--border)]`.

### 10.5 2-col (or n-col) card grid

For portfolio items, project listings, job boards, content cards.

- Grid with `gap-px bg-border` for hairline dividers, OR individual `border` cards with regular gap.
- Each card: optional status indicator + index + title + meta.
- Optional internal block: mono-label column 1 → mono column 2 (good for `when → to`, `from → to`, `trigger → result`).
- Footer: sparkline + stats row, tabular numbers.

### 10.6 Centerpiece with parallax atmosphere

For a closing / signature moment.

- 1:1 aspect square, max ~640px, centered.
- Optional mesh / sphere / custom geometry inside.
- Parallax layers behind: distant grid → mid grid → floating glyphs → radial glow.
- Hover hint with `<kbd>` elements, fades in on `group-hover`.
- Pointer-tilt via `useMotionValue` + `useSpring`.

---

## 11. Footer

Three-column layout (5/3/4 or 4/3/3 — adjust to your content), top border, `py-20 md:py-28`:

- **Brand column:** `BrandMark`, short paragraph, optional `StatusPulse`.
- **Nav column:** mono caps heading, link list with arrow that fades in on hover.
- **CTA column:** mono caps heading, short paragraph, `PrimaryCTA`.
- **Bottom strip:** `border-t`, mono caps with `·` separators: copyright, project tag, version, optional shortcuts, motto.

---

## 12. Interaction patterns

| Input                              | Effect                              |
| ---------------------------------- | ----------------------------------- |
| `⌘K` / `Ctrl-K`                    | Toggle command palette              |
| `/` (outside inputs)               | Open palette                        |
| `Esc`                              | Close palette                       |
| `↑` / `↓`                          | Navigate palette                    |
| `Enter`                            | Run palette action                  |
| `G` then `{{KEY}}` (`H`, `P`, `S`…) | Jump sections (≈800ms arm window)   |
| Scroll past 12px                   | Nav blur + border-bottom            |
| Hover card                         | `y: -2`, border → `--border-hi`     |
| Hover CTA                          | White fill slides up, text inverts  |
| Hover sparkline                    | Dashed crosshair + dot snap         |

For cross-component triggers, use a tiny pub/sub (~25 lines) or `window.dispatchEvent(new CustomEvent('{{APP}}:event-name'))`. No state library needed.

---

## 13. Engineering rules

1. **Single source of truth.** Tokens in CSS variables → Tailwind theme → components. Never hard-code.
2. **Hand-rolled over library.** No chart libraries (Sparkline is ~12 LOC SVG). No UI kits. No animation presets.
3. **Determinism.** Seeded RNG (`mulberry32(1337)`), static mock data, no flicker on hydration.
4. **Performance budgets.**
   - DPR clamped to `[1, 1.5]`.
   - R3F / 3D / canvas components lazy-loaded via `next/dynamic { ssr: false }` (or equivalent).
   - Shader / render-loop uniform writes happen inside the render frame against refs — **zero React re-renders from the loop**.
   - State updates in RAF throttled to integer changes.
5. **Accessibility.**
   - Visible focus rings (1px white, 2px offset).
   - `prefers-reduced-motion: reduce` honored globally and per-component.
   - Semantic HTML — `<section>`, `<header>`, `<footer>`, `<main>`, `<aside>`, `<nav>`, `<table>`, `<button>`, `<kbd>`.
   - All interactive elements keyboard-reachable.
6. **File organization.**
   ```
   primitives/   # Container, Reveal, Marquee, MagneticButton, BrandMark, PrimaryCTA, SectionHeading, StatusPulse, Sparkline, CountUp
   components/   # Feature/section components (composed from primitives)
   hooks/        # useReducedMotion, usePointer, useScrollProgress
   lib/          # mockData, seeded random, helpers
   ```

---

## 14. Copy voice

- **Short.** Headlines ≤ 6 words. Body ≤ 14 words per sentence.
- **Mono metadata.** All eyebrows, captions, status lines in mono caps.
- **Punctuation.** Em-dash (—) for asides, never " - ".
- **Arrow `→`** for affordances (`{{CTA_PRIMARY}} →`, `Open →`, `Begin →`).
- **No exclamation marks. No emoji.** Calm, technical, considered.

---

## 15. Apply checklist

When porting this theme to a new project:

- [ ] Set `color-scheme: dark` and `theme-color` in viewport meta.
- [ ] Load Geist Sans + Mono via `geist/font/*` with zero CLS.
- [ ] Define the 11 CSS variables in `:root`.
- [ ] Mirror them in `tailwind.config.ts`.
- [ ] Build the primitives before any feature surface.
- [ ] Compose every section from primitives — never copy a card layout.
- [ ] Use only the single ease-out-quart curve.
- [ ] Hand-roll `Sparkline`, `CountUp`, `StatusPulse`, `MagneticButton`.
- [ ] Replace every `{{TOKEN}}` in this file with your product's values.
- [ ] Apply grain to `<body>`, grid-bg to alternating sections.
- [ ] Set up command palette + global shortcuts + custom event bus.
- [ ] Honor `prefers-reduced-motion` in CSS and per-component.
- [ ] Verify focus rings, semantic HTML, AA contrast on muted text.
- [ ] Lazy-load any 3D / canvas components.
- [ ] Test with seeded RNG so first paint is reproducible.

---

## 16. When *not* to use this theme

- Consumer products that need warmth (use a soft pastel system).
- Editorial / publishing where typography is the brand itself.
- Products where status colors are first-class (fintech, healthcare ops) — this system intentionally suppresses status color; you'll need a parallel warning system.
- Light-mode-only products — this theme is **dark-only by conviction**.

For everything else — dev tools, dashboards, portfolios, AI products, data surfaces, agency sites, technical SaaS — this theme is ready. Apply the section patterns you need, fill the tokens, ship.