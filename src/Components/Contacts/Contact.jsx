import { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

import emailjs from "emailjs-com";
import { Container } from "../../primitives/Container";
import { SectionHeading } from "../../primitives/SectionHeading";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";
import { Reveal } from "../../primitives/Reveal";
import { StatusPulse } from "../../primitives/StatusPulse";
import { Caret } from "../../primitives/Caret";
import { Kbd } from "../../primitives/Kbd";
import { EASE } from "../../lib/ease";

const INITIAL = { email: "", subject: "", message: "" };

export default function Contacts() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [focused, setFocused] = useState(null);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        "service_md9oohj",
        "template_ie5m0li",
        form,
        "7lnSEaRpD7r7YXs3J"
      );
      setStatus("sent");
      setForm(INITIAL);
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="relative">
      <Helmet>
        <title>Contact — Ridwanul.dev</title>
        <meta
          name="description"
          content="Get in touch with Ridwanul Azim Zawad — full-stack engineer at Amaze Venture. Open to freelance, contract, and hybrid roles."
        />
      </Helmet>

      <section className="relative border-b border-border py-20 md:py-28">
        <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
        <Container size="default" className="relative">
          <SectionHeading
            index="06"
            eyebrow="Contact"
            title="Let's start a"
            muted="conversation."
            body="A short brief on what you're building goes a long way. I usually reply within a day."
          />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            {/* Left: meta */}
            <div className="space-y-10 md:col-span-4">
              <Reveal>
                <div className="space-y-4">
                  <span
                    className="mono-label"
                    style={{ color: "var(--fg-dim)" }}
                  >
                    Email
                  </span>
                  <a
                    href="mailto:redwanulazimzawad@gmail.com"
                    className="block break-all text-[20px] text-fg transition-colors hover:text-[var(--fg-muted)]"
                  >
                    redwanulazimzawad@gmail.com
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="space-y-4">
                  <span
                    className="mono-label"
                    style={{ color: "var(--fg-dim)" }}
                  >
                    Phone
                  </span>
                  <a
                    href="tel:+8801339562237"
                    className="block tabular text-[20px] text-fg transition-colors hover:text-[var(--fg-muted)]"
                  >
                    +880 1339 562237
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="space-y-4">
                  <span
                    className="mono-label"
                    style={{ color: "var(--fg-dim)" }}
                  >
                    Where
                  </span>
                  <p
                    className="body-l"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    Dhaka, Bangladesh · UTC +6
                    <br />
                    Also Open to remote globally.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="space-y-4">
                  <span
                    className="mono-label"
                    style={{ color: "var(--fg-dim)" }}
                  >
                    Elsewhere
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "GitHub", href: "https://github.com/Zauwad" },
                      {
                        label: "LinkedIn",
                        href: "https://www.linkedin.com/in/ridwanul-azim-zawad",
                      },
                      {
                        label: "Facebook",
                        href: "https://www.facebook.com/redwanul.azim.zawad",
                      },
                      {
                        label: "Resume",
                        href: "/Ridwanul_Azim_Resume.pdf",
                      },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mono-label rounded-sm border border-border bg-[var(--bg-elev1)] px-3 py-1.5 text-[var(--fg-muted)] transition-colors duration-300 hover:border-[var(--border-hi)] hover:text-fg"
                      >
                        {s.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: query-card form */}
            <div className="md:col-span-8">
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
                onSubmit={onSubmit}
                className="relative overflow-hidden rounded-md border border-border bg-[var(--bg-elev1)]"
              >
                {/* Header */}
                <div className="flex h-14 items-center justify-between border-b border-border px-5">
                  <div className="flex items-center gap-3">
                    <StatusPulse
                      label="Reply within 24h"
                      variant={status === "error" ? "error" : "live"}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="mono-label"
                      style={{ color: "var(--fg-dim)" }}
                    >
                      submit
                    </span>
                    <Kbd>↵</Kbd>
                  </div>
                </div>

                {/* Body */}
                <div className="space-y-px bg-border">
                  <Field
                    label="email"
                    value={form.email}
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    onChange={onChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    focused={focused === "email"}
                  />
                  <Field
                    label="subject"
                    value={form.subject}
                    name="subject"
                    placeholder="A fitness app with auth and Stripe"
                    onChange={onChange}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                    focused={focused === "subject"}
                  />
                  <TextareaField
                    label="message"
                    value={form.message}
                    name="message"
                    placeholder="What you're building, your timeline, and what success looks like."
                    onChange={onChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    focused={focused === "message"}
                  />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between gap-4 border-t border-border px-5 py-4">
                  <span
                    className="mono-data"
                    style={{ color: "var(--fg-dim)" }}
                  >
                    {status === "sending"
                      ? "Sending..."
                      : status === "sent"
                      ? "✓ Message sent · thanks!"
                      : status === "error"
                      ? "✕ Failed — try email instead"
                      : "↩ All fields required"}
                  </span>
                  <PrimaryCTA
                    type="submit"
                    variant="solid"
                    size="md"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending..." : "Send message"}
                  </PrimaryCTA>
                </div>
              </motion.form>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  focused,
}) {
  return (
    <label
      className={`flex items-center gap-3 bg-[var(--bg-elev1)] px-5 py-4 transition-colors ${
        focused ? "bg-[var(--bg-elev2)]" : ""
      }`}
    >
      <span
        className="mono-label w-20 shrink-0"
        style={{ color: focused ? "var(--fg-muted)" : "var(--fg-dim)" }}
      >
        {label}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        required
        className="flex-1 bg-transparent text-[14px] text-fg outline-none placeholder:text-[var(--fg-dim)]"
      />
      {focused && <Caret />}
    </label>
  );
}

function TextareaField({
  label,
  name,
  value,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  focused,
}) {
  return (
    <label
      className={`flex items-start gap-3 bg-[var(--bg-elev1)] px-5 py-4 transition-colors ${
        focused ? "bg-[var(--bg-elev2)]" : ""
      }`}
    >
      <span
        className="mono-label mt-1 w-20 shrink-0"
        style={{ color: focused ? "var(--fg-muted)" : "var(--fg-dim)" }}
      >
        {label}
      </span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={5}
        required
        className="flex-1 resize-none bg-transparent text-[14px] leading-[1.6] text-fg outline-none placeholder:text-[var(--fg-dim)]"
      />
    </label>
  );
}
