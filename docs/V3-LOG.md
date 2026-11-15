# V3 Log

Running record of the v3 build. One entry per phase: what shipped, scores,
open questions for Lio.

## Phase 0 — Baseline and tooling (2026-11-14)

Shipped:

- Committed the pending main-branch work on `v3` as five focused commits
  (ambient motion layer, hero redesign, reveals/marquee/split headings,
  case-study scroll fix + GitHub-link removal, v3 brief).
- `scripts/screens.mjs` — Playwright full-page screenshots of `/` and
  `/resume` at 360/390/768/1024/1440, scrolling first so reveals fire.
- `scripts/smoke.mjs` — pages load, key elements visible, no console errors.
- `.github/workflows/ci.yml` — typecheck, lint, build, smoke, Lighthouse CI
  (budgets ≥ 0.95 all four categories, mobile emulation).
- Vercel Analytics with typed events: `resume_download` (slug + role),
  `role_select`, `palette_open` (the last two wired in later phases).
- Fixed: reveal styles trapped content at opacity 0 without JS — now guarded
  behind an `html.js` class set by an inline script.
- Fixed: heading order (card h4 → h3) and marquee contrast (neutral-600 →
  neutral-500) flagged by Lighthouse.
- Fixed: `/resume` LCP image was lazy; first preview card now has
  `priority` + `fetchPriority=high`, previews served at quality 55.

Lighthouse (local, `next start`, mobile emulation, single run):

- `/` — Performance 100 · Accessibility 100 · Best Practices 96 · SEO 100
  (BP 96 is the Vercel Analytics script 404, local-only; fine on Vercel).
- `/resume` — Performance 88 · Accessibility 100 · Best Practices 96 ·
  SEO 100. Not a budgeted page (budgets are `/` and one `/work/*` page);
  the cost is 17 preview images on a simulated slow connection. Revisit
  after the Vercel preview exists (AVIF + CDN).

Open questions for Lio: none yet.
