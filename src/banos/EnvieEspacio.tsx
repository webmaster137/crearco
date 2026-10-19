import { useEffect, useRef, useState } from "react";
import { Camera, CheckCircle, Hammer, ShieldCheck, X } from "@phosphor-icons/react";
import Boton from "@/components/Boton";
import { banosPagina as c } from "@/lib/content";

const CIUDADES = ["Bogotá", "Armenia", "Pereira", "Otra ciudad"];
const ESPERAS = ["Menos de 2 minutos", "De 2 a 5 minutos", "De 5 a 10 minutos", "Más de 10 minutos"];
const entrada = "mt-2 w-full rounded-lg border-[1.5px] border-line bg-white px-4 py-3 focus:border-teal focus:outline-none";

function Opciones({ nombre, etiqueta, opciones, columnas = "grid-cols-3" }: { nombre: string; etiqueta: string; opciones: string[]; columnas?: string }) {
  const [valor, setValor] = useState("");
  return (
    <fieldset>
      <legend className="font-display font-medium">{etiqueta}</legend>
      <div className={`mt-2 grid gap-2 ${columnas}`}>
        {opciones.map((o) => (
          <label
            key={o}
            className={`cursor-pointer rounded-lg border-[1.5px] px-3 py-3 text-center font-display font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-sky ${
              valor === o ? "border-teal bg-teal text-white" : "border-line bg-white hover:border-teal"
            }`}
          >
            <input type="radio" name={nombre} value={o} required checked={valor === o} onChange={() => setValor(o)} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * Formulario de demostración: se ve y se comporta como el definitivo, pero no envía nada.
 * Cuando exista la base de datos, este es el formulario que se conecta.
 */
export default function EnvieEspacio() {
  const [enviado, setEnviado] = useState(false);
  const [fotos, setFotos] = useState<{ nombre: string; url: string }[]>([]);
  const urls = useRef<string[]>([]);

  useEffect(() => () => urls.current.forEach((u) => URL.revokeObjectURL(u)), []);

  function alElegir(e: React.ChangeEvent<HTMLInputElement>) {
    const nuevos = Array.from(e.target.files ?? []).map((f) => {
      const url = URL.createObjectURL(f);
      urls.current.push(url);
      return { nombre: f.name, url };
    });
    setFotos((prev) => [...prev, ...nuevos].slice(0, 3));
    e.target.value = "";
  }

  return (
    <section id="participa" className="bg-teal-deep py-24 text-white md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="text-[clamp(2rem,4.2vw,3.5rem)]">{c.participa_titulo}</h2>
          <p className="mt-6 max-w-md text-lg text-white/75">{c.participa_texto}</p>

          <div className="mt-10 space-y-5 border-t border-white/20 pt-6 text-white/80">
            <p>{c.participa_publico}</p>
            <p>{c.participa_privado}</p>
          </div>

          <h3 className="mt-10 text-xl">{c.participa_pasos_titulo}</h3>
          <ol className="mt-4 space-y-3">
            {c.participa_pasos.map((paso, i) => (
              <li key={paso} className="grid grid-cols-[2rem_1fr] items-baseline text-white/80">
                <span className="font-display text-lg font-semibold tabular-nums text-lime">{i + 1}</span>
                <span>{paso}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="md:col-span-7">
          <div className="rounded-2xl bg-paper p-6 text-ink md:p-8">
            <div role="note" className="flex gap-3 rounded-lg border border-[#e9bf1d] bg-[#fdf3c7] px-4 py-3 text-teal-deep">
              <Hammer size={24} weight="duotone" className="mt-0.5 shrink-0" aria-hidden="true" />
              <p>
                <strong className="font-display">{c.participa_aviso_titulo}.</strong> {c.participa_aviso_texto}
              </p>
            </div>

            {enviado ? (
              <div role="status" className="py-10">
                <CheckCircle size={44} weight="duotone" className="text-teal" aria-hidden="true" />
                <h3 className="mt-4 text-3xl">{c.participa_exito_titulo}</h3>
                <p className="mt-3 max-w-lg text-muted">{c.participa_exito_texto}</p>
                <Boton variante="contorno" onClick={() => { setEnviado(false); setFotos([]); }} className="mt-8">
                  Volver al formulario
                </Boton>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setEnviado(true); }}
                className="mt-6 space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="e-ciudad" className="font-display font-medium">Ciudad</label>
                    <select id="e-ciudad" name="ciudad" required defaultValue="" className={entrada}>
                      <option value="" disabled>Elija una ciudad</option>
                      {CIUDADES.map((x) => <option key={x}>{x}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="e-barrio" className="font-display font-medium">Barrio o dirección</label>
                    <input id="e-barrio" name="barrio" type="text" className={entrada} />
                  </div>
                </div>

                <div>
                  <label htmlFor="e-lugar" className="font-display font-medium">Nombre del espacio</label>
                  <input id="e-lugar" name="lugar" type="text" required placeholder="Centro comercial, universidad, terminal, oficina…" className={entrada} />
                </div>

                <Opciones nombre="tipo" etiqueta="Tipo de espacio" opciones={["Público", "Privado"]} columnas="grid-cols-2" />
                <Opciones nombre="bano" etiqueta="¿Qué baño usó?" opciones={["Mujeres", "Hombres", "Ambos"]} />
                <Opciones nombre="fila" etiqueta="¿Cómo estaba la fila?" opciones={["Larga", "Media", "Corta"]} />

                <div>
                  <label htmlFor="e-espera" className="font-display font-medium">¿Cuánto esperó?</label>
                  <select id="e-espera" name="espera" defaultValue="" className={entrada}>
                    <option value="" disabled>Elija una opción</option>
                    {ESPERAS.map((x) => <option key={x}>{x}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="e-comentario" className="font-display font-medium">Comentario <span className="font-normal text-muted">(opcional)</span></label>
                  <textarea id="e-comentario" name="comentario" rows={3} className={`${entrada} resize-y`} />
                </div>

                <div>
                  <p className="font-display font-medium">Fotos <span className="font-normal text-muted">(opcional, hasta 3)</span></p>
                  <p className="mt-1 text-sm text-muted">Solo de los aparatos y la señalización. Sin personas.</p>
                  <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-lg border-[1.5px] border-dashed border-line bg-white px-4 py-6 font-display font-medium text-teal transition-colors hover:border-teal has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-sky">
                    <Camera size={24} weight="duotone" aria-hidden="true" />
                    Elegir fotos
                    <input type="file" accept="image/*" multiple className="sr-only" onChange={alElegir} disabled={fotos.length >= 3} />
                  </label>
                  {fotos.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-3">
                      {fotos.map((f, i) => (
                        <li key={f.url} className="relative h-20 w-20 overflow-hidden rounded-lg bg-line">
                          <img src={f.url} alt={`Foto elegida: ${f.nombre}`} className="h-full w-full object-cover" />
                          <button
                            type="button"
                            aria-label={`Quitar ${f.nombre}`}
                            onClick={() => setFotos((prev) => prev.filter((_, j) => j !== i))}
                            className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-teal-deep/85 text-white"
                          >
                            <X size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex items-center gap-4 rounded-lg border border-line bg-white px-4 py-3" aria-label="Aquí irá la verificación anti-spam">
                  <ShieldCheck size={28} weight="duotone" className="shrink-0 text-teal" aria-hidden="true" />
                  <p className="text-sm text-muted">
                    <span className="font-display font-medium text-ink">Verificación de persona.</span> Aquí irá el portero anti-spam (Turnstile), que no pide descifrar imágenes.
                  </p>
                </div>

                <label className="flex cursor-pointer items-start gap-3 text-[0.97rem]">
                  <input type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-[#12596a]" />
                  <span>Entiendo que mi envío será revisado por el equipo antes de publicarse.</span>
                </label>

                <Boton type="submit" variante="teal" className="w-full sm:w-auto">Enviar mi espacio</Boton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
