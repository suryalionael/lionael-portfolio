// Lighthouse budget check: mobile emulation, median of N runs per page,
// all four categories must clear the budget.
//
//   node scripts/lighthouse-budget.mjs [baseURL]
//
// The server must already be running (npm run build && npm run start).
// Lighthouse is pinned and run through npx, not added as a dependency.
// (LHCI 0.14 bundles Lighthouse 12.1, which mis-measures LCP on current
// Chrome — 3.5 s where Lighthouse 13 reports 0.9 s on the same page.)
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const LIGHTHOUSE = "lighthouse@13.6.0";
const BUDGET = 0.95;
const RUNS = 3;
const base = process.argv[2] ?? "http://localhost:3000";
const pages = ["/", "/work/aspen-os"];
const categories = ["performance", "accessibility", "best-practices", "seo"];

// One uncounted pass per page first: a cold Next image optimizer on a
// shared CI runner otherwise drags the first measured run down.
const run = (url, out) =>
  execFileSync(
    "npx",
    [
      "--yes",
      LIGHTHOUSE,
      url,
      "--quiet",
      "--chrome-flags=--headless=new --no-sandbox",
      "--output=json",
      `--output-path=${out}`,
      `--only-categories=${categories.join(",")}`,
    ],
    { stdio: ["ignore", "ignore", "inherit"] },
  );

const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];

let failed = false;

for (const path of pages) {
  const scores = Object.fromEntries(categories.map((c) => [c, []]));
  run(`${base}${path}`, "/tmp/lh-budget-warmup.json");
  for (let i = 0; i < RUNS; i++) {
    const out = `/tmp/lh-budget-${i}.json`;
    run(`${base}${path}`, out);
    const report = JSON.parse(readFileSync(out, "utf8"));
    for (const c of categories) scores[c].push(report.categories[c].score);
  }

  const med = Object.fromEntries(categories.map((c) => [c, median(scores[c])]));
  const line = categories
    .map((c) => `${c} ${Math.round(med[c] * 100)}`)
    .join(" · ");
  const bad = categories.filter((c) => med[c] < BUDGET);
  console.log(`${bad.length ? "FAIL" : "ok  "} ${path}  ${line}`);
  if (bad.length) {
    failed = true;
    console.error(`  below ${BUDGET * 100}: ${bad.join(", ")}`);
  }
}

process.exit(failed ? 1 : 0);
