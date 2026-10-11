import Boton from "@/components/Boton";

export default function NoEncontrada() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-32 pt-40">
      <h1 className="text-4xl md:text-5xl">No encontramos esta página.</h1>
      <p className="mt-5 text-lg text-muted">Puede que el enlace haya cambiado. Vuelve al inicio para seguir explorando.</p>
      <Boton to="/" className="mt-8">Ir al inicio</Boton>
    </div>
  );
}
