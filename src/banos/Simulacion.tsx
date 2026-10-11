import { useEffect, useRef } from "react";
import { banosPagina } from "@/lib/content";
import { iniciarSimulacion } from "./simulacion";

export default function Simulacion({ alVisible }: { alVisible?: (v: boolean) => void }) {
  const seccion = useRef<HTMLDivElement>(null);
  const lienzo = useRef<HTMLCanvasElement>(null);
  const pasos = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const s = seccion.current;
    const c = lienzo.current;
    if (!s || !c) return;
    return iniciarSimulacion(c, s, pasos.current.filter(Boolean) as HTMLElement[], alVisible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sim" id="como-pasa" ref={seccion}>
      <div className="sim-sticky">
        <canvas
          ref={lienzo}
          className="sim-canvas"
          role="img"
          aria-label="Simulación vista desde arriba de un baño de hombres y uno de mujeres, con sus filas"
        />
      </div>
      <div className="sim-pasos">
        {banosPagina.pasos_simulacion.map((p, i) => (
          <div key={p.titulo} className="sim-paso" data-paso={i + 1} ref={(el) => { pasos.current[i] = el; }}>
            <div className="sim-tarjeta">
              <h3 className="text-2xl md:text-3xl">{p.titulo}</h3>
              <p className="mt-2 text-[0.97rem] text-white/80">{p.texto}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
