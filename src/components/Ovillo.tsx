import { useId } from "react";
import { BANDAS } from "@/lib/ambitos";

/**
 * Círculo de bandas onduladas: es el ovillo del logo, dibujado como forma.
 * Se usa una sola vez a gran tamaño (portada) y como acento mínimo en otros sitios.
 */
export default function Ovillo({
  colores = BANDAS,
  className = "",
  style,
}: {
  colores?: string[];
  className?: string;
  style?: React.CSSProperties;
}) {
  const id = useId();
  const n = colores.length;
  const alto = 112 / n;
  const onda = (x: number, i: number) => i * alto - 6 + 4.5 * Math.sin((x / 100) * Math.PI * 2 + i * 0.75);

  const bandas = colores.map((color, i) => {
    const puntos: string[] = [];
    for (let x = 0; x <= 100; x += 4) puntos.push(`${x},${onda(x, i).toFixed(2)}`);
    return <path key={i} d={`M${puntos.join(" L")} L100,120 L0,120 Z`} fill={color} />;
  });

  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={id}>
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>{bandas}</g>
    </svg>
  );
}
