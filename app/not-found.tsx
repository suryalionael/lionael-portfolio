import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col justify-center">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
          404 — not found
        </p>
        <h1 className="mt-6 max-w-[16ch] text-4xl font-medium tracking-[-0.03em] md:text-6xl">
          This route doesn&apos;t exist.
        </h1>
        <p className="mt-6 max-w-[34rem] leading-relaxed text-neutral-400">
          Whatever you were looking for isn&apos;t in this pipeline. The source
          is still where it should be.
        </p>
        <Link
          href="/"
          className="u-link mt-10 inline-block text-sm font-medium text-paper"
        >
          ← Back to the start
        </Link>
      </div>
    </main>
  );
}
