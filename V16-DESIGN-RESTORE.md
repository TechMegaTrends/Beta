# Restore approved TechMegaTrends V14/V15 design on Cloudflare

The GitHub deployment had an older homepage and components. This package contains the complete approved V14 visual source (electric-blue branding, WE BUILD YOUR DIGITAL FUTURE, service imagery, immersive stage) PLUS the V15 Cloudflare/OpenNext deployment settings for the existing `beta` Worker.

1. In GitHub Desktop, clone/open `TechMegaTrends/Beta`. Prefer create a new branch `restore-v14-design`.
2. Copy all contents of this folder into your local repository ROOT, replacing existing `app`, `components`, `lib`, `public`, `scripts`, `next.config.ts` and `package.json`. Keep `.git` folder untouched.
3. Review changes, commit, push. Create a pull request to `main`.
4. In Cloudflare set Build: `npm run build:cloudflare`, Deploy: `npm run deploy:cloudflare`.
5. Check successful build and `workers.dev` site. Do not change production DNS.

This package has not passed a full Cloudflare build or live browser verification. The enquiry route still needs an authenticated webhook and abuse protection. No secrets are included.
