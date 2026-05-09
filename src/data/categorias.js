/**
 * Categorias do bestiário (ordem dos filtros na UI).
 * Para criar uma nova categoria, acrescente o rótulo aqui e use o mesmo texto em `categoria` em cada shinju.
 */
export const CATEGORIAS = Object.freeze(["Primárias", "Secundárias", "Anciãs", "Lendárias"]);

/** Rótulo no cartão/modal (singular); filtros usam `CATEGORIAS` no plural. */
const PARA_SINGULAR = Object.freeze({
  Primárias: "Primária",
  Secundárias: "Secundária",
  Anciãs: "Anciã",
  Lendárias: "Lendária",
});

export function categoriaSingular(plural) {
  return PARA_SINGULAR[plural] ?? plural;
}
