/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Static export — the site is deployed to GitHub Pages from ./out.
  output: "export",
  // Set NEXT_PUBLIC_BASE_PATH=/ahmad-portfolio when building for GitHub Pages
  // (see .github/workflows/deploy.yml). Empty for local builds.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
