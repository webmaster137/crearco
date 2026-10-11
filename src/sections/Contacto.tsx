import { useState } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import Boton from "@/components/Boton";
import { inicio } from "@/lib/content";

type Estado = "libre" | "enviando" | "enviado" | "error";

const CAMPOS = [
  { id: "nombre", etiqueta: "Nombre", tipo: "text", auto: "name" },
  { id: "organizacion", etiqueta: "Organización", tipo: "text", auto: "organization" },
  { id: "correo", etiqueta: "Correo", tipo: "email", auto: "email" },
  { id: "que", etiqueta: "¿Qué quieres desarrollar?", tipo: "text", auto: "off" },
];

const entrada =
  "mt-2 w-full rounded-lg border-[1.5px] border-white/30 bg-white/[0.06] px-4 py-3 text-white placeholder:text-white/40 focus:border-lime focus:outline-none";

export default function Contacto() {
  const c = inicio.contacto;
  const [estado, setEstado] = useState<Estado>("libre");

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    setEstado("enviando");
    try {
      // Netlify recibe el formulario porque está declarado en index.html (ver README).
      const r = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(datos as unknown as Record<string, string>).toString(),
      });
      setEstado(r.ok ? "enviado" : "error");
    } catch {
      setEstado("error");
    }
  }

  return (
    <section id="contacto" className="bg-teal-deep py-24 text-white md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="text-[clamp(2rem,4.2vw,3.5rem)]">{c.titulo}</h2>
          <p className="mt-6 max-w-md text-lg text-white/75">{c.texto}</p>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {estado === "enviado" ? (
            <div role="status" className="rounded-2xl border border-lime/40 p-8">
              <CheckCircle size={40} weight="duotone" className="text-lime" aria-hidden="true" />
              <h3 className="mt-4 text-3xl">{c.mensaje_exito_titulo}</h3>
              <p className="mt-2 text-white/75">{c.mensaje_exito_texto}</p>
            </div>
          ) : (
            <form name="contacto" method="POST" data-netlify="true" netlify-honeypot="campo-trampa" onSubmit={enviar} className="space-y-5">
              <input type="hidden" name="form-name" value="contacto" />
              <p className="hidden">
                <label>No llenar: <input name="campo-trampa" tabIndex={-1} autoComplete="off" /></label>
              </p>
              {CAMPOS.map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="font-display font-medium text-white/90">{f.etiqueta}</label>
                  <input id={f.id} name={f.id} type={f.tipo} autoComplete={f.auto} required={f.id !== "organizacion"} className={entrada} />
                </div>
              ))}
              <div>
                <label htmlFor="mensaje" className="font-display font-medium text-white/90">Mensaje</label>
                <textarea id="mensaje" name="mensaje" rows={4} className={`${entrada} resize-y`} />
              </div>
              {estado === "error" && (
                <p role="alert" className="text-[#ffb4a8]">
                  No se pudo enviar el mensaje. Revisa tu conexión e inténtalo de nuevo.
                </p>
              )}
              <Boton type="submit" variante="lima" disabled={estado === "enviando"} className="w-full sm:w-auto">
                {estado === "enviando" ? "Enviando…" : c.boton}
              </Boton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
