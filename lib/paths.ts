/**
 * Base path for the deployed site (e.g. "/ahmad-portfolio" on GitHub Pages).
 * Inlined at build time from NEXT_PUBLIC_BASE_PATH — empty for local dev.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a root-relative public asset path (`/cv/file.pdf`) with the deploy
 * base path so `public/` files resolve correctly when the site is served from
 * a sub-path. Absolute and protocol-relative URLs pass through untouched.
 */
export function asset(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${basePath}${path}`;
}
