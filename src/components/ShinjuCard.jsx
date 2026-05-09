import React from "react";
import { categoriaSingular } from "../data/categorias.js";
import { onImagemEmbreveFallback } from "../utils/pedraImagem.js";

export default function ShinjuCard({ shinju, onOpen }) {
  const nomeArquivo = shinju.imagem.split("/").pop();
  const imagemCapa = `/Imagens/capa/${nomeArquivo}`;

  const catClass =
    shinju.categoria === "Lendárias"
      ? "lendaria"
      : shinju.categoria === "Secundárias"
        ? "secundaria"
        : shinju.categoria === "Anciãs"
          ? "ancia"
          : "primaria";

  return (
    <button className="card" type="button" onClick={() => onOpen(shinju)}>
      <span className={`card-categoria card-categoria--${catClass}`}>
        {categoriaSingular(shinju.categoria)}
      </span>
      <img src={imagemCapa} alt={shinju.nome} loading="lazy" onError={onImagemEmbreveFallback} />
      <h2>{shinju.nome}</h2>
      <p>{shinju.pedra}</p>
    </button>
  );
}
