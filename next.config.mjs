/** @type {import('next').NextConfig} */
const isStatic = process.env.BUILD_TARGET === 'static';
const isGhPages = process.env.GITHUB_PAGES === 'true';
const repoBase = isGhPages ? '/erfan' : '';

const nextConfig = {
  reactStrictMode: true,
  output: isStatic ? 'export' : undefined,
  trailingSlash: isStatic ? true : false,
  basePath: repoBase || undefined,
  assetPrefix: repoBase || undefined,
  images: {
    // The storefront is statically exported and remote image hosts are not
    // reliably reachable from the local Next.js optimizer in this environment.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: repoBase,
  },
};

export default nextConfig;
