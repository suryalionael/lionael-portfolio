const DISCIPLINES = ["Data Science", "Data Engineering", "Software Engineering"];

// Type leads; the portrait is a small, quiet plate in the top-right corner
// of the content column.
export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-[1120px] gap-x-16 px-6 pt-28 pb-24 md:grid-cols-[minmax(0,1fr)_auto] md:pt-40 md:pb-32"
    >
      <figure
        className="anim-fade w-[120px] overflow-hidden bg-neutral-200 md:col-start-2 md:row-start-1 md:w-[180px] lg:w-[208px]"
        style={{ "--d": "0.15s" } as React.CSSProperties}
      >
        <picture>
          <source
            type="image/webp"
            srcSet="/portrait-crop-240.webp 240w, /portrait-crop-480.webp 480w"
            sizes="(min-width: 1024px) 208px, (min-width: 768px) 180px, 120px"
          />
          <img
            src="/portrait-crop-480.jpg"
            alt="Portrait of Lionael Surya in a black shirt"
            width={480}
            height={600}
            fetchPriority="high"
            className="block aspect-[4/5] w-full object-cover"
          />
        </picture>
      </figure>

      <h1
        className="anim-fade-up mt-10 font-medium tracking-[-0.055em] md:col-start-1 md:row-start-1 md:mt-0"
        style={{ "--d": "0.05s" } as React.CSSProperties}
      >
        <span className="block text-lg font-normal tracking-normal text-muted md:text-xl">
          Hi, I&apos;m
        </span>
        <span className="mt-3 block text-[clamp(3.75rem,9vw,7.5rem)] leading-[0.88]">
          Lionael
          <br />
          Surya
        </span>
      </h1>

      <div
        className="anim-fade-up mt-12 md:col-start-1 md:mt-16"
        style={{ "--d": "0.25s" } as React.CSSProperties}
      >
        <p className="max-w-[34rem] text-lg leading-8 text-neutral-400 md:text-[1.1875rem] md:leading-[1.7]">
          <span className="text-paper">Welcome to my portfolio.</span>{" "}
          I&apos;m a Data Science student at Seneca Polytechnic building
          production-ready data platforms, internal software, and AI-powered
          systems. My focus is reliable architecture, reproducible pipelines,
          and software people can actually trust.
        </p>

        <div className="mt-9 flex items-center gap-9">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 text-base font-medium text-paper"
          >
            <span className="underline decoration-white/30 decoration-1 underline-offset-[7px] transition-[text-decoration-color] duration-300 group-hover:decoration-white">
              Explore my work
            </span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            >
              ↓
            </span>
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

        <dl className="mt-12 grid grid-cols-[auto_auto] justify-start gap-x-14 gap-y-2 border-t border-white/[0.08] pt-6 md:mt-14">
          <dt className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
            Focus
          </dt>
          <dt className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
            Based in
          </dt>
          <dd className="text-sm leading-6 text-neutral-300">
            <ul>
              {DISCIPLINES.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </dd>
          <dd className="text-sm leading-6 text-neutral-300">
            Toronto, Canada
          </dd>
        </dl>
      </div>
    </section>
  );
}
