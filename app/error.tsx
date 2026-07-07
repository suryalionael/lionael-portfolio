"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-svh flex-col justify-center">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
          500 — something broke
        </p>
        <h1 className="mt-6 max-w-[18ch] text-4xl font-medium tracking-[-0.03em] md:text-6xl">
          A stage in the pipeline failed.
        </h1>
        <p className="mt-6 max-w-[34rem] leading-relaxed text-neutral-400">
          That&apos;s on me, not you. Idempotent by design — a retry is safe.
        </p>
        <div className="mt-10 flex items-center gap-8">
          <button
            type="button"
            onClick={reset}
            className="u-link text-sm font-medium text-paper"
          >
            Retry ↻
          </button>
          <Link
            href="/"
            className="u-link text-sm text-neutral-400 transition-colors hover:text-paper"
          >
            Back to the start
          </Link>
        </div>
      </div>
    </main>
  );
}
