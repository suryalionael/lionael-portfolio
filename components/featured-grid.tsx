"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { featuredProjects, type Project } from "@/lib/projects";
import { useRole } from "@/components/role-context";
import { skillMatchesProject, useSkillProof } from "@/components/skill-context";

const EASE = [0.16, 1, 0.3, 1] as const;

// Lets the case-study page know its previous history entry is the home
// page, so "Back to work" can restore the scroll spot via history.back().
export function markBackToWork() {
  try {
    sessionStorage.setItem("back-to-work", "1");
  } catch {}
}

// The four featured systems. The role lens reorders them with a layout
// animation; case-study navigation is a plain anchor so cross-document
// view transitions can morph card → page.
export function FeaturedGrid() {
  const { role } = useRole();
  const { hovered } = useSkillProof();
  const reduce = useReducedMotion();

  // A slug missing from the role's list sorts last, not first.
  const rank = (slug: string) => {
    const i = role ? role.projects.indexOf(slug) : -1;
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };
  const ordered = role
    ? [...featuredProjects].sort((a, b) => rank(a.slug) - rank(b.slug))
    : featuredProjects;

  return (
    <div className="grid gap-x-6 gap-y-14 md:grid-cols-2">
      {ordered.map((project, i) => (
        <motion.div
          key={project.slug}
          layout={!reduce}
          transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
          data-reveal
          style={{ "--i": i % 2 } as React.CSSProperties}
          className={`flex transition-opacity duration-500 ${
            hovered && !skillMatchesProject(hovered, project)
              ? "opacity-40"
              : ""
          }`}
        >
          <div data-tilt className="relative flex w-full">
            <ProjectCard project={project} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const image =
    project.thumb === "architecture" ? undefined : project.images?.[0];

  return (
    <article data-cursor="View" className="group relative flex w-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/[0.08] bg-ink-raised transition-colors duration-300 group-hover:border-white/20">
        {image ? (
          <Image
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="size-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
          />
        ) : (
          <ArchThumb project={project} />
        )}
      </div>

      <p className="mt-5 flex items-center gap-2.5 font-mono text-[11px] tracking-[0.15em] text-muted uppercase">
        {project.live && (
          <span className="dot-live inline-block size-1.5 rounded-full bg-accent" />
        )}
        {project.category} · {project.year}
      </p>
      <h3
        className="mt-2 text-2xl font-medium tracking-tight text-paper"
        style={{ viewTransitionName: `title-${project.slug}` }}
      >
        <a
          href={`/work/${project.slug}`}
          onClick={markBackToWork}
          className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-offset-8 focus-visible:after:outline-accent"
        >
          {project.title}
        </a>
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-neutral-400">
        {project.summary}
      </p>
      <p className="mt-4 font-mono text-[11px] leading-5 text-neutral-400">
        {project.tags.join(" · ")}
      </p>

      <div className="mt-auto flex items-center gap-6 pt-5 text-sm">
        <span className="font-medium text-neutral-300 transition-colors group-hover:text-paper">
          Case study{" "}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="u-link relative z-10 text-neutral-400 transition-colors hover:text-paper"
          >
            Live <span aria-hidden="true">↗</span>
            <span className="sr-only"> — {project.title}</span>
          </a>
        )}
      </div>
    </article>
  );
}

// Projects without a screenshot get their real pipeline instead of a
// placeholder image.
function ArchThumb({ project }: { project: Project }) {
  return (
    <div
      aria-hidden="true"
      className="flex size-full flex-col justify-center px-7 py-6"
    >
      <ol className="relative space-y-2 border-l border-white/10 pl-5">
        {project.architecture.nodes.slice(0, 5).map((node) => (
          <li key={node.id} className="relative">
            <span className="absolute top-1.5 -left-[23.5px] size-1.5 rounded-full border border-white/25 bg-ink-raised" />
            <p className="font-mono text-[11px] tracking-[0.06em] text-neutral-300">
              {node.label}
            </p>
            <p className="font-mono text-[10px] text-neutral-500">
              {node.tech}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
