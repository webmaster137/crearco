import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type Variante = "lima" | "teal" | "contorno" | "contorno-claro";

const base =
  "inline-flex h-12 items-center justify-center rounded-xl px-6 font-display text-[0.97rem] font-semibold tracking-[-0.005em] transition-colors duration-200";

const variantes: Record<Variante, string> = {
  lima: "bg-lime text-teal-deep hover:bg-white",
  teal: "bg-teal text-white hover:bg-teal-deep",
  contorno: "border-[1.5px] border-teal text-teal hover:bg-teal hover:text-white",
  "contorno-claro": "border-[1.5px] border-white/55 text-white hover:border-white hover:bg-white hover:text-teal-deep",
};

interface Props {
  children: ReactNode;
  variante?: Variante;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

export default function Boton({ children, variante = "teal", to, href, onClick, type = "button", disabled, className = "" }: Props) {
  const clases = `${base} ${variantes[variante]} ${disabled ? "pointer-events-none opacity-60" : ""} ${className}`;
  if (to) return <Link to={to} className={clases}>{children}</Link>;
  if (href) return <a href={href} className={clases}>{children}</a>;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={clases}>
      {children}
    </button>
  );
}

/** Enlace de texto: subrayado que se intensifica al pasar el cursor. */
export function EnlaceTexto({ to, children, className = "" }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link
      to={to}
      className={`font-display font-semibold underline decoration-current/35 decoration-[2px] underline-offset-[7px] transition-[text-decoration-color] duration-200 hover:decoration-current ${className}`}
    >
      {children}
    </Link>
  );
}
