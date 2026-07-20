# Xai -- Product Specification

**From raw data to decisions.**

This document explains the product idea and how it became a concrete interface.
It is short on purpose. Each section answers three questions: what is the core
idea, why was it made this way, and what is unique about it.

---

## 1. The product idea

Xai is an intelligence workspace. It pulls raw data from any source, structures
it into something queryable, and surfaces what matters in plain English -- with
sources cited and automations running.

The whole product sits on three claims:

- Ingestion should be invisible.
- Reasoning should be legible.
- Action should be automatic.

The prototype is one scroll. It walks a viewer through those three claims in
order, each section doing one job well. No feature sprawl. No marketing fluff.

---

## 2. Page structure

The page is one continuous scroll. A fixed top nav. Seven sections. A footer.
A command palette floats above everything and is reachable from anywhere.

The order matters. Each section is a translation step from concept to surface:

1. **Hero** -- translates "intelligence" into a visual metaphor.
2. **AskXai** -- translates "plain English" into something you can run.
3. **InsightFlow** -- translates "automatically" into a process you scroll.
4. **DashboardPreview** -- translates "workspace" into a product you could use.
5. **Automations** -- translates "without being asked" into a job grid.
6. **SignatureSection** -- translates "craft" into one memorable interaction.

---

## 3. Section by section

### Hero

**Core idea.** First impression and the activation moment. The viewer has to
feel Xai doing something, not describing itself.

**Why this shape.** A 1,500-point particle field sits behind the headline. At
rest the points drift as a chaotic cloud. A single Activate button triggers a
deterministic six-second morph: particles converge onto a 12-node intelligence
graph, category labels fade in, and a three-parameter status strip counts up
in lockstep -- records, categories, index percentage.

**What is unique.** The button does not link to a demo. It triggers the page
itself. The product is the presentation.

---

### AskXai

**Core idea.** Demonstrate the natural-language surface and prove every answer
cites its sources.

**Why this shape.** Four real-looking business questions sit as chips below a
prompt. Selecting one types an answer character by character, then reveals
bulleted findings, source citations, a confidence number, and a trace link.
A lineage strip underneath names the data sources Xai pulls from.

**What is unique.** The typing starts on its own when you scroll into the
section. There is no "submit" button. Asking is the interaction.

---

### InsightFlow

**Core idea.** Explain the pipeline in three plain steps with a drawn
connector.

**Why this shape.** Three cards -- Ingest, Analyze, Surface -- pinned with a
single scroll trigger. An SVG line draws between them as you scroll, so
progression is felt, not just read. Each card carries its own geometric
micro-visual: a rotating ring, a node graph with a traveling packet, a
pulsing bar chart.

**What is unique.** Scroll progress is the only animation primitive here.
There is no auto-play, no click to advance. Reading and motion are the
same gesture.

---

### DashboardPreview

**Core idea.** Show the actual product surface -- a workspace, not a
screenshot.

**Why this shape.** A real-feeling product frame: sidebar nav, top bar with
breadcrumbs and search, KPI grid with animated count-ups, a dataset table, an
activity feed. Three tabs (Live now, Insights, Automations) swap content with
a shared layout underline that slides between them.

**What is unique.** Nothing here is a picture. Every number counts up, every
sparkline is a hand-rolled SVG path, the auto-cycle demo rotates tabs every
few seconds so a viewer can see the swap without clicking.

---

### Automations

**Core idea.** Show Xai doing work without being asked.

**Why this shape.** A 2x2 grid of scheduled jobs. Each card shows the trigger,
the destination, the schedule, last fired, run count, success rate, and a
sparkline of recent runs. Status ranges from idle to running to attention.

**What is unique.** These are not screenshots of someone else's product. The
four jobs -- daily revenue snapshot, refund-rate anomaly alert, weekly cohort
refresh, schema drift detector -- are written to feel like the real schedule
of a data team that uses this thing every day.

---

### SignatureSection

**Core idea.** Payoff. A single memorable interaction that signals craft.

**Why this shape.** A cursor-reactive icosahedron over four parallax layers,
each translating at a different depth. Pressing X explodes the mesh into 12
octahedron shards that ease outward to fixed positions and tumble gently.

**What is unique.** The signature is also an easter egg. Keyboard shortcut X,
or the command-palette action, shatters the mesh in front of the viewer. It
exists to demonstrate that animation can be a reward, not a decoration.

---

## 4. Cross-cutting

**Top nav.** Fixed. Brand mark, three anchor links, a palette trigger, a
primary CTA. Blurs in once you scroll.

**Command palette.** Open with Cmd/Ctrl-K or `/`. Fuzzy search across the
sections, specific insights, automations, demo commands, and a help entry.
Arrow keys to move, Enter to run, Escape to close. Press G then a letter to
jump to a section.

**Reduced motion.** Every animated surface has a still or simplified
fallback. Particle count drops, the GSAP pin is bypassed, marquee loops stop.

---

## 5. Why these choices

Restraint over decoration. The only accent is white on near-black. Every
animation is tied to scroll, pointer, a real render metric, or a user action.
There are no chart libraries and no UI kits -- every pixel is reasoned about,
every motion is earned.

The page is one scroll because the product is one workflow. Ingest, reason,
ask, surface, automate. The viewer should finish the page understanding the
loop without having been told.

---

## 6. Deliverables

- **Live prototype** -- this Next.js app, Vercel-ready.
- **Figma file** -- eight pages, per FIGMA_PLAN.md.
- **Walkthrough** -- two-and-a-half-minute Loom, per LOOM_SCRIPT.md.

---

v0.1 prototype. All design decisions intentional.






# Xai — Intelligence Workspace

A high-fidelity interactive prototype. Single-page experience that walks through how Xai turns raw data into structured intelligence, surfaces it as answers, and acts on it automatically.

Built as a frontend challenge submission. The goal was taste, restraint, motion craft, and engineering discipline — not feature breadth.

## Quick start

```bash
npm install
npm run dev
# → http://localhost:3000
```

Open `⌘K` (or `/`) for the command palette. Press `X` anywhere to shatter the signature mesh. Hold `g` then press `h` / `f` / `p` / `a` / `s` / `t` to jump between sections.

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Framer Motion** — micro-interactions, layout animations, presence, count-ups, magnetic pointers
- **GSAP + ScrollTrigger** — pinned scroll stage in Insight Flow
- **React Three Fiber** (Three.js) — Hero particle field + Signature icosahedron
- **Geist Sans + Geist Mono** via `next/font` — zero CLS
- No UI kit. No chart library. No Lottie. Every component is hand-built.

## Page structure

The page is one scroll with a fixed top nav and seven sections, plus a footer. `app/page.tsx` composes them in order.

| # | Section | Id | What it does |
|---|---|---|---|
| — | **TopNav** | — | Fixed header, blurs on scroll. Brand mark, anchor links (`Ask / Process / Product / Automations / Signature`), `⌘K` trigger, primary CTA. |
| 1 | **Hero** | `#hero` | 1,500-point particle field rendered with a custom GLSL shader. At rest, points drift in a chaotic cloud. An **"Activate Xai"** button triggers a deterministic 6s morph: particles converge onto a 12-node icosahedral constellation, category labels fade in, and a 3-parameter status strip (records / categories / index %) ticks in lockstep. Marquee strip across the bottom edge. |
| 2 | **AskXai** | `#ask` | The natural-language query surface. Four sample questions as chips; selecting one types the answer character-by-character, then reveals bulleted findings, source citations, confidence %, and a trace link. A lineage strip below names the data sources Xai pulls from. |
| 3 | **InsightFlow** | `#flow` | Pinned GSAP scroll stage. Three steps (`Ingest → Analyze → Surface`) with an SVG connector line that draws as you scroll. Each card carries its own geometric micro-visual. |
| 4 | **DashboardPreview** | `#dashboard` | The actual product surface. Sidebar nav, top bar with breadcrumbs/search/user, KPI grid with animated count-ups and hand-rolled SVG sparklines, dataset table, activity feed. Three tabs (`Live now / Insights / Automations`) swap with `AnimatePresence` + `layoutId` underline. A demo command (`xai:demo-cycle`) auto-cycles tabs every 4.5s. |
| 5 | **Automations** | `#automations` | A 2×2 grid of scheduled jobs — triggers, destinations, schedules, success rates, and per-job sparklines. Demonstrates Xai doing work without being asked. |
| 6 | **SignatureSection** | `#signature` | Cursor-reactive icosahedron over four depth-based parallax layers. A pointer-watching R3F mesh, orbit rings, headline glow, and (in `ReactiveObject`) a `ReactiveObject` mesh that responds to pointer tilt and a global `xai:explode` event. Hover hint surfaces the `X` keyboard shortcut. |
| — | **Footer** | — | Brand column with status pulse, navigate column, CTA column, and a mono footer strip noting `⌘K · command palette` and `v0.1 · prototype`. |

A global **Command Palette** (`CommandPalette`) is mounted in `app/layout.tsx`. Open it any time with `⌘K` / `Ctrl-K` or `/`. Fuzzy search over navigation, insights, automations, demo commands, and help.

## Interaction map

| Input | Effect |
|---|---|
| `⌘K` / `Ctrl-K` | Toggle command palette |
| `/` (outside inputs) | Open command palette |
| `Esc` (palette open) | Close |
| `↑` / `↓` / `Enter` | Navigate / run palette action |
| `G` then `H / F / P / A / S / T` | Jump to Hero / Flow / Product / Automations / Signature / Top |
| `X` | Fire `xai:explode` — shatters the signature icosahedron |
| Palette → "Auto-cycle dashboard tabs" | Toggles `xai:demo-cycle` (4.5s tab rotation, "auto" badge visible) |
| Palette → "Stop demo" | Stops the cycle |

## Animation decisions

| Concern | Choice | Why |
|---|---|---|
| 3D centerpiece | Custom GLSL on R3F Points | Every pixel reasoned about. No stock particle libraries. |
| Hero activation | 6s deterministic RAF + eased progress + integer-percent state throttling | User feels the system arriving; no janky continuous re-renders. |
| Scroll-tied animation | One GSAP context, one ScrollTrigger | Used only for things Framer can't do: pinning and `stroke-dashoffset` draw. |
| Micro-interactions | Framer Motion variants + Tailwind transitions | Cheap, composable, SSR-friendly. |
| Pointer parallax | `motionValue` + `useSpring` in Framer | Damped, cheap, no manual RAF. |
| Magnetic buttons | Framer `motionValue` x/y + spring | CTAs gently follow pointer, snap back on leave. |
| Tab swap | `AnimatePresence` + `layoutId="tab-underline"` | Shared layout animation, no jank. |
| Sparkline | Hand-written SVG path | No chart lib. ~12 lines, full control. |
| Hero status numbers | `requestAnimationFrame` + integer-percent throttle | Calm, RAF-budget friendly, no React re-renders per frame. |
| Typewriter answers | `setInterval` at 14ms per char, then staged reveal | Reads as "thinking, then output". |
| First-frame determinism | `mulberry32(1337)` seeded RNG | No FOUT, no flicker on hydration. |
| Numbers animating in | `CountUp` over 1.1s with `out-quart` | Calm, not bouncy. |
| Shader uniform writes | Inside `useFrame`, refs only | Zero React re-renders from the render loop. |

## Engineering discipline

- **Single source of truth for tokens** — CSS variables in `app/globals.css` (`--bg-base`, `--fg`, `--ease-out-quart`, etc.) referenced by the Tailwind theme extension.
- **Eight reusable primitives** — `Container`, `Reveal`, `Marquee`, `MagneticButton`, `BrandMark`, `PrimaryCTA`, `SectionHeading`, `StatusPulse`. Every page surface is composed from these; nothing duplicates base styling.
- **No copy-pasted surfaces** — `DashboardPreview`'s three tab bodies, `Automations`'s job grid, and `AskXai`'s answer panel all reuse `Sparkline`, `StatusPulse`, `SectionHeading`, `Reveal`, `KpiCard`, `DataTable`, `ActivityFeed`.
- **Tiny palette store** — `palette/store.ts` is a ~25-line module-scoped pub/sub. No Zustand. The trigger button calls `togglePalette()`, the `<CommandPalette>` component subscribes via `subscribePalette`.
- **Determinism** — seeded RNG + static mock data. First paint is reproducible.
- **Performance**
  - Hero: 1,500 points, custom shader, ~60 fps target; falls back to 600 under `prefers-reduced-motion`.
  - DPR clamped to `[1, 1.5]`.
  - R3F components lazy-loaded via `next/dynamic` with `ssr: false` (`Hero/ParticleField`, `Signature/ReactiveObject`).
  - State updates in the RAF loop are throttled to integer changes; shader uniform writes happen inside `useFrame` against refs.
- **Accessibility**
  - Visible focus rings (1px white, 2px offset).
  - `prefers-reduced-motion: reduce` honored globally and per-component (`useReducedMotion` hooks the GSAP stage; particle count drops).
  - Color contrast: white on near-black — well above WCAG AAA.
  - Keyboard nav works end-to-end (tab, anchor, palette, shortcuts).
  - Semantic HTML — `<section>`, `<header>`, `<footer>`, `<main>`, `<aside>`, `<nav>`, `<table>`, `<button>`, `<kbd>`.

## File map

```
app/
  layout.tsx              Geist fonts, dark theme, grain, palette mount
  page.tsx                Section composition (TopNav → Hero → AskXai → … → Footer)
  globals.css             Tokens, reset, grain, marquee keyframes
src/
  components/
    nav/
      TopNav.tsx                Fixed header; blurs on scroll
    hero/
      Hero.tsx                  Section + copy + Activate button + 3-param status + marquee
      ParticleField.tsx         R3F canvas, pointer + scroll wiring
      CategoryOverlay.tsx       12 nodes with explicit anchor placements, fade-in over last 2s of morph
      shaders/
        particles.vert.ts       GLSL: chaos → constellation morph
        particles.frag.ts       GLSL: soft round point + twinkle
    ask/
      AskXai.tsx                Query surface: chips → typewriter answer → bullets → meta
      LineageStrip.tsx          Source chips with staggered fade-in
    flow/
      InsightFlow.tsx           Pinned GSAP stage + SVG line draw
      FlowConnector.tsx         3-card grid (uses StepVisual)
      StepVisual.tsx            Per-step geometric micro-viz
    dashboard/
      DashboardPreview.tsx      Tab composition + demo-cycle event listener
      Sidebar.tsx
      TopBar.tsx
      KpiCard.tsx               Count-up KPI with sparkline
      CountUp.tsx               Out-quart number animation
      Sparkline.tsx             Hand-rolled SVG
      DataTable.tsx
      ActivityFeed.tsx          Live pulsing indicator
    automations/
      Automations.tsx           2×2 grid: trigger → destination, sparkline, run stats
    signature/
      SignatureSection.tsx      Wrapper + section heading + CTA
      ReactiveObject.tsx        R3F cursor-reactive icosahedron (responds to xai:explode)
      ParallaxLayers.tsx        4-layer pointer-driven parallax
    palette/
      CommandPalette.tsx        Fuzzy-search palette + PaletteTrigger button
      store.ts                  ~25-line module-scoped pub/sub
    primitives/
      Container.tsx             Width tokens (narrow 920 / default 1200 / wide 1440)
      Reveal.tsx                IntersectionObserver-driven entrance, polymorphic element
      Marquee.tsx               Duplicate-and-scroll CSS marquee
      MagneticButton.tsx        Pointer-spring anchor or button
      BrandMark.tsx             ✕ wordmark + size variants
      PrimaryCTA.tsx            Magnetic outline/solid CTA primitive
      SectionHeading.tsx        Title / muted-line / body w/ staggered Reveal
      StatusPulse.tsx           Animated dot with optional label
    Footer.tsx                  Brand + nav + CTA + mono strip
  hooks/
    useReducedMotion.ts         MatchMedia-driven boolean
    usePointer.ts               Normalized pointer position with smoothing
    useScrollProgress.ts        Per-section + page-level scroll 0..1
  lib/
    random.ts                   Seeded mulberry32 + 12-attractor layout
    mockData.ts                 KPIs, table rows, activity, flow steps
```

## Design system

- **Background** — `#08080B` (near-black, faint blue undertone). Two elevation tokens (`--bg-elev-1`, `--bg-elev-2`).
- **Accent** — `#FAFAFA` (white). Single accent by design. Restraint signals taste.
- **Type** — Geist Sans (display + body), Geist Mono (numerals, labels, metadata). Loaded via `geist/font/*` — zero CLS.
- **Spacing** — 4pt grid via Tailwind defaults, plus three container widths: `narrow` (920), `default` (1200), `wide` (1440).
- **Radii** — `rounded-sm` (2px) for chips/buttons, `rounded-md` (6px) for the dashboard frame.
- **Easing** — `cubic-bezier(0.22, 1, 0.36, 1)` (`out-quart`) as the single global default — exposed as the Tailwind `ease-out-quart` utility and the `--ease-out-quart` CSS variable.

## Design principles

- **One accent.** White on near-black. Restraint is the brand.
- **Honest motion.** Every animation is tied to scroll, pointer, real render metrics, or a user action. No decorative looping.
- **No chart libraries, no UI kits.** Every pixel reasoned about.
- **Composed, not duplicated.** KPI cards, table rows, activity items, automations, signature — all share primitives.
- **Deterministic first paint.** Seeded RNG, static mock data, no hydration flicker.
- **Reduced-motion parity.** Every animated surface has a still or simplified fallback.
- **Keyboard + screen-reader reachable.** Visible focus rings, semantic HTML, `prefers-reduced-motion` honored, full keyboard nav.

## Production build

```bash
npm run build
npm run start
```

Framework-agnostic for static deploy. Recommended: **Vercel** (zero config). Also works on Netlify.

```bash
npx vercel --prod
```

## License

Prototype. All design decisions intentional.
