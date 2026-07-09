# Performance Optimization Notes

## Images
- Converted portraits to optimized JPEG (433KB from 1.5MB PNG)
- Next.js configured for modern format serving (AVIF, WebP)
- Proper sizing attributes and lazy loading via next/image

## Fonts
- Geist Sans and Geist Mono loaded via next/font with display: swap
- Variable fonts minimize requests
- Font subsetting (latin only)

## Bundle
- Motion library tree-shaken (only used animations imported)
- Server Components used by default
- Client Components minimal (nav, work modal, arch-explorer)

## Caching
- Static generation for all routes
- Immutable assets with hash-based filenames
- Vercel Edge Network CDN

## Loading Strategy
- Critical CSS inlined
- Fonts preloaded automatically
- Images lazy-loaded below fold
- Structured data in head for crawler efficiency
