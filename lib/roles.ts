// The role lens: the site tailors itself the way the 17 role-specific
// resumes do. Every pitch reuses claims the existing copy already makes;
// nothing here invents facts.

export type RoleId = "data-eng" | "ml" | "analytics" | "software";

export type Role = {
  id: RoleId;
  label: string;
  /** Crossfaded into the hero. */
  pitch: string;
  /** Featured-grid order for this lens (slugs; same four systems). */
  projects: string[];
  /** Skill names to emphasise in the Skills section. */
  skills: string[];
  /** Matching resume slug in lib/resumes.ts. */
  resume: string;
};

export const roles: Role[] = [
  {
    id: "data-eng",
    label: "Data Eng",
    pitch: "I build production data platforms people can depend on.",
    projects: [
      "streaming-clickstream-pipeline",
      "fraudlens",
      "aspen-os",
      "nutrition-priority-index",
    ],
    skills: [
      "Python",
      "SQL",
      "Kafka",
      "Spark Structured Streaming",
      "Delta Lake",
      "Airflow",
      "dbt",
      "DuckDB",
      "PostgreSQL",
      "Docker",
      "pytest",
      "GitHub Actions",
      "Terraform",
    ],
    resume: "data-engineer",
  },
  {
    id: "ml",
    label: "ML",
    pitch: "I build ML systems people can actually trust.",
    projects: [
      "fraudlens",
      "nutrition-priority-index",
      "streaming-clickstream-pipeline",
      "aspen-os",
    ],
    skills: [
      "Python",
      "scikit-learn",
      "XGBoost",
      "SHAP",
      "Prophet",
      "Optuna",
      "Claude API",
      "pandas",
      "FastAPI",
      "pytest",
      "GitHub Actions",
    ],
    resume: "ai-ml-engineering",
  },
  {
    id: "analytics",
    label: "Analytics",
    pitch: "I build analytics people can act on.",
    projects: [
      "nutrition-priority-index",
      "fraudlens",
      "streaming-clickstream-pipeline",
      "aspen-os",
    ],
    skills: [
      "SQL",
      "R (tidyverse)",
      "Python",
      "dbt",
      "Power BI",
      "Streamlit",
      "Tableau",
      "pandas",
      "Quarto / R Markdown",
      "PostgreSQL",
    ],
    resume: "data-analytics-bi",
  },
  {
    id: "software",
    label: "Software",
    pitch: "I build software people can actually use.",
    projects: [
      "aspen-os",
      "fraudlens",
      "streaming-clickstream-pipeline",
      "nutrition-priority-index",
    ],
    skills: [
      "TypeScript",
      "JavaScript",
      "Next.js",
      "React",
      "Tailwind CSS",
      "FastAPI",
      "PostgreSQL",
      "Supabase",
      "Playwright",
      "Docker",
      "GitHub Actions",
    ],
    resume: "software-web-fullstack",
  },
];

export const roleById = new Map(roles.map((r) => [r.id, r]));

export function isRoleId(value: string | null): value is RoleId {
  return value !== null && roleById.has(value as RoleId);
}
