import Boton from "@/components/Boton";
import Ovillo from "@/components/Ovillo";
import { inicio } from "@/lib/content";

/** Portada: la composición de círculos retoma el ovillo y las burbujas del logo. */
export default function Portada() {
  const c = inicio.portada;
  return (
    <section id="inicio" className="relative overflow-hidden bg-teal text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-32 md:grid-cols-12 md:pb-28 md:pt-40">
        <div className="md:col-span-7">
          <p className="font-display text-lg font-medium text-lime">{c.etiqueta}</p>
          <h1 className="mt-5 max-w-[17ch] text-[clamp(2.6rem,5.6vw,4.7rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            {c.titulo}
          </h1>
          <p className="mt-7 max-w-xl text-lg text-white/80 md:text-xl">{c.texto}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Boton to="/#proyectos" variante="lima">{c.boton_principal}</Boton>
            <Boton to="/#contacto" variante="contorno-claro">{c.boton_secundario}</Boton>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <div className="aparece absolute right-0 top-0 h-[80%] w-[80%] rounded-full border-2 border-sky/70 p-2.5">
              <div className="h-full w-full overflow-hidden rounded-full bg-teal-deep">
                <img src={c.foto_principal} alt={c.foto_principal_alt} className="h-full w-full object-cover" />
              </div>
            </div>
            <Ovillo
              className="aparece absolute bottom-[5%] left-0 h-[44%] w-[44%] rounded-full ring-[7px] ring-teal"
              style={{ animationDelay: "140ms" }}
            />
            <div
              className="aparece absolute bottom-0 right-[6%] h-[27%] w-[27%] overflow-hidden rounded-full ring-[7px] ring-teal"
              style={{ animationDelay: "260ms" }}
            >
              <img src={c.foto_secundaria} alt={c.foto_secundaria_alt} className="h-full w-full object-cover" />
            </div>
            {/* burbujas de línea, como las del logo */}
            <span className="aparece absolute left-[10%] top-[6%] h-5 w-5 rounded-full border-2 border-sky" style={{ animationDelay: "380ms" }} aria-hidden="true" />
            <span className="aparece absolute left-[3%] top-[36%] h-2.5 w-2.5 rounded-full border-2 border-sky" style={{ animationDelay: "440ms" }} aria-hidden="true" />
            <span className="aparece absolute right-[1%] top-[86%] h-3.5 w-3.5 rounded-full border-2 border-sky" style={{ animationDelay: "500ms" }} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
