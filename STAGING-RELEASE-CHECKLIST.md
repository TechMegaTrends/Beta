# TechMegaTrends staging release checklist (V12)

## Completed source-level checks
- Existing V11 source copied without replacing the public website.
- Referenced `public/` image and brand assets checked for existence.
- Seven service routes present in source data; service/portfolio pages preserved.
- Staging SEO control supported by `NEXT_PUBLIC_STAGING=true` (metadata, robots.txt and X-Robots-Tag).
- `npm run preflight` available to rerun file and service presence checks.
- Homepage metadata updated for SaaS, web/mobile applications, automation, security and SMEs across UK/Ireland/EU.

## Not verified in this environment
- `npm install` timed out; cannot claim successful `npm run build`, TypeScript checks, full browser testing or production deployment.
- Enquiry workflow is not active without `ENQUIRY_WEBHOOK_URL` and a secure lead-storage/email delivery service.
- Company registration/address and published legal policies require owner validation before launch.

## Local/staging sequence
1. In project directory run `npm install --no-audit` on an internet-connected machine.
2. Copy `.env.example` to `.env.local`, set `NEXT_PUBLIC_STAGING=true` on staging, and configure enquiry integration if available.
3. Run `npm run preflight`, `npm run build` and `npm run start`.
4. Manually test desktop (Chrome/Edge/Firefox/Safari) and mobile (iOS/Android), responsive images, navigation, portfolio, keyboard, reduced motion and accessibility.
5. Submit test enquiry: verify server-side lead persistence and customer/admin notification delivery, not just a 200 response.
6. Check `robots.txt`, `<meta name="robots">` and `X-Robots-Tag` all prevent indexing on staging.
7. Review company disclosures and legal text; validate Lighthouse and Web Vitals.
8. Only after sign-off, deploy production with `NEXT_PUBLIC_STAGING=false` and verified live domain DNS.

## Current stage
**Not launch-ready**: build/browser QA and functional lead delivery remain unverified.
