import { useEffect, useRef, useState } from "react";
import { CheckCircle, X } from "@phosphor-icons/react";
import Boton from "@/components/Boton";

type Estado = "libre" | "enviando" | "enviado" | "error";

function Opciones({ nombre, etiqueta, opciones, valor, onCambio }: { nombre: string; etiqueta: string; opciones: string[]; valor: string; onCambio: (v: string) => void }) {
  return (
    <fieldset className="mt-6">
      <legend className="font-display font-medium">{etiqueta}</legend>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {opciones.map((o) => (
          <label key={o} className={`cursor-pointer rounded-lg border-[1.5px] px-3 py-3 text-center font-display font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-sky ${valor === o ? "border-teal bg-teal text-white" : "border-line hover:border-teal"}`}>
            <input type="radio" name={nombre} value={o} checked={valor === o} onChange={() => onCambio(o)} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Reporte rápido: los envíos llegan a Netlify Forms (panel de Netlify > Forms > reporte). */
export default function Reportar({ oculto }: { oculto?: boolean }) {
  const [abierto, setAbierto] = useState(false);
  const [estado, setEstado] = useState<Estado>("libre");
  const [lugar, setLugar] = useState("");
  const [fila, setFila] = useState("");
  const [bano, setBano] = useState("");
  const cerrar = useRef<HTMLButtonElement>(null);
  const [pasoPortada, setPasoPortada] = useState(false);

  // El botón aparece al salir de la portada, para no tapar su contenido.
  useEffect(() => {
    const alScroll = () => setPasoPortada(window.scrollY > window.innerHeight * 0.7);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);
  const escondido = oculto || !pasoPortada;

  useEffect(() => {
    if (!abierto) return;
    cerrar.current?.focus();
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [abierto]);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEstado("enviando");
    try {
      const r = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": "reporte", lugar, fila, bano }).toString(),
      });
      setEstado(r.ok ? "enviado" : "error");
    } catch {
      setEstado("error");
    }
  }

  function cerrarTodo() {
    setAbierto(false);
    if (estado === "enviado") { setEstado("libre"); setLugar(""); setFila(""); setBano(""); }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className={`fixed bottom-5 right-5 z-40 h-12 rounded-xl bg-lime px-6 font-display font-semibold text-teal-deep shadow-lg transition-all hover:bg-white ${escondido ? "pointer-events-none translate-y-4 opacity-0" : ""}`}
        tabIndex={escondido ? -1 : 0}
      >
        Reportar baño
      </button>

      {abierto && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-teal-deep/70 p-4 sm:items-center" onClick={(e) => e.target === e.currentTarget && cerrarTodo()}>
          <div role="dialog" aria-modal="true" aria-labelledby="titulo-reporte" className="max-h-[92svh] w-full max-w-md overflow-auto rounded-2xl bg-white p-7 text-ink">
            <div className="flex items-start justify-between gap-4">
              <h3 id="titulo-reporte" className="text-2xl">Reportar un baño</h3>
              <button ref={cerrar} type="button" onClick={cerrarTodo} aria-label="Cerrar" className="-mr-2 -mt-1 p-2 text-muted hover:text-ink"><X size={24} /></button>
            </div>

            {estado === "enviado" ? (
              <div role="status" className="mt-6">
                <CheckCircle size={40} weight="duotone" className="text-teal" aria-hidden="true" />
                <p className="mt-3 text-lg"><strong>Gracias.</strong> Recibimos tu reporte de {lugar || "ese lugar"}. Lo revisamos antes de sumarlo a los datos.</p>
                <Boton onClick={cerrarTodo} className="mt-6 w-full">Listo</Boton>
              </div>
            ) : (
              <form onSubmit={enviar}>
                <p className="mt-1 text-muted">Solo lo esencial es obligatorio.</p>
                <div className="mt-6">
                  <label htmlFor="r-lugar" className="font-display font-medium">Lugar</label>
                  <input id="r-lugar" required value={lugar} onChange={(e) => setLugar(e.target.value)} placeholder="Ej.: Fontanar, Chía" className="mt-2 w-full rounded-lg border-[1.5px] border-line px-4 py-3 focus:border-teal focus:outline-none" />
                </div>
                <Opciones nombre="fila" etiqueta="¿Cómo estaba la fila?" opciones={["Larga", "Media", "Corta"]} valor={fila} onCambio={setFila} />
                <Opciones nombre="bano" etiqueta="¿Qué baño?" opciones={["Mujeres", "Hombres", "Ambos"]} valor={bano} onCambio={setBano} />
                {estado === "error" && <p role="alert" className="mt-4 text-[#b3261e]">No se pudo enviar. Inténtalo de nuevo.</p>}
                <div className="mt-8 flex gap-3">
                  <Boton variante="contorno" onClick={cerrarTodo} className="flex-1">Cancelar</Boton>
                  <Boton type="submit" disabled={estado === "enviando" || !fila || !bano || !lugar} className="flex-1">{estado === "enviando" ? "Enviando…" : "Enviar reporte"}</Boton>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
