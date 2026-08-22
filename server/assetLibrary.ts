/** Shared constants and safe filename normalization for the managed ONYX asset library. */
export const MAX_ASSET_BYTES = 8 * 1024 * 1024;

export function sanitizeAssetName(filename: string): string {
  const normalized = filename
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);

  return normalized || "onyx-asset";
}
