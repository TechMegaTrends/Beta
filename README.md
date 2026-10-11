# TechMegaTrends — Monochrome Immersive V6

Original TechMegaTrends experience inspired by full-screen creative-studio interaction patterns (no copied Active Theory assets, code, logos, or scenes). The previous globe remains removed.

## Design
- Monochrome black/white/grey palette, flat cards, pill CTA buttons.
- Oversized responsive type, cinematic full-height hero, pointer-responsive layered SaaS sculpture.
- Six vertically sequenced digital service chapters, all semantic HTML and readable without WebGL.
- Static vertical chapters on mobile, reduced motion via CSS and site control.
- Preserves original service, portfolio, product, business, contact, legal routes from V5.
- Enquiry API still requires configuration and legal pages require review prior to launch.

## Run
```bash
npm install
npm run dev
```
Open http://localhost:3000. Test `npm run build` and browser QA before deployment.

# TechMegaTrends Website V5 — Product Studio Edition

Updated positioning: SaaS applications, websites, dynamic web apps, micro apps, iOS/Android apps, hybrid-cloud SaaS, AI automation, IT security and risk management for SMEs across UK, Ireland and EU.

## Major changes from V4
- Removed globe component and its Three.js runtime from the website hero.
- Added responsive cinematic SaaS product UI hero with working feature-selector controls.
- Kept the Verticalix-inspired vertical service stories and expanded to seven services.
- Added IT Security & Risk Management as a dedicated service page.
- Updated homepage messages, mobile app positioning, service descriptions and geographic coverage.
- Preserved portfolio, logo, enquiry structure, site-wide colours and reduced-motion compatibility.

## Run
npm install
npm run dev

## Verification
Run `npm run build` and browser QA before production. The contact form requires a real secure email/CRM backend. Project demonstrations are sample data, not live customer systems. Review legal disclosures, privacy and cookie pages before publishing.

# TechMegaTrends — Corporate Website

Premium Next.js / TypeScript website source for **techmegatrends.com**.

## Start locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000. Run `npm run build` to check the production build.

## Included
- Responsive, branded homepage with animated gradient and WebGL 3D core on supported desktop hardware
- Reduced-motion control, semantic navigation and mobile-friendly animations
- Six service detail pages, portfolio listing and project details
- Interactive sample demos (all clearly illustrative, no customer data)
- Digital products, industries, About, Insights and Contact pages
- Form validation and secure server-side webhook relay (requires configuration)
- Sitemap, robots metadata, legal placeholders and SEO metadata

## Before launch — essential checklist
1. **Confirm legal company details** with Companies House; footer address currently needs verification.
2. **Replace draft policies** with legally reviewed privacy notice, cookies details and website terms. Identify processors and lawful bases.
3. **Configure enquiries**: Set `ENQUIRY_WEBHOOK_URL` to your own trusted HTTPS backend and `ENQUIRY_WEBHOOK_SECRET`. Backend must authenticate requests, apply rate limits/anti-spam, durably store enquiries, send customer acknowledgement and notify `info@techmegatrends.com`. Without it the site refuses submission and offers direct email; it does **not** claim messages were sent.
4. Replace illustrative portfolio artwork with actual screenshots and confirm client permission, statuses and descriptions.
5. Confirm final content, company contact details, logos and any case-study claims.
6. Deploy and test Cloudflare compatibility (Workers + suitable Next runtime adapter, or Vercel as alternative). Set environment variables securely in provider dashboard.
7. Test real devices, accessibility, reduced motion, keyboard interactions, Core Web Vitals, forms and monitoring.
8. Add analytics **only after** reviewing consent requirements and providing necessary controls.

## Technical notes
This standalone project intentionally does not reuse the travel business logic or private entities from the reference ZIP. The homepage hero loads React Three Fiber lazily only on large screens with fine pointers; mobile receives a CSS 3D-style poster. Page content is independent of WebGL. Fonts use Google Fonts CSS as a starter; self-host fonts in production for better privacy and repeatable performance.

## Contact route
`POST /api/enquiries` validates requests, refuses to accept them when delivery is unconfigured, and forwards to a trusted webhook with a bearer token if configured. Add abuse prevention and consent-compliant CRM flows in the backend before public use.


## Brand update / cinematic globe
- Official provided company logo is in `public/brand/` (full logo, emblem and wordmark). Site header and favicon updated.
- Hero now uses procedural revolving Earth with dot-rendered approximate continental outlines, latitude/longitude mesh, glow, star field and orbital rings. Continental geometry is illustrative, not a cartographic reference.
- Canvas renders only on desktop/fine-pointer devices when the hero is on screen. Mobile, reduced-motion and unavailable-WebGL states show a static globe instead.
- To change hero globe appearance, edit `components/visuals.tsx` (`Earth`, `GlobeScene`). To change styles, see the end of `app/globals.css`.

## V3 homepage — scroll-to-explore editorial experience

The homepage now contains an original TechMegaTrends service showcase inspired by the scrolling presentation pattern at https://daily-handbook-198407.framer.app/. The existing cinematic revolving globe remains the opening hero. The next chapter displays six full-bleed editorial panels, one per service, with sticky scroll progression on desktop and a responsive vertical-card fallback for smaller screens or reduced-motion preferences. The company's supplied logo remains integrated into the header and favicon.

Files changed in V3:
- `components/scroll-showcase.tsx` — self-contained interactive showcase with scroll progress, service links and accessible fallbacks.
- `app/page.tsx` — new showcase inserted directly after the existing globe hero.
- `app/globals.css` — dedicated editorial cards, graphic treatments, responsive rules and reduced-motion layouts.

All visuals in the new section are original CSS artwork, not copied images from the reference site. The production build must be verified after running `npm install` and `npm run build` locally or in CI.

## V4 — Vertical editorial refresh (10 October 2026)
- Re-themed header and homepage with warm chalk/ivory, charcoal green, burnt-orange and pale-lime accents.
- Changed the scroll showcase from horizontal to vertical slide transitions on large screens.
- Restyled the header wordmark as readable editorial text, retaining the supplied T/M emblem asset; original full logo and wordmark PNG remain under `public/brand/`.
- Preserved the cinematic globe, service navigation, portfolio and sample demonstrations.
- Desktop vertical showcase is replaced by ordinary stacked content for reduced-motion/mobile experiences.
- This is a custom implementation inspired by the Verticalix marketplace presentation, not a licensed copy of the Framer component.
- Must run `npm install`, `npm run build` and device/browser QA prior to production deployment. External services and contact backend still require configuration.

## V8 electric blue design update

The V8 edition applies a black and electric-blue identity consistently across the homepage, immersive SaaS stage, buttons, navigation, cards, sections, inputs and footer. This is a design-layer update on V7; it does not change the enquiry backend or legal readiness. Respect reduced-motion settings and test in a browser before going live.


## V9 image integration
- Ten optimised electric-blue WebP banners are in `public/images/pages/`.
- `public/brand/techmegatrends-monogram-white.png` is derived from the provided logo and is now used in the header/footer.
- Homepage title: “WE BUILD YOUR DIGITAL FUTURE.”
- Dynamic service routes use their individual banner; secondary routes reuse matching theme images.
- Contact form still requires server-side delivery configuration; do not publish until tested.
