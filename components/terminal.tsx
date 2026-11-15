"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { orderedProjects } from "@/lib/projects";
import { resumes } from "@/lib/resumes";
import { roles } from "@/lib/roles";
import { site } from "@/lib/site";

type Line = { kind: "input" | "output" | "error"; text: string };

const ABOUT = [
  "Lionael Surya — Data Science & Analytics student at Seneca Polytechnic,",
  "Toronto. I build production data platforms, internal software, and ML",
  "systems — with tests, documentation, and decisions you can trace back.",
  "Open to Summer 2027 co-ops: data engineering, ML, analytics, software.",
];

const HELP = [
  "available commands:",
  "  help                 this list",
  "  ls projects          every system on the site",
  "  cat about            who I am",
  "  open <project>       open a case study (tab completes)",
  "  resume --role <id>   open the matching resume PDF",
  "  role <id>            set the role lens (data-eng | ml | analytics | software)",
  "  clear                clear the screen",
  "  exit                 close the terminal (or press Esc)",
];

const COMMANDS = ["help", "ls", "cat", "open", "resume", "role", "clear", "exit"];

// Full-screen terminal that mirrors the site. Lazy-loaded; Escape exits.
export default function Terminal({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([
    { kind: "output", text: `lionael.surya — type "help" to get started` },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const print = useCallback((kind: Line["kind"], ...texts: string[]) => {
    setLines((prev) => [...prev, ...texts.map((text) => ({ kind, text }))]);
  }, []);

  const run = useCallback(
    (raw: string) => {
      const input = raw.trim();
      print("input", `$ ${raw}`);
      if (!input) return;
      setHistory((h) => [...h, raw]);
      setCursor(-1);

      const [cmd, ...args] = input.split(/\s+/);
      switch (cmd) {
        case "help":
          print("output", ...HELP);
          return;
        case "ls":
          if (args[0] && args[0] !== "projects") {
            print("error", `ls: no listing for "${args[0]}" — try: ls projects`);
            return;
          }
          print(
            "output",
            ...orderedProjects.map(
              (p) => `${p.slug.padEnd(32)} ${p.category} · ${p.year}`,
            ),
          );
          return;
        case "cat":
          if (args[0] === "about") print("output", ...ABOUT);
          else print("error", `cat: only "cat about" exists here`);
          return;
        case "open": {
          const slug = args[0];
          const project = orderedProjects.find((p) => p.slug === slug);
          if (!project) {
            print("error", `open: unknown project "${slug ?? ""}" — try: ls projects`);
            return;
          }
          print("output", `opening ${project.title}…`);
          window.location.assign(`/work/${project.slug}`);
          return;
        }
        case "resume": {
          const roleId = args[0] === "--role" ? args[1] : args[0];
          const role = roles.find((r) => r.id === roleId);
          if (!role) {
            print(
              "error",
              `resume: pass --role ${roles.map((r) => r.id).join(" | ")}`,
            );
            return;
          }
          const resume = resumes.find((r) => r.slug === role.resume);
          if (!resume) {
            print("error", "resume: file missing");
            return;
          }
          print("output", `opening ${resume.downloadName}…`);
          window.open(resume.file, "_blank", "noopener");
          return;
        }
        case "role": {
          const role = roles.find((r) => r.id === args[0]);
          if (!role) {
            print(
              "error",
              `role: pick one of ${roles.map((r) => r.id).join(" | ")}`,
            );
            return;
          }
          print("output", `lens set: hiring for ${role.label}`);
          window.location.assign(`/?role=${role.id}`);
          return;
        }
        case "clear":
          setLines([]);
          return;
        case "exit":
          onClose();
          return;
        case "github":
          window.open(site.github, "_blank", "noopener");
          return;
        default:
          print("error", `command not found: ${cmd} — try "help"`);
      }
    },
    [onClose, print],
  );

  const complete = useCallback(() => {
    const parts = value.split(/\s+/);
    const last = parts[parts.length - 1] ?? "";
    const pool =
      parts.length <= 1
        ? COMMANDS
        : parts[0] === "open"
          ? orderedProjects.map((p) => p.slug)
          : parts[0] === "role" || parts[0] === "resume"
            ? roles.map((r) => r.id)
            : parts[0] === "ls"
              ? ["projects"]
              : parts[0] === "cat"
                ? ["about"]
                : [];
    const matches = pool.filter((p) => p.startsWith(last));
    if (matches.length === 1) {
      parts[parts.length - 1] = matches[0];
      setValue(parts.join(" ") + (parts.length === 1 ? " " : ""));
    } else if (matches.length > 1) {
      // Complete to the longest common prefix, like a real shell.
      let prefix = matches[0];
      for (const m of matches) {
        while (!m.startsWith(prefix)) prefix = prefix.slice(0, -1);
      }
      if (prefix.length > last.length) {
        parts[parts.length - 1] = prefix;
        setValue(parts.join(" "));
      }
      print("output", matches.join("   "));
    }
  }, [value, print]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      if (history[next] !== undefined) {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cursor === -1) return;
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setValue("");
      } else {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Terminal"
      className="terminal fixed inset-0 z-[85] flex flex-col bg-ink/[0.98] font-mono text-[13px] leading-6"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-2.5">
        <span className="text-[11px] tracking-[0.16em] text-muted uppercase">
          lionael.surya — terminal
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-[11px] text-neutral-400 transition-colors hover:text-paper"
        >
          esc to exit
        </button>
      </div>

      <div
        ref={scrollRef}
        className="grow overflow-y-auto overscroll-contain px-4 py-4"
        aria-live="polite"
      >
        {lines.map((line, i) => (
          <p
            key={i}
            className={
              line.kind === "input"
                ? "text-paper"
                : line.kind === "error"
                  ? "text-red-300/90"
                  : "whitespace-pre text-neutral-400"
            }
          >
            {line.text}
          </p>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-white/[0.08] px-4 py-3">
        <span aria-hidden="true" className="text-accent">
          $
        </span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Terminal input"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          className="w-full bg-transparent text-paper placeholder:text-neutral-600 focus:outline-none"
          placeholder='try "help"'
        />
      </div>
    </div>
  );
}
