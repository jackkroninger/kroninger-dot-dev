# Claude Code Instructions — kroninger.dev

Personal website for Jack Kroninger. Static site built with Astro 6, deployed to
Cloudflare Pages from this repo's `main` branch. Content is structured as
Markdown (articles, projects) + JSON (page-level structured data).

This file is the high-level contract. Read `TECH_SPEC.md` for full schemas,
routing, and deployment details.

---

## Repository

- **GitHub**: https://github.com/jackkroninger/kroninger-dot-dev (public)
- **Default branch**: `main` — protected. **Never push directly.**
- **GitHub CLI**: `gh` is installed and authenticated. Use it for all PR
  operations.

## Git workflow

All work happens on feature branches and lands via pull request. No direct
commits to `main`.

1. Start every task by creating a branch from latest `main`:
   ```bash
   git checkout main && git pull
   git checkout -b feat/<short-kebab-case-description>
   ```
   Branch prefixes: `feat/` for new functionality, `fix/` for bug fixes,
   `chore/` for tooling/refactors, `docs/` for docs-only changes.

2. Commit in logical, reviewable chunks. Commit messages: imperative mood,
   short subject (≤72 chars), explanatory body if non-trivial.

3. Before opening a PR, the local verification steps in "Verifying a change"
   below must all pass.

4. Open the PR with `gh pr create`:
   ```bash
   gh pr create --title "<title>" --body "<body>" --base main
   ```
   PR body should include: what changed, why, screenshots if visual, and a
   checklist of what was verified locally.

5. **Print the PR URL in the chat output and stop.** Do not merge. The human
   reviews and merges.

6. If asked to revise the PR, push more commits to the same branch — do not
   open a new PR. `gh pr view --web` opens it for re-review.

---

## Stack at a glance

- **Framework**: Astro 6 — static output, no SSR adapter
- **Language**: TypeScript (strict)
- **Styling**: Vanilla CSS via Astro's scoped `<style>` blocks + CSS custom
  properties (design tokens) in `src/styles/global.css`
- **Content**:
  - Markdown for prose: articles, projects
  - JSON for structured page data: home, cv, contact, site config
- **Validation**: Zod schemas via Astro Content Collections (Content Layer API)
- **Hosting**: Cloudflare Pages, auto-deploys on push to `main`
- **Node**: 22.x (set `NODE_VERSION=22` in Pages env)
- **Package manager**: npm — always commit `package-lock.json`

## Do NOT add unless explicitly asked

- React, Preact, Vue, Svelte — pure Astro components only. No interactive
  islands in v1.
- Tailwind, UnoCSS, any utility CSS framework — vanilla CSS only.
- MDX — plain `.md` is sufficient.
- A CMS UI (Keystatic, Decap, TinaCMS) — JSON is edited in the IDE.
- Analytics, comments, newsletter forms, contact forms — out of scope for v1.
- Database, KV, R2, Durable Objects — site is fully static.

If a task seems to require any of the above, **stop and ask** before adding.

---

## Repo conventions

```
src/
  assets/         ← Optimizable images. Referenced from .md/.astro via relative path.
  content/
    articles/     ← .md articles with frontmatter
    projects/     ← .md project writeups with frontmatter
  data/           ← One JSON file per static page + site.json
  components/     ← Reusable UI components (.astro)
  layouts/        ← Page shells (.astro)
  pages/          ← Routes (.astro + endpoints)
  styles/
    global.css    ← Design tokens (CSS vars) + element resets
  content.config.ts ← Content collection definitions
public/
  _redirects      ← Cloudflare Pages redirect rules
  favicon.svg
astro.config.mjs
package.json
tsconfig.json
```

## Critical patterns

### Images
- **Optimizable images live in `src/assets/`** — imported and rendered via
  `<Image />` from `astro:assets`, or referenced from markdown with relative
  paths.
- **`public/` is for files served verbatim only** — favicons, `robots.txt`,
  `_redirects`. Never put optimizable images here; Astro will not process them.

### Drafts
- Articles and projects have `draft: boolean` (default `false`) in their schema.
- Listing pages, detail routes (`getStaticPaths`), and the RSS endpoint all
  filter `draft: true` entries when `import.meta.env.PROD === true`.
- In `npm run dev`, all drafts are visible.

### Custom domains
- `kroninger.dev` is canonical.
- `www.kroninger.dev` and `jack.kroninger.dev` 301 to the apex via
  `public/_redirects`.
- `astro.config.mjs` `site` is `'https://kroninger.dev'`.

### Content separation rule
Prose → markdown. Structured data → JSON. UI strings (button labels, aria
labels, etc.) stay in components.

---

## Verifying a change

Before opening a PR, all of the following must pass:

1. `npx astro check` — type + content-collection validation, zero errors
2. `npm run build` — clean build, zero errors or warnings
3. `npm run dev` — every route renders without console errors

A failing `astro check` or `npm run build` is a blocking issue. Do not open a
PR with a failing build.

After verification passes, follow the "Git workflow" section above to open a
PR and print the URL.

## When ambiguous

If a decision isn't covered by `CLAUDE.md` or `TECH_SPEC.md` and the answer
isn't obvious, **pause and ask** rather than guessing. The cost of a clarifying
question is much lower than the cost of undoing a wrong architectural choice.
