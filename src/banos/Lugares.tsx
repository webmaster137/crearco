import { MapPin } from "@phosphor-icons/react";
import { banosPagina as c } from "@/lib/content";

/** Las tres ciudades del proyecto. Todavía no hay lugares auditados: se dice con claridad. */
export default function Ciudades() {
  return (
    <section id="ciudades" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="max-w-3xl text-[clamp(2rem,4.2vw,3.5rem)]">{c.ciudades_titulo}</h2>
        <p className="mt-5 max-w-2xl text-lg text-muted">{c.ciudades_texto}</p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {c.ciudades.map((ciudad) => (
            <article key={ciudad.nombre} className="bg-white p-8">
              <MapPin size={30} weight="duotone" className="text-teal" aria-hidden="true" />
              <h3 className="mt-5 text-4xl tracking-[-0.03em]">{ciudad.nombre}</h3>
              <p className="mt-4 text-muted">{ciudad.texto}</p>
              <p className="mt-6 flex items-center gap-2 text-sm font-medium text-teal-deep">
                <span className="h-2 w-2 rounded-full bg-[#e9bf1d]" aria-hidden="true" />
                {ciudad.estado}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-muted">{c.ciudades_nota}</p>
      </div>
    </section>
  );
}
