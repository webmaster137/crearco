import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePieVisible } from "@/components/MiniMenuBanometro";

/**
 * Botón "Envíenos su espacio": visible desde que se entra a la página.
 * En computador queda a la derecha, sobre la barra inferior; en celular, justo encima de ella.
 * Se esconde cuando ya se está viendo el formulario o el pie de página.
 */
export default function Reportar({ oculto }: { oculto?: boolean }) {
  const [enFormulario, setEnFormulario] = useState(false);
  const pieVisible = usePieVisible();

  useEffect(() => {
    const el = document.getElementById("participa");
    if (!el) return;
    const obs = new IntersectionObserver((es) => es.forEach((e) => setEnFormulario(e.isIntersecting)), { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const escondido = enFormulario || pieVisible;
  return (
    <Link
      to="/banos#participa"
      tabIndex={escondido ? -1 : 0}
      aria-hidden={escondido}
      className={`fixed bottom-[calc(3.75rem+env(safe-area-inset-bottom))] right-4 z-[45] inline-flex h-9 items-center rounded-lg bg-lime px-4 font-display text-sm font-semibold text-teal-deep shadow-md transition-all hover:bg-white md:bottom-[calc(0.375rem+env(safe-area-inset-bottom))] md:right-[max(1.5rem,calc((100%-80rem)/2+1.5rem))] md:shadow-none ${
        escondido ? "pointer-events-none opacity-0" : ""
      } ${oculto ? "max-md:pointer-events-none max-md:translate-y-4 max-md:opacity-0" : ""}`}
    >
      Envíenos su espacio
    </Link>
  );
}
