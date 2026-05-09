/** Prefixo do Vite (`base` no build); em dev costuma ser `/`. */
export function publicAssetUrl(path) {
  const p = String(path ?? "").replace(/^\//, "");
  const base = import.meta.env.BASE_URL;
  const prefix = base.endsWith("/") ? base : `${base}/`;
  return `${prefix}${p}`;
}
