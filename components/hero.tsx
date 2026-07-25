import { PhotoCard } from "@/components/photo-card";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh flex-col">
      <div className="mx-auto grid w-full max-w-[1120px] flex-1 items-center gap-16 px-6 pt-28 pb-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12 lg:pt-16 lg:pb-0">
        <div>
          <p className="text-2xl font-medium text-paper">Hi, I'm</p>
          <h1 className="mt-1 text-[clamp(2.5rem,9vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.045em]">
            Lionael Surya
          </h1>
          <p className="mt-3 font-mono text-xs tracking-[0.18em] text-muted uppercase leading-6">
            Data Science <span className="mx-1.5">•</span> Data Engineering{" "}
            <span className="mx-1.5">•</span> Software Engineering
            <br />
            Toronto, Canada
          </p>

          <p className="mt-14 text-[clamp(2rem,5vw,4.5rem)] leading-[1.1] font-medium tracking-[-0.03em] text-paper">
            Welcome to my portfolio.
          </p>

          <p className="mt-6 max-w-[36rem] text-lg leading-8 text-neutral-400 md:text-xl md:leading-9">
            I'm a Data Science student at Seneca Polytechnic building
            production-ready data platforms, internal software, and AI-powered
            systems. My focus is reliable architecture, reproducible pipelines,
            and software people can actually trust.
          </p>

          <div className="mt-10 flex items-center gap-10">
            <a href="#work" className="u-link text-base font-medium text-paper">
              Explore my work <span aria-hidden="true">↓</span>
            </a>
            <a
              href="https://github.com/suryalionael"
              target="_blank"
              rel="noopener noreferrer"
              className="u-link text-base text-neutral-400 transition-colors hover:text-paper"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="pb-8 lg:pb-0">
          <PhotoCard />
        </div>
      </div>
    </section>
  );
}