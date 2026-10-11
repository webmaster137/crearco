import Portada from "@/sections/Portada";
import QueHacemos from "@/sections/QueHacemos";
import Proceso from "@/sections/Proceso";
import Casos from "@/sections/Casos";
import Resultados from "@/sections/Resultados";
import Portafolio from "@/sections/Portafolio";
import Servicios from "@/sections/Servicios";
import Nosotros from "@/sections/Nosotros";
import Contacto from "@/sections/Contacto";

export default function Inicio() {
  return (
    <>
      <Portada />
      <QueHacemos />
      <Proceso />
      <Casos />
      <Resultados />
      <Portafolio />
      <Servicios />
      <Nosotros />
      <Contacto />
    </>
  );
}
