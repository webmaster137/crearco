/** Trazo ondulado corto: marca el tipo de contenido (por color) sin ser un adorno suelto. */
export function TrazoOnda({ color, className = "" }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 72 12" className={className} width="72" height="12" aria-hidden="true" focusable="false">
      <path
        d="M2 6 Q11 0 20 6 T38 6 T56 6 T70 6"
        fill="none"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Borde inferior ondulado de las fotos: el color es el del ámbito del proyecto. */
export function BordeOnda({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 400 20"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 block h-3.5 w-full"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 10 Q50 -2 100 10 T200 10 T300 10 T400 10 V20 H0 Z" fill={color} />
    </svg>
  );
}
