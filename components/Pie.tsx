import { Link } from "react-router-dom";
import logo from "@/assets/logo-horizontal-blanco.svg";
import { ajustes } from "@/lib/content";
import Redes from "./Redes";

export default function Pie() {
  const anio = new Date().getFullYear();
  return (
    <footer className="bg-teal-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <img src={logo} alt={ajustes.nombre} className="h-10 w-auto" />
          <p className="mt-6 max-w-sm text-white/70">{ajustes.texto_pie}</p>
          <Redes className="mt-6" />
          {(ajustes.correo || ajustes.telefono) && (
            <p className="mt-6 text-white/90">
              {ajustes.correo && (
                <a className="underline decoration-lime/60 underline-offset-4 hover:decoration-lime" href={`mailto:${ajustes.correo}`}>
                  {ajustes.correo}
                </a>
              )}
              {ajustes.correo && ajustes.telefono && <br />}
              {ajustes.telefono}
            </p>
          )}
        </div>

        <nav aria-label="Pie de página" className="md:col-span-3 md:col-start-7">
          <p className="font-display font-semibold text-lime">Navegación</p>
          <ul className="mt-4 space-y-2.5 text-white/80">
            <li><Link className="hover:text-white" to="/#que-hacemos">Qué hacemos</Link></li>
            <li><Link className="hover:text-white" to="/#proyectos">Proyectos</Link></li>
            <li><Link className="hover:text-white" to="/#nosotros">Nosotros</Link></li>
            <li><Link className="hover:text-white" to="/#contacto">Contacto</Link></li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="font-display font-semibold text-lime">Ámbitos de trabajo</p>
          <p className="mt-4 text-white/70">{ajustes.ambitos_pie}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-6 py-6 text-sm text-white/55">
          © {anio} {ajustes.nombre}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
