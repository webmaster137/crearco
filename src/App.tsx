import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Cabecera from "@/components/Cabecera";
import Pie from "@/components/Pie";
import Inicio from "@/pages/Inicio";
import Proyecto from "@/pages/Proyecto";
import Banos from "@/pages/Banos";
import NoEncontrada from "@/pages/NoEncontrada";

/** Lleva al ancla (#contacto, #proyectos…) o al inicio de la página al navegar. */
function Desplazamiento() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 60);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <a
        href="#contenido"
        className="fixed left-3 top-3 z-[60] -translate-y-20 rounded-lg bg-white px-4 py-2 font-display font-semibold text-teal-deep focus:translate-y-0"
      >
        Saltar al contenido
      </a>
      <Desplazamiento />
      <Cabecera />
      <main id="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/proyectos/:slug" element={<Proyecto />} />
          <Route path="/banos" element={<Banos />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <Pie />
    </>
  );
}
