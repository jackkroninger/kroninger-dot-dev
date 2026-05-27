# kroninger.dev

Personal site of Jack Kroninger — articles, projects, and CV.

Live at **[kroninger.dev](https://kroninger.dev)** *(not yet deployed)*.

## Stack

- [Astro 6](https://astro.build/) — static site generation
- TypeScript with [Zod](https://zod.dev/) for content validation
- Vanilla CSS (Astro scoped styles + design tokens)
- [Cloudflare Pages](https://pages.cloudflare.com/) for hosting and CDN
- Content authored as Markdown (articles, projects) and JSON (page data, CV)

## Quick start

```bash
git clone https://github.com/jackkroninger/kroninger-dot-dev.git
cd kroninger-dot-dev
npm install
npm run dev
```

Visit [localhost:4321](http://localhost:4321).

### Commands

| Command            | Purpose                                                |
|--------------------|--------------------------------------------------------|
| `npm run dev`      | Local dev server with HMR (drafts visible)             |
| `npm run build`    | Production build to `./dist` (drafts excluded)         |
| `npm run preview`  | Serve the production build locally                     |
| `npx astro check`  | Type and content collection validation                 |

## Project structure

```
src/
  assets/          Optimized images (referenced from MD or components)
  components/      Reusable .astro components
  content/
    articles/      Articles as .md with frontmatter
    projects/      Project writeups as .md with frontmatter
  data/            Per-page JSON config (home, cv, contact, site)
  layouts/         Page shells
  pages/           Routes (file-based)
  styles/          Global CSS + design tokens
public/            Static passthrough (favicon, _redirects, robots.txt)
```

See [`TECH_SPEC.md`](./TECH_SPEC.md) for the full architecture and schemas.

## Authoring content

### Add an article

Create `src/content/articles/my-new-article.md`:

```markdown
---
title: "Article title"
description: "One-sentence summary used in listings and RSS."
pubDate: 2026-05-27
tags: [tag1, tag2]
draft: false
---

Article body in markdown. Inline images use relative paths so Astro
optimizes them at build time:

![alt text](../../assets/articles/diagram.png)
```

Set `draft: true` to keep the article out of the production build while still
viewing it in `npm run dev`.

### Add a project

Same pattern in `src/content/projects/`:

```markdown
---
title: "Project name"
description: "What it does."
pubDate: 2026-05-27
status: active            # active | completed | archived
techStack: [Astro, TypeScript]
repoUrl: https://github.com/jackkroninger/example
draft: false
---

Project writeup in markdown.
```

### Edit page content

Page-level content is in JSON, one file per page:

- `src/data/home.json` — home page hero, intro, featured lists
- `src/data/cv.json` — CV (experience, education, skills)
- `src/data/contact.json` — email, social links
- `src/data/site.json` — site title, nav, footer

Edit the JSON, save, push. Build picks up the new content. Schemas are
defined in `src/content.config.ts` and enforced at build time — typos and
missing fields fail the build before deployment.

## Deployment

`main` deploys automatically to [Cloudflare Pages](https://pages.cloudflare.com/)
on push. Pushes to other branches generate preview URLs that don't affect
production.

Custom domain setup:

- `kroninger.dev` — canonical
- `www.kroninger.dev` and `jack.kroninger.dev` — 301 redirect to apex (via `public/_redirects`)

## Development workflow

Work happens on feature branches; `main` is protected. See
[`CLAUDE.md`](./CLAUDE.md) for the full conventions used for AI-assisted
development on this repo.

```bash
git checkout -b feat/something
# ...make changes...
npx astro check && npm run build   # must pass
gh pr create --base main
```

## License

Personal site — code is published for reference and learning; written content
(articles, CV) is © Jack Kroninger, all rights reserved. If you want to reuse
something specific, open an issue.
