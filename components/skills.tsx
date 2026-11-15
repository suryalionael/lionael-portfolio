"use client";

import { SplitHeading } from "@/components/split-heading";
import { useRole } from "@/components/role-context";

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
  return (
    <section id="skills" className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1120px] px-6 py-28 md:py-36">
        <p data-reveal className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Skills
        </p>
        <SplitHeading
          className="mt-4 text-5xl font-medium tracking-[-0.03em] md:text-6xl"
          text="What I work with."
        />
        <p data-reveal className="mt-5 max-w-[36rem] text-lg leading-relaxed text-neutral-400">
          Grouped by the job to be done — nearly every tool here appears in a
          system above.
          {role && (
            <span className="block pt-1 text-sm text-neutral-400">
              Highlighting what matters for {role.label.toLowerCase()} roles.
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
                  return (
                    <li
                      key={item}
                      className={`text-base leading-relaxed transition-[color,opacity] duration-500 ${
                        dim
                          ? "text-neutral-300 opacity-35"
                          : lit
                            ? "text-paper"
                            : "text-neutral-300"
                      }`}
                    >
                      {item}
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
