/**
 * Cloudflare Image Transformations for remote images.
 *
 * Images served from `R2_IMAGE_HOST` (our Cloudflare R2 bucket's public custom
 * domain) are rewritten to go through that host's `/cdn-cgi/image/` endpoint,
 * which resizes and reformats them on the fly (`format=auto` -> AVIF/WebP) and
 * caches the result at Cloudflare's edge. Any *other* remote URL is left
 * untouched and hot-linked as-is.
 *
 * Transformations run on the R2 host (rather than the site apex) because it is
 * a proxied hostname on the same Cloudflare zone and is reachable independently
 * of whether the main site has been deployed. Requires "Transformations" to be
 * enabled on the Cloudflare zone.
 */

/** Public hostname of the R2 bucket. Change this if the bucket domain changes. */
export const R2_IMAGE_HOST = 'images.kroninger.dev';

/** Origin that serves the /cdn-cgi/image/ transform endpoint. */
const TRANSFORM_ORIGIN = `https://${R2_IMAGE_HOST}`;

/** True only for absolute URLs whose host is our R2 bucket. */
export function isTransformableImage(src: string): boolean {
  try {
    return new URL(src).host === R2_IMAGE_HOST;
  } catch {
    return false;
  }
}

interface TransformOptions {
  width?: number;
  quality?: number;
  format?: string;
}

/** Build a single Cloudflare image-transform URL for an R2-hosted `src`. */
export function cfImage(
  src: string,
  { width, quality = 80, format = 'auto' }: TransformOptions = {},
): string {
  const opts = [`format=${format}`, `quality=${quality}`, 'metadata=none'];
  if (width) opts.unshift(`width=${width}`);
  return `${TRANSFORM_ORIGIN}/cdn-cgi/image/${opts.join(',')}/${src}`;
}

/** Build a `srcset` string across the given widths. */
export function cfImageSrcset(src: string, widths: number[], quality = 80): string {
  return widths.map((w) => `${cfImage(src, { width: w, quality })} ${w}w`).join(', ');
}
