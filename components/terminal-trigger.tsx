"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

const Terminal = dynamic(() => import("@/components/terminal"));

// Press ~ anywhere (or pick it in the palette) to toggle the terminal.
// The component and its data load only on first use.
export function TerminalTrigger() {
  const [wanted, setWanted] = useState(false);
  const [open, setOpen] = useState(false);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const openTerminal = useCallback(() => {
    restoreFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setWanted(true);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    restoreFocus.current?.focus();
    restoreFocus.current = null;
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "~" || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      )
        return;
      e.preventDefault();
      openTerminal();
    };
    const onEvent = () => openTerminal();
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-terminal", onEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-terminal", onEvent);
    };
  }, [openTerminal]);

  if (!wanted || !open) return null;
  return <Terminal onClose={close} />;
}
