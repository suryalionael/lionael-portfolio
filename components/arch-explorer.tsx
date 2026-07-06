"use client";

import { useState } from "react";
import type { ArchNode } from "@/lib/projects";

type Props = {
  nodes: ArchNode[];
  foundation: string[];
};

export function ArchExplorer({ nodes, foundation }: Props) {
  const [selectedId, setSelectedId] = useState(nodes[0].id);
  const selectedIndex = nodes.findIndex((n) => n.id === selectedId);
  const selected = nodes[selectedIndex];

  return (
    <div className="rounded-xl border border-white/[0.08] bg-ink/50">
      <div className="flex flex-col items-stretch gap-0 p-5 md:flex-row md:items-center md:p-7">
        {nodes.map((node, i) => {
          const isSelected = node.id === selectedId;
          const isNeighbor =
            Math.abs(i - selectedIndex) === 1 && !isSelected;
          return (
            <div key={node.id} className="contents">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className={`mx-auto h-4 w-px md:mx-0 md:h-px md:w-auto md:flex-1 md:basis-4 ${
                    i === selectedIndex || i === selectedIndex + 1
                      ? "flow-line-active"
                      : "flow-line"
                  }`}
                />
              )}
              <button
                type="button"
                onClick={() => setSelectedId(node.id)}
                onMouseEnter={() => setSelectedId(node.id)}
                onFocus={() => setSelectedId(node.id)}
                aria-pressed={isSelected}
                className={`rounded-lg border px-4 py-3 text-left transition-colors duration-300 md:shrink ${
                  isSelected
                    ? "border-accent/60 bg-accent/[0.07]"
                    : isNeighbor
                      ? "border-white/20 bg-transparent"
                      : "border-white/[0.08] bg-transparent hover:border-white/25"
                }`}
              >
                <span
                  className={`block text-[13px] font-medium ${
                    isSelected ? "text-paper" : "text-neutral-300"
                  }`}
                >
                  {node.label}
                </span>
                <span className="mt-0.5 block font-mono text-[11px] text-neutral-400">
                  {node.tech}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <div
        aria-live="polite"
        className="min-h-28 border-t border-white/[0.08] px-5 py-5 md:px-7"
      >
        <p className="font-mono text-xs tracking-[0.15em] text-muted uppercase">
          {String(selectedIndex + 1).padStart(2, "0")} ·{" "}
          {selected.label}
        </p>
        <p className="mt-2 max-w-[42rem] text-sm leading-relaxed text-neutral-400">
          {selected.detail}
        </p>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.08] px-5 py-4 md:px-7">
        {foundation.map((item) => (
          <span
            key={item}
            className="font-mono text-[11px] text-neutral-400"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
