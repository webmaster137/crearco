import { Link } from "react-router-dom";
import { CheckCircle } from "@phosphor-icons/react";
import Foto from "@/components/Foto";
import { BordeOnda } from "@/components/Onda";
import { colorDe } from "@/lib/ambitos";
import { inicio, proyectos, rutaProyecto, textoAmbitos } from "@/lib/content";

export default function Casos() {
  const c = inicio.casos;
  const casos = proyectos.filter((p) => p.destacado && p.tipo === "incubado").slice(0, 3);
  if (!casos.length) return null;

  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="max-w-3xl text-[clamp(2rem,4.2vw,3.5rem)]">{c.titulo}</h2>
        <p className="mt-6 max-w-2xl text-lg text-muted">{c.texto}</p>

        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {casos.map((p, i) => {
            const color = colorDe(p.ambitos);
            const datos: [string, string | undefined][] = [
              ["Convocatoria", p.convocatoria],
              ["Año", p.anio],
              ["Monto aprobado", p.monto],
              ["Rol de Creando Arcoíris", p.rol],
              ["Resultado", p.resultado],
            ];
            return (
              <article key={p.slug} className={i === 1 ? "md:mt-10" : i === 2 ? "md:mt-20" : ""}>
                <Link to={rutaProyecto(p)} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-line">
                    <Foto src={p.foto} alt={p.foto_alt} color={color} className="transition-transform duration-700 group-hover:scale-[1.03]" />
                    <BordeOnda color={color} />
                  </div>
                  <h3 className="mt-6 text-[1.6rem] leading-tight group-hover:underline group-hover:underline-offset-4">{p.titulo}</h3>
                </Link>
                {p.organizacion && <p className="mt-2 font-display font-medium text-teal">{p.organizacion}</p>}
                <p className="mt-1 text-sm text-muted">{textoAmbitos(p.ambitos)}</p>
                <p className="mt-4 flex items-center gap-2 font-medium text-teal-deep">
                  <CheckCircle size={22} weight="fill" style={{ color }} aria-hidden="true" />
                  Proyecto aprobado
                </p>
                <dl className="mt-4 space-y-3 text-[0.97rem]">
                  {datos.filter(([, v]) => v).map(([k, v]) => (
                    <div key={k} className="border-t border-line pt-3">
                      <dt className="text-sm text-muted">{k}</dt>
                      <dd className="font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
