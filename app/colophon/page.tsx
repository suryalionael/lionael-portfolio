import type { Metadata } from "next";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Colophon",
  description:
    "How this site is built: Next.js static pages, native view transitions, a restrained motion system, and Lighthouse 100s as a working budget.",
  alternates: { canonical: "/colophon" },
  openGraph: {
    url: "/colophon",
    title: "Colophon — Lionael Surya",
    description:
      "How this site is built: Next.js static pages, native view transitions, a restrained motion system, and Lighthouse 100s as a working budget.",
  },
};

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "Stack",
    body: [
      "Next.js 16 (App Router, server components first), React 19, Tailwind CSS 4, Motion, Lenis, and cmdk — deployed on Vercel from the main branch. Typography is Geist and Geist Mono, self-hosted via next/font. TypeScript strict mode, no `any`.",
      "Every page is statically generated: the home page, the resume gallery, and one page per project. Content lives in typed data files (lib/projects.ts, lib/resumes.ts, lib/roles.ts), so pages are renderers, not sources of truth.",
    ],
  },
  {
    heading: "Architecture decisions",
    body: [
      "Case studies are real pages, not modals. Opening one is a plain anchor navigation: the card morphs into the page header via native cross-document view transitions, and coming back restores the exact scroll position through the browser's back-forward cache. Browsers without support get an ordinary navigation — no polyfill, no scroll-lock code.",
      "The role lens (\"Hiring for: …\") keeps its state in the URL and localStorage, read client-side after mount, so pages stay fully static while a shared ?role= link loads already tailored.",
      "The command palette and its library load lazily — none of it is in the initial bundle. The chunk warms after the page settles so the first ⌘K is instant.",
    ],
  },
  {
    heading: "Motion principles",
    body: [
      "Motion must teach: reveals establish reading order, the timeline fill communicates progress, the architecture explorer walks its stages as it scrolls into view, and the pipeline canvas shows data flowing through the same stages the case studies describe. Nothing loops for decoration, and the one accent colour stays under a tenth of any screen.",
      "Everything degrades deliberately: prefers-reduced-motion turns off non-essential animation, touch devices skip cursor effects in favour of tap feedback, and if JavaScript never runs — or hydration fails — an inline guard reveals all content rather than trapping it at opacity zero.",
    ],
  },
  {
    heading: "Accessibility & performance",
    body: [
      "WCAG AA is treated as a floor: AA contrast throughout, visible focus, full keyboard support (including the palette, the role lens, and the architecture explorer), correct dialog and live-region semantics, and a skip link.",
      "Performance is a working budget, not an afterthought: Lighthouse runs in CI with ≥95 budgets on the home page and a case-study page across all four categories. At the time of writing both score 100 / 100 / 100 / 100 in production (local best-practices dips to 96 only because the analytics script 404s off-Vercel).",
      "The heaviest things on the site are photographs; they're served as AVIF/WebP through the image CDN, the LCP image is prioritized, and the ambient animation loop parks itself whenever motion settles.",
    ],
  },
];

export default function ColophonPage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-[760px] px-6 pt-28 pb-24 md:pt-36">
        <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Colophon
        </p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight md:text-5xl md:tracking-[-0.03em]">
          How this site is built.
        </h1>
        <p className="mt-5 text-lg leading-8 text-neutral-400">
          The portfolio is meant to be evidence, not just a brochure — so it
          holds itself to the same standard as the systems it describes.
        </p>

        {sections.map((section, i) => (
          <section key={section.heading} data-reveal className="mt-12">
            <h2 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              {String(i + 1).padStart(2, "0")} · {section.heading}
            </h2>
            {section.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="mt-4 text-lg leading-8 text-neutral-300"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <p className="mt-14 border-t border-white/[0.08] pt-8 text-base text-neutral-400">
          Source of record for scores and decisions:{" "}
          <span className="font-mono text-sm">docs/V3-LOG.md</span> in the
          repository.
        </p>
      </main>
    </>
  );
}
