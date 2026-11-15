"use client";

import { createContext, useContext, useState } from "react";
import type { Project } from "@/lib/projects";

type SkillProofState = {
  /** Skill under hover/focus — matching projects highlight. */
  hovered: string | null;
  setHovered: (skill: string | null) => void;
  /** Skill clicked — the archive filters to matching projects. */
  filter: string | null;
  setFilter: (skill: string | null) => void;
};

const SkillContext = createContext<SkillProofState>({
  hovered: null,
  setHovered: () => {},
  filter: null,
  setFilter: () => {},
});

export function useSkillProof() {
  return useContext(SkillContext);
}

export function SkillProofProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  return (
    <SkillContext.Provider value={{ hovered, setHovered, filter, setFilter }}>
      {children}
    </SkillContext.Provider>
  );
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

// A skill matches a project only when a tag is the same name, or when an
// explicit alias below says so. No clever string math: "CSS" must never
// prove "Tailwind CSS", and "GeoPandas" must never prove "pandas".
const ALIASES: Record<string, string[]> = {
  SQL: ["PostgreSQL", "PostGIS"],
  "R (tidyverse)": ["R", "tidyverse"],
  "Spark Structured Streaming": ["Spark"],
  "Quarto / R Markdown": ["rmarkdown", "Quarto"],
};

/** Does this project's tag list back up this skill? */
export function skillMatchesProject(skill: string, project: Project) {
  const accepted = new Set(
    [skill, ...(ALIASES[skill] ?? [])].map((name) => norm(name)),
  );
  return project.tags.some((tag) => accepted.has(norm(tag)));
}
