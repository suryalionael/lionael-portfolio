import type { Project } from "@/lib/projects";
import { ArchExplorer } from "@/components/arch-explorer";

export function CaseStudy({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div className="relative px-6 pt-6 pb-12 md:px-12 md:pt-8 md:pb-16">
      <div className="sticky top-4 z-10 float-right -mr-2 md:-mr-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-ink-raised text-neutral-400 transition-colors hover:border-white/30 hover:text-paper"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1l12 12M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <p className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-muted uppercase">
        {project.live && (
          <span className="dot-live inline-block size-1.5 rounded-full bg-accent" />
        )}
        {project.category} · {project.year}
      </p>
      <h3 className="mt-4 max-w-[16ch] text-3xl font-medium tracking-tight md:text-5xl md:tracking-[-0.03em]">
        {project.title}
      </h3>
      <p className="mt-5 max-w-[38rem] text-base leading-relaxed text-neutral-400 md:text-lg">
        {project.summary}
      </p>

      <div className="mt-8 flex items-center gap-8">
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="u-link text-sm font-medium text-paper"
          >
            Live dashboard ↗
          </a>
        )}
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="u-link text-sm text-neutral-400 transition-colors hover:text-paper"
          >
            GitHub ↗
          </a>
        )}
      </div>

      <dl className="mt-12 grid grid-cols-3 gap-4 border-y border-white/[0.08] py-8">
        {project.metrics.map((m) => (
          <div key={m.label}>
            <dd className="text-2xl font-medium tracking-tight md:text-3xl">
              {m.value}
            </dd>
            <dt className="mt-1 font-mono text-[11px] leading-snug text-neutral-400">
              {m.label}
            </dt>
          </div>
        ))}
      </dl>

      <section className="mt-12">
        <h4 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Architecture — hover or select a stage
        </h4>
        <div className="mt-5">
          <ArchExplorer
            nodes={project.architecture.nodes}
            foundation={project.architecture.foundation}
          />
        </div>
      </section>

      {project.sections.map((section) => (
        <section key={section.heading} className="mt-12">
          <h4 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
            {section.heading}
          </h4>
          {section.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="mt-4 max-w-[42rem] leading-relaxed text-neutral-300"
            >
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      <div className="mt-14 border-t border-white/[0.08] pt-8">
        <button
          type="button"
          onClick={onClose}
          className="u-link text-sm text-neutral-400 transition-colors hover:text-paper"
        >
          ← Back to all systems
        </button>
      </div>
    </div>
  );
}
