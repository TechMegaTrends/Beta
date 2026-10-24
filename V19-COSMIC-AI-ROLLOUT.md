# TechMegaTrends V19 — Cosmic AI Network Experience
Status: **approved design direction / implementation specification**, not deployed.
Repository: TechMegaTrends/Beta
Starting point: V18 draft branch `feature/v18-dreamcore-cinematic` (PR #8), with V17 homepage/content.
Reference inspiration: dreamcore-landing visual language; create ORIGINAL assets and code, do not copy site content or imagery.

## 1. Non-negotiable constraints
- Retain the existing Next.js 15, React 19, TypeScript, Motion, OpenNext/Cloudflare Workers architecture.
- Retain brand assets, electric blue + cyan + violet identity with subtle coral/orange accents.
- Do **not** modify the contents or behavior of existing enquiry endpoints, cookie consent, legal notices, privacy policies, analytics consent, SEO URLs, projects, product/status labels, or service data.
- Do not change `wrangler.jsonc`, Worker names, secrets, routes or environment configuration.
- No hard-coded performance claims, testimonials, prices, certifications or customer logos.
- Maintain hierarchy/readability and primary CTAs; visuals must not block navigation, keyboard focus or pointer events.
- Keep `main` and `production-release` intact until review and approval. They diverge: selective port and explicit deployment QA required.

## 2. Design foundation
Design identity: **Cosmic AI Network**. Not literal stars/galaxies or sci-fi gaming UI: an intelligent interconnected data constellation representing software, AI, cloud and cybersecurity.
Palette:
- Space navy `#060B1C`
- Ink `#0B1530`
- Electric blue `#3979FF`
- Plasma cyan `#5CEBFA`
- Neural violet `#9965FF`
- Soft coral `#FF947B` (accent only)
- White `#F8FBFF` and muted slate `#A8BBD6`
Use Space Grotesk and DM Sans already installed by CSS; avoid introducing a new font until rendering/privacy reviewed.

Visual rules: lines connect gently pulsing points, optional low-count particle clusters, translucent frosted surfaces, moving atmospheric fog, restrained 3D perspective and dimensional glow. Never put dense geometry behind paragraphs; place emphasis on hero right visual field.
Mouse parallax max ~12px; content does not chase cursor. No scrolljacking. Stable layout sizes. All interactions work with JS and motion disabled.

## 3. Sitewide page coverage
- `app/page.tsx`: 16-second seamless home video, left-aligned headline and CTAs, right-sided neural constellation; preserve `ImmersiveStage` and all V17 sections.
- `app/about/page.tsx`: cosmic introduction / interconnected engineering principles. Same network layer at reduced intensity.
- `app/services/page.tsx`: central node with service constellation and accessible regular links/cards. Preserve actual seven service records and slugs.
- `app/services/[slug]/page.tsx`: service-specific colored constellation; keep original service details/data and enquiry paths.
- `app/portfolio/page.tsx` and `app/portfolio/[slug]/page.tsx`: project-focused glass-framed screenshots with restrained reveals; retain assets, statuses and links.
- `app/products/**`: consistent cosmic accents, no implied product-launch readiness.
- `app/industries/**`: industry-specific connected node patterns and existing links.
- `app/insights/**`: clear editorial reading layouts; very subtle ambient backgrounds.
- `app/contact/page.tsx`: sparse constellation, static form backdrop; never obscure fields; preserve form logic.
- `app/privacy/page.tsx`, `app/cookies/page.tsx`, `app/terms/page.tsx`: minimal static glow and zero distracting motion.
- Shared header/footer and 404 or other routes: shared design tokens and decoration without layout shifts.

## 4. Components / exact file strategy
New:
1. `components/cosmic-network-background.tsx`: reusable, decorative, lightweight SVG/CSS nodes and connecting lines; optimized to animate only when in view, fallback static.
2. `components/cosmic-page-hero.tsx`: wraps existing title/description/CTA slots; assigns visual variants by stable explicit props.
3. `components/cosmic-hero-video.tsx`: muted, autoplay, loop, playsInline; webm+mp4; static poster; autoplay failure graceful; never shows player controls or embeds text.
4. `components/cosmic-motion.tsx`: scroll reveal / node drift and reduced-motion control via existing site preference.
5. `components/cosmic-constellation.tsx`: desktop-only optional interactive 3D network using SVG/CSS first. Consider Three.js only after benchmark proves benefit; dynamically import; no runtime requirement for normal site content.
6. `lib/cosmic-theme.ts`: shared variants and design token/type mappings; must not duplicate service or portfolio data.
7. `public/media/cosmic-ai-hero.webm`, `cosmic-ai-hero.mp4`, `cosmic-ai-poster.webp`: original media, supplied as separate reviewed asset deliverable.

Modify:
- `app/layout.tsx`: apply shared non-intrusive ambient shell beneath contents, respecting existing Header/Footer/MotionPreferences/CookieConsent.
- `app/page.tsx`: replace V18 demo cinematic overlay with V19 approved media network; preserve entire underlying V17 copy and CTA links.
- `app/globals.css`: add scoped `--cosmic-*` tokens and prefixed selectors, responsive + reduced-motion rules; avoid altering base selectors that break V17.
- `components/shell.tsx`: opt-in visual accents to navigation only, preserve mobile and keyboard navigation.
- Each page route above: add optional cosmic hero/ambient motion **without rewriting its business logic**.

Legacy: remove the unused V18 liquid-glass component only once V19 new hero is working, not before. Maintain small migration diffs.

## 5. Matching 16-second seamless video production pack
Export: 16:9, 1920x1080 master; 24fps or 30fps; no sound, no typography, no logos and **no identifiable people**. Encode optimized WebM plus MP4 H.264 and poster WebP. Use sufficiently low bitrate for Core Web Vitals and preload poster, not video; mobile can receive poster rather than autoplay.
Creative prompt:
'Create an original photorealistic abstract cinematic motion artwork for a premium UK digital software, AI, cloud and cybersecurity studio. An elegant intelligent cosmic neural network in deep navy space with connected glass-light nodes, threads of electric blue and luminous cyan data, tiny violet particles and subtle warm coral glints. In the right two thirds, connected nodes bloom organically into a multidimensional constellation; gentle light pulses travel along edges, and a translucent halo of network filaments rotates slowly around a central iridescent intelligence core. Wide slow cinematic dolly forward, fluid shallow parallax, atmospheric volumetric haze, refined subtle lens highlights, ultra-clean premium high-end digital art direction. Keep the LEFT 45% consistently dark, spacious and very low-detail to protect overlaid website headings and CTA readability. Calm, confident, sophisticated, no explosions, no galaxies packed with stars, no flashing, no rapid cuts. First and last frames of the loop must match in motion and composition. No text, no letters, no logos, no watermark, no audio. 16 seconds, 16:9, 4K quality source intended for downsample to 1080p.'
Negative: people, robots, eyes, faces, hands, planets, spacecraft, space battles, HUD text, computer-code text, glowing brand logos, binary rain, aggressive camera shake, hard cuts, overblown neon and strobing.
Storyboard:
0–4s: distant low-count nodes come softly into focus; thin connections appear.
4–8s: camera glides closer; node mesh curls into a spatial arc in right-hand visual field.
8–12s: subtle cyan/violet pulses run through concentric orbital links; restrained warm accent appears.
12–16s: constellation settles back into starting topology, framing and light level for invisible loop.
AI video tools can struggle with seamless loops: use optical blending/crossfade and short retiming in DaVinci Resolve if needed; inspect start/end frame continuity.
Recommended image/video still direction: original right-of-centre glass node constellation, strong left gradient negative space.

## 6. Interaction + accessibility
- Honor both OS `prefers-reduced-motion` and existing site `reduce-motion` class/control.
- Reduced motion = pause/hide videos, stop CSS looping animations, display accessible static poster.
- Mark decoration `aria-hidden`; avoid canvas in focus order; color contrast WCAG AA on content.
- No pointer hijacking over buttons, form fields or links.
- Use IntersectionObserver for scroll-linked effects; disconnect on unmount.
- Pause out-of-viewport motion and honor `visibilitychange` as needed.
- Avoid hydration mismatch and client-only layout shifts.

## 7. Performance targets (QA goals, not claims)
- Lighthouse mobile Performance >= 85 (aspirational), Accessibility >= 95; validate on throttled hardware.
- LCP <= 2.5s, CLS <= .1, INP <= 200ms at p75 field where measurable.
- Mobile hero poster-first; video not required for first paint; limit CPU/GPU.
- Defer optional 3D engine, use CSS/SVG fallback. Monitor Cloudflare caching and media transfer.

## 8. Release plan
Phase A: complete visual brand tokens and create approved static constellation poster (no routes touched).
Phase B: original loop video, formats, media optimizations and static fallback.
Phase C: homepage hero and existing V17/immersive compatibility testing.
Phase D: shared CosmicPageHero and background across all route families, preserve content.
Phase E: polish hover, scroll and CTA animation; accessibility/mobile QA.
Phase F: run `npm ci`, `npm run build`, `npm run build:cloudflare`, `npm run preflight` and staging full regression. Review images/network requests/console errors, cookie consent, forms and SEO.
Phase G: review PR, merge to `main` only after approval. Selectively port approved commits to `production-release`, explicitly keeping `wrangler.jsonc` configuration. Deploy only after approval.

## 9. Acceptance checklist
- Every page inherits recognizable Cosmic AI Network identity; non-home heroes also move subtly.
- Homepage uses its own original moving hero video with matching poster and sitewide constellation.
- Mobile/reduced-motion remain attractive and readable.
- All 7 services, portfolio images/links, products, industries, insights, legal and contact routes remain intact.
- Forms, navigation, cookie consent, footer and SEO behave as before.
- No Cloudflare production changes, accidental Worker renames or missing env variables.
- Screenshots and sign-off for desktop/mobile before any merge.
