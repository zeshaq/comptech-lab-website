# comptech-lab

Federated monorepo for **www.comptech-lab.com** (the CompTech Lab consulting site) and **blog.comptech-lab.com** (the engineering notes blog).

## Layout

```
.
├── apps/
│   ├── website/         → https://www.comptech-lab.com
│   └── blog/            → https://blog.comptech-lab.com
└── .github/workflows/
    ├── deploy-website.yml   (triggered by apps/website/** changes)
    └── deploy-blog.yml      (triggered by apps/blog/** changes)
```

Each app is an independent Astro 5 project with its own `package.json`, `node_modules`, build pipeline, and Cloudflare Pages project. Changes to one app only redeploy that app — path filters on the workflows handle isolation.

## Local development

```bash
# Website
cd apps/website && npm install && npm run dev   # http://localhost:4321

# Blog
cd apps/blog && npm install && npm run dev      # http://localhost:4321
```

Run only one dev server at a time (both default to port 4321), or pass `--port` to the second one.

## Deploy

Pushing to `main` triggers the workflow for whichever app changed. Both deploy via `cloudflare/wrangler-action@v3` using the GitHub Actions secrets:

| Secret | Used by |
|---|---|
| `CLOUDFLARE_API_TOKEN` | both deploy workflows |
| `CLOUDFLARE_ACCOUNT_ID` | both deploy workflows |

Cloudflare Pages projects:

| App | Project | Custom domain |
|---|---|---|
| website | `comptech-lab` | `www.comptech-lab.com` |
| blog | `comptech-lab-blog` | `blog.comptech-lab.com` |
