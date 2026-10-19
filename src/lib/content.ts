import ajustes from "@content/ajustes.json";
import inicio from "@content/inicio.json";
import banosPagina from "@content/banos/pagina.json";

export { ajustes, inicio, banosPagina };

export type Estado = "activo" | "aprobado" | "en-desarrollo" | "por-ejecutar";

export interface Proyecto {
  slug: string;
  titulo: string;
  tipo: "propio" | "incubado";
  estado: Estado;
  ambitos: string[];
  organizacion?: string;
  resumen?: string;
  foto?: string;
  foto_alt?: string;
  orden?: number;
  destacado?: boolean;
  convocatoria?: string;
  anio?: string;
  monto?: string;
  rol?: string;
  resultado?: string;
  reto?: string;
  idea?: string;
  que_hicimos?: string;
  como?: string;
  resultados?: string;
  galeria?: string[];
  enlace?: string;
}

export interface Persona {
  slug: string;
  nombre: string;
  rol?: string;
  perfil?: string;
  foto?: string;
  orden?: number;
}

export interface Lugar {
  slug: string;
  ciudad: string;
  nombre: string;
  area: string;
  locales: string;
  verificado: boolean;
  area_m2?: number;
  orden?: number;
}

export interface Fuente {
  slug: string;
  titulo: string;
  detalle?: string;
  enlace?: string;
  orden?: number;
}

function cargar<T>(modulos: Record<string, unknown>): (T & { slug: string })[] {
  return Object.entries(modulos)
    .map(([ruta, d]) => ({
      ...(d as T),
      slug: ruta.split("/").pop()!.replace(".json", ""),
    }))
    .sort((a, b) => ((a as any).orden ?? 99) - ((b as any).orden ?? 99));
}

export const proyectos = cargar<Omit<Proyecto, "slug">>(
  import.meta.glob("/content/proyectos/*.json", { eager: true, import: "default" }),
) as Proyecto[];

export const equipo = cargar<Omit<Persona, "slug">>(
  import.meta.glob("/content/equipo/*.json", { eager: true, import: "default" }),
) as Persona[];

export const fuentes = cargar<Omit<Fuente, "slug">>(
  import.meta.glob("/content/banos/bibliografia/*.json", { eager: true, import: "default" }),
) as Fuente[];

export const equipoBanos = cargar<Omit<Persona, "slug">>(
  import.meta.glob("/content/banos/equipo/*.json", { eager: true, import: "default" }),
) as Persona[];

export const textoAmbitos = (a: string[] = []) => a.join(", ");

export const etiquetaEstado = (e: Estado) =>
  e === "aprobado"
    ? "Proyecto aprobado"
    : e === "en-desarrollo"
      ? "En desarrollo"
      : e === "por-ejecutar"
        ? "Proyecto por ejecutar"
        : "En marcha";

/** Dirección de la ficha: usa el enlace propio (p. ej. /banos) si existe. */
export const rutaProyecto = (p: Proyecto) => p.enlace || `/proyectos/${p.slug}`;
