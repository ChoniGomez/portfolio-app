import { NavigationButtons } from "./NavigationButtons";
import { TypeWriter } from "./TypeWriter";

export function HomeContent() {
  return (
    <div className="flex w-full max-w-4xl flex-col space-y-6">
      <TypeWriter
        text="Hola, soy Jonathan Matias Gomez"
        className="text-4xl font-bold text-slate-200"
      />
      <p className="text-xl text-slate-400">
        Ingeniero en Informática y Full Stack Developer residiendo en Posadas,
        Misiones. Especializado en el desarrollo de aplicaciones web modernas,
        inteligencia artificial, visión por computadora y electrónica integrada.
      </p>
      <p className="text-lg text-slate-400">
        Combino la excelencia técnica con la pasión por la enseñanza para
        construir soluciones de software robustas y formar a la próxima
        generación de desarrolladores. ¡Construyamos algo increíble juntos!
      </p>
      <NavigationButtons />
      <div className="text-sm text-[#898989]">
        Design inspired by{" "}
        <code className="text-[#18B4C8]">
          <a
            href="https://wiscaksono.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-inherit no-underline"
          >
            wiscaksono.com
          </a>
        </code>
        {" and "}
        <code className="text-[#18B4C8]">
          <a
            href="https://itscrazydev.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-inherit no-underline"
          >
            itscrazydev.netlify.app
          </a>
        </code>
      </div>
    </div>
  );
}
