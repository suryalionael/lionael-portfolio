"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { resumesByCategory, type Resume } from "@/lib/resumes";

const EASE = [0.16, 1, 0.3, 1] as const;

function Card({
  resume,
  onOpen,
}: {
  resume: Resume;
  onOpen: (trigger: HTMLElement) => void;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-raised/70 transition-colors duration-300 hover:border-white/25">
      <button
        type="button"
        onClick={(e) => onOpen(e.currentTarget)}
        aria-haspopup="dialog"
        aria-label={`Preview ${resume.title} resume`}
        className="group relative block w-full border-b border-white/[0.06] bg-neutral-900"
      >
        <Image
          src={resume.preview.src}
          alt={`First page of the ${resume.title} resume`}
          width={resume.preview.width}
          height={resume.preview.height}
          className="h-auto w-full"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-end justify-center bg-ink/0 pb-6 opacity-0 transition-[background-color,opacity] duration-300 group-hover:bg-ink/55 group-hover:opacity-100 group-focus-visible:bg-ink/55 group-focus-visible:opacity-100"
        >
          <span className="rounded-full border border-white/20 bg-ink/80 px-4 py-1.5 text-xs font-medium text-paper backdrop-blur-sm">
            Preview
          </span>
        </span>
      </button>

      <div className="flex grow flex-col p-5">
        <h3 className="text-lg font-medium tracking-tight text-paper">
          {resume.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-400">
          {resume.summary}
        </p>
        <div className="mt-5 flex items-center gap-5 border-t border-white/[0.06] pt-4">
          <button
            type="button"
            onClick={(e) => onOpen(e.currentTarget)}
            aria-haspopup="dialog"
            className="u-link text-xs font-medium text-paper"
          >
            Preview
          </button>
          <a
            href={resume.file}
            download={resume.downloadName}
            className="u-link text-xs text-neutral-400 transition-colors hover:text-paper"
          >
            Download PDF
          </a>
        </div>
      </div>
    </article>
  );
}

export function ResumeGallery() {
  const [active, setActive] = useState<Resume | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const close = useCallback(() => setActive(null), []);

  const open = (resume: Resume, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setActive(resume);
  };

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

    const timer = setTimeout(() => dialogRef.current?.focus(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
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
    };
    document.addEventListener("keydown", onKey);
    return () => {
      const top = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(top || "0") * -1);
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
    };
  }, [active, close]);

  return (
    <>
      {resumesByCategory.map((group) => (
        <section key={group.category} className="mt-20 first:mt-0">
          <div className="flex items-baseline justify-between gap-6 border-t border-white/[0.06] pt-6">
            <h2 className="text-2xl font-medium tracking-tight text-paper md:text-3xl">
              {group.category}
            </h2>
            <span className="font-mono text-[11px] text-muted">
              {String(group.resumes.length).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            {group.resumes.map((resume) => (
              <Card
                key={resume.slug}
                resume={resume}
                onOpen={(trigger) => open(resume, trigger)}
              />
            ))}
          </div>
        </section>
      ))}

      <AnimatePresence>
        {active && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.4 } }}
            transition={{ duration: reduceMotion ? 0 : 0.35 }}
            onClick={close}
            className="fixed inset-0 z-[60] flex flex-col bg-black/85 backdrop-blur-sm"
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={`${active.title} resume`}
              tabIndex={-1}
              onClick={(e) => e.stopPropagation()}
              className="flex h-full w-full flex-col outline-none"
            >
              <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-3 md:px-8 md:py-4">
                <div className="min-w-0">
                  <p className="truncate text-base font-medium text-paper md:text-lg">
                    {active.title}
                  </p>
                  <p className="truncate font-mono text-[11px] text-muted">
                    {active.category}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4 md:gap-6">
                  <a
                    href={active.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link hidden text-xs text-neutral-400 transition-colors hover:text-paper sm:inline"
                  >
                    Open PDF ↗
                  </a>
                  <a
                    href={active.file}
                    download={active.downloadName}
                    className="u-link text-xs font-medium text-paper"
                  >
                    Download PDF
                  </a>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close resume preview"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/[0.12] text-sm text-neutral-300 transition-colors hover:border-white/30 hover:text-paper"
                  >
                    <span aria-hidden="true">✕</span>
                  </button>
                </div>
              </header>

              <div className="min-h-0 grow p-3 md:p-6">
                <motion.iframe
                  key={active.slug}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
                  src={`${active.file}#view=FitH`}
                  title={`${active.title} resume`}
                  className="size-full rounded-lg border border-white/[0.08] bg-neutral-900"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
