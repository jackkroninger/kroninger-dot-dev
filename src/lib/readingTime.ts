/**
 * Estimate reading time from a Markdown body string.
 * Strips frontmatter and common Markdown syntax, then assumes 200 wpm.
 * Returns a label like "9 min" (minimum 1).
 */
export function readingTime(body: string | undefined): string {
  if (!body) return '1 min';
  const text = body
    .replace(/^---[\s\S]*?---/, '') // frontmatter, if present
    .replace(/`{1,3}[^`]*`{1,3}/g, ' ') // code
    .replace(/[#>*_~\-]/g, ' ') // markdown punctuation
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1'); // links -> text
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}
