# V20 London Digital City – media integration and verification

## Approved assets
Place the three files from TechMegaTrends-V20-media.zip at:
- public/media/v20-hero.mp4
- public/media/v20-hero.webm
- public/media/v20-hero-poster.jpg

These files are **not automatically included** by the source changes. Avoid merging while missing.

## Verify locally
```powershell
git switch feature/v20-premium-landing
# Extract the media pack at repository root, preserving public/media/
node scripts/check-v20-assets.mjs
npm ci
npm run build
npm run build:cloudflare
```

Then use `npm run dev` and inspect homepage/Services/AI/Cloud/Cybersecurity/About/Portfolio/Contact on desktop and mobile. Verify muted video autoplay, WebM and MP4 fallback, poster behaviour, reduced motion, menu contrast, keyboard navigation, contact form and existing internal links.

The original generated video is 720p / ~5 seconds: it is a first approved **motion reference**, not the final seamless 1080p production asset. Check playback and visible loop jump before claiming production readiness.

**Release rule:** Keep PR #10 as draft and do not merge to `main` or `production-release` until files, builds, accessibility and browser QA are completed. Cloudflare production Worker configuration must remain unchanged.
