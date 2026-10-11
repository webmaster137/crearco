import { banosPagina, lugares } from "@/lib/content";

// Estimación del prototipo: un aparato por cada 9.000 m² (mínimo 6), repartido 50/50 hoy
// y 38/62 en la distribución sugerida. Es ilustrativa hasta verificar cada lugar en terreno.
function estimar(m2?: number) {
  const total = Math.max(6, Math.round((m2 || 90000) / 9000));
  const hoyH = Math.round(total * 0.5);
  const hoyM = total - hoyH;
  const idealM = Math.round(total * 0.62);
  const idealH = total - idealM;
  return { hoyH, hoyM, idealH, idealM, falta: idealM - hoyM };
}

export default function Lugares() {
  return (
    <section id="lugares" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="max-w-3xl text-[clamp(2rem,4.2vw,3.5rem)]">{banosPagina.lugares_titulo}</h2>
        <p className="mt-5 max-w-2xl text-lg text-muted">{banosPagina.lugares_texto}</p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {lugares.map((l) => {
            const e = estimar(l.area_m2);
            const filas: [string, string][] = [
              ["Área", l.area],
              ["Comercio", l.locales],
              ["Baños hoy (estimado)", `${e.hoyH} hombres, ${e.hoyM} mujeres`],
              ["Debería ser", `${e.idealH} hombres, ${e.idealM} mujeres`],
            ];
            return (
              <article key={l.slug} className="bg-white p-7">
                <p className="text-sm text-muted">{l.ciudad}</p>
                <h3 className="mb-5 mt-1 text-3xl">{l.nombre}</h3>
                <dl className="text-[0.95rem]">
                  {filas.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-line py-2">
                      <dt className="text-muted">{k}</dt>
                      <dd className="text-right font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                {e.falta > 0 && (
                  <p className="mt-4 font-semibold text-naranja">Faltan unos {e.falta} aparatos en el baño de mujeres</p>
                )}
                <p className={`mt-4 text-sm font-medium ${l.verificado ? "text-teal" : "text-naranja"}`}>
                  {l.verificado ? "Contexto verificado" : "Datos estimados"}
                </p>
              </article>
            );
          })}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-muted">{banosPagina.lugares_nota}</p>
      </div>
    </section>
  );
}
