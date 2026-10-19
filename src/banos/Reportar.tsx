import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/** Botón flotante que lleva al formulario "Envíenos su espacio". Se esconde donde estorbaría. */
export default function Reportar({ oculto }: { oculto?: boolean }) {
  const [pasoPortada, setPasoPortada] = useState(false);
  const [enFormulario, setEnFormulario] = useState(false);

  useEffect(() => {
    const alScroll = () => setPasoPortada(window.scrollY > window.innerHeight * 0.7);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById("participa");
    if (!el) return;
    const obs = new IntersectionObserver((es) => es.forEach((e) => setEnFormulario(e.isIntersecting)), { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const escondido = oculto || !pasoPortada || enFormulario;
  return (
    <Link
      to="/banos#participa"
      tabIndex={escondido ? -1 : 0}
      aria-hidden={escondido}
      className={`fixed bottom-5 right-5 z-40 inline-flex h-12 items-center rounded-xl bg-lime px-6 font-display font-semibold text-teal-deep shadow-lg transition-all hover:bg-white ${
        escondido ? "pointer-events-none translate-y-4 opacity-0" : ""
      }`}
    >
      Envíenos su espacio
    </Link>
  );
}
