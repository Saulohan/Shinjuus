import React, { useEffect } from "react";
import { categoriaSingular } from "../data/categorias.js";
import { onImagemEmbreveFallback, urlPedraImagem } from "../utils/pedraImagem.js";
import { publicAssetUrl } from "../utils/publicAssetUrl.js";

export default function ShinjuModal({ shinju, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!shinju) return undefined;

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBody = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      Object.assign(body.style, prevBody);
      window.scrollTo(0, scrollY);
    };
  }, [shinju]);

  if (!shinju) return null;

  const pedraSrc = urlPedraImagem(shinju.nome);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <article className="modal" onClick={(event) => event.stopPropagation()}>
        <button className="close" type="button" onClick={onClose} aria-label="Fechar detalhes">
          x
        </button>
        <div className="modal-content">
          <header className="modal-hero">
            <figure className="modal-figure">
              <img
                src={publicAssetUrl(shinju.imagem)}
                alt={shinju.nome}
                loading="lazy"
                onError={onImagemEmbreveFallback}
              />
            </figure>
            <div className="modal-hero-meta">
              <p className="modal-categoria">{categoriaSingular(shinju.categoria)}</p>
              <h3>{shinju.nome}</h3>
              <div className="modal-pedra-line">
                <figure className="modal-pedra" aria-hidden="true">
                  <img src={pedraSrc} alt="" loading="lazy" onError={onImagemEmbreveFallback} />
                </figure>
                <strong className="modal-pedra-texto">{shinju.pedra}</strong>
              </div>
            </div>
          </header>
          <section className="modal-rules" aria-label="Regras e habilidades">
            <div className="details">
              {shinju.detalhes.map((linha, index) => (
                <p key={`${shinju.id}-${index}`}>{linha}</p>
              ))}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
