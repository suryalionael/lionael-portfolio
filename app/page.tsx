import { SplitHeading } from "@/components/split-heading";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Nav } from "@/components/nav";
import { PipelineLive } from "@/components/pipeline-live";
import { LocalTime } from "@/components/local-time";
import { Skills } from "@/components/skills";
import { SocialActivities } from "@/components/social-activities";
import { WhyIBuild } from "@/components/why-i-build";
import { Work } from "@/components/work";
import { SkillProofProvider } from "@/components/skill-context";

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
      <SkillProofProvider>
      <main id="main">
        <Hero />
        <Marquee />
        <WhyIBuild />
        <Education />

        <section id="work" className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1120px] px-6 py-28 md:py-36">
            <p data-reveal data-scramble className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              Selected work
            </p>
            <SplitHeading
          className="mt-4 text-5xl font-medium tracking-[-0.03em] md:text-6xl"
          text="Systems I’ve built."
        />
            <p data-reveal className="mt-5 max-w-[36rem] text-lg leading-relaxed text-neutral-400">
              Four featured systems, then the full archive. Open any of them
              for the engineering decisions behind it — not just what was
              built, but why.
            </p>
            <div data-reveal>
              <PipelineLive />
            </div>

            <div className="mt-14">
              <Work />
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
      </SkillProofProvider>
      <footer className="overflow-hidden border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1120px] px-6 pt-10 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 font-mono text-xs text-muted">
            <p>© 2026 Lionael Surya</p>
            <p>
              Toronto, Canada · <LocalTime />
            </p>
          </div>
          {/* A quiet, oversized wordmark that rises in on scroll. */}
          <p
            aria-hidden="true"
            data-reveal
            className="mt-10 -mb-[0.16em] text-center text-[clamp(3.5rem,12.5vw,11rem)] leading-none font-medium tracking-[-0.05em] whitespace-nowrap text-white/[0.13] select-none"
          >
            Lionael Surya
          </p>
        </div>
      </footer>
    </>
  );
}
