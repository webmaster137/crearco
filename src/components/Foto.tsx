import simbolo from "@/assets/logo-simbolo.svg";

/**
 * Foto del contenido. Si todavía no hay foto, muestra un bloque del color del ámbito
 * con el símbolo de la marca, para que la tarjeta no quede vacía ni use una imagen ajena.
 */
export default function Foto({
  src,
  alt,
  color = "#12596a",
  className = "",
}: {
  src?: string;
  alt?: string;
  color?: string;
  className?: string;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  return (
    <div
      className={`flex h-full w-full items-center justify-center ${className}`}
      style={{ background: `color-mix(in srgb, ${color} 20%, white)` }}
      role="img"
      aria-label={alt || "Foto pendiente"}
    >
      <img src={simbolo} alt="" className="w-2/5 max-w-40 opacity-90" />
    </div>
  );
}
