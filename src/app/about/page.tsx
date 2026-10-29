import { StyledCode } from "@/components/StyledCode";
import { aboutCode } from "@/markdown/about";
import { Badge } from "@/components/ui/badge";

const technologies = [
  "Python",
  "Java",
  "C++",
  "PHP",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Spring Boot",
  "CodeIgniter",
  "React",
  "Next.js",
  "Angular",
  "Vue.js",
  "OpenCV",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Arduino",
];

export default function AboutPage() {
  return (
    <div className="text-gray-300">
      <div className="grid grid-cols-1 gap-8 p-4 lg:grid-cols-2">
        {/* Text Column */}
        <div className="space-y-6">
          <div>
            <h1 className="mb-4 text-2xl font-bold text-slate-200">Sobre Mí</h1>
            <p className="text-slate-400">
              Hola, soy Jonathan Matias Gomez, Ingeniero en Informática y Full
              Stack Developer residiendo en Posadas, Misiones. Especializado en
              el desarrollo de aplicaciones web modernas, inteligencia
              artificial, visión por computadora y electrónica integrada. Combino
              la excelencia técnica con la pasión por la enseñanza para
              construir soluciones de software robustas y formar a la próxima
              generación de desarrolladores.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-semibold text-slate-200">
              Tecnologías y Herramientas
            </h2>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="rounded-md border border-gray-700 bg-gray-800/80 px-3 py-1.5 text-sm font-medium text-slate-200 transition-colors hover:border-gray-600 hover:bg-gray-700 hover:text-white"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-semibold text-slate-200">
              Mi Enfoque
            </h2>
            <p className="text-slate-400">
              Creo firmemente en escribir software limpio, escalable y
              mantenible, integrando hardware y software para resolver desafíos
              del mundo real. La docencia y la creación tecnológica van de la
              mano en cada uno de mis proyectos.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-semibold text-slate-200">
              Conectemos
            </h2>
            <p className="text-slate-400">
              Siempre estoy interesado en nuevas oportunidades, proyectos y
              colaboraciones. ¡Construyamos algo increíble juntos! Puedes
              contactarme a través del formulario o de mis canales de contacto.
            </p>
          </div>
        </div>

        {/* Code Column */}
        <div className="rounded-lg bg-gray-800 p-4">
          <StyledCode code={aboutCode} language="typescript" />
        </div>
      </div>
    </div>
  );
}
