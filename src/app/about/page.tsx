import { StyledCode } from "@/components/StyledCode";
import { aboutCode } from "@/markdown/about";

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
              Habilidades Técnicas
            </h2>
            <div className="space-y-3 text-slate-400">
              <div className="rounded-lg border border-gray-800 bg-gray-900/40 p-3">
                <span className="font-semibold text-slate-200">Frontend: </span>
                React, Vue.js
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-900/40 p-3">
                <span className="font-semibold text-slate-200">Backend: </span>
                Node.js (Fastify), PHP (Laravel, CodeIgniter), Java (Spring Boot)
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-900/40 p-3">
                <span className="font-semibold text-slate-200">Bases de Datos: </span>
                PostgreSQL, MySQL, Prisma ORM
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-900/40 p-3">
                <span className="font-semibold text-slate-200">IA y Visión: </span>
                Python, OpenCV, YOLO, MediaPipe
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-900/40 p-3">
                <span className="font-semibold text-slate-200">Infraestructura y Redes: </span>
                Linux, Windows, Cisco Packet Tracer, Docker
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-900/40 p-3">
                <span className="font-semibold text-slate-200">Electrónica y Robótica: </span>
                Arduino, ESP32, C/C++, 3D Printing
              </div>
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
