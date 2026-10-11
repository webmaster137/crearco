import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";
import logo from "@/assets/logo-horizontal-blanco.svg";
import Boton from "./Boton";
import { ajustes } from "@/lib/content";

const ENLACES = [
  { etiqueta: "Inicio", to: "/" },
  { etiqueta: "Qué hacemos", to: "/#que-hacemos" },
  { etiqueta: "Proyectos", to: "/#proyectos" },
  { etiqueta: "Nosotros", to: "/#nosotros" },
  { etiqueta: "Contacto", to: "/#contacto" },
  { etiqueta: "Baños Justos", to: "/banos" },
];

export default function Cabecera() {
  const [bajo, setBajo] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const { pathname } = useLocation();
  const sobreTeal = pathname === "/" && !bajo; // transparente solo sobre la portada

  useEffect(() => {
    const alScroll = () => setBajo(window.scrollY > 40);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  useEffect(() => setAbierto(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        sobreTeal && !abierto ? "bg-transparent" : "bg-teal shadow-[0_1px_0_rgba(255,255,255,0.08)]"
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-6 px-6">
        <Link to="/" aria-label={`${ajustes.nombre}, ir al inicio`} className="shrink-0">
          <img src={logo} alt={ajustes.nombre} className="h-9 w-auto" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {ENLACES.map((e) => (
            <Link
              key={e.to}
              to={e.to}
              className="font-display text-[0.95rem] font-medium text-white/90 underline decoration-transparent decoration-2 underline-offset-[9px] transition-[text-decoration-color] hover:decoration-lime"
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
          {abierto ? <X size={28} /> : <List size={28} />}
        </button>
      </div>

      {abierto && (
        <nav id="menu-movil" aria-label="Principal" className="border-t border-white/10 bg-teal px-6 pb-8 pt-4 lg:hidden">
          <ul className="flex flex-col">
            {ENLACES.map((e) => (
              <li key={e.to}>
                <Link to={e.to} className="block border-b border-white/10 py-3.5 font-display text-lg font-medium text-white">
                  {e.etiqueta}
                </Link>
              </li>
            ))}
          </ul>
          <Boton to="/#contacto" variante="lima" className="mt-6 w-full">
            Hablemos de tu proyecto
          </Boton>
        </nav>
      )}
    </header>
  );
}
