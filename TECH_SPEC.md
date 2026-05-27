# Technical Specification — kroninger.dev

Detailed reference for the project's architecture, schemas, routing, and
deployment. Read alongside `CLAUDE.md`, which contains the higher-level rules
and the Git workflow.

**Repository**: https://github.com/jackkroninger/kroninger-dot-dev (public)

---

## 1. Pages

| Route                    | Source                                  | Type            |
|--------------------------|-----------------------------------------|-----------------|
| `/`                      | `src/pages/index.astro` + `home.json`   | Static          |
| `/articles`              | `src/pages/articles/index.astro`        | Listing         |
| `/articles/[...slug]`    | `src/pages/articles/[...slug].astro`    | Dynamic from MD |
| `/projects`              | `src/pages/projects/index.astro`        | Listing         |
| `/projects/[...slug]`    | `src/pages/projects/[...slug].astro`    | Dynamic from MD |
| `/cv`                    | `src/pages/cv.astro` + `cv.json`        | Static          |
| `/contact`               | `src/pages/contact.astro` + `contact.json` | Static       |
| `/rss.xml`               | `src/pages/rss.xml.js`                  | XML endpoint    |
| `/404`                   | `src/pages/404.astro`                   | Static          |

Listing pages display newest-first by `pubDate` (articles) or by `status` then
date (projects), and exclude drafts in production.

---

## 2. File structure

```
.
├── CLAUDE.md
├── TECH_SPEC.md
├── README.md
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── package-lock.json
├── public/
│   ├── _redirects
│   ├── favicon.svg
│   └── robots.txt
└── src/
    ├── assets/
    │   ├── articles/         # hero/inline images for articles
    │   ├── projects/         # hero/inline images for projects
    │   ├── cv/               # any imagery for the CV page
    │   └── home/             # imagery for home page
    ├── components/
    │   ├── Nav.astro
    │   ├── Footer.astro
    │   ├── ArticleCard.astro
    │   ├── ProjectCard.astro
    │   └── ... (per design)
    ├── content/
    │   ├── articles/
    │   │   └── example-article.md
    │   └── projects/
    │       └── example-project.md
    ├── content.config.ts
    ├── data/
    │   ├── site.json
    │   ├── home.json
    │   ├── cv.json
    │   └── contact.json
    ├── layouts/
    │   ├── BaseLayout.astro       # html shell, head, nav, footer
    │   ├── ArticleLayout.astro    # wraps rendered article MD
    │   └── ProjectLayout.astro    # wraps rendered project MD
    ├── pages/
    │   ├── index.astro
    │   ├── 404.astro
    │   ├── cv.astro
    │   ├── contact.astro
    │   ├── rss.xml.js
    │   ├── articles/
    │   │   ├── index.astro
    │   │   └── [...slug].astro
    │   └── projects/
    │       ├── index.astro
    │       └── [...slug].astro
    └── styles/
        └── global.css
```

---

## 3. Content collections

`src/content.config.ts`:

```ts
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.md' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    heroImage: image().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    status: z.enum(['active', 'completed', 'archived']),
    techStack: z.array(z.string()).default([]),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    heroImage: image().optional(),
    draft: z.boolean().default(false),
  }),
});

const site = defineCollection({
  loader: file('src/data/site.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    author: z.string(),
    nav: z.array(z.object({
      label: z.string(),
      href: z.string(),
    })),
    footer: z.object({
      tagline: z.string().optional(),
      copyright: z.string(),
    }),
  }),
});

const home = defineCollection({
  loader: file('src/data/home.json'),
  schema: ({ image }) => z.object({
    id: z.string(),
    hero: z.object({
      heading: z.string(),
      subheading: z.string().optional(),
      image: image().optional(),
    }),
    intro: z.string().optional(),
    featuredArticles: z.array(z.string()).default([]),  // article IDs
    featuredProjects: z.array(z.string()).default([]),  // project IDs
  }),
});

const cv = defineCollection({
  loader: file('src/data/cv.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    headline: z.string(),
    location: z.string().optional(),
    summary: z.string(),
    experience: z.array(z.object({
      company: z.string(),
      role: z.string(),
      startDate: z.string(),       // 'YYYY-MM' format
      endDate: z.string().optional(), // omit or null for current
      location: z.string().optional(),
      highlights: z.array(z.string()),
    })),
    education: z.array(z.object({
      institution: z.string(),
      degree: z.string(),
      field: z.string().optional(),
      startDate: z.string(),
      endDate: z.string().optional(),
      notes: z.string().optional(),
    })),
    skills: z.array(z.object({
      category: z.string(),
      items: z.array(z.string()),
    })),
  }),
});

const contact = defineCollection({
  loader: file('src/data/contact.json'),
  schema: z.object({
    id: z.string(),
    heading: z.string(),
    blurb: z.string().optional(),
    email: z.string().email(),
    socials: z.array(z.object({
      platform: z.string(),
      url: z.string().url(),
      handle: z.string().optional(),
    })),
    links: z.array(z.object({
      label: z.string(),
      url: z.string().url(),
    })).default([]),
  }),
});

export const collections = { articles, projects, site, home, cv, contact };
```

---

## 4. JSON config examples

### `src/data/site.json`

```json
{
  "id": "site",
  "title": "Jack Kroninger",
  "description": "Personal site of Jack Kroninger — articles, projects, CV.",
  "author": "Jack Kroninger",
  "nav": [
    { "label": "Home", "href": "/" },
    { "label": "Articles", "href": "/articles" },
    { "label": "Projects", "href": "/projects" },
    { "label": "CV", "href": "/cv" },
    { "label": "Contact", "href": "/contact" }
  ],
  "footer": {
    "tagline": "Built with Astro. Hosted on Cloudflare Pages.",
    "copyright": "© Jack Kroninger"
  }
}
```

### `src/data/home.json`

```json
{
  "id": "home",
  "hero": {
    "heading": "Jack Kroninger",
    "subheading": "Engineer and writer",
    "image": "../assets/home/hero.jpg"
  },
  "intro": "Filler text. Replace with a short bio.",
  "featuredArticles": [],
  "featuredProjects": []
}
```

### `src/data/contact.json`

```json
{
  "id": "contact",
  "heading": "Get in touch",
  "blurb": "Best way to reach me is email. I read everything.",
  "email": "[email protected]",
  "socials": [
    { "platform": "GitHub", "url": "https://github.com/yourhandle", "handle": "@yourhandle" },
    { "platform": "LinkedIn", "url": "https://linkedin.com/in/yourhandle" }
  ],
  "links": []
}
```

### `src/data/cv.json`

Filler shape — fill with real values during content phase.

```json
{
  "id": "cv",
  "name": "Jack Kroninger",
  "headline": "Software engineer",
  "location": "Westminster, CO",
  "summary": "Filler summary.",
  "experience": [
    {
      "company": "Example Co.",
      "role": "Senior Engineer",
      "startDate": "2023-01",
      "highlights": ["Filler bullet."]
    }
  ],
  "education": [
    {
      "institution": "Example University",
      "degree": "B.S.",
      "field": "Computer Science",
      "startDate": "2017-08",
      "endDate": "2021-05"
    }
  ],
  "skills": [
    { "category": "Languages", "items": ["TypeScript", "Python"] }
  ]
}
```

---

## 5. Markdown frontmatter examples

### `src/content/articles/example-article.md`

```markdown
---
title: "Example Article"
description: "A one-sentence description used in listings and RSS."
pubDate: 2026-05-27
tags: [example, scaffolding]
draft: false
---

Article body in markdown. Use relative paths for inline images:

![alt text](../../assets/articles/example.png)
```

### `src/content/projects/example-project.md`

```markdown
---
title: "Example Project"
description: "What this project is, in one sentence."
pubDate: 2026-05-27
status: active
techStack: [Astro, TypeScript]
repoUrl: https://github.com/jackkroninger/example
draft: false
---

Project writeup in markdown.
```

---

## 6. Routing

### Listing pages

Filter drafts in production, sort by date descending:

```astro
---
import { getCollection } from 'astro:content';
const articles = await getCollection('articles', ({ data }) =>
  import.meta.env.PROD ? !data.draft : true
);
articles.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---
```

### Detail pages

Use `getStaticPaths` with the same draft filter so drafts have no URL in
production:

```astro
---
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const articles = await getCollection('articles', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true
  );
  return articles.map((article) => ({
    params: { slug: article.id },
    props: { article },
  }));
}

const { article } = Astro.props;
const { Content } = await render(article);
---
```

---

## 7. RSS feed

`src/pages/rss.xml.js`:

```js
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  articles.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Jack Kroninger',
    description: 'Articles by Jack Kroninger',
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      pubDate: article.data.pubDate,
      description: article.data.description,
      link: `/articles/${article.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
```

`BaseLayout.astro` `<head>` should include:

```html
<link
  rel="alternate"
  type="application/rss+xml"
  title="Jack Kroninger"
  href={new URL('rss.xml', Astro.site)}
/>
```

---

## 8. Styling

- Design tokens (colors, font stacks, spacing scale, radii) defined as CSS
  custom properties on `:root` in `src/styles/global.css`.
- `global.css` also contains element resets and base typography.
- `global.css` is imported once in `BaseLayout.astro`.
- Component-specific styles go in `<style>` blocks inside the `.astro` file
  (Astro scopes these automatically — equivalent to CSS modules).
- No CSS-in-JS, no Tailwind, no PostCSS plugins beyond what Astro ships with.

---

## 9. Image handling

- All optimizable images live in `src/assets/`.
- In `.astro` components, import the image and pass to `<Image />`:

  ```astro
  ---
  import { Image } from 'astro:assets';
  import hero from '../assets/home/hero.jpg';
  ---
  <Image src={hero} alt="..." widths={[400, 800, 1200]} />
  ```

- In markdown, reference with relative path: `![alt](../../assets/x.png)`. Astro
  processes these as build-time imports.
- In JSON config fields typed with `image()` in the schema, use a relative path
  string. Astro resolves it as an asset import.
- `public/` images are NOT optimized. Use only for favicons, `robots.txt`,
  `_redirects`, etc.

---

## 10. Build & deploy

### Local

```bash
npm install
npm run dev     # localhost:4321
npm run build   # output to ./dist
npm run preview # serve dist locally
npx astro check # type + content validation
```

### Cloudflare Pages

| Setting              | Value                  |
|----------------------|------------------------|
| Framework preset     | Astro                  |
| Build command        | `npm run build`        |
| Build output dir     | `dist`                 |
| Root directory       | `/`                    |
| `NODE_VERSION` env   | `22`                   |
| Build cache          | **Enabled**            |

Cloudflare auto-deploys `main` to production and any other branch to a preview
URL. PRs get a preview link as a check.

---

## 11. Custom domains

All three domains added in Pages → Custom Domains. Cloudflare auto-creates DNS
records since the zone is on the same account.

| Domain                  | Behavior                |
|-------------------------|-------------------------|
| `kroninger.dev`         | Canonical — serves site |
| `www.kroninger.dev`     | 301 → `kroninger.dev`   |
| `jack.kroninger.dev`    | 301 → `kroninger.dev`   |

`public/_redirects`:

```
https://www.kroninger.dev/*   https://kroninger.dev/:splat   301
https://jack.kroninger.dev/*  https://kroninger.dev/:splat   301
```

`astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kroninger.dev',
});
```

---

## 12. Dependencies

Pinned at project init (latest stable at time of scaffold):

- `astro` ^6
- `@astrojs/rss` ^4
- `typescript` ^5
- `@types/node` ^22

No other runtime dependencies should be added in v1 without explicit approval.

---

## 13. Out of scope for v1

- Contact form (currently info-only)
- Analytics
- Comments / discussion
- Newsletter signup
- Search
- Tags pages / tag filtering
- Pagination on listing pages
- Open Graph image generation
- Sitemap (can add `@astrojs/sitemap` later)
- Dark/light mode toggle (unless design specifies)

Add these only when explicitly requested in a follow-up task.
