/**
 * Placeholder partilhado (capa, modal, pedra) e URL em `Imagens/Pedra/`.
 * Convenção do ficheiro: nome da shinju sem espaços + `.png`. Se não existir, o `onError` da `<img>` troca para `IMAGEM_EMBREVE`.
 */

import { publicAssetUrl } from "./publicAssetUrl.js";

export const IMAGEM_EMBREVE = publicAssetUrl("Imagens/FavIcon/embreve.png");

/** Troca `src` uma vez; evita loop se `embreve.png` falhar. */
export function onImagemEmbreveFallback(event) {
  const el = event.currentTarget;
  if (el.dataset.imagemFallback) return;
  el.dataset.imagemFallback = "1";
  el.src = IMAGEM_EMBREVE;
}

/** URL da pedra (tentativa de carregar; falha → `onImagemEmbreveFallback` na `<img>`). */
export function urlPedraImagem(nome) {
  const base = String(nome ?? "").replace(/\s+/g, "");
  if (!base) return IMAGEM_EMBREVE;
  return publicAssetUrl(`Imagens/Pedra/${base}.png`);
}
