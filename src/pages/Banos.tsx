import { useState } from "react";
import { Link } from "react-router-dom";
import Boton from "@/components/Boton";
import Simulacion from "@/banos/Simulacion";
import Calculadora from "@/banos/Calculadora";
import Lugares from "@/banos/Lugares";
import Reportar from "@/banos/Reportar";
import { banosPagina as c, equipoBanos, fuentes } from "@/lib/content";

function ColaDemo() {
  const punto = (color: string, n: number) =>
    Array.from({ length: n }, (_, i) => <i key={i} className="fila-punto block h-3.5 w-3.5 rounded-full" style={{ background: color }} />);
  return (
    <div className="w-full max-w-xs rounded-2xl border border-white/20 bg-white/[0.06] p-6" aria-hidden="true">
      <p className="font-display text-sm text-white/70">Sábado, 3:05 p. m.</p>
      <div className="mt-4 grid grid-cols-2 items-end gap-4">
        <div>
          <div className="flex min-h-40 flex-col-reverse items-center gap-1.5">{punto("#7fc6d6", 2)}</div>
          <p className="mt-3 text-center font-display font-semibold">Hombres</p>
          <p className="text-center text-xs text-white/60">2 en fila</p>
        </div>
        <div>
          <div className="flex min-h-40 flex-col-reverse items-center gap-1.5">{punto("#f0a566", 11)}</div>
          <p className="mt-3 text-center font-display font-semibold">Mujeres</p>
          <p className="text-center text-xs text-white/60">11 en fila</p>
        </div>
      </div>
    </div>
  );
}

export default function Banos() {
  const [simVisible, setSimVisible] = useState(false);

  return (
    <>
      <section className="bg-teal-deep pb-24 pt-32 text-white md:pb-28 md:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-display font-medium text-lime">
            Un proyecto de <Link to="/" className="underline underline-offset-4">Creando Arcoíris</Link>
          </p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,6vw,5.2rem)] font-bold leading-[1.02] tracking-[-0.03em]">{c.titulo}</h1>

          <div className="mt-14 grid items-center gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="font-display text-[clamp(3.2rem,6vw,4.6rem)] font-bold leading-none tracking-[-0.03em] text-lime">{c.dato_grande}</p>
              <p className="mt-3 max-w-xs text-lg text-white/80">{c.dato_grande_texto}</p>
            </div>
            <div className="md:col-span-4">
              <p className="max-w-sm text-lg text-white/80">{c.intro}</p>
              <Boton href="#como-pasa" variante="lima" className="mt-7">{c.boton_intro}</Boton>
            </div>
            <div className="md:col-span-4 md:justify-self-end"><ColaDemo /></div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <dl className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
          {c.datos.map((d) => (
            <div key={d.valor} className="border-t-2 border-teal pt-5">
              <dt className="font-display text-5xl font-bold tracking-[-0.03em] text-teal">{d.valor}</dt>
              <dd className="mt-2 max-w-[26ch] text-muted">{d.texto}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Simulacion alVisible={setSimVisible} />
      <Calculadora />
      <Lugares />

      <section id="reportar" className="bg-teal-deep py-24 text-white md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[clamp(2rem,4.2vw,3.5rem)]">{c.reportar_titulo}</h2>
          <p className="mt-5 max-w-2xl text-lg text-white/75">{c.reportar_texto}</p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="border-t border-white/20 pt-5"><p className="max-w-md text-white/85">{c.reportar_publico}</p></div>
            <div className="border-t border-white/20 pt-5"><p className="max-w-md text-white/85">{c.reportar_privado}</p></div>
          </div>
          <p className="mt-8 max-w-2xl text-sm text-white/60">{c.reportar_nota}</p>
        </div>
      </section>

      <section id="fuentes" className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[clamp(2rem,4.2vw,3.5rem)]">{c.bibliografia_titulo}</h2>
          <p className="mt-5 max-w-2xl text-lg text-muted">{c.bibliografia_texto}</p>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {fuentes.map((f) => (
              <li key={f.slug} className="py-5">
                <p className="font-display text-lg font-semibold">
                  {f.enlace ? <a href={f.enlace} className="underline decoration-teal/40 underline-offset-4 hover:decoration-teal" rel="noopener">{f.titulo}</a> : f.titulo}
                </p>
                {f.detalle && <p className="mt-1 text-muted">{f.detalle}</p>}
              </li>
            ))}
          </ul>

          <h2 className="mt-24 text-[clamp(1.8rem,3.4vw,2.8rem)]">{c.equipo_titulo}</h2>
          <p className="mt-4 text-lg text-muted">{c.equipo_texto}</p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {equipoBanos.map((p) => (
              <li key={p.slug} className="border-t border-line pt-5">
                <p className="font-display text-xl font-semibold">{p.nombre}</p>
                {p.rol && <p className="text-teal">{p.rol}</p>}
              </li>
            ))}
          </ul>
          <p className="mt-16 text-sm text-muted">{c.pie_nota}</p>
        </div>
      </section>

      <Reportar oculto={simVisible} />
    </>
  );
}
