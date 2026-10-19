import { ArrowRight, ArrowsLeftRight, ShieldCheck, Storefront, Users, Vault } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { banosPagina as c } from "@/lib/content";

const ICONOS: Record<string, Icon> = { gente: Users, vitrina: Storefront, archivo: Vault, cuidado: ShieldCheck };
const TINTE: Record<string, string> = {
  gente: "white",
  vitrina: "color-mix(in srgb, #00a8e8 12%, white)",
  archivo: "color-mix(in srgb, #de883f 14%, white)",
  cuidado: "white",
};
const BORDE: Record<string, string> = { gente: "#d3dcd8", vitrina: "#00a8e8", archivo: "#de883f", cuidado: "#d3dcd8" };
const TRAZO: Record<string, string> = { gente: "#50666c", vitrina: "#0a7fb0", archivo: "#a8561c", cuidado: "#50666c" };

function Conector({ doble = false }: { doble?: boolean }) {
  const Ico = doble ? ArrowsLeftRight : ArrowRight;
  return (
    <div className="flex items-center justify-center text-muted" aria-hidden="true">
      <Ico size={26} className="rotate-90 md:rotate-0" />
    </div>
  );
}

/** Mapa de la arquitectura en cuatro partes, más la tabla de lo que es piloto y lo que se construye. */
export default function Arquitectura() {
  const p = c.arquitectura_partes;
  return (
    <section id="arquitectura" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="max-w-3xl text-[clamp(2rem,4.2vw,3.5rem)]">{c.arquitectura_titulo}</h2>
        <p className="mt-5 max-w-3xl text-lg text-muted">{c.arquitectura_texto}</p>

        <div className="mt-14 grid gap-3 md:grid-cols-[1fr_2rem_1fr_2rem_1fr_2rem_1fr] md:gap-2">
          {p.map((parte, i) => {
            const Ico = ICONOS[parte.icono] ?? Users;
            return (
              <div key={parte.titulo} className="contents">
                {i > 0 && <Conector doble={i === 2} />}
                <article
                  className="flex flex-col rounded-2xl border-[1.5px] p-6"
                  style={{ background: TINTE[parte.icono], borderColor: BORDE[parte.icono] }}
                >
                  <Ico size={36} weight="duotone" style={{ color: TRAZO[parte.icono] }} aria-hidden="true" />
                  <h3 className="mt-4 text-2xl">{parte.titulo}</h3>
                  <p className="mt-2 flex-1 text-[0.97rem] text-muted">{parte.texto}</p>
                  <p className="mt-5 text-sm font-medium text-teal-deep">{parte.servicio}</p>
                </article>
              </div>
            );
          })}
        </div>

        <h3 className="mt-24 text-3xl md:text-4xl">{c.piloto_titulo}</h3>
        <div className="mt-8 border-t border-line">
          <div className="hidden gap-6 border-b border-line py-3 text-sm font-medium text-muted md:grid md:grid-cols-12">
            <span className="col-span-3">Pieza</span>
            <span className="col-span-4">Hoy (piloto)</span>
            <span className="col-span-5">Con el financiamiento</span>
          </div>
          {c.piloto_filas.map((f) => (
            <div key={f.pieza} className="grid gap-1 border-b border-line py-4 md:grid-cols-12 md:gap-6">
              <p className="font-display text-lg font-semibold md:col-span-3">{f.pieza}</p>
              <p className="text-muted md:col-span-4"><span className="font-medium text-ink md:hidden">Hoy: </span>{f.hoy}</p>
              <p className="md:col-span-5"><span className="font-medium md:hidden">Con el financiamiento: </span>{f.luego}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
