import { inicio } from "@/lib/content";

export default function Resultados() {
  const c = inicio.resultados;
  return (
    <section className="bg-lime py-24 text-teal-deep md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="max-w-3xl text-[clamp(2rem,4.2vw,3.5rem)]">{c.titulo}</h2>
        <dl className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {c.cifras.map((f) => (
            <div key={f.texto} className="border-t-2 border-teal-deep/80 pt-6">
              <dt className="font-display font-bold leading-none tracking-[-0.04em]">
                <span className="text-[clamp(3.6rem,7vw,6rem)]">{f.valor}</span>
              </dt>
              <dd className="mt-4 max-w-[22ch] text-lg leading-snug">
                {f.unidad && <span className="block font-display font-semibold">{f.unidad}</span>}
                {f.texto}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
