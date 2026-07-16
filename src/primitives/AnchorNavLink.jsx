import { useNavigate, useLocation } from "react-router";
import { cn } from "../../lib/utils";

/**
 * AnchorNavLink
 *
 * Behaves like an <a> tag for routes that point at sections on the home page
 * (e.g. "/#about" or "/#stack"). It works from ANY route:
 *   - If we're already on "/", smooth-scroll to the section id.
 *   - If we're on another route, navigate to "/" first, then scroll once
 *     the home page has mounted.
 */
export function AnchorNavLink({
  to,
  className,
  children,
  onClick,
  ...rest
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = () => {
    const id = to.startsWith("/#") ? to.slice(2) : null;
    if (!id) return;
    // Give the home page a moment to mount before scrolling.
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (e && e.preventDefault) e.preventDefault();
    if (location.pathname === "/") {
      scrollToSection();
    } else {
      navigate("/", { replace: false });
      // Wait for home to render before scrolling.
      setTimeout(scrollToSection, 250);
    }
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={cn(className)}
      {...rest}
    >
      {children}
    </a>
  );
}
