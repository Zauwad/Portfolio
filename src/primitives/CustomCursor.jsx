import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Check if hovering over clickable element
      const target = e.target;
      const isClickable =
        target.closest("a, button, input, textarea, [role='button'], .cursor-pointer, [data-cursor-interactive]");
      setIsPointer(!!isClickable);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    let animId;
    const loop = () => {
      // Linear Interpolation (LERP) trailing physics
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-9999 select-none transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Center dot */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-white transition-[width,height] duration-200"
        style={{
          mixBlendMode: "difference",
          width: isPointer ? "4px" : "6px",
          height: isPointer ? "4px" : "6px",
        }}
      />

      {/* Trailing inertial ring */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 rounded-full border border-white/60 transition-[width,height,background-color] duration-200"
        style={{
          mixBlendMode: "difference",
          width: isPointer ? "48px" : "28px",
          height: isPointer ? "48px" : "28px",
          backgroundColor: isPointer ? "rgba(255, 255, 255, 0.12)" : "transparent",
        }}
      />
    </div>
  );
}
