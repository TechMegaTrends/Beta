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
