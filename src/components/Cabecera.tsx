import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";
import logo from "@/assets/logo-horizontal-blanco.svg";
import Boton from "./Boton";
import { ajustes } from "@/lib/content";

const ENLACES = [
  { etiqueta: "Inicio", to: "/", id: "inicio" },
  { etiqueta: "Qué hacemos", to: "/#que-hacemos", id: "que-hacemos" },
  { etiqueta: "Proyectos", to: "/#proyectos", id: "proyectos" },
  { etiqueta: "Nosotros", to: "/#nosotros", id: "nosotros" },
  { etiqueta: "Contacto", to: "/#contacto", id: "contacto" },
];
const IDS_SECCION = ENLACES.slice(1).map((e) => e.id);

/** Sección que se está leyendo. Fuera del inicio, las páginas de proyecto cuentan como "Proyectos". */
function useSeccionActiva(enInicio: boolean, enProyecto: boolean): string | null {
  const [activa, setActiva] = useState<string | null>(null);
  useEffect(() => {
    if (!enInicio) {
      setActiva(enProyecto ? "proyectos" : null);
      return;
    }
    const calcular = () => {
      let actual = "inicio";
      for (const id of IDS_SECCION) {
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
  }, [enInicio, enProyecto]);
  return activa;
}

export default function Cabecera() {
  const [bajo, setBajo] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const { pathname } = useLocation();
  const enInicio = pathname === "/";
  const activa = useSeccionActiva(enInicio, pathname.startsWith("/proyectos/") || pathname === "/banos");
  const sobreTeal = enInicio && !bajo; // transparente solo sobre la portada

  useEffect(() => {
    const alScroll = () => setBajo(window.scrollY > 40);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  useEffect(() => setAbierto(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        sobreTeal && !abierto ? "bg-transparent" : "bg-teal shadow-[0_1px_0_rgba(255,255,255,0.08)]"
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-6 px-6">
        <Link to="/" aria-label={`${ajustes.nombre}, ir al inicio`} className="shrink-0 transition-transform duration-300 hover:scale-[1.03]">
          <img src={logo} alt={ajustes.nombre} className="h-9 w-auto" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {ENLACES.map((e) => (
            <Link
              key={e.to}
              to={e.to}
              aria-current={activa === e.id ? "location" : undefined}
              className="nav-link py-2 font-display text-[0.95rem] font-medium text-white/85 transition-colors duration-200 hover:text-white"
            >
              {e.etiqueta}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Boton to="/#contacto" variante="lima" className="h-11">
            Hablemos de tu proyecto
          </Boton>
        </div>

        <button
          type="button"
          className="-mr-2 p-2 text-white lg:hidden"
          aria-expanded={abierto}
          aria-controls="menu-movil"
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
        <nav id="menu-movil" aria-label="Principal" className="menu-movil border-t border-white/10 bg-teal px-6 pb-8 pt-4 lg:hidden">
          <ul className="flex flex-col">
            {ENLACES.map((e, i) => (
              <li key={e.to} className="menu-item" style={{ animationDelay: `${50 + i * 45}ms` }}>
                <Link
                  to={e.to}
                  aria-current={activa === e.id ? "location" : undefined}
                  className="menu-link block border-b border-white/10 py-3.5 font-display text-lg font-medium text-white"
                >
                  {e.etiqueta}
                </Link>
              </li>
            ))}
          </ul>
          <div className="menu-item" style={{ animationDelay: `${50 + ENLACES.length * 45}ms` }}>
            <Boton to="/#contacto" variante="lima" className="mt-6 w-full">
              Hablemos de tu proyecto
            </Boton>
          </div>
        </nav>
      )}
    </header>
  );
}
