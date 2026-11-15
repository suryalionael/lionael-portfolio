import Image from "next/image";
import type { Project } from "@/lib/projects";
import { ArchExplorer } from "@/components/arch-explorer";
import { PhotoFade } from "@/components/photo-fade";
import { BackLink } from "@/components/back-link";

// Server-rendered case study body, shared by every /work/[slug] page.
// Scroll reveals come from the ambient layer's [data-reveal] handling.
export function CaseStudyArticle({ project }: { project: Project }) {
  return (
    <article className="mx-auto max-w-[760px] px-6 pt-28 pb-16 md:pt-36">
      <BackLink />

      <header className="mt-10">
        <p className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-muted uppercase">
          {project.live && (
            <span className="dot-live inline-block size-1.5 rounded-full bg-accent" />
          )}
          {project.category} · {project.year}
        </p>
        <h1
          className="mt-4 max-w-[16ch] text-4xl font-medium tracking-tight md:text-5xl md:tracking-[-0.03em]"
          style={{ viewTransitionName: `title-${project.slug}` }}
        >
          {project.title}
        </h1>
        <p className="mt-5 max-w-[40rem] text-lg leading-8 text-neutral-400 md:text-xl md:leading-9">
          {project.summary}
        </p>

        {project.links.demo && (
          <div className="mt-8 flex items-center gap-8">
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="u-link text-base font-medium text-paper"
            >
              Live demo ↗
            </a>
          </div>
        )}
      </header>

      <dl
        data-reveal
        className="mt-10 grid gap-6 border-y border-white/[0.08] py-8 sm:grid-cols-3 sm:gap-4"
      >
        {project.metrics.map((m) => (
          // dt before dd for valid HTML; flex-col-reverse keeps the value
          // visually on top.
          <div key={m.label} className="flex flex-col-reverse gap-1">
            <dt className="font-mono text-xs leading-snug text-neutral-400">
              {m.label}
            </dt>
            <dd className="text-3xl font-medium tracking-tight md:text-4xl">
              {m.value}
            </dd>
          </div>
        ))}
      </dl>

      <section data-reveal className="mt-12">
        <h2 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Architecture
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          Select a stage to explore it.
        </p>
        <div className="mt-5">
          <ArchExplorer
            nodes={project.architecture.nodes}
            foundation={project.architecture.foundation}
          />
        </div>
      </section>

      {project.images && (
        <section data-reveal className="mt-12">
          <h2 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
            Visuals
          </h2>
          {/* Phones: one swipeable scroll-snap strip for any multi-image set. */}
          {project.images.length > 1 && (
            <div
              className="-mx-6 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:hidden"
              style={{ scrollbarWidth: "none" }}
            >
              {project.images.map((image) => (
                <figure key={image.src} className="w-[86%] shrink-0 snap-center">
                  <div className="overflow-hidden rounded-xl border border-white/[0.08]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="86vw"
                      className="w-full"
                    />
                  </div>
                  <figcaption className="mt-2 font-mono text-xs text-neutral-400">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
          {project.images.length >= 3 ? (
            <figure className="mt-4 max-sm:hidden">
              <PhotoFade
                photos={project.images}
                sizes="(min-width: 768px) 712px, 100vw"
                className="aspect-[36/25] rounded-xl border border-white/[0.08]"
                interval={4600}
              />
              <figcaption className="mt-2 font-mono text-xs text-neutral-400">
                {project.images[0].caption}
              </figcaption>
            </figure>
          ) : (
            <div
              className={`mt-4 grid gap-4 sm:grid-cols-2 ${
                project.images.length > 1 ? "max-sm:hidden" : ""
              }`}
            >
              {project.images.map((image) => (
                <figure key={image.src}>
                  <div className="overflow-hidden rounded-xl border border-white/[0.08]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(min-width: 640px) 350px, 100vw"
                      className="w-full"
                    />
                  </div>
                  <figcaption className="mt-2 font-mono text-xs text-neutral-400">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>
      )}

      {project.sections.map((section, i) => (
        <section key={section.heading} data-reveal className="mt-12">
          <h2 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
            {String(i + 1).padStart(2, "0")} · {section.heading}
          </h2>
          {section.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="mt-4 max-w-[44rem] text-lg leading-8 text-neutral-300"
            >
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </article>
  );
}
