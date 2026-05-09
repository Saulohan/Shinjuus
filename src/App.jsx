import React, { useMemo, useState } from "react";
import "./App.css";
import ShinjuCard from "./components/ShinjuCard.jsx";
import ShinjuModal from "./components/ShinjuModal.jsx";
import { CATEGORIAS } from "./data/categorias.js";
import { SHINJUS } from "./data/shinjus.js";

function slugCategoria(cat) {
  if (cat === "Lendárias") return "lendaria";
  if (cat === "Secundárias") return "secundaria";
  if (cat === "Anciãs") return "ancia";
  return "primaria";
}

export default function App() {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState(null);
  const [selecionada, setSelecionada] = useState(null);

  const filtradas = useMemo(() => {
    let list = SHINJUS;
    if (categoria) {
      list = list.filter((item) => item.categoria === categoria);
    }
    const term = query.trim().toLowerCase();
    if (!term) return list;
    return list.filter((item) =>
      `${item.nome} ${item.categoria} ${item.pedra} ${item.detalhes.join(" ")}`
        .toLowerCase()
        .includes(term)
    );
  }, [query, categoria]);

  return (
    <main className="app">
      <header className="app-header">
        <h1>Shinjus</h1>
        <p>Grimório de criaturas - Catálogo das shinjus.</p>
        <input
          className="search"
          placeholder="Buscar shinju..."
          aria-label="Buscar shinju"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="category-toolbar" role="group" aria-label="Filtrar por categoria">
          <button
            type="button"
            className={`category-btn${categoria === null ? " is-active" : ""}`}
            onClick={() => setCategoria(null)}
          >
            Todas
          </button>
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-btn category-btn--${slugCategoria(cat)}${
                categoria === cat ? " is-active" : ""
              }`}
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <section className="grid">
        {filtradas.map((item) => (
          <ShinjuCard key={item.id} shinju={item} onOpen={setSelecionada} />
        ))}
      </section>

      <ShinjuModal shinju={selecionada} onClose={() => setSelecionada(null)} />
    </main>
  );
}
