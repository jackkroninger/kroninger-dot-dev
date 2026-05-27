/** Long form, e.g. "April 18, 2026". */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Short form for lists, e.g. "Apr 2026". */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}
