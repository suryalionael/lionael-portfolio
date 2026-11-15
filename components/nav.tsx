"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // The active section is the last one whose top has passed 40% of
      // the viewport.
      let found = "";
      let best = -Infinity;
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top < window.innerHeight * 0.4 && top > best) {
          best = top;
          found = id;
        }
      }
      setCurrent(found);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`anim-fade fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "border-white/[0.08] bg-ink/75 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
      style={{ "--d": "0.3s" } as React.CSSProperties}
    >
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-[1120px] items-center justify-between px-6 transition-[height] duration-500 ${
          scrolled ? "h-13" : "h-16"
        }`}
      >
        <a
          href="#top"
          className="font-mono text-[13px] tracking-tight text-paper transition-colors hover:text-neutral-400"
        >
          <span className="sm:hidden">ls</span>
          <span className="hidden sm:inline">lionael.surya</span>
        </a>
        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const on = current === link.href.slice(1);
            return (
              <li key={link.href} className="relative">
                {on && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-white/[0.08]"
                  />
                )}
                <a
                  href={link.href}
                  aria-current={on ? "location" : undefined}
                  className={`relative block rounded-full px-3 py-1.5 text-[13px] transition-colors hover:text-paper ${
                    on ? "text-paper" : "text-neutral-400"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
