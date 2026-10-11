import { equipo, inicio } from "@/lib/content";
import Foto from "@/components/Foto";

export default function Nosotros() {
  const c = inicio.nosotros;
  return (
    <section id="nosotros" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <h2 className="text-[clamp(2rem,4.2vw,3.5rem)]">{c.titulo}</h2>
            <p className="mt-6 max-w-xl text-lg text-muted">{c.texto}</p>
            <div className="mt-10 aspect-[4/3] overflow-hidden rounded-2xl bg-line">
              <img src={c.foto} alt={c.foto_alt} loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>

          <dl className="md:col-span-5 md:col-start-8">
            {c.conceptos.map((k) => (
              <div key={k.titulo} className="border-t border-line py-8 first:border-t-0 first:pt-0">
                <dt className="font-display text-4xl font-semibold tracking-[-0.03em] text-teal md:text-5xl">{k.titulo}</dt>
                <dd className="mt-3 max-w-md text-muted">{k.texto}</dd>
              </div>
            ))}
          </dl>
        </div>

        {equipo.length > 0 && (
          <div className="mt-24">
            <h3 className="text-3xl md:text-4xl">{c.equipo_titulo}</h3>
            <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {equipo.map((p) => (
                <li key={p.slug}>
                  <div className="aspect-square w-40 overflow-hidden rounded-full bg-line">
                    <Foto src={p.foto} alt={p.nombre} color="#12596a" />
                  </div>
                  <p className="mt-5 font-display text-xl font-semibold">{p.nombre}</p>
                  {p.rol && <p className="text-teal">{p.rol}</p>}
                  {p.perfil && <p className="mt-2 text-[0.97rem] text-muted">{p.perfil}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
