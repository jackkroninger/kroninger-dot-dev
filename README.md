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
| `npm run dev`      | Local dev server with HMR (drafts hidden)              |
| `npm run build`    | Production build to `./dist` (drafts hidden)           |
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

Set `draft: true` to hide the article everywhere — listings, its detail URL,
the home page, and the RSS feed — in dev, build, and preview alike. To preview
a draft locally, temporarily set `draft: false`.

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

## Images

The profile photo (`home.json`) and article/project cover images
(`heroImage` in Markdown frontmatter) all share the same shape:

```yaml
heroImage:
  src: ../../assets/projects/thing.jpg   # local asset OR a full https URL
  alt: "Description for screen readers"
```

- **Local** — a path (relative to the content file) into `src/assets/…`.
  Optimized at build time via Astro's `<Image>` (responsive `srcset`, modern
  formats). Each article/project has a commented `heroImage` example to fill in.
- **Remote** — any full `https://` URL: an external image, or one you host on
  **Cloudflare R2**. Remote URLs are rendered as a plain `<img>` (passed
  through, not re-optimized — R2/Cloudflare handles caching and any resizing).
- **`alt`** is configurable per image; if omitted it falls back to the entry
  title. Use `""` for purely decorative imagery.
- Leave `src` empty (`""`) or omit the image to show the striped placeholder.

### Serving images from Cloudflare R2

Use a **custom domain**, not the `*.r2.dev` development URL (that subdomain is
rate-limited and intended for non-production; custom domains are what enable
CDN caching, WAF, and access control):

1. Create an R2 bucket and upload images.
2. Make it public by connecting a custom domain on this account's zone, e.g.
   `images.kroninger.dev` — dashboard, or
   `wrangler r2 bucket domain add <bucket> --domain images.kroninger.dev --zone-id <zone>`.
   (Don't CNAME to `r2.dev` — that's unsupported.)
3. Reference objects by their public URL in `src` —
   `https://images.kroninger.dev/<key>` — responses are cached on Cloudflare's CDN.
4. Optional: put **Cloudflare Images / Image Resizing** in front for on-the-fly
   variants (`/cdn-cgi/image/...`).

To have Astro's `<Image>` *optimize* remote images at build instead of passing
them through, add the host to `image.remotePatterns` in `astro.config.mjs` and
switch `CoverImage` to use `<Image src={url} inferSize>`. We can wire that up
when the R2 domain is finalized alongside deployment.

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
