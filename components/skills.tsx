"use client";

import { SplitHeading } from "@/components/split-heading";
import { useRole } from "@/components/role-context";
import { skillMatchesProject, useSkillProof } from "@/components/skill-context";
import { projects } from "@/lib/projects";

const groups = [
  {
    name: "Languages",
    items: ["Python", "SQL", "R (tidyverse)", "TypeScript", "JavaScript"],
  },
  {
    name: "Data engineering",
    items: ["Kafka", "Spark Structured Streaming", "Delta Lake", "Airflow", "dbt", "DuckDB"],
  },
  {
    name: "Machine learning & AI",
    items: ["scikit-learn", "XGBoost", "SHAP", "Prophet", "Optuna", "Claude API"],
  },
  {
    name: "Backend & databases",
    items: ["FastAPI", "PostgreSQL", "PostGIS", "Supabase"],
  },
  {
    name: "Web",
    items: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    name: "Analytics & BI",
    items: ["Power BI", "Streamlit", "Tableau", "pandas", "Quarto / R Markdown"],
  },
  {
    name: "Testing & DevOps",
    items: ["pytest", "Playwright", "Docker", "GitHub Actions", "Terraform"],
  },
  {
    name: "Automation",
    items: ["Google Apps Script", "Power Automate"],
  },
];

export function Skills() {
  const { role } = useRole();
  const { hovered, setHovered, setFilter } = useSkillProof();

  const proveSkill = (item: string) => {
    setFilter(item);
    setHovered(null);
    document
      .querySelector("[data-archive]")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <section id="skills" className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1120px] px-6 py-28 md:py-36">
        <p data-reveal data-scramble className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Skills
        </p>
        <SplitHeading
          className="mt-4 text-5xl font-medium tracking-[-0.03em] md:text-6xl"
          text="What I work with."
        />
        <p data-reveal className="mt-5 max-w-[36rem] text-lg leading-relaxed text-neutral-400">
          Grouped by the job to be done — hover a skill to see which systems
          above prove it, or select it to filter the archive.
          {role && (
            <span className="block pt-1 text-sm text-neutral-400">
              Highlighting what matters for {role.label} roles.
            </span>
          )}
        </p>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, i) => (
            <div
              key={group.name}
              data-reveal
              style={{ "--i": i % 4 } as React.CSSProperties}
            >
              <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
                {group.name}
              </p>
              <ul className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-4">
                {group.items.map((item) => {
                  const dim = role ? !role.skills.includes(item) : false;
                  const lit = role ? role.skills.includes(item) : false;
                  const count = projects.filter((p) =>
                    skillMatchesProject(item, p),
                  ).length;
                  return (
                    <li
                      key={item}
                      className={`text-base leading-relaxed transition-[color,opacity] duration-500 ${
                        dim
                          ? "text-neutral-300 opacity-60"
                          : lit
                            ? "text-paper"
                            : "text-neutral-300"
                      }`}
                    >
                      {count > 0 ? (
                        <button
                          type="button"
                          onMouseEnter={() => setHovered(item)}
                          onMouseLeave={() => setHovered(null)}
                          onFocus={() => setHovered(item)}
                          onBlur={() => setHovered(null)}
                          onClick={() => proveSkill(item)}
                          className={`group/skill inline-flex items-baseline gap-2 text-left transition-colors hover:text-paper ${
                            hovered === item ? "text-paper" : ""
                          }`}
                        >
                          {item}
                          <span
                            className="font-mono text-[10px] text-neutral-500 opacity-0 transition-opacity duration-300 group-hover/skill:opacity-100"
                            aria-hidden="true"
                          >
                            {count} ↓
                          </span>
                          <span className="sr-only">
                            — used in {count} project{count === 1 ? "" : "s"};
                            filter the archive
                          </span>
                        </button>
                      ) : (
                        item
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
