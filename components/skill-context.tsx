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
const squash = (s: string) => norm(s).replace(/ /g, "");

/** Does this project's tag list back up this skill? */
export function skillMatchesProject(skill: string, project: Project) {
  const skillWords = new Set(norm(skill).split(" "));
  const skillSquashed = squash(skill);
  return project.tags.some((tag) => {
    const tagWords = norm(tag).split(" ");
    if (tagWords.every((w) => skillWords.has(w))) return true;
    const tagSquashed = squash(tag);
    return (
      (tagSquashed.length >= 4 && skillSquashed.includes(tagSquashed)) ||
      (skillSquashed.length >= 4 && tagSquashed.includes(skillSquashed))
    );
  });
}
