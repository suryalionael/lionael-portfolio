"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";
import { resumes } from "@/lib/resumes";

// Every figure here is derived from repo data or stated elsewhere on the
// site — nothing hand-invented. Counts up on reveal; static for reduced
// motion.
const FACTS = [
  {
    value: projects.filter((p) => p.live).length,
    decimals: 0,
    suffix: "",
    label: "systems live right now",
  },
  {
    value: projects.length,
    decimals: 0,
    suffix: "",
    label: "documented case studies",
  },
  {
    value: resumes.length,
    decimals: 0,
    suffix: "",
    label: "role-tailored resumes",
  },
  {
    value: 3.9,
    decimals: 1,
    suffix: " / 4.0",
    label: "cumulative GPA",
  },
];

function CountUp({
  value,
  decimals,
  suffix,
}: {
  value: number;
  decimals: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShown(value);
      setDone(true);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1100;
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(value * eased);
          if (p < 1) raf = requestAnimationFrame(step);
          else setDone(true);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {(done ? value : shown).toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function NumbersStrip() {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-white/[0.06] py-10 md:grid-cols-4">
      {FACTS.map((fact) => (
        <div key={fact.label}>
          <dd className="text-3xl font-medium tracking-tight text-paper md:text-4xl">
            <CountUp
              value={fact.value}
              decimals={fact.decimals}
              suffix={fact.suffix}
            />
          </dd>
          <dt className="mt-1.5 font-mono text-[11px] leading-snug tracking-[0.1em] text-neutral-400 uppercase">
            {fact.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
