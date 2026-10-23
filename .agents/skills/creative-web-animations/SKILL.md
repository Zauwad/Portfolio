---
name: creative-web-animations
description: Comprehensive reference cookbook for modern creative web animations, generalized aesthetic archetypes, and a master catalog of 12 trending modern website architectures (3D Scrollytelling, Linear-Style SaaS, Editorial Magazine, 3D Product Configurators, OS Simulators, Physics Playgrounds, Infinite Canvas, and more).
tags: [animation, css, gsap, framer-motion, 3d, ui-patterns, webgl, interactive, threejs, shaders, scrollytelling, website-types]
category: frontend
author: Antigravity
metadata:
  version: 4.0.0
---

# Creative Web Animations Cookbook & Reference

A complete, practical reference guide for building modern, award-winning portfolio and web animations (inspired by NHD Portfolio, United Carriers, and Aikah) with pure CSS, GSAP, and Framer Motion.

---

## Part 1: Plain-English CSS Property Dictionary

When building 3D, masked, or kinetic animations, browsers use a few specific CSS properties. Here is what each one actually does, explained using simple real-world mental models:

### 1. `perspective`

* **What it means**: How far away your eyes are from the screen.
* **Mental Model**: If you hold an object 2 inches from your eyes and turn it, the 3D perspective is extreme and dramatic (`perspective: 200px`). If you look at it from across a football field, it looks almost flat (`perspective: 2000px`).
* **Typical Value**: `800px` to `1200px` on the parent container.

```css
.card-container {
  perspective: 1000px; /* Tells browser: "Look at children in 3D perspective" */
}
```

---

### 2. `transform-style: preserve-3d`

* **What it means**: Keep children alive in 3D space instead of squashing them flat.
* **Mental Model**: Without this, the browser takes your 3D elements and flattens them like a 2D drawing onto a single sheet of paper. With `preserve-3d`, it keeps them as real objects floating in a 3D box.

```css
.flipper-card {
  transform-style: preserve-3d; /* Children can rotate in front of or behind each other */
}
```

---

### 3. `backface-visibility: hidden`

* **What it means**: If an element turns its back to you, make it completely invisible.
* **Mental Model**: A playing card. The King of Hearts has artwork on the front and a blue pattern on the back. When rotated 180°, you shouldn't see through the paper. Setting `backface-visibility: hidden` hides the front face when turned away so you only see the back.

```css
.card-front, .card-back {
  backface-visibility: hidden; /* Hide when rotated away from camera */
}
.card-back {
  transform: rotateY(180deg);  /* Pre-turned around */
}
```

---

### 4. `translateZ(1px)`

* **What it means**: Push the element towards your nose by 1 pixel in 3D space.
* **Mental Model**: When two flat stickers are stuck on the exact same surface at the exact same depth (`Z = 0`), graphics cards get confused about which one is on top (called "Z-fighting" or flickering). `translateZ(1px)` lifts one sticker slightly closer to you so it renders cleanly.

---

### 5. `mask-image` (`-webkit-mask-image`)

* **What it means**: A stencil or cookie cutter for an HTML element.
* **Mental Model**: Normal `background-image` paints a picture. `mask-image` decides which parts of an element are transparent and which parts are visible.
  * Where the mask is **black/opaque**, the element is **visible**.
  * Where the mask is **transparent**, the element is **invisible**.
* **Spotlight Example**: A radial gradient that is black in the center and fades to transparent at the edges acts like a flashlight beam revealing the image underneath.

```css
.hero-revealed-image {
  mask-image: radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%);
}
```

---

### 6. `stroke-dasharray` & `stroke-dashoffset` (SVG)

* **What it means**: Turning an SVG line into dashes, then sliding the dashes.
* **Mental Model**:
  1. `stroke-dasharray: 500` turns a line of length 500 into 1 dash of length 500, followed by an empty gap of length 500.
  2. `stroke-dashoffset: 500` pushes the dash 500 pixels off-screen, leaving only the empty gap visible (the line appears blank).
  3. Animating `stroke-dashoffset` from `500` to `0` pulls the solid dash into view, making the line look like it is drawing itself!

```css
.signature-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 2s ease forwards;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}
```

---

### 7. `overflow: hidden` + `translateY(100%)` (The Masked Line Reveal)

* **What it means**: Hiding text under the floor, then raising it up into a window.
* **Mental Model**: Think of looking out of a letterbox. If a letter is below the letterbox opening (`translateY(100%)`), you can't see it because of `overflow: hidden`. As it slides up to `translateY(0)`, it smoothly appears line by line like an editorial magazine headline.

```css
.line-mask {
  overflow: hidden; /* The letterbox window */
}
.line-text {
  transform: translateY(100%); /* Under the floor */
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.line-mask.is-visible .line-text {
  transform: translateY(0);    /* Slides up into view */
}
```

---

### 8. `mix-blend-mode: difference` (The Chameleon Cursor)

* **What it means**: Automatically inverts colors against whatever is underneath.
* **Mental Model**: If your cursor is a white dot:
  * Over a **black background**, `difference` makes it shine **pure white**.
  * Over a **white background**, `difference` flips it to **pure black**!
  * It guarantees high visibility without needing custom JavaScript background checkers.

```css
.custom-cursor-dot {
  background-color: white;
  mix-blend-mode: difference; /* Automatically inverts on light/dark areas */
}
```

---

### 9. `backdrop-filter: blur(12px)`

* **What it means**: Frosted glass.
* **Mental Model**: It doesn't blur the element itself; it blurs whatever is sitting *behind* the element, like looking through a steamy shower door.

```css
.navbar {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px); /* Blurs page content as it scrolls underneath */
}
```

---

## Part 2: Generalized Animation Recipes

---

### Recipe 1: 3D Flip Card (Rotating Flashcard)

*Seen on: NHD Portfolio (Skill Stacks)*

```html
<div class="card-scene">
  <div class="card" onclick="this.classList.toggle('is-flipped')">
    <div class="card-face card-front">
      <h3>React</h3>
      <p>Click to see experience</p>
    </div>
    <div class="card-face card-back">
      <h3>3+ Years</h3>
      <p>"Everything is a component."</p>
    </div>
  </div>
</div>

<style>
.card-scene {
  width: 260px;
  height: 340px;
  perspective: 1000px;
}
.card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}
.card.is-flipped {
  transform: rotateY(180deg);
}
.card-face {
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
  background: #18181b;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.card-back {
  transform: rotateY(180deg) translateZ(1px);
  background: #27272a;
}
</style>
```

---

### Recipe 2: Interactive Spotlight / Torchlight Mask

*Seen on: NHD Portfolio (Hero Portrait)*

```html
<div class="spotlight-wrapper" id="spotlightWrapper">
  <!-- Dim, desaturated background layer -->
  <img src="hero.jpg" class="base-image" alt="Background" />
  <!-- Vibrant top layer revealed by mouse -->
  <img src="hero.jpg" class="revealed-image" alt="Vibrant layer" />
</div>

<style>
.spotlight-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  --spotlight-x: 50%;
  --spotlight-y: 50%;
}
.base-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) brightness(0.6);
}
.revealed-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(1.15) contrast(1.1);
  pointer-events: none;
  mask-image: radial-gradient(circle 350px at var(--spotlight-x) var(--spotlight-y), black 0%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle 350px at var(--spotlight-x) var(--spotlight-y), black 0%, transparent 100%);
}
</style>

<script>
const wrapper = document.getElementById('spotlightWrapper');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  wrapper.style.setProperty('--spotlight-x', `${x}%`);
  wrapper.style.setProperty('--spotlight-y', `${y}%`);
});
</script>
```

---

### Recipe 3: Masked Kinetic Headline Reveal (Editorial Typography)

*Seen on: United Carriers ("EVERY LEG OF THE JOURNEY") and Aikah ("Hi Human...")*

```html
<h1 class="hero-heading">
  <div class="line-mask"><span class="line-inner">ONE OPERATOR</span></div>
  <div class="line-mask"><span class="line-inner">EVERY LEG OF</span></div>
  <div class="line-mask"><span class="line-inner">THE JOURNEY</span></div>
</h1>

<style>
.hero-heading {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 1.05;
  text-transform: uppercase;
}
.line-mask {
  overflow: hidden; /* Hides words when shifted down */
  display: block;
}
.line-inner {
  display: block;
  transform: translateY(110%); /* Below the fold */
  transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}
/* Trigger reveal */
.hero-heading.is-revealed .line-inner {
  transform: translateY(0%);
}
/* Stagger lines */
.hero-heading.is-revealed .line-mask:nth-child(1) .line-inner { transition-delay: 0.1s; }
.hero-heading.is-revealed .line-mask:nth-child(2) .line-inner { transition-delay: 0.25s; }
.hero-heading.is-revealed .line-mask:nth-child(3) .line-inner { transition-delay: 0.4s; }
</style>

<script>
// Trigger on page load or when scrolled into view
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.hero-heading').classList.add('is-revealed');
});
</script>
```

---

### Recipe 4: Infinite Seamless Marquee / News Ticker

*Seen on: United Carriers (Top news ticker) and modern fintech / agency landing pages*

```html
<div class="marquee-track">
  <div class="marquee-content">
    <span>• GLOBAL FREIGHT DISPATCH</span>
    <span>• LIVE AIRPORT & PORT LOGISTICS</span>
    <span>• CUSTOMS BROKERAGE WORLDWIDE</span>
    <span>• REAL-TIME TRACKING</span>
  </div>
  <!-- Exact duplicate for 0-gap seamless looping -->
  <div class="marquee-content" aria-hidden="true">
    <span>• GLOBAL FREIGHT DISPATCH</span>
    <span>• LIVE AIRPORT & PORT LOGISTICS</span>
    <span>• CUSTOMS BROKERAGE WORLDWIDE</span>
    <span>• REAL-TIME TRACKING</span>
  </div>
</div>

<style>
.marquee-track {
  display: flex;
  overflow: hidden;
  user-select: none;
  background: #09090b;
  color: #a1a1aa;
  font-family: monospace;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  padding: 10px 0;
}
.marquee-content {
  flex-shrink: 0;
  display: flex;
  gap: 2rem;
  min-width: 100%;
  animation: scrollMarquee 25s linear infinite;
}
.marquee-track:hover .marquee-content {
  animation-play-state: paused; /* Pause on hover */
}
@keyframes scrollMarquee {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}
</style>
```

---

### Recipe 5: Scroll-Scrubbed Text Reading Highlight (GSAP ScrollTrigger)

*Seen on: United Carriers ("WE MOVE FREIGHT. WE OWN THE OUTCOME.")*

```html
<p class="scrub-paragraph" id="scrubText">
  With every service under one roof and one accountable team,
  your supply chain moves predictably, transparently, and without excuses.
</p>

<script type="module">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// 1. Split text into individual words
const paragraph = document.getElementById('scrubText');
const words = paragraph.innerText.split(' ');
paragraph.innerHTML = words.map(w => `<span class="word">${w} </span>`).join('');

// 2. Animate word opacity bound to scroll progress
gsap.fromTo('.scrub-paragraph .word', 
  { opacity: 0.15 }, 
  {
    opacity: 1,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.scrub-paragraph',
      start: 'top 80%',
      end: 'bottom 40%',
      scrub: 0.5 // Tied directly to scroll wheel
    }
  }
);
</script>
```

---

### Recipe 6: Smooth Inertial Custom Cursor (LERP Physics)

*Seen on: United Carriers & Creative Portfolios*

```html
<div class="cursor-dot" id="cursorDot"></div>
<div class="cursor-ring" id="cursorRing"></div>

<style>
.cursor-dot, .cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  border-radius: 50%;
  z-index: 9999;
  transform: translate(-50%, -50%);
}
.cursor-dot {
  width: 8px;
  height: 8px;
  background: white;
  mix-blend-mode: difference;
}
.cursor-ring {
  width: 36px;
  height: 36px;
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  mix-blend-mode: difference;
  transition: width 0.2s, height 0.2s;
}
</style>

<script>
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  // Dot snaps instantly to mouse
  dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
});

// Linear Interpolation (LERP) smooth trail animation loop
function render() {
  ringX += (mouseX - ringX) * 0.15; // Smooth trailing delay
  ringY += (mouseY - ringY) * 0.15;
  ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
  requestAnimationFrame(render);
}
render();
</script>
```

---

### Recipe 7: SVG Signature / Handwriting Draw

*Seen on: NHD Portfolio (Loading Screen & Hero)*

```html
<svg width="400" height="150" viewBox="0 0 400 150">
  <path
    id="signaturePath"
    d="M 50 100 Q 150 20 250 80 T 350 40"
    fill="none"
    stroke="#ff3366"
    stroke-width="4"
    stroke-linecap="round"
  />
</svg>

<script>
  const path = document.getElementById('signaturePath');
  const length = path.getTotalLength();
  
  // Set dash array to match line length exactly
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
  
  // Trigger animation
  path.animate([
    { strokeDashoffset: length },
    { strokeDashoffset: 0 }
  ], {
    duration: 2500,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    fill: 'forwards'
  });
</script>
```

---

### Recipe 8: Sliding Tab Underline Pill

*Seen on: NHD Portfolio (Nav & Skills category tabs)*

```html
<nav class="nav-tabs">
  <button class="tab active" data-index="0">Home</button>
  <button class="tab" data-index="1">Skills</button>
  <button class="tab" data-index="2">Projects</button>
  <span class="active-indicator" id="indicator"></span>
</nav>

<style>
.nav-tabs {
  position: relative;
  display: inline-flex;
  padding: 6px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.05);
}
.tab {
  position: relative;
  z-index: 10;
  padding: 8px 16px;
  color: #a1a1aa;
  border: none;
  background: none;
  cursor: pointer;
  transition: color 0.2s;
}
.tab.active {
  color: #fff;
}
.active-indicator {
  position: absolute;
  top: 6px;
  bottom: 6px;
  border-radius: 9999px;
  background: #ff3366;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s ease;
  pointer-events: none;
}
</style>

<script>
const tabs = document.querySelectorAll('.tab');
const indicator = document.getElementById('indicator');

function updateIndicator(target) {
  indicator.style.width = `${target.offsetWidth}px`;
  indicator.style.transform = `translateX(${target.offsetLeft}px)`;
}

tabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    tabs.forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    updateIndicator(e.target);
  });
});

updateIndicator(tabs[0]);
</script>
```

---

### Recipe 9: Sticky Stacking Card Deck (Scroll Overlap & Scale Depth)

*Seen on: Apple, Stripe Press, and Premier Awwwards Portfolios*

```jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function StackedCard({ project, index }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  // Scales down slightly as the next card stacks over it
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <div
      ref={cardRef}
      style={{
        position: "sticky",
        top: `calc(100px + ${index * 28}px)`,
        zIndex: index + 10,
      }}
      className="mb-12 w-full"
    >
      <motion.article
        style={{ scale }}
        className="rounded-2xl border border-white/10 bg-zinc-900/90 p-8 shadow-2xl backdrop-blur-xl"
      >
        <h2>{project.title}</h2>
      </motion.article>
    </div>
  );
}
```

---

### Recipe 10: Holographic 3D Card Tilt with Specular Glare

*Seen on: Premium case study cards & interactive previews*

```jsx
import { useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export function TiltCard({ children, maxTilt = 12 }) {
  const cardRef = useRef(null);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    rotateX.set(((y - rect.height / 2) / (rect.height / 2)) * -maxTilt);
    rotateY.set(((x - rect.width / 2) / (rect.width / 2)) * maxTilt);

    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.3,
    });
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setGlare((g) => ({ ...g, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="[perspective:1000px]"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-xl"
      >
        {children}
        {/* Specular Glare Reflection */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 280px at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.45), transparent 80%)`,
            mixBlendMode: "overlay",
          }}
        />
      </motion.div>
    </div>
  );
}
```

---

### Recipe 11: Inertial Magnetic Button Pull

*Seen on: Award-winning interactive landing pages*

```jsx
import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

export function MagneticButton({ children }) {
  const btnRef = useRef(null);
  const springConfig = { damping: 15, stiffness: 180, mass: 0.2 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const onMouseMove = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={btnRef}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="rounded-full px-6 py-3 bg-white text-black font-medium select-none"
    >
      {children}
    </motion.button>
  );
}
```

---

### Recipe 12: Interactive 3D Particle Constellation (Space Dust Canvas)

*Seen on: Aikah & futuristic dark-mode heroes*

```javascript
// High-performance canvas loop with mouse parallax offset
function initParticles(canvas) {
  const ctx = canvas.getContext("2d");
  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  let mouseX = width / 2, mouseY = height / 2;
  window.addEventListener("mousemove", (e) => {
    mouseX += (e.clientX - mouseX) * 0.05;
    mouseY += (e.clientY - mouseY) * 0.05;
  });

  const particles = Array.from({ length: 70 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius: Math.random() * 1.6 + 0.6,
  }));

  function loop() {
    ctx.clearRect(0, 0, width, height);
    const offsetX = (mouseX - width / 2) * 0.03;
    const offsetY = (mouseY - height / 2) * 0.03;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x + offsetX * p.z, p.y + offsetY * p.z, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fill();
    });
    requestAnimationFrame(loop);
  }
  loop();
}
```

---

### Recipe 13: Scroll-Pinned Pipeline / Docking Sequence (Framer Motion)

*Seen on: Premier Awwwards Portfolios, United Carriers, and Ridwanul.dev (Engagements)*

```jsx
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function ScrollPinnedPipeline({ phases }) {
  const containerRef = useRef(null);
  
  // Track vertical scroll progress across the pinned frame
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase 1 is anchored from entry (x: 0, opacity: 1)
  // Phase 2 glides in from offscreen right between scroll 0.12 and 0.44
  // Phase 3 glides in from offscreen right between scroll 0.48 and 0.80
  const phase2X = useSpring(
    useTransform(scrollYProgress, [0.12, 0.44], ["50vw", "0vw"], { clamp: true }),
    { stiffness: 140, damping: 26, mass: 0.35 }
  );
  const phase3X = useSpring(
    useTransform(scrollYProgress, [0.48, 0.80], ["50vw", "0vw"], { clamp: true }),
    { stiffness: 140, damping: 26, mass: 0.35 }
  );

  return (
    // Outer section defines the scroll runway (e.g. 250vh)
    <section ref={containerRef} className="relative h-[250vh]">
      {/* Pinned frame stays fixed in viewport while user scrolls */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
          {/* Card 1: Anchored */}
          <div className="relative">
            <Card data={phases[0]} />
          </div>

          {/* Card 2: Docking bay placeholder + Gliding Card */}
          <div className="relative">
            <DockingBayPlaceholder label="PHASE 02" />
            <motion.div style={{ x: phase2X }} className="relative z-10">
              <Card data={phases[1]} />
            </motion.div>
          </div>

          {/* Card 3: Docking bay placeholder + Gliding Card */}
          <div className="relative">
            <DockingBayPlaceholder label="PHASE 03" />
            <motion.div style={{ x: phase3X }} className="relative z-10">
              <Card data={phases[2]} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## Animation Performance Rules

1. **Only animate `transform` and `opacity`**: Transforms execute on the GPU via the Compositor thread without triggering expensive browser layout recalculations (`reflow`).
2. **Never animate `top`, `left`, `width`, or `height` for motion**: These trigger CPU reflow on every single frame, causing stutter and battery drain.
3. **Use `requestAnimationFrame` for cursor/mouse tracking**: Never run heavy layout math directly inside high-frequency `mousemove` or `scroll` event listeners.

---

## 4. Generalized Aesthetic Archetypes & Motion Systems

| Archetype | Key Aesthetics | Core Animation & Motion Behaviors |
| :--- | :--- | :--- |
| **Editorial Narrative & Kinetic Illustration** | High-contrast serif + monospaced headers, organic pastel/warm paper palettes, hand-crafted SVG micro-doodles, tactile border outlines. | Pinned horizontal journeys, interactive scrub rulers, steam/twinkle micro-keyframes, variable font weight proximity stretch, hover card tilt with border highlights. |
| **Atmospheric Corporate Precision** | Minimalist navy/slate palettes, crisp geometric typography, subtle ambient audio feedback, high-precision SVG icons. | Interactive 3D WebGL coordinate globes, dual-arrow clipped hover sliding links, dynamic section-crossing theme toggles (light/dark navigation transitions). |
| **Spatial Sci-Fi & Telemetry HUD** | Monospaced telemetry tags, crosshairs, deep space dark mode, icy cyan/violet glows, 3D world-space coordinates. | 3D spline camera fly-throughs, 2D screen-space telemetry tracking (`vector.project`), holographic point cloud disintegration/reconstruction. |
| **Tactile Liquid Morphism & Topographic Depth** | Organic contour curves, frosted glass, molten metallic highlights, dark mode with amber/gold accents. | SVG gooey liquid alpha threshold masks, velocity-responsive multi-marquees, pinned card scale-down (shrink-pin) revealing generative background contours. |

---


---

## 5. Master Catalog of 12 Trending Website Types & Architectures

A reference guide for choosing and engineering modern, award-winning website architectures across diverse industries.

| # | Website Type / Paradigm | Industry & Technical Terms | Ideal Use Cases | Core Navigation Axis | Primary UX & Animation Mechanism |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **01** | **3D Spatial Scrollytelling** | Spatial Scrollytelling, 3D Camera Spline Journey, ZUI | Flagship launches, Web3 ecosystems, luxury hardware, games | **Z-Axis (Spatial Depth & Camera Zoom)** | Pinned WebGL viewport; scroll progression scrubs camera along 3D Catmull-Rom spline while 2D HUD telemetry cards synchronize in/out. |
| **02** | **"Linear-Style" SaaS & Dark Bento Grid** | Minimalist Dark SaaS, Bento UI, Spotlight Grid | Developer tools, AI platforms, productivity suites, B2B SaaS | **Y-Axis (Structured Hierarchical Sections)** | High-contrast dark mode, hairline borders (`border-white/10`), interactive bento cards with cursor spotlight masks, status pills, and micro-previews. |
| **03** | **Editorial Typography & Kinetic Magazine** | Neobrutalist Editorial, Type-First Portfolio | Creative directors, architecture studios, fashion houses | **Y-Axis (Asymmetric Multi-Column Stream)** | Oversized display serifs juxtaposed with monospaced metadata, masked kinetic line reveals, and cursor-following floating media previews on link hover. |
| **04** | **3D Product Configurator & Luxury Showcase** | Interactive 3D Turntable, Split-Screen E-Commerce | Luxury horology, automotive, bespoke industrial design | **Dual Split (50% Sticky 3D + 50% Narrative Scroll)** | Half-screen pinned 3D model turntable with real-time material/color switchers, exploded part inspection, and synced technical specification stream. |
| **05** | **Continuous Horizontal Narrative Strip** | Pinned Horizontal Timeline, Strip Scrollytelling | Brand origin stories, interactive case studies, annual reports | **X-Axis (Horizontal Translation)** | Vertical scroll is locked into continuous horizontal canvas translation with multi-plane parallax depth, milestone ticks, and a scrubbable playhead. |
| **06** | **Tactile Desktop OS Simulator** | Retro-Digital Windowing, Y2K Desktop, Cyberpunk OS | Creative developer portfolios, indie games, music artists | **Freeform Windowing (Draggable & Layered)** | Multi-tasking desktop workspace with draggable/resizable floating panels, active z-index focus stacking, window controls, and faux terminal CLI prompts. |
| **07** | **Generative Physics Playground** | 2D Rigid-Body Canvas, Interactive Sticker Box | Creative studios, digital branding agencies, merchandise drops | **Interactive Gravity / Collision Physics** | Matter.js 2D rigid-body gravity box where draggable sticker badges bounce and collide, paired with magnetic cursor pulls and fluid water ripple shaders. |
| **08** | **Infinite Spatial Pan-and-Zoom Canvas** | Infinite Spatial Grid, Miro-like Node Board | Agency project archives, concept visualizers, ecosystem maps | **X + Y + Zoom (Freeform Exploration)** | Boundless 2D/3D matrix plane with momentum drag-to-pan, mouse-wheel pinch-to-zoom scaling ($0.2\times \to 3.0\times$), minimap locator, and clickable coordinate nodes. |
| **09** | **Asymmetric Sticky Split & Stacking Deck** | Sticky Column Deck, Physical Card Accumulator | Design agencies, consultancy offerings, workflow guides | **Dual Column (Sticky Anchor + Stacking Stream)** | 50/50 split where left column anchors editorial headlines while right column stacks cards via `position: sticky; top: calc(...)` with scale-down recession. |
| **10** | **Atmospheric Glassmorphic Corporate** | Geospatial Tech, Enterprise Infrastructure | Global commodities, fintech, cloud security, venture capital | **Y-Axis with Interactive 3D WebGL Anchors** | Deep navy/slate palettes, frosted glass cards (`backdrop-filter: blur(24px)`), ambient sound toggle, and interactive 3D WebGL globe with raycast lat/long pins. |
| **11** | **Architectural Technical Blueprint Grid** | Ruled Grid UI, Monospaced Wireframe Brutalism | Systems engineering, technical whitepapers, research labs | **Strict Modular Grid (Hairline Ruled Lines)** | Visible CSS grid guidelines (`1px solid var(--border)`), corner crosshair markers (`+`), monospaced telemetry tags (`[LAT: 46.81]`), zero blur/shadows. |
| **12** | **Cinematic Video-Scrubbed Canvas** | Scroll-Bound Frame Player, Video Scrollytelling | Automotive reveals, cinematic game teasers, luxury fashion | **Z/Time Axis (Scroll-to-Frame Sync)** | HTML5 canvas scrubbing high-resolution image sequences or video frames frame-by-frame via normalized scroll progress in a 2.39:1 widescreen viewport. |


### Type 01: 3D Spatial Scrollytelling (ZUI / Camera Spline Journey)

To implement a production-grade 3D Scrollytelling website (e.g. spatial camera travel through checkpoints):

1. **Outer Scroll Extender**: Container defining scroll budget (e.g., `h-[500vh]` to `h-[800vh]`).
2. **Pinned Stage**: `sticky top-0 h-screen w-full overflow-hidden` containing the WebGL renderer canvas.
3. **Normalized Scroll Calculation**:
   $$\text{progress} = \frac{\text{scrollY} - \text{offsetTop}}{\text{totalHeight} - \text{viewportHeight}} \in [0.0, 1.0]$$
4. **Camera Spline Interpolation**:
   - Camera Position: `camPath.getPointAt(smoothProgress)`
   - Camera Focus (`lookAt`): `targetPath.getPointAt(smoothProgress)`
5. **Segmented Chapter Windows**:
   - Chapter 01: Active when $\text{progress} \in [0.05, 0.28]$
   - Chapter 02: Active when $\text{progress} \in [0.38, 0.62]$
   - Chapter 03: Active when $\text{progress} \in [0.72, 0.95]$

```jsx
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";

export function SpatialScrollytelling({ chapters }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 1. Define Camera Travel Path (Where the eye moves)
    const cameraSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2, 12),
      new THREE.Vector3(6, 4, 4),
      new THREE.Vector3(-4, 1, -5),
      new THREE.Vector3(0, 3, -14),
    ]);

    // 2. Define Focal Target Path (What the camera looks at)
    const targetSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(2, 0, -2),
      new THREE.Vector3(-2, 0, -8),
      new THREE.Vector3(0, 1, -16),
    ]);

    let targetProgress = 0;
    let currentProgress = 0;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      targetProgress = latest;
    });

    let rafId;
    const render = () => {
      // Damped LERP smoothing for fluid camera inertia
      currentProgress += (targetProgress - currentProgress) * 0.08;

      const p = Math.max(0, Math.min(1, currentProgress));
      const camPos = cameraSpline.getPointAt(p);
      const lookPos = targetSpline.getPointAt(p);

      camera.position.copy(camPos);
      camera.lookAt(lookPos);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(render);
    };
    render();

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafId);
      renderer.dispose();
    };
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative h-[600vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Pinned 3D WebGL World */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Synchronized 2D Narrative HUD */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-8">
          {chapters.map((chap, i) => {
            const step = 0.85 / chapters.length;
            const start = i * step + 0.05;
            const end = start + step * 0.8;
            return <ChapterCard key={i} chap={chap} progress={scrollYProgress} range={[start, end]} />;
          })}
        </div>
      </div>
    </section>
  );
}

function ChapterCard({ chap, progress, range }) {
  const [start, end] = range;
  const opacity = useTransform(progress, [start - 0.04, start, end, end + 0.04], [0, 1, 1, 0]);
  const y = useTransform(progress, [start - 0.04, start, end, end + 0.04], [30, 0, 0, -30]);

  return (
    <motion.div style={{ opacity, y }} className="absolute max-w-md p-8 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md">
      <span className="text-xs font-mono text-amber-400 tracking-wider uppercase">{chap.index}</span>
      <h3 className="text-3xl font-bold text-white mt-2 mb-3">{chap.title}</h3>
      <p className="text-sm text-zinc-300 leading-relaxed">{chap.body}</p>
    </motion.div>
  );
}
```


<motion.div style={{ opacity, y }} className="absolute max-w-md p-8 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md">
      <span className="text-xs font-mono text-amber-400 tracking-wider uppercase">{chap.index}</span>
      <h3 className="text-3xl font-bold text-white mt-2 mb-3">{chap.title}</h3>
      <p className="text-sm text-zinc-300 leading-relaxed">{chap.body}</p>
    </motion.div>
  );
}
```

---

### Type 02: "Linear-Style" SaaS & Dark Bento Grid

- **Visual Identity**: Obsidian backgrounds (`#08080a`), hairline micro-borders (`border border-white/10`), subtle radial spotlights following mouse, monospaced status badges, keyboard shortcut pills (`kbd`).
- **Motion Stack**: Cursor-following radial masks, spring hover tilts, subtle border beam animations (`stroke-dashoffset` or rotating conic gradient).

```jsx
import { useRef, useState } from "react";

export function LinearBentoGrid() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={onMouseMove}
      className="group/grid relative grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto p-6 bg-zinc-950 text-white rounded-3xl border border-white/10"
      style={{
        "--mouse-x": `${mousePos.x}px`,
        "--mouse-y": `${mousePos.y}px`,
      }}
    >
      {/* Dynamic Cursor Spotlight Layer across all bento cards */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/grid:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 70%)`,
        }}
      />

      {/* Bento Card 1 (Span 2 cols) */}
      <div className="relative md:col-span-2 p-8 rounded-2xl bg-zinc-900/60 border border-white/10 overflow-hidden flex flex-col justify-between">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> SYSTEM READY
          </span>
          <h3 className="text-2xl font-semibold mt-4">Real-time Telemetry Pipeline</h3>
          <p className="text-sm text-zinc-400 mt-2 max-w-md leading-relaxed">
            Instant event synchronization across edge nodes with sub-millisecond latencies.
          </p>
        </div>
        <div className="mt-8 flex gap-2 font-mono text-xs text-zinc-500">
          <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10">⌘K</kbd> Quick command
        </div>
      </div>

      {/* Bento Card 2 */}
      <div className="relative p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between">
        <h3 className="text-xl font-semibold">Zero Config</h3>
        <p className="text-sm text-zinc-400 mt-2">Deploy with automatic schema migrations.</p>
        <span className="font-mono text-3xl font-extrabold text-white mt-6">99.99%</span>
      </div>
    </div>
  );
}
```

---

### Type 03: Editorial Typography & Kinetic Magazine (Neobrutalist Hybrid)

- **Visual Identity**: Warm paper (`#F5F2EB`) or deep monochrome canvas, oversized high-contrast display serif typography, fine hairline ruled dividers, asymmetric multi-column layout.
- **Motion Stack**: Cursor-following floating media preview (LERP damped) when hovering project links, masked kinetic line text reveals on mount.

```jsx
import { useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export function EditorialProjectIndex({ projects }) {
  const [activeMedia, setActiveMedia] = useState(null);
  const cursorSpring = { stiffness: 180, damping: 22, mass: 0.2 };
  const previewX = useSpring(0, cursorSpring);
  const previewY = useSpring(0, cursorSpring);

  const onMouseMove = (e) => {
    previewX.set(e.clientX + 24);
    previewY.set(e.clientY - 120);
  };

  return (
    <section onMouseMove={onMouseMove} className="relative min-h-screen bg-[#111] text-[#E8E5DF] py-24 px-8 select-none">
      {/* Floating Hover Media Preview */}
      <motion.div
        style={{ x: previewX, y: previewY }}
        className="pointer-events-none fixed top-0 left-0 z-50 w-72 h-44 rounded-xl overflow-hidden border border-white/20 shadow-2xl"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: activeMedia ? 1 : 0, scale: activeMedia ? 1 : 0.85 }}
        transition={{ duration: 0.25 }}
      >
        {activeMedia && (
          <img src={activeMedia} alt="" className="w-full h-full object-cover" />
        )}
      </motion.div>

      {/* Editorial Index Rows */}
      <div className="max-w-5xl mx-auto border-t border-white/20">
        {projects.map((proj, i) => (
          <a
            key={i}
            href={proj.href}
            onMouseEnter={() => setActiveMedia(proj.image)}
            onMouseLeave={() => setActiveMedia(null)}
            className="group flex items-baseline justify-between py-8 border-b border-white/10 transition-colors hover:text-amber-400"
          >
            <span className="font-mono text-xs opacity-50">/{String(i + 1).padStart(2, "0")}</span>
            <h2 className="font-serif text-4xl md:text-6xl tracking-tight transition-transform duration-300 group-hover:translate-x-3">
              {proj.title}
            </h2>
            <span className="font-mono text-xs tracking-widest uppercase opacity-60">{proj.discipline}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
```

---

### Type 04: 3D Product Configurator & Luxury Showcase

- **Visual Identity**: 50/50 sticky split screen layout. Half screen pinned WebGL model viewer; half screen scrolling specification story with custom material/color switchers.
- **Motion Stack**: OrbitControls model rotation, smooth material shader tint transition, exploded 3D component inspection tied to scroll progress.

```jsx
import { useState } from "react";

export function SplitProductConfigurator({ specs }) {
  const [activeColor, setActiveColor] = useState("#2D628C");
  const swatches = ["#2D628C", "#18181B", "#A1A1AA", "#D97706"];

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen bg-zinc-950 text-white">
      {/* Pinned 50% WebGL Model Viewport */}
      <div className="sticky top-0 h-screen w-full md:w-1/2 flex flex-col items-center justify-center p-8 border-r border-white/10">
        <div
          className="w-80 h-80 rounded-full border border-white/20 transition-colors duration-500 shadow-2xl flex items-center justify-center"
          style={{ background: `radial-gradient(circle, ${activeColor}88 0%, transparent 70%)` }}
        >
          {/* 3D Canvas / Model Mount Anchor */}
          <span className="font-mono text-xs text-white/60">3D MODEL TURNTABLE</span>
        </div>

        {/* Color Switcher Bar */}
        <div className="flex gap-4 mt-8 p-2 rounded-full bg-white/5 border border-white/10">
          {swatches.map((color) => (
            <button
              key={color}
              onClick={() => setActiveColor(color)}
              className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
              style={{
                backgroundColor: color,
                borderColor: activeColor === color ? "#ffffff" : "transparent",
              }}
            />
          ))}
        </div>
      </div>

      {/* Scrolling Specification Narrative */}
      <div className="w-full md:w-1/2 p-8 md:p-20 space-y-32">
        {specs.map((spec, i) => (
          <div key={i} className="max-w-md py-12">
            <span className="font-mono text-xs text-amber-400">PHASE 0{i + 1}</span>
            <h3 className="text-3xl font-extrabold mt-2 mb-4">{spec.heading}</h3>
            <p className="text-zinc-400 leading-relaxed">{spec.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### Type 05: Continuous Horizontal Narrative Strip (Timeline Scrollytelling)

- **Visual Identity**: Viewport-locked stage translating a panoramic horizontal strip, multi-layer parallax depth layers, milestone ticks, scrubbable bottom playhead.
- **Motion Stack**: Vertical wheel scroll transformed to `translateX(-progress * travel)`, differential layer parallax speeds.

```jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function HorizontalNarrativeStrip({ stories }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Multi-plane parallax speeds: foreground moves faster than background
  const foregroundX = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  const backgroundX = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const rulerWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-[450vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-8 bg-zinc-950 text-white">
        {/* Parallax Background Scenic Layer */}
        <motion.div style={{ x: backgroundX }} className="absolute inset-y-0 flex gap-24 opacity-20 pointer-events-none items-center">
          <span className="text-[25vw] font-black uppercase tracking-tighter">HERITAGE</span>
          <span className="text-[25vw] font-black uppercase tracking-tighter">CRAFT</span>
          <span className="text-[25vw] font-black uppercase tracking-tighter">FUTURE</span>
        </motion.div>

        {/* Foreground Content Track */}
        <motion.div style={{ x: foregroundX }} className="relative z-10 flex gap-16 items-center my-auto will-change-transform">
          {stories.map((story, idx) => (
            <article key={idx} className="flex-shrink-0 w-[70vw] max-w-2xl p-10 rounded-3xl bg-zinc-900/80 border border-white/10 backdrop-blur-md">
              <span className="font-mono text-amber-400 text-xs">CH // 0{idx + 1}</span>
              <h2 className="text-3xl font-bold mt-2 mb-4">{story.title}</h2>
              <p className="text-zinc-300 leading-relaxed">{story.body}</p>
            </article>
          ))}
        </motion.div>

        {/* Bottom Timeline Scrub Ruler */}
        <div className="relative w-full max-w-4xl mx-auto h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div style={{ width: rulerWidth }} className="h-full bg-amber-400 rounded-full" />
        </div>
      </div>
    </section>
  );
}
```

---

### Type 06: Tactile Desktop OS Simulator (Y2K / Retro-Digital Windowing)

- **Visual Identity**: Virtual desktop workspace, draggable window panels, retro window chrome (minimize/maximize/close buttons), CRT scanline shaders, faux terminal/CLI prompt, pixel fonts.
- **Motion Stack**: Freeform drag (`framer-motion drag`), dynamic z-index focus stacking, window click sound effects.

```jsx
import { useState } from "react";
import { motion } from "framer-motion";

export function RetroWindow({ title, children, defaultPos = { x: 50, y: 50 } }) {
  const [zIndex, setZIndex] = useState(10);

  return (
    <motion.div
      drag
      dragMomentum={false}
      onPointerDown={() => setZIndex((z) => z + 5)}
      style={{ zIndex }}
      className="absolute w-80 md:w-96 rounded-lg bg-zinc-900 border-2 border-zinc-700 shadow-2xl overflow-hidden font-mono text-sm"
      initial={defaultPos}
    >
      {/* Retro Titlebar */}
      <div className="flex items-center justify-between px-3 py-2 bg-zinc-800 border-b border-zinc-700 select-none cursor-grab active:cursor-grabbing">
        <span className="font-semibold text-xs text-zinc-200">{title}</span>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
        </div>
      </div>
      <div className="p-4 text-zinc-300">{children}</div>
    </motion.div>
  );
}
```

---

### Type 07: Generative Physics Playground & Floating Stickers

- **Visual Identity**: Vibrant, playful palette with high-contrast sticker elements, tactile drop shadows, badge chips with SVG doodles.
- **Motion Stack**: 2D rigid-body collision and gravity physics (Matter.js or canvas simulation), draggable and tossable badges that bounce against viewport boundaries.

```jsx
import { useEffect, useRef } from "react";

export function PhysicsStickerBox({ stickers = ["REACT", "NEXT.JS", "THREE.JS", "GSAP"] }) {
  const boxRef = useRef(null);

  useEffect(() => {
    // Requires matter-js: Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint
    // Creates a physical bounding box with gravity and lets user drag/toss badges
  }, []);

  return (
    <div ref={boxRef} className="relative w-full h-96 rounded-3xl bg-zinc-900 border border-white/10 overflow-hidden flex items-center justify-center">
      <span className="font-mono text-xs text-zinc-500 pointer-events-none">DRAG & TOSS BADGES (MATTER.JS RIGID BODY)</span>
    </div>
  );
}
```

---

### Type 08: Infinite Spatial Pan-and-Zoom Canvas (Miro / FigJam)

- **Visual Identity**: Boundless dot-matrix or grid canvas, floating coordinate badge, minimap radar in bottom corner.
- **Motion Stack**: Inertial pan drag (`pointerdown` tracking with damped velocity decay), wheel-driven zoom scale matrix transformation.

```jsx
import { useState } from "react";

export function InfiniteSpatialCanvas({ children }) {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const onWheel = (e) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * -0.001;
    setScale((s) => Math.max(0.4, Math.min(2.5, s + zoomDelta)));
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    setPan((p) => ({ x: p.x + e.movementX, y: p.y + e.movementY }));
  };

  return (
    <div
      onWheel={onWheel}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseMove={onMouseMove}
      className="relative w-full h-screen overflow-hidden bg-zinc-950 cursor-grab active:cursor-grabbing select-none"
      style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
        backgroundSize: `${32 * scale}px ${32 * scale}px`,
        backgroundPosition: `${pan.x}px ${pan.y}px`,
      }}
    >
      <div
        className="absolute origin-top-left transition-transform duration-75"
        style={{ transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale})` }}
      >
        {children}
      </div>

      {/* Minimap Telemetry */}
      <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-black/60 border border-white/10 font-mono text-xs text-zinc-400">
        POS: [{pan.x}, {pan.y}] · ZOOM: {scale.toFixed(2)}x
      </div>
    </div>
  );
}
```

---

### Type 09: Asymmetric Sticky Split & Stacking Card Deck

- **Visual Identity**: 50/50 dual-column asymmetric layout. Left 50% pinned editorial pillar; Right 50% scrolling card stream where cards stack on top of each other via `position: sticky; top: calc(...)`.
- **Motion Stack**: Preceding cards scale down ($1.0 \to 0.94$) and apply slight darkening overlay as next card pins above them.

```jsx
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function AsymmetricSplitStack({ cards }) {
  return (
    <div className="relative flex flex-col md:flex-row bg-zinc-950 text-white min-h-screen">
      {/* Left 50% Pinned Editorial Anchor */}
      <div className="sticky top-0 h-screen w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-between border-r border-white/10">
        <div>
          <span className="font-mono text-xs text-amber-400">CAPABILITIES</span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4">
            How we partner <br />with founders.
          </h2>
        </div>
        <p className="text-sm text-zinc-400 font-mono">SCROLL TO UNPACK PHASES ↓</p>
      </div>

      {/* Right 50% Stacking Card Deck */}
      <div className="w-full md:w-1/2 p-8 md:p-20 space-y-16">
        {cards.map((card, i) => (
          <div
            key={i}
            style={{ position: "sticky", top: `calc(100px + ${i * 24}px)` }}
            className="p-8 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl"
          >
            <span className="font-mono text-xs text-amber-400">0{i + 1} // STAGE</span>
            <h3 className="text-2xl font-bold mt-2 mb-3">{card.title}</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### Type 10: Atmospheric Glassmorphic Corporate & Geospatial Tech

- **Visual Identity**: Deep navy/slate/emerald dark mode (`#0B1528`), multi-layered frosted glass (`backdrop-filter: blur(24px)`), iridescent subtle glowing borders, interactive 3D WebGL globe with raycast coordinate pins, sound-reactive audio button.
- **Motion Stack**: Smooth 3D globe rotation with pointer dampening, pulse animations on geographic lat/long pin points, dual-arrow clipped hover link transitions.

```jsx
export function GlassmorphicCorporateCard({ title, metric, subtitle }) {
  return (
    <div className="relative p-8 rounded-2xl bg-[#0e1e38]/60 border border-white/15 backdrop-blur-xl shadow-2xl">
      <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">{subtitle}</span>
      <h3 className="text-4xl font-extrabold text-white mt-2 mb-1">{metric}</h3>
      <p className="text-sm text-slate-300">{title}</p>
      {/* Iridescent highlight line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
    </div>
  );
}
```

---

### Type 11: Architectural Technical Blueprint Grid

- **Visual Identity**: Ruled CSS grid lines (`border-zinc-800`), corner crosshair markers (`+`), monospaced technical telemetry, stark high-contrast black/white palette with a single high-visibility accent (safety orange, electric lime).
- **Motion Stack**: Subtle line self-drawing on mount, zero soft blurred shadows, instant snappy hover state switches ($< 100\text{ms}$).

```html
<div class="blueprint-section">
  <div class="corner-cross top-left">+</div>
  <div class="corner-cross top-right">+</div>
  <div class="corner-cross bottom-left">+</div>
  <div class="corner-cross bottom-right">+</div>
  <div class="blueprint-header">
    <span class="mono-tag">[NODE_ID: // 849-B]</span>
    <span class="mono-coords">LAT: 46.818 · LON: 8.227</span>
  </div>
  <h2 class="blueprint-title">DISTRIBUTED CONSENSUS SPECIFICATION</h2>
</div>

<style>
.blueprint-section {
  position: relative;
  padding: 2.5rem;
  background: #000000;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  font-family: monospace;
}
.corner-cross {
  position: absolute;
  color: #ff5500;
  font-size: 16px;
  line-height: 1;
}
.top-left { top: -8px; left: -8px; }
.top-right { top: -8px; right: -8px; }
.bottom-left { bottom: -8px; left: -8px; }
.bottom-right { bottom: -8px; right: -8px; }
.blueprint-header {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #888888;
  margin-bottom: 1rem;
}
.blueprint-title {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}
</style>
```

---

### Type 12: Cinematic Canvas Video-Scrubbed / Image Sequence Walkthrough

- **Visual Identity**: 2.39:1 widescreen or full-bleed viewport, pre-rendered CGI or cinematic frames drawn to an HTML5 canvas synchronized with scroll position, minimalist typography.
- **Motion Stack**: Normalized scroll progress calculates exact frame index (`Math.floor(progress * totalFrames)`), drawing directly to canvas via `ctx.drawImage` with image preloading for zero latency.

```javascript
export function initCanvasFrameScrubber(canvas, frameUrls, scrollProgressGetter) {
  const ctx = canvas.getContext('2d');
  const images = [];
  let loadedCount = 0;

  // Preload frame sequence into memory
  frameUrls.forEach((url, i) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      loadedCount++;
      if (loadedCount === frameUrls.length) renderFrame();
    };
    images.push(img);
  });

  function renderFrame() {
    const p = Math.max(0, Math.min(1, scrollProgressGetter()));
    const frameIndex = Math.min(images.length - 1, Math.floor(p * images.length));
    const currentImg = images[frameIndex];

    if (currentImg && currentImg.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(currentImg, 0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(renderFrame);
  }
}
```
