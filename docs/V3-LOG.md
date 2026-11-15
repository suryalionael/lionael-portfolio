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

## Phase 1 — Case studies become pages (2026-11-14)

Shipped:

- `/work/[slug]`: 21 static case-study pages with full metadata, per-project
  OG images (architecture stages as the motif), prev/next navigation, and a
  "Back to work" link that restores the exact scroll position.
- Card → page morph via native cross-document view transitions (plain-anchor
  navigation + `view-transition-name`; Firefox gets a normal navigation,
  reduced motion disables it). bfcache makes back instant.
- Featured grid curated to four: Aspen OS, Streaming Clickstream Pipeline,
  FraudLens, Nutrition Priority Index. Everything else in a filterable,
  keyboard-accessible archive table (cards-style stacked rows on mobile).
- Old `/#slug` deep links forward to `/work/slug` from the inline head
  script (no flash). Sitemap + JSON-LD updated. Modal code deleted.
- Independent review pass fixes: BackLink no longer hijacks modified clicks
  or trusts `document.referrer`; metrics no longer overlap at 360; valid
  dt/dd order; archive announces counts, not the whole list.

Lighthouse (local, mobile): `/` and `/work/aspen-os` both
Performance 100 · Accessibility 100 · Best Practices 96 · SEO 100.

## Phase 2 — Role lens (2026-11-14)

Shipped:

- "Hiring for: Data Eng · ML · Analytics · Software" segmented control in
  the hero with an animated pill; selecting a role crossfades the pitch,
  reorders the featured grid (layout animation), highlights matching
  skills and dims the rest, and points every Resume CTA at the matching
  PDF (data-engineer, ai-ml-engineering, data-analytics-bi,
  software-web-fullstack).
- State in `?role=` + localStorage; `/?role=ml` loads already tailored, so
  each recruiter can get a tailored link. Screen readers get the pitch via
  `aria-live="polite"`; the control is plain buttons with `aria-pressed`.
- `role_select` fires on selection; `resume_download` now carries the
  active role.
- Fixed in verification: the pitch crossfade originally used
  AnimatePresence and could wedge after racing the initial mount — swapped
  for a keyed CSS fade.

Pitch wording per role reuses existing site copy ("…people can depend on",
"…actually trust", "…can act on", "…actually use").

Open questions for Lio: confirm the four pitch lines and the
role → resume mapping above.
