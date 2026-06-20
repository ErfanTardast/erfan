const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://keyvanrice.ir';

export function assetPath(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  if (!basePath || path === basePath || path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}

export function absoluteAssetUrl(path: string): string {
  return new URL(assetPath(path), new URL(siteUrl).origin).toString();
}
