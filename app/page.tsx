import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Work } from "@/components/work";
import { moreSystems } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip to main content
      </a>
      <Nav />
      <main id="main">
        <Hero />

        <section id="work" className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1120px] px-6 py-28 md:py-36">
            <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              Selected work
            </p>
            <h2 className="mt-4 text-4xl font-medium tracking-[-0.03em] md:text-5xl">
              Systems I&apos;ve built.
            </h2>
            <p className="mt-5 max-w-[34rem] leading-relaxed text-neutral-400">
              Two case studies in depth. Each one runs, each one is tested,
              and each one documents the decisions behind it.
            </p>

            <div className="mt-14">
              <Work />
            </div>

            <div className="mt-20">
              <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
                More systems
              </p>
              <ul className="mt-4 border-t border-white/[0.06]">
                {moreSystems.map((system) => (
                  <li key={system.title}>
                    <a
                      href={system.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline justify-between gap-6 border-b border-white/[0.06] py-5 transition-colors hover:border-white/20"
                    >
                      <span className="shrink-0 text-base font-medium text-neutral-200 transition-colors group-hover:text-paper">
                        {system.title}
                      </span>
                      <span className="hidden flex-1 truncate text-sm text-muted sm:block">
                        {system.note}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-paper"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="https://github.com/suryalionael"
                target="_blank"
                rel="noopener noreferrer"
                className="u-link mt-6 inline-block text-sm text-neutral-400 transition-colors hover:text-paper"
              >
                Everything else on GitHub ↗
              </a>
            </div>
          </div>
        </section>

        <Experience />
        <About />
        <Contact />
      </main>
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-8">
          <p className="font-mono text-xs text-muted">
            © 2026 Lionael Surya
          </p>
          <p className="font-mono text-xs text-muted">
            Toronto, Canada
          </p>
        </div>
      </footer>
    </>
  );
}
