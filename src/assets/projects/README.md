# src/assets/projects

Optimizable hero/cover and thumbnail imagery for projects.

## Project cover / thumbnail (`heroImage`)

The same `heroImage` drives both the card thumbnail (projects index) and the
detail-page cover. Add an image here, then set `heroImage` in the project's
Markdown frontmatter (path relative to the `.md` file) — each project already
has a commented example to uncomment:

```yaml
heroImage:
  src: ../../assets/projects/my-project.jpg   # local asset, OR a full https URL (external / Cloudflare R2)
  alt: "Describe the image for screen readers"
```

- Local files are optimized at build (`<Image>`); remote URLs pass through as
  a plain `<img>`. See the repo README "Images" section for serving from R2.
- Omit `heroImage` (or leave it commented) to use the striped placeholder.
- Card thumbnails crop to **4:3**, detail covers to **16:9**.
