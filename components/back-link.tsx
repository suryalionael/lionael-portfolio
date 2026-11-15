"use client";

import { useEffect, useState } from "react";

// "Back to work" that restores the exact scroll spot (history back +
// bfcache) only when the previous entry really is the home page — the
// card links set a one-shot flag. Everyone else gets a plain link.
// Modified clicks (new tab etc.) are never intercepted.
export function BackLink() {
  const [cameFromHome, setCameFromHome] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("back-to-work") === "1") {
        sessionStorage.removeItem("back-to-work");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCameFromHome(true);
      }
    } catch {}
  }, []);

  return (
    // Real navigation on purpose: cross-document view transitions + bfcache.
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/#work"
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
          return;
        if (cameFromHome && history.length > 1) {
          e.preventDefault();
          history.back();
        }
      }}
      className="u-link inline-block text-sm text-neutral-400 transition-colors hover:text-paper"
    >
      ← Back to work
    </a>
  );
}
