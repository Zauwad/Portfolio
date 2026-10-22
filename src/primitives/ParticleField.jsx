import { useEffect, useRef } from "react";

export function ParticleField({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    // Mouse parallax target and smoothed coordinates
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Generate floating 3D dust particles
    const PARTICLE_COUNT = 75;
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.5, // Depth factor
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.5 + 0.15,
        baseAlpha: Math.random() * 0.5 + 0.15,
      });
    }

    const render = () => {
      // Smooth camera parallax
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      const offsetX = (mouseX - width / 2) * 0.035;
      const offsetY = (mouseY - height / 2) * 0.035;

      ctx.clearRect(0, 0, width, height);

      // Adapt colors based on theme
      const isLight = document.documentElement.classList.contains("light");
      const rgb = isLight ? "80, 60, 40" : "250, 250, 250";
      const glowColor = isLight ? "rgba(180, 83, 9, 0.3)" : "rgba(255, 255, 255, 0.4)";

      // Draw subtle constellation connections between close particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.12 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${rgb}, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(p1.x + offsetX * p1.z, p1.y + offsetY * p1.z);
            ctx.lineTo(p2.x + offsetX * p2.z, p2.y + offsetY * p2.z);
            ctx.stroke();
          }
        }
      }

      // Render individual luminous particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];

        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle with parallax offset
        const drawX = p.x + offsetX * p.z;
        const drawY = p.y + offsetY * p.z;

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${p.alpha})`;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 opacity-70 transition-opacity duration-1000 ${className}`}
      aria-hidden="true"
    />
  );
}
