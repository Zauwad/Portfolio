import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";

import { cn } from "../../lib/utils";

export const ToggleTheme = ({
  className,
  duration = 400,
  animationType = "circle-spread",
  ...props
}) => {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    const initialTheme =
      savedTheme ?? (root.classList.contains("light") ? "light" : "dark");

    root.classList.toggle("dark", initialTheme === "dark");
    root.classList.toggle("light", initialTheme === "light");

    const updateTheme = () => {
      setIsDark(root.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (animationType === "flip-x-in") {
      const styleId = "toggle-theme-flip-override";
      let styleElement = document.getElementById(styleId);
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
      }
      styleElement.textContent = `
                ::view-transition-group(root) { perspective: 1000px; }
                ::view-transition-old(root) { transform-origin: center; animation: flip-out 400ms forwards; }
                ::view-transition-new(root) { transform-origin: center; animation: flip-in 400ms forwards; }

                @keyframes flip-out { from { transform: rotateY(0deg); opacity: 1; } to { transform: rotateY(-90deg); opacity: 0; } }
                @keyframes flip-in { from { transform: rotateY(90deg); opacity: 0; } to { transform: rotateY(0deg); opacity: 1; } }
            `;

      return () => {
        const el = document.getElementById(styleId);
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      };
    }

    let styleElement = document.getElementById("toggle-theme-vt-override");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "toggle-theme-vt-override";
      styleElement.textContent = `
                ::view-transition-old(root),
                ::view-transition-new(root) {
                    animation: none;
                    mix-blend-mode: normal;
                }
            `;
      document.head.appendChild(styleElement);
    }
  }, [animationType]);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const applyTheme = (nextIsDark) => {
      const root = document.documentElement;
      root.classList.toggle("dark", nextIsDark);
      root.classList.toggle("light", !nextIsDark);
      setIsDark(nextIsDark);
      localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    };

    if (typeof document.startViewTransition !== "function") {
      flushSync(() => applyTheme(!isDark));
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => applyTheme(!isDark));
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    switch (animationType) {
      case "circle-spread":
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
        break;

      case "round-morph":
        document.documentElement.animate(
          [
            { opacity: 0, transform: "scale(0.8) rotate(5deg)" },
            { opacity: 1, transform: "scale(1) rotate(0deg)" },
          ],
          {
            duration: duration * 1.2,
            easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
        break;

      case "swipe-left":
        document.documentElement.animate(
          {
            clipPath: [
              `inset(0 0 0 ${viewportWidth}px)`,
              `inset(0 0 0 0)`,
            ],
          },
          {
            duration,
            easing: "cubic-bezier(0.2, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
        break;

      case "swipe-up":
        document.documentElement.animate(
          {
            clipPath: [
              `inset(${viewportHeight}px 0 0 0)`,
              `inset(0 0 0 0)`,
            ],
          },
          {
            duration,
            easing: "cubic-bezier(0.2, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
        break;

      case "diag-down-right":
        document.documentElement.animate(
          {
            clipPath: [
              `polygon(0 0, 0 0, 0 0, 0 0)`,
              `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
            ],
          },
          {
            duration: duration * 1.5,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
        break;

      case "fade-in-out":
        document.documentElement.animate(
          { opacity: [0, 1] },
          {
            duration: duration * 0.5,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
        break;

      case "shrink-grow":
        document.documentElement.animate(
          [
            { transform: "scale(0.9)", opacity: 0 },
            { transform: "scale(1)", opacity: 1 },
          ],
          {
            duration: duration * 1.2,
            easing: "cubic-bezier(0.19, 1, 0.22, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
        document.documentElement.animate(
          [
            { transform: "scale(1)", opacity: 1 },
            { transform: "scale(1.05)", opacity: 0 },
          ],
          {
            duration: duration * 1.2,
            easing: "cubic-bezier(0.19, 1, 0.22, 1)",
            pseudoElement: "::view-transition-old(root)",
          }
        );
        break;

      case "split-vertical":
        document.documentElement.animate(
          [{ opacity: 0 }, { opacity: 1 }],
          {
            duration: duration * 0.75,
            easing: "ease-in",
            pseudoElement: "::view-transition-new(root)",
          }
        );
        document.documentElement.animate(
          [
            { clipPath: "inset(0 0 0 0)", transform: "none" },
            { clipPath: "inset(0 40% 0 40%)", transform: "scale(1.2)" },
            { clipPath: "inset(0 50% 0 50%)", transform: "scale(1)" },
          ],
          {
            duration: duration * 1.5,
            easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            pseudoElement: "::view-transition-old(root)",
          }
        );
        break;

      case "swipe-right":
        document.documentElement.animate(
          {
            clipPath: [
              `inset(0 ${viewportWidth}px 0 0)`,
              `inset(0 0 0 0)`,
            ],
          },
          {
            duration,
            easing: "cubic-bezier(0.2, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
        break;

      case "swipe-down":
        document.documentElement.animate(
          {
            clipPath: [
              `inset(0 0 ${viewportHeight}px 0)`,
              `inset(0 0 0 0)`,
            ],
          },
          {
            duration,
            easing: "cubic-bezier(0.2, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
        break;

      case "wave-ripple":
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0% at 50% 50%)`,
              `circle(${maxRadius}px at 50% 50%)`,
            ],
          },
          {
            duration: duration * 1.5,
            easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
        break;

      case "flip-x-in":
      case "none":
      default:
        break;
    }
  }, [isDark, duration, animationType]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-full transition-colors duration-300",
        isDark ? "hover:text-amber-400" : "hover:text-primarylw",
        className
      )}
      {...props}
    >
      {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
    </button>
  );
};
