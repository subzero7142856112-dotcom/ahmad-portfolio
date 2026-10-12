export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function absoluteUrl(path: string) {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  let normalized = path.startsWith("/") ? path : `/${path}`;
  // When the site URL already includes the base path (GitHub Pages) and the
  // given path was prefixed with it too, strip it to avoid a double prefix.
  if (basePath && base.endsWith(basePath) && normalized.startsWith(`${basePath}/`)) {
    normalized = normalized.slice(basePath.length) || "/";
  }
  return `${base}${normalized}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
