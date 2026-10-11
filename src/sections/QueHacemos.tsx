import { Link } from "react-router-dom";
import { EnlaceTexto } from "@/components/Boton";
import { TrazoOnda } from "@/components/Onda";
import { colorDe } from "@/lib/ambitos";
import { inicio, proyectos, rutaProyecto, textoAmbitos } from "@/lib/content";

export default function QueHacemos() {
  const c = inicio.que_hacemos;
  const propios = proyectos.filter((p) => p.tipo === "propio");
  return (
    <section id="que-hacemos" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="max-w-3xl text-[clamp(2rem,4.2vw,3.5rem)]">{c.titulo}</h2>

        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-0 md:divide-x md:divide-line">
          <div className="md:pr-16">
            <TrazoOnda color="#9bb83e" />
            <h3 className="mt-5 text-3xl md:text-4xl">{c.creamos_titulo}</h3>
            <p className="mt-1 font-display font-medium text-teal">{c.creamos_subtitulo}</p>
            <p className="mt-5 max-w-lg text-muted">{c.creamos_texto}</p>

            <ul className="mt-9 divide-y divide-line border-y border-line">
              {propios.map((p) => (
                <li key={p.slug}>
                  <Link to={rutaProyecto(p)} className="group flex items-start gap-4 py-4">
                    <span className="mt-1 h-10 w-1.5 shrink-0 rounded-full" style={{ background: colorDe(p.ambitos) }} aria-hidden="true" />
                    <span>
                      <span className="block font-display font-semibold leading-snug group-hover:underline group-hover:underline-offset-4">{p.titulo}</span>
                      <span className="block text-sm text-muted">{textoAmbitos(p.ambitos)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <EnlaceTexto to="/#proyectos" className="text-teal">{c.creamos_enlace}</EnlaceTexto>
            </p>
          </div>

          <div className="md:pl-16">
            <TrazoOnda color="#00a8e8" />
            <h3 className="mt-5 text-3xl md:text-4xl">{c.incubamos_titulo}</h3>
            <p className="mt-1 font-display font-medium text-teal">{c.incubamos_subtitulo}</p>
            <p className="mt-5 max-w-lg text-muted">{c.incubamos_texto}</p>

            <p className="mt-9 max-w-md font-display text-[1.7rem] font-semibold leading-[1.15] tracking-[-0.02em] text-teal md:text-[2rem]">
              {c.incubamos_destacado}
            </p>
            <p className="mt-3 max-w-md text-muted">{c.incubamos_destacado_texto}</p>
            <p className="mt-8">
              <EnlaceTexto to="/#incubadora" className="text-teal">{c.incubamos_enlace}</EnlaceTexto>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
