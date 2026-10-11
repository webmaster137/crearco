import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import Boton from "@/components/Boton";
import Foto from "@/components/Foto";
import { BordeOnda } from "@/components/Onda";
import { colorDe } from "@/lib/ambitos";
import { etiquetaEstado, proyectos, textoAmbitos } from "@/lib/content";
import NoEncontrada from "./NoEncontrada";

export default function Proyecto() {
  const { slug } = useParams();
  const p = proyectos.find((x) => x.slug === slug);
  if (!p) return <NoEncontrada />;

  const color = colorDe(p.ambitos);
  const secciones: [string, string | undefined][] = [
    ["El reto", p.reto],
    ["La idea", p.idea],
    ["Qué hicimos", p.que_hicimos],
    ["Cómo lo desarrollamos", p.como],
    ["Resultados", p.resultados],
  ];
  const llenas = secciones.filter(([, v]) => v);
  const datos: [string, string | undefined][] = [
    ["Organización aliada", p.organizacion],
    ["Convocatoria", p.convocatoria],
    ["Año", p.anio],
    ["Monto aprobado", p.monto],
    ["Rol de Creando Arcoíris", p.rol],
    ["Resultado", p.resultado],
  ];

  return (
    <article className="pb-24 pt-28 md:pt-36">
      <div className="mx-auto max-w-7xl px-6">
        <Link to="/#proyectos" className="inline-flex items-center gap-2 font-display font-medium text-teal hover:underline hover:underline-offset-4">
          <ArrowLeft size={20} aria-hidden="true" /> Volver al portafolio
        </Link>

        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <header className="md:col-span-6">
            <p className="font-display font-medium text-teal">{p.tipo === "propio" ? "Proyecto propio" : "Proyecto incubado"}</p>
            {p.estado !== "activo" && (
              <p className="mt-1 flex items-center gap-2 text-sm font-medium text-teal-deep">
                <span className="h-2 w-2 rounded-full" style={{ background: p.estado === "en-desarrollo" || p.estado === "por-ejecutar" ? "#e9bf1d" : color }} aria-hidden="true" />
                {etiquetaEstado(p.estado)}
              </p>
            )}
            <h1 className="mt-4 text-[clamp(2.1rem,4.6vw,3.8rem)] font-bold tracking-[-0.03em]">{p.titulo}</h1>
            <p className="mt-4 text-muted">{textoAmbitos(p.ambitos)}</p>
            {p.resumen && <p className="mt-6 max-w-xl text-lg">{p.resumen}</p>}
          </header>
          <div className="md:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-line">
              <Foto src={p.foto} alt={p.foto_alt} color={color} />
              <BordeOnda color={color} />
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            {llenas.length > 0 ? (
              llenas.map(([titulo, texto]) => (
                <section key={titulo} className="border-t border-line py-8 first:border-t-0 first:pt-0">
                  <h2 className="text-2xl md:text-3xl">{titulo}</h2>
                  <p className="mt-3 max-w-2xl whitespace-pre-line text-lg text-muted">{texto}</p>
                </section>
              ))
            ) : (
              <p className="max-w-xl text-lg text-muted">
                Estamos completando la ficha de este proyecto. Si quieres conocer más, escríbenos.
              </p>
            )}
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <dl className="space-y-4">
              {datos.filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="border-t border-line pt-4">
                  <dt className="text-sm text-muted">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <Boton to="/#contacto" variante="teal" className="mt-8">Hablemos de tu proyecto</Boton>
          </aside>
        </div>

        {p.galeria && p.galeria.length > 0 && (
          <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.galeria.map((src) => (
              <div key={src} className="aspect-[4/3] overflow-hidden rounded-2xl bg-line">
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
