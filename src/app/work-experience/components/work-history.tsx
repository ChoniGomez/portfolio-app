"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Building2, CalendarDays } from "lucide-react";

interface WorkHistoryItem {
  period: string;
  role: string;
  company: string;
  description: string;
}

const workHistory: WorkHistoryItem[] = [
  {
    period: "Enero 2017 - Actualidad",
    role: "Desarrollo de Software y Programación de Robots.",
    company: "Escuela de Robótica de Misiones",
    description:
      "Programación de sistemas embebidos en C/C++ y Arduino. Integración IoT con PySerial y Bluetooth. Desarrollo de scripts de visión artificial con Python, OpenCV y YOLO. Diseño de arquitectura algorítmica y traducción de requerimientos mecánicos en código eficiente.",
  },
  {
    period: "Enero 2026 - Actualidad",
    role: "Consultor de Software / Desarrollador Freelance",
    company: "CultiShop - Plataforma de E-commerce",
    description:
      "Arquitectura y despliegue (DevOps) en VPS DonWeb, Nginx y Docker. Desarrollo Backend RESTful con Node.js y Fastify. Modelado relacional en PostgreSQL. Integración con frontend en React.",
  },
  {
    period: "Enero 2026 - Actualidad",
    role: "Consultor de Software / Desarrollador Freelance",
    company: "QueRico! - Plataforma de E-commerce",
    description:
      "Arquitectura Full-Stack. Backend con Node.js y Express para control dinámico de stock y promociones. Base de datos PostgreSQL. Integración comercial con WhatsApp. Despliegue cloud continuo en Vercel y Render.",
  },
];

const WorkHistory = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">Experiencia Laboral</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Mi trayectoria profesional en tecnología y desarrollo de soluciones.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {workHistory.map((item, index) => (
          <motion.div
            key={`${item.company}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-8 relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border -ml-4 hidden md:block">
              <div className="w-3 h-3 rounded-full -ml-[6px] bg-blue-500" />
            </div>

            <Card className="p-6 ml-4 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{item.role}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Building2 className="w-4 h-4" />
                    <span>{item.company}</span>
                  </div>
                  <p className="text-muted-foreground text-justify hyphens-auto" lang="es">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                  <CalendarDays className="w-4 h-4" />
                  <span>{item.period}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkHistory;
