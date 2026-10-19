import { ajustes, banosPagina as c } from "@/lib/content";

export default function PieBanometro() {
  const anio = new Date().getFullYear();
  return (
    <footer className="bg-teal-deep text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <p className="font-display text-3xl font-bold tracking-[-0.03em]">{c.nombre}</p>
        <p className="mt-2 max-w-md text-white/70">{c.claim}</p>
        <p className="mt-6 max-w-xl text-sm text-white/55">{c.pie_nota}</p>
        {ajustes.correo && (
          <p className="mt-6">
            <a className="underline decoration-lime/60 underline-offset-4 hover:decoration-lime" href={`mailto:${ajustes.correo}`}>{ajustes.correo}</a>
          </p>
        )}
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-6 py-6 text-sm text-white/55">© {anio} {c.nombre}</p>
      </div>
    </footer>
  );
}
