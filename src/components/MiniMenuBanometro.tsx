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
 * CrearCo. A la derecha deja libre el lugar del botón flotante "Envíenos su espacio".
 */
export default function MiniMenuBanometro() {
  const activa = useSeccionActiva();
  return (
    <div className="mini-menu sticky top-[4.25rem] z-40 border-b border-white/10 bg-teal-deep">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-6 px-6">
        <Link to="/banos" className="hidden shrink-0 font-display text-[1.05rem] font-bold tracking-[-0.02em] text-white sm:block">
          {c.nombre}
        </Link>

        <nav
          aria-label="Bañómetro"
          className="sin-barra flex min-w-0 flex-1 items-center justify-between gap-4 overflow-x-auto whitespace-nowrap sm:flex-none sm:justify-end sm:gap-7 md:mr-48 md:overflow-visible"
        >
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
      </div>
    </div>
  );
}
