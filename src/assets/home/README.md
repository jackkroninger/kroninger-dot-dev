# src/assets/home

Optimizable imagery for the home page (e.g. the profile photo).

## Profile photo

Drop a file here, then point `hero.image.src` in `src/data/home.json` at it
(path relative to that JSON file) and set `alt`:

```json
"hero": {
  "heading": "Jack Kroninger",
  "image": {
    "src": "../assets/home/profile.jpg",
    "alt": "Portrait of Jack Kroninger"
  }
}
```

- `src` may instead be a **full https URL** (an external image, or one served
  from Cloudflare R2 — see the repo README "Images" section). Local files are
  optimized at build; remote URLs are passed through as-is.
- Leave `src` as `""` (or omit `image`) to fall back to the striped placeholder.
- Recommended portrait ratio: **4:5**.
