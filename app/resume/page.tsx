import type { Metadata } from "next";
import Link from "next/link";
import { ResumeGallery } from "@/components/resume-gallery";
import { site } from "@/lib/site";
import { resumes } from "@/lib/resumes";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Seventeen tailored resumes for data, business, AI, software, and analytical roles. Preview each one in full and download the PDF that fits the job.",
  alternates: { canonical: "/resume" },
  openGraph: {
    url: "/resume",
    title: "Resume — Lionael Surya",
    description:
      "Seventeen tailored resumes for data, business, AI, software, and analytical roles.",
  },
};

export default function ResumePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip to main content
      </a>

      <header className="anim-fade fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-ink/75 backdrop-blur-md">
        <nav
          aria-label="Resume"
          className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6"
        >
          <Link
            href="/"
            className="font-mono text-[13px] tracking-tight text-paper transition-colors hover:text-neutral-400"
          >
            <span className="sm:hidden">ls</span>
            <span className="hidden sm:inline">lionael.surya</span>
          </Link>
          <ul className="flex items-center gap-5 sm:gap-7">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="u-link text-[13px] text-neutral-400 transition-colors hover:text-paper"
              >
                Email
              </a>
            </li>
            <li>
              <Link
                href="/"
                className="u-link text-[13px] text-neutral-400 transition-colors hover:text-paper"
              >
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main id="main" className="pt-16">
        <section className="mx-auto max-w-[1120px] px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="anim-fade-up font-mono text-xs tracking-[0.18em] text-muted uppercase">
            Resume
          </p>
          <h1 className="anim-fade-up mt-6 max-w-[20ch] text-5xl leading-[1.08] font-medium tracking-[-0.03em] md:text-7xl">
            Different versions for different directions.
          </h1>
          <p
            className="anim-fade-up mt-6 max-w-[42rem] text-lg leading-relaxed text-neutral-400"
            style={{ "--d": "0.1s" } as React.CSSProperties}
          >
            {resumes.length} resumes, each written for a specific role. Open any
            one to read it in full, then download the version that matches the
            job you&apos;re applying to.
          </p>
        </section>

        <section className="mx-auto max-w-[1120px] px-6 pb-28 md:pb-36">
          <ResumeGallery />
        </section>
      </main>

      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-8">
          <p className="font-mono text-xs text-muted">
            © 2026 {site.name}
          </p>
          <p className="font-mono text-xs text-muted">Toronto, Canada</p>
        </div>
      </footer>
    </>
  );
}
