import { defineConfig } from "vite";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";

/**
 * Al compilar, crea dist/banos/index.html: una copia de la página principal con el título,
 * la descripción y la imagen de vista previa de Bañómetro. Así, al compartir el enlace
 * /banos en WhatsApp, redes o correo, se ve la imagen. (La aplicación sigue siendo la misma.)
 */
function paginaBanometro(): Plugin {
  return {
    name: "pagina-banometro",
    apply: "build",
    closeBundle() {
      const dist = path.resolve(__dirname, "dist");
      const origen = path.join(dist, "index.html");
      if (!fs.existsSync(origen)) return;

      const base = (process.env.URL || "https://creandoarcoiris.com").replace(/\/$/, "");
      const titulo = "Bañómetro: nada debería ser más democrático que usar un baño";
      const descripcion =
        "Iniciativa de investigación y ciencia ciudadana, liderada por mujeres, sobre los baños públicos de Bogotá, Armenia y Pereira. Piloto en construcción.";
      const imagen = `${base}/og-banometro.png`;
      const etiquetas = [
        `<meta property="og:type" content="website" />`,
        `<meta property="og:title" content="${titulo}" />`,
        `<meta property="og:description" content="${descripcion}" />`,
        `<meta property="og:url" content="${base}/banos" />`,
        `<meta property="og:image" content="${imagen}" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${titulo}" />`,
        `<meta name="twitter:description" content="${descripcion}" />`,
        `<meta name="twitter:image" content="${imagen}" />`,
      ].join("\n    ");

      let html = fs.readFileSync(origen, "utf8");
      html = html
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${titulo}</title>`)
        .replace(/<meta\s+name="description"[\s\S]*?>/, `<meta name="description" content="${descripcion}" />`)
        .replace("</head>", `    ${etiquetas}\n  </head>`);

      fs.mkdirSync(path.join(dist, "banos"), { recursive: true });
      fs.writeFileSync(path.join(dist, "banos", "index.html"), html);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), paginaBanometro()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@content": path.resolve(__dirname, "./content"),
    },
  },
  server: { port: 5173 },
});
