import { TrazoOnda } from "@/components/Onda";
import { banosPagina as c } from "@/lib/content";

const COLORES = ["#00a8e8", "#de883f", "#9bb83e"];

/** Las tres fuentes de evidencia, cada una con su estado real. */
export default function Evidencia() {
  return (
    <section id="evidencia" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="max-w-3xl text-[clamp(2rem,4.2vw,3.5rem)]">{c.evidencia_titulo}</h2>
        <p className="mt-5 max-w-2xl text-lg text-muted">{c.evidencia_texto}</p>

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {c.evidencia.map((e, i) => (
            <article key={e.titulo}>
              <TrazoOnda color={COLORES[i % COLORES.length]} />
              <h3 className="mt-5 text-3xl">{e.titulo}</h3>
              <p className="mt-4 text-muted">{e.texto}</p>
              <p className="mt-5 flex items-center gap-2 text-sm font-medium text-teal-deep">
                <span className="h-2 w-2 rounded-full" style={{ background: e.estado === "En curso" ? "#9bb83e" : "#e9bf1d" }} aria-hidden="true" />
                {e.estado}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-16 max-w-3xl border-t border-line pt-8 font-display text-xl leading-snug text-teal md:text-2xl">{c.evidencia_cierre}</p>
      </div>
    </section>
  );
}
