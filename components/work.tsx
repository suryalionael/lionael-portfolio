"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {featuredProjects.map((project, i) => (
          <motion.button
            key={project.slug}
            layoutId={`card-${project.slug}`}
            transition={layoutTransition}
            whileHover={
              reduceMotion
                ? undefined
                : { y: -4, transition: { duration: 0.3, ease: EASE } }
            }
            type="button"
            onClick={(e) => open(project, e.currentTarget)}
            aria-haspopup="dialog"
            className="group rounded-2xl border border-white/[0.08] bg-ink-raised/70 p-7 text-left transition-colors duration-300 hover:border-white/25 md:p-9"
          >
            <span className="flex items-center justify-between font-mono text-xs tracking-[0.15em] text-muted uppercase">
              <span className="flex items-center gap-3">
                {project.live && (
                  <span className="dot-live inline-block size-1.5 rounded-full bg-accent" />
                )}
                {project.category}
              </span>
              <span>0{i + 1}</span>
            </span>
            <span className="mt-16 block text-3xl font-medium tracking-tight md:mt-24 md:text-[2rem]">
              {project.title}
            </span>
            <span className="mt-3 block max-w-[30rem] text-base leading-relaxed text-neutral-400">
              {project.summary}
            </span>
            <span className="mt-6 block font-mono text-[11px] text-neutral-400">
              {project.tags.join(" · ")}
            </span>
            <span className="mt-8 flex items-center gap-2 text-base font-medium text-neutral-300 transition-colors group-hover:text-paper">
              Open case study
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <div className="mt-24 space-y-20">
        {projectsByCategory.map((group) => (
          <div key={group.category}>
            <h3 className="text-2xl font-medium tracking-tight text-paper md:text-3xl">
              {group.category}
            </h3>

            {group.category === "Client Software & Websites" ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.projects.map((project) => (
                  <motion.button
                    key={project.slug}
                    layoutId={`card-${project.slug}`}
                    transition={layoutTransition}
                    type="button"
                    onClick={(e) => open(project, e.currentTarget)}
                    aria-haspopup="dialog"
                    className="group overflow-hidden rounded-xl border border-white/[0.08] bg-ink-raised/50 text-left transition-colors duration-300 hover:border-white/20"
                  >
                    {project.images?.[0] && (
                      <div className="aspect-video overflow-hidden bg-neutral-900">
                        <Image
                          src={project.images[0].src}
                          alt={project.images[0].alt}
                          width={project.images[0].width}
                          height={project.images[0].height}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-muted uppercase">
                        {project.live && (
                          <span className="dot-live inline-block size-1.5 rounded-full bg-accent" />
                        )}
                        {project.category}
                      </span>
                      <span className="mt-2 block text-lg font-medium text-neutral-200 transition-colors group-hover:text-paper">
                        {project.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-neutral-400 line-clamp-2">
                        {project.summary}
                      </span>
                      <span className="mt-3 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-white/[0.06] px-2 py-0.5 font-mono text-[10px] text-neutral-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                      <div className="mt-4 flex items-center gap-4 border-t border-white/[0.06] pt-4">
                        {project.links.demo && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.links.demo, "_blank", "noopener");
                            }}
                            className="u-link text-xs font-medium text-paper"
                          >
                            Live Website ↗
                          </span>
                        )}
                        {project.links.github && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.links.github, "_blank", "noopener");
                            }}
                            className="u-link text-xs text-neutral-400 transition-colors hover:text-paper"
                          >
                            GitHub ↗
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <>
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
                          {project.live && (
                            <span className="dot-live inline-block size-1.5 rounded-full bg-accent" />
                          )}
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
              </>
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
