# Creative Web Animations Reference & Plain-English Guide

This document breaks down every animation seen across premier award-winning websites (**NHD Portfolio**, **United Carriers**, and **Aikah**) into simple mental models, code recipes, and beginner-friendly CSS explanations.

---

## 1. Simple Explanations of All the "Scary" CSS Properties

### ① `perspective: 1000px`
* **What it is**: How far away your eyes are from the screen.
* **Simple Example**:
  Imagine looking at a cube.
  - If you hold it 2 inches away from your nose (`perspective: 150px`), the front face looks gigantic and the back looks tiny. The 3D distortion is intense.
  - If you look at it from across a football stadium (`perspective: 3000px`), it looks almost completely flat.
  - **The Sweet Spot**: `perspective: 1000px` on the parent box creates natural, pleasant 3D depth.
```css
.card-wrapper {
  perspective: 1000px; /* Put this on the PARENT box */
}
```

---

### ② `transform-style: preserve-3d`
* **What it is**: Tells the browser not to squash 3D child elements flat.
* **Simple Example**:
  By default, browsers treat everything like flat ink printed on a sheet of paper. If you rotate a child element in 3D, the browser normally flattens it back onto the paper.
  Adding `transform-style: preserve-3d` tells the browser: *"This container is a real 3D room. Keep all children floating in 3D space."*
```css
.card {
  transform-style: preserve-3d; /* Children can now flip in 3D without getting squashed */
}
```

---

### ③ `backface-visibility: hidden`
* **What it is**: Hides the back side of an element when it turns around.
* **Simple Example**:
  Think of a physical playing card (e.g., Ace of Spades).
  When you flip the card over, you should see the decorative pattern on the back, NOT the Ace of Spades showing through in reverse.
  `backface-visibility: hidden` makes the card completely invisible the moment it is facing away from your camera/eyes.
```css
.card-front, .card-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden; /* Hide when facing away */
}

.card-back {
  transform: rotateY(180deg); /* Pre-turned around */
}
```

---

### ④ `overflow: hidden` + `translateY(100%)` (The Masked Line Reveal)
* **What it is**: Hiding text under the floor, then raising it up into a window.
* **Simple Example**:
  Think of looking out of a letterbox. If a letter is below the letterbox opening (`translateY(100%)`), you can't see it because of `overflow: hidden`. As it slides up to `translateY(0)`, it smoothly appears line by line like an editorial magazine headline (used in United Carriers and Aikah).
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

### ⑤ `mix-blend-mode: difference` (The Chameleon Cursor)
* **What it is**: Automatically inverts colors against whatever is underneath.
* **Simple Example**:
  If your custom cursor is a white dot:
  - Over a **black background**, `difference` makes it shine **pure white**.
  - Over a **white background**, `difference` flips it to **pure black**!
  - It guarantees high visibility anywhere on the page without needing JavaScript background color checks.
```css
.custom-cursor-dot {
  background-color: white;
  mix-blend-mode: difference;
}
```

---

### ⑥ `mask-image` (`-webkit-mask-image`)
* **What it is**: A stencil or cookie-cutter for elements.
* **Simple Example**:
  - `background-image` paints colors onto an element.
  - `mask-image` cuts holes into an element!
  - Wherever the mask is **black**, your element is **visible**.
  - Wherever the mask is **transparent**, your element is **invisible**.
  
  **The Spotlight / Flashlight Effect**:
  We make a radial gradient that is solid black in the center and transparent around the edges. Wherever the mouse moves, the black circle moves with it, acting like a flashlight beam revealing the color photo underneath!
```css
.spotlight-reveal {
  mask-image: radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%);
}
```

---

### ⑦ `stroke-dasharray` & `stroke-dashoffset` (SVG)
* **What it is**: The "secret tape trick" for self-drawing lines.
* **Simple Example**:
  1. Suppose you have a line 500 pixels long.
  2. `stroke-dasharray: 500` turns the line into one 500px solid dash followed by a 500px empty gap.
  3. `stroke-dashoffset: 500` pushes the solid dash 500px to the left, so only the invisible empty gap sits inside your SVG window. The line looks blank!
  4. When you animate `stroke-dashoffset` from `500` to `0`, you pull the solid dash into view. To the human eye, it looks like a pen is drawing the signature in real time!
```css
.signature-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 2s forwards ease;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}
```

---

### ⑧ `backdrop-filter: blur(12px)`
* **What it is**: Frosted glass.
* **Simple Example**:
  Normal `filter: blur()` blurs the element itself (making its text blurry and unreadable).
  `backdrop-filter: blur()` does **not** blur the element—it blurs whatever is sitting *behind* it, like looking through frosted glass or a steamy window.
```css
.glass-nav {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
}
```

---

## 2. Core Creative Animation Recipes

### 1. Masked Headline Reveal (Kinetic Typography)
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
  overflow: hidden;
  display: block;
}
.line-inner {
  display: block;
  transform: translateY(110%);
  transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.hero-heading.is-revealed .line-inner {
  transform: translateY(0%);
}
.hero-heading.is-revealed .line-mask:nth-child(1) .line-inner { transition-delay: 0.1s; }
.hero-heading.is-revealed .line-mask:nth-child(2) .line-inner { transition-delay: 0.25s; }
.hero-heading.is-revealed .line-mask:nth-child(3) .line-inner { transition-delay: 0.4s; }
</style>

<script>
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.hero-heading').classList.add('is-revealed');
});
</script>
```

---

### 2. Infinite Seamless Marquee Ticker
```html
<div class="marquee-track">
  <div class="marquee-content">
    <span>• GLOBAL FREIGHT DISPATCH</span>
    <span>• LIVE AIRPORT & PORT LOGISTICS</span>
    <span>• CUSTOMS BROKERAGE WORLDWIDE</span>
  </div>
  <div class="marquee-content" aria-hidden="true">
    <span>• GLOBAL FREIGHT DISPATCH</span>
    <span>• LIVE AIRPORT & PORT LOGISTICS</span>
    <span>• CUSTOMS BROKERAGE WORLDWIDE</span>
  </div>
</div>

<style>
.marquee-track {
  display: flex;
  overflow: hidden;
  background: #09090b;
  color: #a1a1aa;
  font-family: monospace;
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
  animation-play-state: paused;
}
@keyframes scrollMarquee {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}
</style>
```

---

### 3. Scroll-Scrubbed Text Reading Highlight
```html
<p class="scrub-paragraph" id="scrubText">
  With every service under one roof and one accountable team, your supply chain moves predictably.
</p>

<script type="module">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const paragraph = document.getElementById('scrubText');
const words = paragraph.innerText.split(' ');
paragraph.innerHTML = words.map(w => `<span class="word">${w} </span>`).join('');

gsap.fromTo('.scrub-paragraph .word', 
  { opacity: 0.15 }, 
  {
    opacity: 1,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.scrub-paragraph',
      start: 'top 80%',
      end: 'bottom 40%',
      scrub: 0.5
    }
  }
);
</script>
```

---

### 4. Smooth Inertial Custom Cursor (LERP Physics)
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
  dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
});

function render() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
  requestAnimationFrame(render);
}
render();
</script>
```

---

### 5. 3D Card Flip (Playing Card Effect)
```html
<div class="card-scene">
  <div class="card" onclick="this.classList.toggle('flipped')">
    <div class="face front">React (Click me)</div>
    <div class="face back">3+ Years Experience</div>
  </div>
</div>

<style>
.card-scene {
  width: 220px;
  height: 300px;
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
.card.flipped {
  transform: rotateY(180deg);
}
.face {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  background: #1e1e24;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.back {
  transform: rotateY(180deg) translateZ(1px);
  background: #2a2a35;
}
</style>
```

---

### 6. Spotlight / Flashlight Cursor Mask
```html
<div class="hero-container" id="hero">
  <img src="photo.jpg" class="photo photo-dark" />
  <img src="photo.jpg" class="photo photo-color" />
</div>

<style>
.hero-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  --x: 50%;
  --y: 50%;
}
.photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.photo-dark {
  filter: grayscale(100%) brightness(0.6);
}
.photo-color {
  filter: contrast(1.15) brightness(1.1);
  pointer-events: none;
  mask-image: radial-gradient(circle 350px at var(--x) var(--y), black 0%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle 350px at var(--x) var(--y), black 0%, transparent 100%);
}
</style>

<script>
const hero = document.getElementById('hero');
window.addEventListener('mousemove', (e) => {
  const xPercent = (e.clientX / window.innerWidth) * 100;
  const yPercent = (e.clientY / window.innerHeight) * 100;
  hero.style.setProperty('--x', `${xPercent}%`);
  hero.style.setProperty('--y', `${yPercent}%`);
});
</script>
```
