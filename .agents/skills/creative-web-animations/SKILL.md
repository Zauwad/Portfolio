---
name: creative-web-animations
description: Comprehensive reference cookbook for modern creative web animations (SVG drawing, 3D card flips, spotlight masks, text tumbles, scroll pinning, coverflow carousels, infinite marquees, masked line reveals, scroll-scrubbed text, and magnetic cursors) with simplified CSS property explanations and copy-paste templates.
tags: [animation, css, gsap, framer-motion, 3d, ui-patterns, webgl, interactive]
category: frontend
author: Antigravity
metadata:
  version: 1.1.0
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

## Animation Performance Rules

1. **Only animate `transform` and `opacity`**: Transforms execute on the GPU via the Compositor thread without triggering expensive browser layout recalculations (`reflow`).
2. **Never animate `top`, `left`, `width`, or `height` for motion**: These trigger CPU reflow on every single frame, causing stutter and battery drain.
3. **Use `requestAnimationFrame` for cursor/mouse tracking**: Never run heavy layout math directly inside high-frequency `mousemove` or `scroll` event listeners.
