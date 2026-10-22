import { useEffect, useState } from "react";
import Boton from "@/components/Boton";
import MiniMenuBanometro from "@/components/MiniMenuBanometro";
import Simulacion from "@/banos/Simulacion";
import Calculadora from "@/banos/Calculadora";
import Evidencia from "@/banos/Evidencia";
import Ciudades from "@/banos/Lugares";
import EnvieEspacio from "@/banos/EnvieEspacio";
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

const iniciales = (nombre: string) => {
  const p = nombre.trim().split(/\s+/);
  return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : "")).toUpperCase();
};
const FONDOS = ["#00a8e8", "#c0d66d", "#f2d96f"];

/** Título y descripción de la pestaña, para esta página. */
function useTituloPagina() {
  useEffect(() => {
    const anterior = document.title;
    document.title = `${c.nombre}: ${c.claim.charAt(0).toLowerCase()}${c.claim.slice(1)}`;
    return () => { document.title = anterior; };
  }, []);
}

export default function Banos() {
  const [simVisible, setSimVisible] = useState(false);
  useTituloPagina();

  return (
    <>
      <section className="bg-teal-deep pb-24 pt-32 text-white md:pb-28 md:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <p className="flex items-center gap-2.5 font-display text-base font-medium text-lime">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e9bf1d]" aria-hidden="true" />
            {c.estado_etiqueta}
          </p>
          <h1 className="mt-4 text-[clamp(3.6rem,11vw,8.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">{c.nombre}</h1>
          <p className="mt-5 max-w-3xl font-display text-[clamp(1.5rem,3.4vw,2.7rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white/90">{c.claim}</p>
          <p className="mt-6 max-w-2xl text-white/70">{c.estado_texto}</p>

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
        <div className="mx-auto max-w-7xl px-6 pt-14">
          <p className="font-display font-medium text-teal">{c.datos_titulo}</p>
        </div>
        <dl className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-6 md:grid-cols-3">
          {c.datos.map((d) => (
            <div key={d.texto} className="border-t-2 border-teal pt-5">
              <dt className="font-display text-5xl font-bold tracking-[-0.03em] text-teal">{d.valor}</dt>
              <dd className="mt-2 max-w-[28ch] text-muted">{d.texto}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Simulacion alVisible={setSimVisible} />
      <Calculadora />
      <Evidencia />
      <Ciudades />
      <EnvieEspacio />

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
        </div>
      </section>

      <section id="equipo" className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[clamp(2rem,4.2vw,3.5rem)]">{c.equipo_titulo}</h2>
          <p className="mt-4 text-lg text-muted">{c.equipo_texto}</p>
          <ul className="mt-12 grid gap-12 sm:grid-cols-3">
            {equipoBanos.map((p, i) => (
              <li key={p.slug}>
                {p.foto ? (
                  <img src={p.foto} alt={p.nombre} loading="lazy" className="h-32 w-32 rounded-full object-cover" />
                ) : (
                  <span
                    className="flex h-32 w-32 items-center justify-center rounded-full font-display text-3xl font-semibold text-teal-deep"
                    style={{ background: FONDOS[i % FONDOS.length] }}
                    aria-hidden="true"
                  >
                    {iniciales(p.nombre)}
                  </span>
                )}
                <p className="mt-5 font-display text-xl font-semibold leading-tight">{p.nombre}</p>
                {p.rol && <p className="mt-1 text-teal">{p.rol}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <MiniMenuBanometro />
      <Reportar oculto={simVisible} />
    </>
  );
}
