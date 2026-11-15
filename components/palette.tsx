"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Command } from "cmdk";
import { orderedProjects } from "@/lib/projects";
import { resumes } from "@/lib/resumes";
import { roles } from "@/lib/roles";
import { site } from "@/lib/site";
import { report } from "@/lib/analytics";
import { useRole } from "@/components/role-context";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "community", label: "Social activities" },
  { id: "contact", label: "Contact" },
];

// The ⌘K palette. Lazy-loaded by PaletteTrigger, so none of this (or cmdk)
// is in the initial bundle.
export default function Palette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { role, setRole } = useRole();
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef(0);

  // Body scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const go = useCallback((href: string) => {
    window.location.assign(href);
  }, []);

  const scrollToSection = useCallback(
    (id: string) => {
      onClose();
      if (window.location.pathname !== "/") {
        window.location.assign(`/#${id}`);
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    },
    [onClose],
  );

  const copyEmail = useCallback(async () => {
    onClose();
    try {
      await navigator.clipboard.writeText(site.email);
      showToast("Email copied");
    } catch {
      showToast(site.email);
    }
  }, [onClose, showToast]);

  return (
    <>
      {open && (
        <div
          className="palette-overlay fixed inset-0 z-[80] bg-black/60 backdrop-blur-[2px]"
          onClick={onClose}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="palette-panel mx-auto mt-[12vh] w-full max-w-[560px] px-4 max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:mt-0 max-sm:px-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Command
              label="Command palette"
              // Substring/word-prefix matching instead of cmdk's fuzzy
              // default: groups keep their DOM order, so a scattered fuzzy
              // match in Projects must not outrank an exact action match.
              filter={(value, search) => {
                const q = search.toLowerCase().trim();
                if (!q) return 1;
                const v = value.toLowerCase();
                if (v.startsWith(q)) return 2;
                if (v.includes(` ${q}`)) return 1.5;
                return v.includes(q) ? 1 : 0;
              }}
              className="overflow-hidden rounded-xl border border-white/[0.12] bg-ink-raised shadow-[0_32px_80px_-24px_rgb(0_0_0/0.9)] max-sm:rounded-b-none"
              onKeyDown={(e) => {
                if (e.key === "Escape") onClose();
              }}
            >
              <Command.Input
                autoFocus
                placeholder="Type a command or search…"
                className="w-full border-b border-white/[0.08] bg-transparent px-5 py-4 text-[15px] text-paper placeholder:text-neutral-500 focus:outline-none"
              />
              <Command.List className="max-h-[50vh] overflow-y-auto overscroll-contain p-2 max-sm:max-h-[55dvh]">
                <Command.Empty className="px-4 py-8 text-center text-sm text-neutral-400">
                  No results.
                </Command.Empty>

                <Group heading="Projects">
                  {orderedProjects.map((p) => (
                    <Item
                      key={p.slug}
                      value={`${p.title} ${p.tags.join(" ")}`}
                      onSelect={() => go(`/work/${p.slug}`)}
                    >
                      <span className="truncate">{p.title}</span>
                      <Hint>{p.category}</Hint>
                    </Item>
                  ))}
                </Group>

                <Group heading="Resumes">
                  {resumes.map((r) => (
                    <Item
                      key={r.slug}
                      value={`resume ${r.title}`}
                      onSelect={() => {
                        report("resume_download", {
                          resume: r.slug,
                          role: role?.id ?? "general",
                        });
                        window.open(r.file, "_blank", "noopener");
                        onClose();
                      }}
                    >
                      <span className="truncate">{r.title}</span>
                      <Hint>PDF</Hint>
                    </Item>
                  ))}
                </Group>

                <Group heading="Sections">
                  {SECTIONS.map((s) => (
                    <Item
                      key={s.id}
                      value={`go to ${s.label}`}
                      onSelect={() => scrollToSection(s.id)}
                    >
                      {s.label}
                    </Item>
                  ))}
                </Group>

                <Group heading="Actions">
                  <Item value="copy email address" onSelect={copyEmail}>
                    Copy email
                    <Hint>{site.email}</Hint>
                  </Item>
                  {roles.map((r) => (
                    <Item
                      key={r.id}
                      value={`hiring for ${r.label} role lens`}
                      onSelect={() => {
                        if (window.location.pathname !== "/") {
                          window.location.assign(`/?role=${r.id}`);
                          return;
                        }
                        setRole(r.id);
                        onClose();
                      }}
                    >
                      Lens: hiring for {r.label}
                      {role?.id === r.id && <Hint>active</Hint>}
                    </Item>
                  ))}
                  {role && (
                    <Item
                      value="clear role lens general view"
                      onSelect={() => {
                        setRole(null);
                        onClose();
                      }}
                    >
                      Lens: general view
                    </Item>
                  )}
                  <Item
                    value="terminal mode"
                    onSelect={() => {
                      onClose();
                      window.dispatchEvent(new Event("open-terminal"));
                    }}
                  >
                    Terminal mode
                    <Hint>~</Hint>
                  </Item>
                  <Item
                    value="open github profile"
                    onSelect={() => {
                      window.open(site.github, "_blank", "noopener");
                      onClose();
                    }}
                  >
                    GitHub profile
                    <Hint>↗</Hint>
                  </Item>
                  <Item
                    value="open linkedin profile"
                    onSelect={() => {
                      window.open(site.linkedin, "_blank", "noopener");
                      onClose();
                    }}
                  >
                    LinkedIn profile
                    <Hint>↗</Hint>
                  </Item>
                </Group>
              </Command.List>
            </Command>
          </div>
        </div>
      )}

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center">
        {toast && (
          <p className="palette-toast rounded-full border border-white/[0.14] bg-ink-raised px-4 py-2 font-mono text-xs text-paper shadow-lg">
            {toast}
          </p>
        )}
      </div>
    </>
  );
}

function Group({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <Command.Group
      heading={heading}
      className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-muted [&_[cmdk-group-heading]]:uppercase"
    >
      {children}
    </Command.Group>
  );
}

function Item({
  value,
  onSelect,
  children,
}: {
  value: string;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      className="flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2.5 text-sm text-neutral-300 data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-paper"
    >
      {children}
    </Command.Item>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <span className="shrink-0 font-mono text-[10px] text-neutral-500">
      {children}
    </span>
  );
}
