"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  "a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])";

// Shared behavior for the site's overlays (palette, mobile menu, terminal):
// - locks body scroll, compensating for the scrollbar so layout doesn't jump
// - moves focus inside on open
// - contains Tab within the dialog
// - closes on Escape at the document level, wherever focus is
export function useDialog(
  ref: RefObject<HTMLElement | null>,
  onClose: () => void,
  options?: { initialFocus?: string },
) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const focusables = () =>
      [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null,
      );

    const initial = options?.initialFocus
      ? root.querySelector<HTMLElement>(options.initialFocus)
      : null;
    (initial ?? focusables()[0] ?? root).focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!root.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      document.removeEventListener("keydown", onKey, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);
}
