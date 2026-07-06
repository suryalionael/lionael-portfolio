"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
      style={{ "--d": "1.9s" } as React.CSSProperties}
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
        <ul className="flex items-center gap-5 sm:gap-7">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="u-link text-[13px] text-neutral-400 transition-colors hover:text-paper"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
