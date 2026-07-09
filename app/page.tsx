import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Skills } from "@/components/skills";
import { SocialActivities } from "@/components/social-activities";
import { WhyIBuild } from "@/components/why-i-build";
import { Work } from "@/components/work";
import { roadmap } from "@/lib/projects";

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
        <WhyIBuild />
        <Education />

        <section id="work" className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1120px] px-6 py-28 md:py-36">
            <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              Selected work
            </p>
            <h2 className="mt-4 text-5xl font-medium tracking-[-0.03em] md:text-6xl">
              Systems I&apos;ve built.
            </h2>
            <p className="mt-5 max-w-[36rem] text-lg leading-relaxed text-neutral-400">
              Eleven systems across five disciplines. Each one runs, each one
              is documented, and every case study explains the decisions
              behind it.
            </p>

            <div className="mt-14">
              <Work />
            </div>

            <div className="mt-20">
              <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
                On the roadmap
              </p>
              <p className="mt-3 max-w-[36rem] text-base leading-relaxed text-neutral-400">
                Planned systems from the portfolio monorepo — listed, not
                claimed. Each link goes to its design brief.
              </p>
              <ul className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {roadmap.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline justify-between gap-4 border-b border-white/[0.06] py-3 transition-colors hover:border-white/20"
                    >
                      <span className="text-base text-neutral-300 transition-colors group-hover:text-paper">
                        {item.title}
                      </span>
                      <span className="hidden truncate font-mono text-xs text-muted lg:block">
                        {item.note}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="https://github.com/suryalionael"
              target="_blank"
              rel="noopener noreferrer"
              className="u-link mt-14 inline-block text-base text-neutral-400 transition-colors hover:text-paper"
            >
              Everything else on GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <Experience />
        <Skills />
        <SocialActivities />
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
