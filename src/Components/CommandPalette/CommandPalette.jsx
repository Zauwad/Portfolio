import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "../../primitives/Container";
import { NAV_ITEMS, SOCIALS } from "../../lib/content";
import { EASE } from "../../lib/ease";
import { useReducedMotion } from "../../hooks/useReducedMotion";

function scrollToSection(id) {
  requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

const SECTION_COMMANDS = [
  {
    id: "section-work",
    label: "Jump to · Work",
    action: (ctx) => {
      if (ctx.location.pathname === "/projects") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        ctx.navigate("/projects");
      }
    },
    shortcut: "G P",
  },
  {
    id: "section-about",
    label: "Jump to · About",
    action: (ctx) => {
      if (ctx.location.pathname === "/") {
        scrollToSection("about");
      } else {
        ctx.navigate("/");
        setTimeout(() => scrollToSection("about"), 250);
      }
    },
    shortcut: "G H",
  },
  {
    id: "section-stack",
    label: "Jump to · Stack",
    action: (ctx) => {
      if (ctx.location.pathname === "/") {
        scrollToSection("stack");
      } else {
        ctx.navigate("/");
        setTimeout(() => scrollToSection("stack"), 250);
      }
    },
    shortcut: "G S",
  },
  {
    id: "section-contact",
    label: "Jump to · Contact",
    action: (ctx) => {
      ctx.navigate("/contacts");
    },
    shortcut: "G C",
  },
  {
    id: "resume",
    label: "Download · Resume",
    action: () => {
      window.open("/Ridwanul_Azim_Resume.pdf", "_blank");
    },
    shortcut: "R",
  },
  {
    id: "email",
    label: "Compose · Email",
    action: () => {
      window.location.href = "mailto:redwanulazimzawad@gmail.com";
    },
    shortcut: "E",
  },
  ...SOCIALS.map((s) => ({
    id: `social-${s.id}`,
    label: `Open · ${s.label}`,
    action: () => window.open(s.href, "_blank"),
    shortcut: "",
  })),
];

export default function CommandPalette({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const reduced = useReducedMotion();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const items = useMemo(() => {
    const ctx = { navigate, location };
    const navItems = NAV_ITEMS.map((n) => ({
      id: `nav-${n.id}`,
      label: n.label.startsWith("Jump to")
        ? n.label
        : `Jump to · ${n.label}`,
      action: () => {
        if (n.to.startsWith("/#")) {
          const id = n.to.slice(2);
          if (location.pathname === "/") {
            scrollToSection(id);
          } else {
            navigate("/");
            setTimeout(() => scrollToSection(id), 250);
          }
        } else {
          navigate(n.to);
        }
      },
      shortcut: "",
    }));
    return [
      ...navItems,
      ...SECTION_COMMANDS.map((c) => ({
        ...c,
        action: () => c.action(ctx),
      })),
    ];
  }, [navigate, location]);

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter((it) => it.label.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(filtered.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[active];
        if (item) {
          item.action();
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-[var(--bg-base)]/70 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{
              duration: reduced ? 0 : 0.24,
              ease: EASE,
            }}
            className="relative w-full max-w-[620px] overflow-hidden rounded-md border border-[var(--border-hi)] bg-[var(--bg-elev1)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input row */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
              <span
                className="mono-label"
                style={{ color: "var(--fg-dim)" }}
              >
                ⌘K
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to · section · project · action"
                className="flex-1 bg-transparent text-[15px] text-fg outline-none placeholder:text-[var(--fg-dim)]"
              />
              <span
                className="mono-label"
                style={{ color: "var(--fg-dim)" }}
              >
                esc
              </span>
            </div>

            {/* Items */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div
                  className="body-m px-4 py-12 text-center"
                  style={{ color: "var(--fg-dim)" }}
                >
                  No matches for "{query}"
                </div>
              ) : (
                <ul className="flex flex-col gap-0.5">
                  {filtered.map((item, i) => (
                    <li key={item.id}>
                      <button
                        onMouseEnter={() => setActive(i)}
                        onClick={() => {
                          item.action();
                          onClose();
                        }}
                        className={`flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-left text-[13px] transition-colors ${
                          i === active
                            ? "bg-[var(--bg-elev2)] text-fg"
                            : "text-[var(--fg-muted)] hover:bg-[var(--bg-elev2)] hover:text-fg"
                        }`}
                      >
                        <span>{item.label}</span>
                        {item.shortcut && (
                          <span
                            className="mono-label"
                            style={{ color: "var(--fg-dim)" }}
                          >
                            {item.shortcut}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div
              className="mono-label flex items-center justify-between border-t border-border px-4 py-2.5"
              style={{ color: "var(--fg-dim)" }}
            >
              <span>↑↓ navigate · ↵ run</span>
              <span>{filtered.length} commands</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
