# src/assets/articles

Optimizable hero/cover and inline imagery for articles.

## Article cover (`heroImage`)

Add an image here, then set `heroImage` in the article's Markdown frontmatter
(path relative to the `.md` file) — each article already has a commented
example to uncomment:

```yaml
heroImage:
  src: ../../assets/articles/my-article.jpg   # local asset, OR a full https URL (external / Cloudflare R2)
  alt: "Describe the image for screen readers"
```

- Local files are optimized at build (`<Image>`); remote URLs pass through as
  a plain `<img>`. See the repo README "Images" section for serving from R2.
- Omit `heroImage` (or leave it commented) to use the striped placeholder.
- Cover ratio is **16:9**.

## Inline images

Reference with a relative path from Markdown so Astro optimizes them:
`![alt text](../../assets/articles/diagram.png)`.
