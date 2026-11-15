"use client";

import { useCallback, useRef, useState } from "react";
import { site } from "@/lib/site";
import { useDialog } from "@/components/use-dialog";

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
];

// Full-screen menu for phones: large staggered links, body scroll locked,
// closes on navigation and Escape, focus contained while open.
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-label="Open menu"
        className="flex size-11 items-center justify-center rounded-full text-neutral-300 transition-colors hover:text-paper"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M2 5.5h14M2 12.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && <MenuSheet onClose={close} />}
    </>
  );
}

function MenuSheet({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(ref, onClose, { initialFocus: "[aria-label='Close menu']" });

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="mobile-menu fixed inset-0 z-[75] flex flex-col bg-ink"
      style={{
        paddingTop: "max(1rem, env(safe-area-inset-top))",
        paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
      }}
    >
      <div className="flex items-center justify-between px-6 py-3">
        <span className="font-mono text-[13px] text-paper">lionael.surya</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex size-11 items-center justify-center rounded-full border border-white/[0.12] text-neutral-300"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav aria-label="Site" className="flex grow flex-col justify-center px-6">
        <ul className="space-y-1">
          {LINKS.map((link, i) => (
            <li
              key={link.href}
              className="mobile-menu-item overflow-hidden"
              style={{ "--i": i } as React.CSSProperties}
            >
              <a
                href={link.href}
                onClick={(e) => {
                  onClose();
                  // Same-page hash links: jump after the scroll lock
                  // lifts, or the browser swallows the jump.
                  const url = new URL(e.currentTarget.href);
                  if (url.pathname === location.pathname && url.hash) {
                    e.preventDefault();
                    history.pushState(null, "", url.hash);
                    setTimeout(() => {
                      document
                        .querySelector(url.hash)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 60);
                  }
                }}
                className="block py-2 text-[2.6rem] leading-tight font-medium tracking-[-0.03em] text-paper active:text-neutral-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-6 px-6">
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-neutral-400"
        >
          GitHub ↗
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-neutral-400"
        >
          LinkedIn ↗
        </a>
        <a
          href={`mailto:${site.email}`}
          className="font-mono text-xs text-neutral-400"
        >
          Email
        </a>
      </div>
    </div>
  );
}
