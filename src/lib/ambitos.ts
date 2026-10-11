// Cada ámbito tiene un color del logo. El color de un proyecto es el de su
// primer ámbito: así el color informa (qué tipo de proyecto es) y no solo decora.
export const COLOR_AMBITO: Record<string, string> = {
  "Educación": "#00a8e8",
  "Juventud": "#e9bf1d",
  "Emprendimiento": "#de883f",
  "Innovación": "#9bb83e",
  "Economía circular": "#bf7cad",
  "Cultura": "#d93858",
  "Patrimonio": "#7164a6",
  "Oralidad": "#4258a1",
  "Territorio": "#3d8fc4",
  "Comunidad": "#de883f",
  "Infancia": "#e9bf1d",
  "Ciudadanía": "#4258a1",
  "Participación": "#4258a1",
};

export const AMBITOS = Object.keys(COLOR_AMBITO);

export function colorDe(ambitos: string[] = []): string {
  for (const a of ambitos) if (COLOR_AMBITO[a]) return COLOR_AMBITO[a];
  return "#12596a";
}

// Bandas del ovillo del logo, de arriba hacia abajo.
export const BANDAS = ["#de883f", "#d93858", "#7164a6", "#bf7cad", "#f2d96f", "#c0d66d", "#55a6db"];

// Orden de los 6 pasos del proceso (de la idea a las capacidades).
export const COLOR_PASOS = ["#d93858", "#de883f", "#f2d96f", "#c0d66d", "#55a6db", "#a79bd6"];
