"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/projects";
import { ArchExplorer } from "@/components/arch-explorer";

const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({
  delay,
  className,
  children,
}: {
  delay: number;
  className?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduce ? 0 : 0.55,
        ease: EASE,
        delay: reduce ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function CaseStudy({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="relative px-6 pt-6 pb-12 md:px-12 md:pt-8 md:pb-16">
      <motion.div
        className="sticky top-4 z-10 float-right -mr-2 md:-mr-6"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 0.15 }}
      >
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
      </motion.div>

      <Reveal delay={0.45}>
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
      </Reveal>

      <Reveal delay={1.05}>
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
      </Reveal>

      <Reveal delay={0.6}>
        <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-white/[0.08] py-8">
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
      </Reveal>

      <Reveal delay={0.78}>
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
      </Reveal>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.95 }}
      >
        {project.sections.map((section, i) => (
          <motion.section
            key={section.heading}
            className="mt-12"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
          >
            <h4 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              {String(i + 1).padStart(2, "0")} · {section.heading}
            </h4>
            {section.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="mt-4 max-w-[42rem] leading-relaxed text-neutral-300"
              >
                {paragraph}
              </p>
            ))}
          </motion.section>
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
      </motion.div>
    </div>
  );
}
