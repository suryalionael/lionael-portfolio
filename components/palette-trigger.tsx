"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { report } from "@/lib/analytics";

const Palette = dynamic(() => import("@/components/palette"));

// Owns the ⌘K shortcut, the nav hint, and the touch launcher. The palette
// itself (and cmdk) loads only on first open.
export function PaletteTrigger() {
  const [wanted, setWanted] = useState(false);
  const [open, setOpen] = useState(false);
  const [mac, setMac] = useState(true);
  const [touch, setTouch] = useState(false);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const openPalette = useCallback(() => {
    setOpen((already) => {
      if (already) return already;
      restoreFocus.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      report("palette_open", {});
      return true;
    });
    setWanted(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    restoreFocus.current?.focus();
    restoreFocus.current = null;
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMac(!/windows|linux/i.test(navigator.userAgent));
    setTouch(window.matchMedia("(pointer: coarse)").matches);
    // Warm the palette chunk once the page has settled, so the first ⌘K
    // opens instantly and keystrokes aren't lost while the chunk loads.
    const warm = window.setTimeout(() => import("@/components/palette"), 2500);
    const cancel = () => clearTimeout(warm);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (e.repeat) return;
        // Don't open (and steal focus) under the terminal overlay.
        if (document.querySelector("[aria-label='Terminal']")) return;
        openPalette();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancel();
      window.removeEventListener("keydown", onKey);
    };
  }, [openPalette]);

  return (
    <>
      {!touch && (
        <button
          type="button"
          onClick={openPalette}
          aria-label="Open command palette"
          className="hidden items-center gap-1.5 rounded-md border border-white/[0.12] px-2 py-1 font-mono text-[11px] text-neutral-400 transition-colors hover:border-white/30 hover:text-paper sm:flex"
        >
          {mac ? "⌘" : "Ctrl"} K
        </button>
      )}
      {touch && (
        <button
          type="button"
          onClick={openPalette}
          aria-label="Open command palette"
          className="fixed right-4 bottom-4 z-[70] flex size-11 items-center justify-center rounded-full border border-white/[0.15] bg-ink-raised/90 text-neutral-300 shadow-[0_8px_32px_-8px_rgb(0_0_0/0.8)] backdrop-blur-sm"
          style={{
            right: "max(1rem, env(safe-area-inset-right))",
            bottom: "max(1rem, env(safe-area-inset-bottom))",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11l3.2 3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
      {wanted && <Palette open={open} onClose={close} />}
    </>
  );
}
