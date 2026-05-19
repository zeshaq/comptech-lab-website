# comptech-lab-website

Source of **https://www.comptech-lab.com** — the CompTech Lab consulting site. Astro 5 + MDX + React islands, deployed to Cloudflare Pages on every push to `main`.

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
```

Build before committing — MDX parse errors only surface at build time.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml` → builds → uploads to Cloudflare Pages project `comptech-lab`. The custom domain `www.comptech-lab.com` is bound in the Cloudflare Pages dashboard.

## Stack

- Astro 5 + MDX + `@xyflow/react` (interactive diagrams)
- Tailwind v4 via `@tailwindcss/vite`
- Pagefind for client-side search
- Cloudflare Pages + Pages Functions (contact form)
