import { useState } from "react";
import { banosPagina } from "@/lib/content";

const TH = 90; // segundos por visita, hombres
const TM = 140; // segundos por visita, mujeres

function Campo({ id, etiqueta, valor, onCambio, max }: { id: string; etiqueta: string; valor: string; onCambio: (v: string) => void; max?: number }) {
  return (
    <div>
      <label htmlFor={id} className="font-display font-medium">{etiqueta}</label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={0}
        max={max}
        value={valor}
        onChange={(e) => onCambio(e.target.value)}
        className="mt-2 w-full rounded-lg border-[1.5px] border-line bg-white px-4 py-3 focus:border-teal focus:outline-none"
      />
    </div>
  );
}

function Plano({ h, m }: { h: number; m: number }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="img" aria-label={`${h} aparatos para hombres y ${m} para mujeres`}>
      {Array.from({ length: h }, (_, i) => (
        <span key={"h" + i} className="flex h-8 w-8 items-center justify-center rounded bg-teal font-display text-sm font-semibold text-white">H</span>
      ))}
      {Array.from({ length: m }, (_, i) => (
        <span key={"m" + i} className="flex h-8 w-8 items-center justify-center rounded bg-naranja font-display text-sm font-semibold text-white">M</span>
      ))}
    </div>
  );
}

export default function Calculadora() {
  const [aforo, setAforo] = useState("600");
  const [pct, setPct] = useState("55");
  const [ih, setIh] = useState("8");
  const [im, setIm] = useState("8");

  const A = Math.max(0, Number(aforo) || 0);
  const P = Math.min(100, Math.max(0, Number(pct) || 0)) / 100;
  const IH = Math.max(0, Math.round(Number(ih) || 0));
  const IM = Math.max(0, Math.round(Number(im) || 0));

  const wh = Math.round(((A * (1 - P) * TH) / Math.max(IH, 1)) / 60);
  const wm = Math.round(((A * P * TM) / Math.max(IM, 1)) / 60);
  const total = IH + IM;
  const den = (1 - P) * TH + P * TM;
  const idealM = den > 0 ? Math.round(total * ((P * TM) / den)) : 0;
  const idealH = total - idealM;

  const caja = (mal: boolean) =>
    `rounded-xl border-[1.5px] p-5 text-center ${mal ? "border-naranja" : "border-line"}`;

  return (
    <section id="calculadora" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="max-w-3xl text-[clamp(2rem,4.2vw,3.5rem)]">{banosPagina.calculadora_titulo}</h2>
        <p className="mt-5 max-w-2xl text-lg text-muted">{banosPagina.calculadora_texto}</p>

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <div className="grid gap-5 sm:grid-cols-2 md:col-span-5 md:grid-cols-1">
            <Campo id="aforo" etiqueta="Aforo (personas simultáneas)" valor={aforo} onCambio={setAforo} />
            <Campo id="pct" etiqueta="% de mujeres del público" valor={pct} onCambio={setPct} max={100} />
            <Campo id="ih" etiqueta="Aparatos actuales, baño hombres" valor={ih} onCambio={setIh} />
            <Campo id="im" etiqueta="Aparatos actuales, baño mujeres" valor={im} onCambio={setIm} />
          </div>

          <div className="md:col-span-7" aria-live="polite">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className={caja(wh > wm)}>
                <p className="font-display text-5xl font-bold tracking-[-0.03em]" style={{ color: wh > wm ? "#b85a16" : undefined }}>{wh} min</p>
                <p className="mt-1 text-muted">espera hombres</p>
              </div>
              <div className={caja(wm > wh)}>
                <p className="font-display text-5xl font-bold tracking-[-0.03em]" style={{ color: wm > wh ? "#b85a16" : undefined }}>{wm} min</p>
                <p className="mt-1 text-muted">espera mujeres</p>
              </div>
            </div>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="mb-3 text-base font-semibold text-muted">Así está hoy</h3>
                <Plano h={IH} m={IM} />
              </div>
              <div>
                <h3 className="mb-3 text-base font-semibold text-muted">Así debería ser</h3>
                <Plano h={idealH} m={idealM} />
              </div>
            </div>
            <p className="mt-4 flex flex-wrap gap-x-6 text-sm text-muted">
              <span>H = baño de hombres</span>
              <span>M = baño de mujeres</span>
            </p>

            <p className="mt-8 border-t border-line pt-6 text-lg">
              Hoy, las mujeres esperan <strong>{wm} min</strong> frente a <strong>{wh} min</strong> de los hombres.
              Redistribuyendo a <strong>{idealH} para hombres y {idealM} para mujeres</strong>, los tiempos se emparejan.
            </p>
            <p className="mt-4 text-sm text-muted">{banosPagina.calculadora_nota}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
