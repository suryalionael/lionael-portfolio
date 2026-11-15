"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import type { ArchNode } from "@/lib/projects";

type Props = {
  nodes: ArchNode[];
  foundation: string[];
};

export function ArchExplorer({ nodes, foundation }: Props) {
  const [selectedId, setSelectedId] = useState(nodes[0].id);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  // Scrolling the explorer through the viewport walks the stages in order,
  // teaching the flow — until the reader takes over by hand (click, focus
  // or keyboard; a passing mouse doesn't cancel the walk).
  const interacted = useRef(false);
  const [manual, setManual] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start 0.85", "start 0.3"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (interacted.current || reduce) return;
    if (v <= 0 || v >= 1) return;
    const i = Math.min(nodes.length - 1, Math.floor(v * nodes.length));
    setSelectedId(nodes[i].id);
  });
  const takeOver = () => {
    interacted.current = true;
    setManual(true);
  };
  const selectedIndex = nodes.findIndex((n) => n.id === selectedId);
  const selected = nodes[selectedIndex];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const dir =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? -1
          : 0;
    if (dir === 0) return;
    takeOver();
    e.preventDefault();
    const next = Math.min(nodes.length - 1, Math.max(0, selectedIndex + dir));
    setSelectedId(nodes[next].id);
    buttonsRef.current[next]?.focus();
  };

  return (
    <div ref={rootRef} className="rounded-xl border border-white/[0.08] bg-ink/50">
      <div
        onKeyDown={onKeyDown}
        className="flex flex-col items-stretch gap-0 p-5 md:flex-row md:items-center md:p-7"
      >
        {nodes.map((node, i) => {
          const isSelected = node.id === selectedId;
          const isNeighbor = Math.abs(i - selectedIndex) === 1 && !isSelected;
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
                ref={(el) => {
                  buttonsRef.current[i] = el;
                }}
                type="button"
                onClick={() => {
                  takeOver();
                  setSelectedId(node.id);
                }}
                onMouseEnter={() => setSelectedId(node.id)}
                onFocus={() => {
                  takeOver();
                  setSelectedId(node.id);
                }}
                aria-pressed={isSelected}
                className={`rounded-lg border px-4 py-3 text-left transition-all duration-300 md:shrink ${
                  isSelected
                    ? "border-accent/60 bg-accent/[0.07] shadow-[0_0_22px_-6px_rgb(62_99_221/0.45)]"
                    : isNeighbor
                      ? "border-white/20 bg-transparent"
                      : "border-white/[0.08] bg-transparent hover:border-white/25"
                }`}
              >
                <span
                  className={`block text-sm font-medium transition-colors duration-300 ${
                    isSelected
                      ? "text-paper"
                      : isNeighbor
                        ? "text-neutral-200"
                        : "text-neutral-300"
                  }`}
                >
                  {node.label}
                </span>
                <span className="mt-0.5 block font-mono text-xs text-neutral-400">
                  {node.tech}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Only user-initiated selections announce; the scroll-walk and a
          passing mouse stay quiet for screen readers. */}
      <div
        aria-live={manual ? "polite" : "off"}
        className="min-h-28 border-t border-white/[0.08] px-5 py-5 md:px-7"
      >
        <motion.div
          key={selected.id}
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.25, ease: "easeOut" }}
        >
          <p className="font-mono text-xs tracking-[0.15em] text-muted uppercase">
            {String(selectedIndex + 1).padStart(2, "0")} · {selected.label}
          </p>
          <p className="mt-2 max-w-[44rem] text-base leading-relaxed text-neutral-400">
            {selected.detail}
          </p>
        </motion.div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.08] px-5 py-4 md:px-7">
        {foundation.map((item) => (
          <span key={item} className="font-mono text-[11px] text-neutral-400">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
