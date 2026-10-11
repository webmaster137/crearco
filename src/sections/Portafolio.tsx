import { useState } from "react";
import { Link } from "react-router-dom";
import Foto from "@/components/Foto";
import { BordeOnda } from "@/components/Onda";
import { colorDe } from "@/lib/ambitos";
import { etiquetaEstado, inicio, proyectos, rutaProyecto, textoAmbitos } from "@/lib/content";

type Filtro = "todos" | "propio" | "incubado";
const FILTROS: { id: Filtro; etiqueta: string }[] = [
  { id: "todos", etiqueta: "Todos" },
  { id: "propio", etiqueta: "Proyectos propios" },
  { id: "incubado", etiqueta: "Incubados" },
];

export default function Portafolio() {
  const c = inicio.portafolio;
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const lista = proyectos.filter((p) => filtro === "todos" || p.tipo === filtro);

  return (
    <section id="proyectos" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="text-[clamp(2rem,4.2vw,3.5rem)]">{c.titulo}</h2>
            <p className="mt-5 max-w-xl text-lg text-muted">{c.texto}</p>
          </div>
          <div role="tablist" aria-label="Filtrar proyectos" className="flex gap-6 border-b border-line">
            {FILTROS.map((f) => (
              <button
                key={f.id}
                role="tab"
                type="button"
                aria-selected={filtro === f.id}
                onClick={() => setFiltro(f.id)}
                className={`-mb-px border-b-[3px] pb-3 font-display font-semibold transition-colors ${
                  filtro === f.id ? "border-teal text-teal" : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {f.etiqueta}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((p) => {
            const color = colorDe(p.ambitos);
            return (
              <article key={p.slug}>
                <Link to={rutaProyecto(p)} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-line">
                    <Foto src={p.foto} alt={p.foto_alt} color={color} className="transition-transform duration-700 group-hover:scale-[1.03]" />
                    <BordeOnda color={color} />
                  </div>
                  <h3 className="mt-5 text-[1.35rem] leading-snug group-hover:underline group-hover:underline-offset-4">{p.titulo}</h3>
                </Link>
                {p.organizacion && <p className="mt-1.5 font-display font-medium text-teal">{p.organizacion}</p>}
                <p className="mt-1 text-sm text-muted">{textoAmbitos(p.ambitos)}</p>
                {p.estado !== "activo" && (
                  <p className="mt-2 flex items-center gap-2 text-sm font-medium text-teal-deep">
                    <span className="h-2 w-2 rounded-full" style={{ background: p.estado === "en-desarrollo" || p.estado === "por-ejecutar" ? "#e9bf1d" : color }} aria-hidden="true" />
                    {etiquetaEstado(p.estado)}
                  </p>
                )}
                {p.resumen && <p className="mt-3 line-clamp-3 text-[0.97rem] text-muted">{p.resumen}</p>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
