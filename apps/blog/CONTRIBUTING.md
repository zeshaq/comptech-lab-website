# Contributing to the blog

The blog at **https://blog.comptech-lab.com** lives in the `zeshaq/comptech-lab` monorepo under `apps/blog/`. This file is the **short version** of how to add content. For depth — voice rules, diagram conventions, content collection schemas, AI-agent guidance — read [`ONBOARDING.md`](./ONBOARDING.md) (humans) and [`CLAUDE.md`](./CLAUDE.md) (AI agents).

---

## Setup (once)

```bash
git clone git@github.com:zeshaq/comptech-lab.git
cd comptech-lab/apps/blog
npm install
```

You only need to install dependencies inside `apps/blog/`. The website at `apps/website/` is a separate Astro project with its own `node_modules` and lifecycle — leave it alone unless you're contributing there too.

Prerequisites: **Node 22** (matches CI), **git**, and `gh` (optional, useful for watching deploys).

---

## Day-to-day workflow

```bash
cd apps/blog
npm run dev                          # http://localhost:4321 — hot reload
# ...edit files under src/content/blog/, src/content/docs/, src/content/learn/...
npm run build                        # MDX errors only surface here — always run before commit
cd ..
git add -A
git commit -m "Add post: ..."        # short, descriptive subject line
git push                             # main branch — deploy-blog.yml triggers automatically
```

> **Always run `npm run build` before committing.** Astro and MDX parse errors only surface at build time, not during `dev`. A broken build that lands on `main` means a failed Cloudflare deploy and a stale blog for everyone.

A push to `main` that touches `apps/blog/**` triggers the **Deploy blog** workflow:

1. `npm ci` inside `apps/blog/`
2. `npm run build` inside `apps/blog/`
3. `wrangler pages deploy apps/blog/dist --project-name=comptech-lab-blog --branch=main`
4. Live at https://blog.comptech-lab.com within ~1–2 minutes

Pushes that only touch `apps/website/**` or root files don't run the blog workflow at all.

---

## Branching policy

**Default — feature branch + PR:**

```bash
git checkout -b post/<slug>         # or docs/..., learn/..., fix/...
# ...work, commit...
git push -u origin post/<slug>
gh pr create --fill
```

After review, squash-merge to `main`. The deploy workflow runs on the merge commit.

**Direct push to `main`** is acceptable when:

- You are the repo owner (`@zeshaq`).
- You are an AI agent the owner has explicitly authorised to push directly for this session (see `agent-memory/feedback_always_push_posts.md`).
- You are making a trivial fix the owner has greenlit by name (e.g., "yes, just push the typo fix").

**Never** `--force-push` to `main`, `--no-verify` to skip hooks, override `git config`, or rewrite history on `main`.

---

## Where content goes

| If you're writing... | Put it in... |
|---|---|
| A blog post (technical writing for a general audience) | `src/content/blog/<slug>.mdx` |
| Operating reference for the comptech OpenShift platform | `src/content/docs/openshift-platform/<NN-section>/<NN-page>.mdx` |
| Customer engagement POC docs (BRAC Bank) | `src/content/docs/brac-poc/<NN-page>.mdx` |
| Greenfield OpenShift deployment guide | `src/content/docs/greenfield-ocp-deployment/<NN-section>/<NN-page>.mdx` |
| Security lab notes | `src/content/docs/security-lab/<NN-page>.mdx` |
| A self-paced learning module | `src/content/learn/<track>/<NN-module>.mdx` |

Numeric prefixes (`NN-`) drive sort order and are stripped from URLs. Schema definitions live in `src/content.config.ts`. See `ONBOARDING.md` §6 and §11 for frontmatter requirements and recipes per content type.

---

## Voice and writing conventions (the short list)

- **Opinionated and specific.** "The mistake to avoid is X" beats "consider X."
- **Concrete naming over generic.** "A 9.8 CVE in an image deployed once" beats "a critical vulnerability."
- **Tables for comparison, not bullet lists.**
- **Paragraphs under ~5 sentences.** The layout is full-width; dense prose feels heavy.
- **Length:** 1000–1400 words for a standard post.

**Don't** open with "In today's cloud-native landscape," use *leverage* / *robust* / *enable*, or write feature lists without ranking. Full voice template is in `ONBOARDING.md` §9 and `CLAUDE.md` §5.

---

## Diagrams: ReactFlow only

Use `<Whiteboard>` (`src/components/Whiteboard.tsx`). **Do not use `<Mermaid>`** — that was deliberately retired. **No `<MiniMap>`** in any diagram. Edge convention and style primitives are documented in `ONBOARDING.md` §10 and `CLAUDE.md` §6.

MDX gotchas to remember:

- **No `//` line comments** inside `export const ...Nodes = [ ... ]` arrays — MDX's parser rejects them.
- **Escape `<digit` in prose** — write `&lt;200ms` not `<200ms`.
- **`fontSize: 12`** is the floor for node labels.

---

## Deploy verification

After your push merges, watch the run:

```bash
gh run list --repo zeshaq/comptech-lab --branch main --limit 3
gh run watch <run-id> --repo zeshaq/comptech-lab --exit-status
curl -I https://blog.comptech-lab.com/blog/<your-slug>/
```

Expect `HTTP/2 200`. Edge cache propagates within ~30 seconds of the workflow completing.

---

## If something breaks

If the site is broken on production:

1. Find the bad commit: `git log origin/main --oneline -10`
2. Revert it: `git revert <sha>` (on `main` or via PR) and push
3. The revert triggers a fresh deploy; the previous good state is back at the edge in ~2 minutes

Don't try to fix forward on a broken `main`. Revert, fix on a branch, re-merge.

See `ONBOARDING.md` §13 for the full rollback runbook.

---

## For AI agents

If you are an AI agent, your **mandatory next read is `CLAUDE.md`** in this directory. It captures the voice rules, diagram conventions, MDX parser gotchas, and a list of standing user preferences with their rationale. Treat the `agent-memory/` directory as binding — those files capture user preferences ("no Mermaid", "no MiniMap", "always push after writing a post", the post voice template) that should be honoured across sessions.

Start Claude Code from `apps/blog/`:

```bash
cd /Users/ze/Documents/comptech-lab/apps/blog && claude
```

That way `CLAUDE.md` is auto-loaded and your context stays blog-scoped.

---

## Questions

- **Owner:** Zahid (`@zeshaq`, zeshaq@gmail.com)
- **Issues:** https://github.com/zeshaq/comptech-lab/issues (label your issue `area: blog`)
- **PR review:** Conversation in the PR thread

If this guide is unclear or out of date, fix it in your next PR. Out-of-date instructions cost everyone time.
