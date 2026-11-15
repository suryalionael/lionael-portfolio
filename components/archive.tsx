"use client";

import { useState } from "react";
import { archiveProjects, disciplines, type Discipline } from "@/lib/projects";
import { markBackToWork } from "@/components/featured-grid";
import { skillMatchesProject, useSkillProof } from "@/components/skill-context";

// Compact archive of everything outside the featured grid: a table on
// desktop, stacked cards on mobile, filterable by discipline.
export function Archive() {
  const [filter, setFilter] = useState<Discipline | null>(null);
  const { filter: skill, setFilter: setSkill, hovered } = useSkillProof();
  const shown = archiveProjects
    .filter((p) => (filter ? p.discipline === filter : true))
    .filter((p) => (skill ? skillMatchesProject(skill, p) : true));

  return (
    <section aria-label="Project archive" data-archive className="scroll-mt-24">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="text-2xl font-medium tracking-tight text-paper md:text-3xl">
          Archive
        </h3>
        {/* The one live region: announces "08 projects" on filter change
            instead of re-reading the whole list. */}
        <span aria-live="polite" className="font-mono text-[11px] text-muted">
          {String(shown.length).padStart(2, "0")} projects
        </span>
      </div>

      <div
        role="group"
        aria-label="Filter archive by discipline"
        className="mt-6 flex flex-wrap gap-2"
      >
        <FilterButton
          label="All"
          active={filter === null}
          onClick={() => setFilter(null)}
        />
        {disciplines.map((d) => (
          <FilterButton
            key={d}
            label={d}
            active={filter === d}
            onClick={() => setFilter(filter === d ? null : d)}
          />
        ))}
        {skill && (
          <button
            type="button"
            onClick={() => setSkill(null)}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/[0.08] px-3.5 py-1.5 font-mono text-[11px] tracking-[0.08em] text-paper uppercase transition-colors hover:border-white/60"
          >
            {skill}
            <span aria-hidden="true">✕</span>
            <span className="sr-only">— clear skill filter</span>
          </button>
        )}
      </div>

      {/* Desktop/tablet: table rows. Mobile: cards. */}
      <ul className="mt-6 border-t border-white/[0.06]">
        {shown.map((project) => (
          <li
            key={project.slug}
            className={`transition-opacity duration-500 ${
              hovered && !skillMatchesProject(hovered, project)
                ? "opacity-40"
                : ""
            }`}
          >
            <a
              href={`/work/${project.slug}`}
              onClick={markBackToWork}
              data-cursor="Open"
              className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-white/[0.06] py-4 transition-[border-color,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/20 sm:grid-cols-[3.5rem_minmax(10rem,1.2fr)_minmax(0,1fr)_minmax(0,1.2fr)_auto] md:hover:pl-3"
            >
              <span className="order-2 font-mono text-[11px] text-neutral-400 sm:order-none">
                {project.year}
              </span>
              <span className="order-1 text-base font-medium text-neutral-200 transition-colors group-hover:text-paper sm:order-none">
                <span style={{ viewTransitionName: `title-${project.slug}` }}>
                  {project.title}
                </span>
                <span
                  aria-hidden="true"
                  className="ml-2 inline text-neutral-400 sm:hidden"
                >
                  →
                </span>
              </span>
              <span className="order-3 col-span-2 text-sm text-neutral-400 sm:order-none sm:col-span-1">
                {project.discipline}
              </span>
              <span className="order-4 col-span-2 hidden truncate font-mono text-[11px] text-neutral-400 sm:order-none sm:col-span-1 sm:block">
                {project.tags.slice(0, 4).join(" · ")}
              </span>
              <span
                aria-hidden="true"
                className="order-2 hidden text-neutral-400 transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-paper sm:order-none sm:block"
              >
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.08em] uppercase transition-colors max-sm:py-2.5 ${
        active
          ? "border-white/40 bg-white/[0.08] text-paper"
          : "border-white/[0.1] text-neutral-400 hover:border-white/25 hover:text-paper"
      }`}
    >
      {label}
    </button>
  );
}
