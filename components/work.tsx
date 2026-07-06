"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { projects, type Project } from "@/lib/projects";
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
    // Deep links (#slug) can only be read client-side; sync once on mount.
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
    document.body.style.overflow = "hidden";
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
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [active, close]);

  const layoutTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: EASE };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {projects.map((project, i) => (
          <motion.button
            key={project.slug}
            layoutId={`card-${project.slug}`}
            transition={layoutTransition}
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
            <span className="mt-16 block text-2xl font-medium tracking-tight md:mt-24 md:text-[1.75rem]">
              {project.title}
            </span>
            <span className="mt-3 block max-w-[30rem] text-sm leading-relaxed text-neutral-400">
              {project.summary}
            </span>
            <span className="mt-6 block font-mono text-[11px] text-neutral-400">
              {project.tags.join(" · ")}
            </span>
            <span className="mt-8 flex items-center gap-2 text-sm font-medium text-neutral-300 transition-colors group-hover:text-paper">
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

      <AnimatePresence>
        {active && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35 }}
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    delay: reduceMotion ? 0 : 0.25,
                  }}
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
