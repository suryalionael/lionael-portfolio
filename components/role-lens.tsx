"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { roles } from "@/lib/roles";
import { resumes } from "@/lib/resumes";
import { report } from "@/lib/analytics";
import { useRole } from "@/components/role-context";

// "Hiring for:" segmented control in the hero. Quiet by design — a mono
// label row with an animated pill under the active role.
export function RoleSwitch() {
  const { role, setRole } = useRole();
  const reduce = useReducedMotion();

  return (
    <div
      role="group"
      aria-label="Tailor this page for a role"
      className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2"
    >
      <span className="mr-1 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
        Hiring for:
      </span>
      <div className="flex rounded-full border border-white/[0.1] p-1">
        {roles.map((r) => {
          const on = role?.id === r.id;
          return (
            <button
              key={r.id}
              type="button"
              aria-pressed={on}
              onClick={() => setRole(on ? null : r.id)}
              className={`relative rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-[0.08em] whitespace-nowrap uppercase transition-colors ${
                on ? "text-ink" : "text-neutral-400 hover:text-paper"
              }`}
            >
              {on && (
                <motion.span
                  layoutId="role-pill"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 34 }
                  }
                  className="absolute inset-0 rounded-full bg-paper"
                />
              )}
              <span className="relative">{r.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// The hero pitch line, crossfaded when the lens changes and announced to
// screen readers.
export function RolePitch({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { role } = useRole();
  const text = role?.pitch ?? "I build data systems people can actually trust.";

  // Keying the <p> on the text replays a small CSS fade on every change —
  // no animation library state to get stuck.
  return (
    <div aria-live="polite" className={className} style={style}>
      <p
        key={text}
        className="pitch-swap max-w-[30rem] text-2xl leading-snug font-medium tracking-tight text-paper md:text-[1.75rem]"
      >
        {text}
      </p>
    </div>
  );
}

// Resume CTA that follows the lens: no role → the resume gallery; an
// active role → that role's PDF directly.
export function ResumeCta({
  variant,
}: {
  variant: "hero" | "contact";
}) {
  const { role } = useRole();
  const resume = role
    ? (resumes.find((r) => r.slug === role.resume) ?? null)
    : null;

  const classes =
    variant === "hero"
      ? "u-link text-[15px] text-neutral-300 transition-colors hover:text-paper"
      : "group inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-[15px] font-medium text-paper transition-colors hover:border-white/50";

  if (resume) {
    return (
      <a
        href={resume.file}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          report("resume_download", {
            resume: resume.slug,
            role: role?.id ?? "general",
          })
        }
        className={classes}
        {...(variant === "contact" ? { "data-magnetic": true } : {})}
      >
        {variant === "hero" ? (
          <>
            Resume · {role?.label} <span aria-hidden="true">↗</span>
          </>
        ) : (
          <>
            {role?.label} resume
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              ↗
            </span>
          </>
        )}
      </a>
    );
  }

  return (
    <Link
      href="/resume"
      className={classes}
      {...(variant === "contact" ? { "data-magnetic": true } : {})}
    >
      {variant === "hero" ? (
        <>
          Resume <span aria-hidden="true">→</span>
        </>
      ) : (
        <>
          Choose a resume
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </>
      )}
    </Link>
  );
}
