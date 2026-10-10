# TechMegaTrends Beta — Cloudflare Workers

This branch prepares the existing Next.js 15 application for OpenNext on Cloudflare Workers. It has not been deployed or production-build verified.

## Blocker: missing static assets

The connected GitHub repository currently lacks `public/` and `scripts/`. Copy those folders from the full V14/V13 project into the root of this GitHub repository before deployment. Without `public/`, branding and imagery will be missing. The `scripts/` folder contains optional preflight utilities.

## Build

With Node.js and npm installed, from repository root:

```sh
npm install
npm run build:cloudflare
npm run preview:cloudflare
```

Review errors before deployment. For automated Cloudflare Builds: **Build command:** `npm run build:cloudflare`; **Deploy command:** `npm run deploy:cloudflare`; **Root:** repository root. Ensure required package installation completes.

Do not attach the production domain. First test the assigned `workers.dev` URL, then connect `beta.techmegatrends.com` as a custom domain.

The enquiry API returns HTTP 503 until `ENQUIRY_WEBHOOK_URL` is configured. When setting up webhooks, use Workers secrets rather than committing values to GitHub.

This repository is public. Do not commit real API secrets, .env.local or access tokens.

Current status: adapter configuration created; build, browser tests, asset completeness, and contact-form integration still outstanding.
