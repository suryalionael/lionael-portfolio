# Lionael Surya — Portfolio (v3)

Personal portfolio for data & software engineering internship applications.

**Built like production:** tested, documented, reproducible, and shipped —
the site itself is held to the same standard as the systems it documents.

## What v3 is

- **Case studies are pages.** Every project lives at `/work/[slug]` —
  statically generated, with full metadata, a per-project OpenGraph image,
  and prev/next navigation. Opening a card is a plain-anchor navigation
  that morphs via native cross-document view transitions; back restores
  the exact scroll spot through bfcache. Old `/#slug` links redirect.
- **Role lens.** A "Hiring for: Data Eng · ML · Analytics · Software"
  control tailors the pitch, the featured-project order, the highlighted
  skills, and every Resume CTA. State lives in `?role=` + localStorage, so
  each recruiter can get a tailored link while every page stays static.
- **⌘K command palette** (lazy-loaded cmdk): projects, resumes, sections,
  and actions — copy email, set the role lens, open GitHub/LinkedIn.
- **A restrained motion system**: scroll reveals, a live canvas pipeline
  (Ingest → Transform → Model → Serve), a scroll-linked experience
  timeline, an architecture explorer that walks its stages into view,
  Lenis inertial scrolling on fine pointers, and mono-label scrambles —
  all off under reduced motion, with a no-JS/failed-hydration guard.
- **Mobile is first-class**: full-screen menu, swipeable case-study
  galleries, tap feedback, safe-area insets.

## Tech stack

- **Framework:** Next.js 16 (App Router), Server Components by default,
  every route statically generated
- **Language:** TypeScript, strict mode, no `any`
- **Styling:** Tailwind CSS 4 · **Fonts:** Geist & Geist Mono (`next/font`)
- **Motion:** CSS first; Motion for layout/scroll-linked pieces; Lenis
  (fine pointers only); cmdk for the palette
- **Analytics:** Vercel Analytics with typed custom events
  (`resume_download`, `role_select`, `palette_open`)
- **Deployment:** Vercel from `main`

## Quality gates

- CI (GitHub Actions): typecheck, lint, build, Playwright smoke test, and
  Lighthouse CI with ≥ 0.95 budgets (mobile) on `/` and `/work/aspen-os`
- `node scripts/screens.mjs` — full-page screenshots of every key page at
  360/390/768/1024/1440 into `.screens/`
- WCAG AA: keyboard everywhere, visible focus, AA contrast, correct
  dialog/live-region semantics, reduced-motion fallbacks
- No invented facts: every number on the site is derived from repo data;
  testimonials render only when real entries exist in `lib/testimonials.ts`

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (fully static)
npm run lint
```

## Environment

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com   # canonical URL for metadata
```

## Documentation

- `docs/V3-LOG.md` — per-phase build log with Lighthouse scores
- `docs/V3-PROMPT.md` — the v3 build brief
- `docs/PORTFOLIO_PRINCIPLES.md` — non-negotiable design principles
- `/colophon` — how the site is built, on the site itself

## Version

**3.0.0**

---

© 2026 Lionael Surya · Toronto, Canada
