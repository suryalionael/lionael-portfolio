"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "motion/react";
import Image from "next/image";
import {
  featuredProjects,
  projects,
  projectsByCategory,
  type Project,
} from "@/lib/projects";
import { CaseStudy } from "@/components/case-study";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Work() {
  const [active, setActive] = useState<Project | null>(null);
  const pushedRef = useRef(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const open = (project: Project, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setActive(project);
    history.pushState({ project: project.slug }, "", `#${project.slug}`);
    pushedRef.current = true;
  };

  const close = useCallback(() => {
    if (pushedRef.current) {
      history.back();
    } else {
      history.replaceState(null, "", window.location.pathname);
      setActive(null);
    }
  }, []);

  useEffect(() => {
    const fromHash = () =>
      projects.find((p) => `#${p.slug}` === window.location.hash) ?? null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (window.location.hash) setActive(fromHash());
    const onPop = () => {
      pushedRef.current = false;
      setActive(fromHash());
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (!active) {
      triggerRef.current?.focus();
      triggerRef.current = null;
      return;
    }
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    setTimeout(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>("[aria-label='Close case study']")
        ?.focus();
    }, 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = [
          ...dialogRef.current.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled])",
          ),
        ].filter((el) => el.offsetParent !== null);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!dialogRef.current.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
      document.removeEventListener("keydown", onKey);
    };
  }, [active, close]);

  const layoutTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: EASE, delay: 0.05 };

  const card = (project: Project, size: "featured" | "compact") => (
    <ProjectCard
      key={project.slug}
      project={project}
      size={size}
      transition={layoutTransition}
      onOpen={open}
    />
  );

  return (
    <>
      <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => card(project, "featured"))}
      </div>

      <div className="mt-28 space-y-20">
        {projectsByCategory.map((group) => (
          <div key={group.category}>
            <h3 className="text-2xl font-medium tracking-tight text-paper md:text-3xl">
              {group.category}
            </h3>

            {group.category === "Client Software & Websites" ? (
              <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {group.projects.map((project) => card(project, "compact"))}
              </div>
            ) : (
              <ul className="mt-6 border-t border-white/[0.06]">
                {group.projects.map((project) => (
                  <li key={project.slug}>
                    <motion.button
                      layoutId={`card-${project.slug}`}
                      transition={layoutTransition}
                      type="button"
                      onClick={(e) => open(project, e.currentTarget)}
                      aria-haspopup="dialog"
                      className="group flex w-full items-baseline justify-between gap-6 border-b border-white/[0.06] py-5 text-left transition-colors hover:border-white/20"
                    >
                      <span className="flex shrink-0 items-center gap-3 text-lg font-medium text-neutral-200 transition-colors group-hover:text-paper">
                        {project.title}
                      </span>
                      <span className="hidden flex-1 truncate text-base text-muted md:block">
                        {project.summary}
                      </span>
                      <span className="hidden shrink-0 font-mono text-[11px] text-neutral-400 sm:block">
                        {project.tags.slice(0, 3).join(" · ")}
                      </span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-neutral-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-paper"
                      >
                        →
                      </span>
                    </motion.button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: reduceMotion ? 0 : 0.5 },
            }}
            transition={{ duration: reduceMotion ? 0 : 0.4 }}
            onClick={close}
            className="fixed inset-0 z-[60] overflow-y-auto bg-black/70 backdrop-blur-sm"
          >
            <div className="flex min-h-full justify-center px-4 py-6 md:px-6 md:py-12">
              <motion.article
                ref={dialogRef}
                layoutId={`card-${active.slug}`}
                transition={layoutTransition}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={`${active.title} case study`}
                className="h-fit w-full max-w-3xl rounded-2xl border border-white/[0.08] bg-ink-raised"
              >
                <motion.div
                  initial={false}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                >
                  <CaseStudy project={active} onClose={close} />
                </motion.div>
              </motion.article>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// One card for featured systems and client work. The whole card opens the
// case study via a stretched button; external links sit above it so they
// stay real, keyboard-reachable anchors.
function ProjectCard({
  project,
  size,
  transition,
  onOpen,
}: {
  project: Project;
  size: "featured" | "compact";
  transition: Transition;
  onOpen: (project: Project, trigger: HTMLElement) => void;
}) {
  const image =
    project.thumb === "architecture" ? undefined : project.images?.[0];
  const featured = size === "featured";

  return (
    <motion.article
      layoutId={`card-${project.slug}`}
      transition={transition}
      className="group relative flex flex-col"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/[0.08] bg-ink-raised transition-colors duration-300 group-hover:border-white/20">
        {image ? (
          <Image
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            sizes="(min-width: 1024px) 352px, (min-width: 768px) 50vw, 100vw"
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
      <h4
        className={`mt-2 font-medium tracking-tight text-paper ${
          featured ? "text-2xl" : "text-lg"
        }`}
      >
        <button
          type="button"
          onClick={(e) => onOpen(project, e.currentTarget)}
          aria-haspopup="dialog"
          className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-offset-8 focus-visible:after:outline-accent"
        >
          {project.title}
        </button>
      </h4>
      <p
        className={`mt-2 leading-relaxed text-neutral-400 ${
          featured ? "text-[15px]" : "line-clamp-2 text-sm"
        }`}
      >
        {project.summary}
      </p>
      <p className="mt-4 font-mono text-[11px] leading-5 text-neutral-500">
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
            {featured ? "Live" : "Live site"} <span aria-hidden="true">↗</span>
            <span className="sr-only"> — {project.title}</span>
          </a>
        )}
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="u-link relative z-10 text-neutral-400 transition-colors hover:text-paper"
          >
            GitHub <span aria-hidden="true">↗</span>
            <span className="sr-only"> — {project.title}</span>
          </a>
        )}
      </div>
    </motion.article>
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
        {project.architecture.nodes.map((node) => (
          <li
            key={node.id}
            className="relative grid grid-cols-[minmax(0,auto)_minmax(0,1fr)] items-baseline gap-3"
          >
            <span className="absolute top-[0.55em] -left-[23px] size-[5px] rounded-full bg-neutral-500" />
            <span className="truncate text-[13px] text-neutral-200">
              {node.label}
            </span>
            <span className="truncate font-mono text-[10px] text-neutral-500">
              {node.tech}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
