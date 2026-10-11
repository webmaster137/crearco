import { COLOR_PASOS } from "@/lib/ambitos";
import { inicio } from "@/lib/content";

/** Aquí sí hay una secuencia real, por eso los pasos van numerados y en el orden del arcoíris. */
export default function Proceso() {
  const c = inicio.proceso;
  return (
    <section id="incubadora" className="bg-teal-deep py-24 text-white md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <h2 className="text-[clamp(2rem,4.2vw,3.5rem)]">{c.titulo}</h2>
            <p className="mt-6 max-w-md text-lg text-white/70">{c.texto}</p>
          </div>
        </div>

        <ol className="md:col-span-7">
          {c.pasos.map((paso, i) => (
            <li key={paso.titulo} className="group relative grid grid-cols-[3.25rem_1fr] gap-x-5 border-t border-white/15 py-8 first:border-t-0 first:pt-0">
              <span
                className="absolute -left-4 top-8 hidden h-9 w-1.5 rounded-full group-first:top-0 md:block"
                style={{ background: COLOR_PASOS[i % COLOR_PASOS.length] }}
                aria-hidden="true"
              />
              <span className="font-display text-4xl font-semibold tabular-nums text-white/40">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-2xl md:text-[1.65rem]">{paso.titulo}</h3>
                <p className="mt-2 max-w-xl text-white/70">{paso.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
