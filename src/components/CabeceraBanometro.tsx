import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";
import Boton from "./Boton";
import { banosPagina as c } from "@/lib/content";

const ENLACES = [
  { etiqueta: "Cómo pasa", id: "como-pasa" },
  { etiqueta: "Evidencia", id: "evidencia" },
  { etiqueta: "Arquitectura", id: "arquitectura" },
  { etiqueta: "Ciudades", id: "ciudades" },
  { etiqueta: "Equipo", id: "equipo" },
];
const IDS = [...ENLACES.map((e) => e.id), "participa"];

/** Sección que se está leyendo: la última cuyo borde superior ya pasó la cabecera. */
function useSeccionActiva(): string | null {
  const [activa, setActiva] = useState<string | null>(null);
  useEffect(() => {
    const calcular = () => {
      let actual: string | null = null;
      for (const id of IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) actual = id;
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

/** Cabecera de la página de Bañómetro: el nombre y el lema siempre a la vista. */
export default function CabeceraBanometro() {
  const [abierto, setAbierto] = useState(false);
  const { hash } = useLocation();
  const activa = useSeccionActiva();

  useEffect(() => setAbierto(false), [hash]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-teal-deep">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-6 px-6">
        <Link to="/banos" aria-label={`${c.nombre}, ir al inicio`} className="min-w-0 shrink">
          <span className="block font-display text-[1.45rem] font-bold leading-none tracking-[-0.03em] text-white">{c.nombre}</span>
          <span className="mt-1 block max-w-[16rem] text-balance text-[0.7rem] leading-snug text-white/65 sm:max-w-none sm:text-[0.74rem]">{c.claim}</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 xl:flex">
          {ENLACES.map((e) => (
            <Link
              key={e.id}
              to={`/banos#${e.id}`}
              aria-current={activa === e.id ? "location" : undefined}
              className="nav-link py-2 font-display text-[0.95rem] font-medium text-white/85 transition-colors duration-200 hover:text-white"
            >
              {e.etiqueta}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:block">
          <Boton to="/banos#participa" variante="lima" className="h-11">Envíenos su espacio</Boton>
        </div>

        <button
          type="button"
          className="-mr-2 shrink-0 p-2 text-white xl:hidden"
          aria-expanded={abierto}
          aria-controls="menu-banometro"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setAbierto((v) => !v)}
        >
          <span className="relative block h-7 w-7">
            <List size={28} className={`absolute inset-0 transition-all duration-300 ${abierto ? "rotate-90 opacity-0" : "opacity-100"}`} />
            <X size={28} className={`absolute inset-0 transition-all duration-300 ${abierto ? "opacity-100" : "-rotate-90 opacity-0"}`} />
          </span>
        </button>
      </div>

      {abierto && (
        <nav id="menu-banometro" aria-label="Principal" className="menu-movil border-t border-white/10 bg-teal-deep px-6 pb-8 pt-4 xl:hidden">
          <ul className="flex flex-col">
            {ENLACES.map((e, i) => (
              <li key={e.id} className="menu-item" style={{ animationDelay: `${50 + i * 45}ms` }}>
                <Link
                  to={`/banos#${e.id}`}
                  aria-current={activa === e.id ? "location" : undefined}
                  className="menu-link block border-b border-white/10 py-3.5 font-display text-lg font-medium text-white"
                >
                  {e.etiqueta}
                </Link>
              </li>
            ))}
          </ul>
          <div className="menu-item" style={{ animationDelay: `${50 + ENLACES.length * 45}ms` }}>
            <Boton to="/banos#participa" variante="lima" className="mt-6 w-full">Envíenos su espacio</Boton>
          </div>
        </nav>
      )}
    </header>
  );
}
