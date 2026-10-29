import Image from "next/image";
import { NavigationButtons } from "./NavigationButtons";
import { TypeWriter } from "./TypeWriter";

export function HomeContent() {
  return (
    <div className="flex w-full max-w-4xl flex-col space-y-6">
      {/* Profile Header with Avatar & Greeting */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 pb-2">
        <div className="relative group flex-shrink-0">
          {/* Ambient Glow */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-60 blur-md transition duration-500 group-hover:opacity-100 group-hover:blur-lg" />

          {/* Photo Container */}
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-2xl border-2 border-cyan-400/50 bg-[#1e1e1e] p-1 shadow-2xl">
            <Image
              src="/foto_profile.jpg"
              alt="Jonathan Matias Gomez"
              width={128}
              height={128}
              className="h-full w-full rounded-xl object-cover object-top transition-transform duration-500 group-hover:scale-105"
              priority
            />
            {/* Live Status Badge */}
            <div
              className="absolute bottom-2 right-2 flex items-center justify-center rounded-full bg-gray-900/90 p-0.5 shadow-md border border-gray-700"
              title="Disponible para proyectos"
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 font-mono text-xs text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Ingeniero en Informática & Full Stack</span>
          </div>
          <TypeWriter
            text="Hola, soy Jonathan Matias Gomez"
            className="text-3xl sm:text-4xl font-bold text-slate-200 tracking-tight"
          />
        </div>
      </div>

      <p className="text-xl text-slate-400 leading-relaxed">
        Ingeniero en Informática y Full Stack Developer residiendo en Posadas,
        Misiones. Especializado en el desarrollo de aplicaciones web modernas,
        inteligencia artificial, visión por computadora y electrónica integrada.
      </p>
      <p className="text-lg text-slate-400 leading-relaxed">
        Combino la excelencia técnica con la pasión por la enseñanza para
        construir soluciones de software robustas y formar a la próxima
        generación de desarrolladores. ¡Construyamos algo increíble juntos!
      </p>
      <NavigationButtons />
      <div className="text-sm text-[#898989] pt-2">
        Diseño inspirado en{" "}
        <code className="text-[#18B4C8]">
          <a
            href="https://wiscaksono.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-inherit no-underline hover:underline"
          >
            wiscaksono.com
          </a>
        </code>
        {" y "}
        <code className="text-[#18B4C8]">
          <a
            href="https://itscrazydev.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-inherit no-underline hover:underline"
          >
            itscrazydev.netlify.app
          </a>
        </code>
      </div>
    </div>
  );
}
