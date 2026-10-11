import { Binoculars, ListChecks, PencilRuler, Path, Plant } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import Boton from "@/components/Boton";
import { inicio } from "@/lib/content";

// Un solo set de íconos (Phosphor, duotono) en lugar de símbolos de texto.
const ICONOS: Record<string, Icon> = {
  diseno: PencilRuler,
  formulacion: ListChecks,
  oportunidades: Binoculars,
  incubacion: Plant,
  gestion: Path,
};

export default function Servicios() {
  const c = inicio.servicios;
  return (
    <section className="bg-teal py-24 text-white md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <h2 className="text-[clamp(2rem,4.2vw,3.5rem)]">{c.titulo}</h2>
            <p className="mt-6 max-w-md text-lg text-white/80">{c.texto}</p>
            <Boton to="/#contacto" variante="lima" className="mt-9">{c.boton}</Boton>
          </div>
        </div>

        <ul className="md:col-span-7">
          {c.lista.map((s) => {
            const Ico = ICONOS[s.icono] ?? PencilRuler;
            return (
              <li key={s.titulo} className="grid grid-cols-[3rem_1fr] gap-x-5 border-t border-white/20 py-7 first:border-t-0 first:pt-0">
                <Ico size={38} weight="duotone" className="text-lime" aria-hidden="true" />
                <div>
                  <h3 className="text-xl md:text-2xl">{s.titulo}</h3>
                  <p className="mt-1.5 max-w-xl text-white/75">{s.texto}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
