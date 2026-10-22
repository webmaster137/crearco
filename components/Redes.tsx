import { FacebookLogo, InstagramLogo, TiktokLogo, YoutubeLogo } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { ajustes } from "@/lib/content";

const ICONOS: Record<string, Icon> = {
  Facebook: FacebookLogo,
  YouTube: YoutubeLogo,
  TikTok: TiktokLogo,
  Instagram: InstagramLogo,
};

/** Redes de Creando Arcoíris. Se editan en content/ajustes.json (campo "redes"). */
export default function Redes({ className = "" }: { className?: string }) {
  if (!ajustes.redes.length) return null;
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`} aria-label="Redes sociales">
      {ajustes.redes.map((r) => {
        const Ico = ICONOS[r.nombre];
        return (
          <li key={r.nombre}>
            <a
              href={r.enlace}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${ajustes.nombre} en ${r.nombre}`}
              className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-white/30 text-white transition-colors duration-200 hover:border-lime hover:bg-lime hover:text-teal-deep"
            >
              {Ico ? <Ico size={22} aria-hidden="true" /> : <span className="text-xs">{r.nombre}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
