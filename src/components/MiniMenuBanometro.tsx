import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { banosPagina as c } from "@/lib/content";

const ENLACES = [
  { etiqueta: "Cómo pasa", id: "como-pasa" },
  { etiqueta: "Evidencia", id: "evidencia" },
  { etiqueta: "Ciudades", id: "ciudades" },
  { etiqueta: "Equipo", id: "equipo" },
];
const IDS = ["como-pasa", "evidencia", "ciudades", "participa", "fuentes", "equipo"];

/** Sección que se está leyendo: la última cuyo borde superior ya pasó la barra. */
function useSeccionActiva(): string | null {
  const [activa, setActiva] = useState<string | null>(null);
  useEffect(() => {
    const calcular = () => {
      let actual: string | null = null;
      for (const id of IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) actual = id;
      }
      setActiva(actual);
    };
    calcular();
    window.addEventListener("scroll", calcular, { passive: true });
    window.addEventListener("resize", calcular);
    return () => {
      window.removeEventListener("scroll", calcular);
      window.removeEventListener("resize", calcular);
    };
  }, []);
  return activa;
}

/**
 * Mini menú para moverse por el sitio de Bañómetro. Queda pegado bajo la cabecera general de
 * CrearCo, que se mantiene arriba para poder navegar por el resto del sitio.
 */
export default function MiniMenuBanometro() {
  const activa = useSeccionActiva();
  return (
    <div className="mini-menu sticky top-[4.25rem] z-40 border-b border-white/10 bg-teal-deep">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-6 px-6">
        <Link to="/banos" className="shrink-0 font-display text-[1.05rem] font-bold tracking-[-0.02em] text-white">
          {c.nombre}
        </Link>

        <nav aria-label="Bañómetro" className="sin-barra -mr-6 flex min-w-0 flex-1 items-center justify-start gap-6 md:justify-end overflow-x-auto whitespace-nowrap pr-6 md:mr-0 md:flex-none md:gap-7 md:pr-0">
          {ENLACES.map((e) => (
            <Link
              key={e.id}
              to={`/banos#${e.id}`}
              aria-current={activa === e.id ? "location" : undefined}
              className="nav-link py-2 font-display text-[0.9rem] font-medium text-white/80 transition-colors duration-200 hover:text-white"
            >
              {e.etiqueta}
            </Link>
          ))}
        </nav>

        <Link
          to="/banos#participa"
          className="hidden h-9 shrink-0 items-center rounded-lg bg-lime px-4 font-display text-sm font-semibold text-teal-deep transition-colors hover:bg-white md:inline-flex"
        >
          Envíenos su espacio
        </Link>
      </div>
    </div>
  );
}
