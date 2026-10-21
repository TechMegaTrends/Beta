# V18 Dreamcore cinematic homepage (draft)
Branch: `feature/v18-dreamcore-cinematic`, based on `main`.

## Included
- Additive cinematic liquid-glass visual treatment, pointer-depth effect, responsive mobile styling.
- Progressive hero video sources with fallback to CSS artwork when media missing.
- Preserves current V17 header, hero copy, CTAs, service URLs, 6-chapter immersive stage, portfolio, contact forms, cookie consent and legal pages.
- No Wrangler, OpenNext, webhook, secret or production-release changes.

## Asset delivery (not yet complete)
Supply an original/licensed, muted, seamless ~15–20 second cinematic hero video in `public/media/techmegatrends-dreamcore-hero.webm` and optional `.mp4`. Video paths are deliberately non-existent until media is approved. The CSS hero still works without media; no supplier or third-party content is copied.

## Before merge
- Run `npm ci && npm run build` and `npm run build:cloudflare` in a configured environment.
- Browser-test desktop + mobile, video fallback, no-video scenario, reduced-motion and the site's manual motion preference.
- Verify accessibility, service/navigation links, forms, cookies, CLS/LCP.
- Preview separately from production; do not merge this draft until hero video and QA are approved.
- `production-release` diverges from `main`, so port changes selectively, preserving Cloudflare Worker configuration.
