# Lionael Surya — Portfolio

Personal portfolio for data & software engineering internship applications.

**Built like production:** tested, documented, reproducible, and shipped —
the site itself is held to the same standard as the systems it documents.

## Structure

One continuous story: hero (typographic thesis + interactive ID-card lanyard)
→ why I build → education → eleven systems documented as case studies,
grouped by discipline → experience → skills → social activities → contact.

## Tech stack

- **Framework:** Next.js (App Router), Server Components by default
- **Language:** TypeScript, strict mode, no `any`
- **Styling:** Tailwind CSS 4
- **Motion:** CSS animations for presentation; Motion (Framer) for the
  case-study expansion; React Three Fiber + Rapier for the hero lanyard
  (desktop only, lazy-loaded, static fallback under reduced motion or
  WebGL context loss)
- **Fonts:** Geist Sans & Geist Mono via `next/font`
- **Deployment:** Vercel

## Engineering notes

- Case studies open via shared-element transition with deep links
  (`/#slug`), back-button close, focus trap, and scroll lock
- The 3D hero never ships JavaScript to mobile viewports
- JSON-LD (Person, WebSite, CreativeWork per project), sitemap, robots,
  custom OpenGraph image rendered in the brand typeface at build time
- WCAG AA: keyboard navigation, screen-reader semantics, reduced motion,
  AA-verified contrast tokens

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

- `docs/portfolio-v2-prd.md` — product requirements
- `docs/PORTFOLIO_PRINCIPLES.md` — non-negotiable design principles
- `docs/CLAUDE_REVIEW.md` — the review gate every commit passes
- `docs/archive/` — historical milestone reports

## Version

**2.0.0**

---

© 2026 Lionael Surya · Toronto, Canada
