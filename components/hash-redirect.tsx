"use client";

import { useEffect } from "react";
import { projects } from "@/lib/projects";

// Old case-study links looked like /#fraudlens; they now live at
// /work/fraudlens. Forward anyone arriving on a stale link.
export function HashRedirect() {
  useEffect(() => {
    const slug = window.location.hash.slice(1);
    if (slug && projects.some((p) => p.slug === slug)) {
      window.location.replace(`/work/${slug}`);
    }
  }, []);
  return null;
}
