"use client";

// "Back to work" that restores the exact scroll spot when the visitor came
// from the home page (history back + bfcache), and still works as a plain
// link when the case study was opened directly.
export function BackLink() {
  return (
    // Real navigation on purpose: cross-document view transitions + bfcache.
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/#work"
      onClick={(e) => {
        if (
          document.referrer &&
          new URL(document.referrer).origin === location.origin
        ) {
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
