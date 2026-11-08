"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { FaJava } from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import { useIDEWindow } from "@/contexts/IDEWindowContext";

interface TechItem {
  slug: string;
  name: string;
  color?: string; // Color personalizado para SimpleIcons (ej. "white", "ffffff", "00B4D8")
  isDark?: boolean; // Forzar estilo de alto contraste para fondos oscuros
}

// Conjunto de slugs naturalmente oscuros/negros para garantizar contraste
const DARK_SLUGS = new Set([
  "nextdotjs",
  "github",
  "vercel",
  "express",
  "prisma",
  "apple",
  "x",
  "socketdotio",
  "flask",
  "mysql",
]);

// 17 tecnologías del stack real del usuario
const orbit1: TechItem[] = [
  { slug: "react", name: "React" },
  { slug: "nextdotjs", name: "Next.js", color: "white", isDark: true }, // Resaltado en blanco para modo oscuro
  { slug: "typescript", name: "TypeScript" },
  { slug: "javascript", name: "JavaScript" },
];

const orbit2: TechItem[] = [
  { slug: "python", name: "Python" },
  { slug: "nodedotjs", name: "Node.js" },
  { slug: "java", name: "Java" }, // Logo oficial de la taza de café
  { slug: "springboot", name: "Spring Boot" },
  { slug: "php", name: "PHP" },
  { slug: "codeigniter", name: "CodeIgniter" },
];

const orbit3: TechItem[] = [
  { slug: "angular", name: "Angular" },
  { slug: "vuedotjs", name: "Vue.js" },
  { slug: "cplusplus", name: "C++" },
  { slug: "arduino", name: "Arduino" },
  { slug: "postgresql", name: "PostgreSQL" },
  {
    slug: "mysql",
    name: "MySQL",
    color: "00B4D8", // Inyectado color cian/azul brillante de alto contraste
    isDark: true, // Fondo circular claro y drop-shadow para igualar la visibilidad de Angular
  },
  { slug: "mongodb", name: "MongoDB" },
];

export function OrbitingLogos() {
  const { windowSize } = useIDEWindow();
  const [failedIcons, setFailedIcons] = useState<Record<string, boolean>>({});

  // Escalado responsivo dinámico adaptado al nuevo tamaño ampliado (base 600px)
  const scale = useMemo(() => {
    if (!windowSize?.width) return 1;
    if (windowSize.width >= 1600) return 1.05;
    if (windowSize.width >= 1400) return 1;
    if (windowSize.width >= 1200) return 0.92;
    if (windowSize.width >= 1024) return 0.85;
    if (windowSize.width >= 768) return 0.78;
    return Math.max(0.55, (windowSize.width - 40) / 600);
  }, [windowSize]);

  // Radios ampliados de las tres órbitas en píxeles para aprovechar todo el espacio disponible
  const r1 = 125;
  const r2 = 195;
  const r3 = 265;

  const renderOrbitItems = (
    items: TechItem[],
    radius: number,
    counterClass: string,
  ) => {
    const total = items.length;
    return items.map((item, index) => {
      const angle = (index * 360) / total;
      const rad = (angle * Math.PI) / 180;
      // Coordenadas relativas al centro del contenedor de la órbita
      const x = radius * Math.cos(rad);
      const y = radius * Math.sin(rad);

      const isMySQL = item.slug === "mysql";

      // Determinar si el ícono es naturalmente oscuro o requiere tratamiento de alto contraste
      const isDark =
        Boolean(item.isDark) ||
        isMySQL ||
        DARK_SLUGS.has(item.slug) ||
        item.color?.toLowerCase() === "white" ||
        item.color?.toLowerCase() === "ffffff";

      // Parámetro de color dinámico para SimpleIcons CDN
      const iconColor = item.color || (isDark ? "white" : undefined);
      const iconUrl = iconColor
        ? `https://cdn.simpleicons.org/${item.slug}/${iconColor}`
        : `https://cdn.simpleicons.org/${item.slug}`;

      return (
        <div
          key={item.slug}
          className="absolute"
          style={{
            top: `calc(50% + ${y}px)`,
            left: `calc(50% + ${x}px)`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Contenedor individual con contra-rotación que anula la rotación del padre para mantener orientación fija */}
          <div
            className={`flex items-center justify-center ${counterClass}`}
            style={{ transformOrigin: "center center" }}
          >
            {/* Insignia escalada a h-12 w-12 (48px) para máxima legibilidad */}
            <div
              className={`group relative flex h-12 w-12 items-center justify-center rounded-full border p-2 shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-125 cursor-pointer ${
                isMySQL
                  ? "border-cyan-400/70 bg-gray-900/95 shadow-cyan-400/30 hover:border-cyan-300 hover:shadow-cyan-400/60"
                  : isDark
                  ? "border-white/50 bg-gray-900/95 shadow-white/15 hover:border-white hover:shadow-white/40"
                  : "border-cyan-500/40 bg-gray-900/90 shadow-black/70 hover:border-cyan-400 hover:bg-gray-800 hover:shadow-cyan-500/50"
              }`}
              title={item.name}
            >
              {/* Fondo circular blanco semitransparente para íconos naturalmente oscuros como MySQL o Next.js */}
              {isDark && (
                <div
                  className={`absolute inset-1.5 rounded-full pointer-events-none ${
                    isMySQL ? "bg-white/20" : "bg-white/15"
                  }`}
                />
              )}

              {item.slug === "java" || item.name === "Java" ? (
                <FaJava className="relative z-10 h-7 w-7 text-[#ED8B00]" />
              ) : failedIcons[item.slug] && isMySQL ? (
                <SiMysql className="relative z-10 h-7 w-7 text-[#00B4D8]" />
              ) : (
                <Image
                  src={iconUrl}
                  alt={item.name}
                  width={28}
                  height={28}
                  className={`relative z-10 h-7 w-7 object-contain pointer-events-none transition-all ${
                    isMySQL
                      ? "filter drop-shadow-[0_0_4px_rgba(255,255,255,0.9)]"
                      : isDark
                      ? "filter drop-shadow-[0_0_3px_rgba(255,255,255,0.7)]"
                      : ""
                  }`}
                  unoptimized
                  onError={() =>
                    setFailedIcons((prev) => ({ ...prev, [item.slug]: true }))
                  }
                />
              )}

              {/* Tooltip con nombre de la tecnología */}
              <span className="pointer-events-none absolute -bottom-7 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded border border-gray-700 bg-gray-900/95 px-2 py-0.5 text-[11px] font-semibold text-cyan-300 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
                {item.name}
              </span>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className="orbit-system relative flex items-center justify-center select-none"
      style={{
        width: "600px",
        height: "600px",
        maxWidth: "100%",
        maxHeight: "100%",
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      <style>{`
        @keyframes orbit-cw {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes orbit-ccw {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        .animate-ring-1 {
          animation: orbit-cw 24s linear infinite;
        }
        .counter-ring-1 {
          animation: orbit-ccw 24s linear infinite;
        }

        .animate-ring-2 {
          animation: orbit-ccw 36s linear infinite;
        }
        .counter-ring-2 {
          animation: orbit-cw 36s linear infinite;
        }

        .animate-ring-3 {
          animation: orbit-cw 50s linear infinite;
        }
        .counter-ring-3 {
          animation: orbit-ccw 50s linear infinite;
        }

        .orbit-system:hover .animate-ring-1,
        .orbit-system:hover .counter-ring-1,
        .orbit-system:hover .animate-ring-2,
        .orbit-system:hover .counter-ring-2,
        .orbit-system:hover .animate-ring-3,
        .orbit-system:hover .counter-ring-3 {
          animation-play-state: paused;
        }
      `}</style>

      {/* Halo ambiental de fondo */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-blue-500/10 blur-3xl" />

      {/* Pista de Órbita 3 (Exterior) */}
      <div
        className="pointer-events-none absolute rounded-full border border-dashed border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.08)]"
        style={{
          width: `${r3 * 2}px`,
          height: `${r3 * 2}px`,
          top: `calc(50% - ${r3}px)`,
          left: `calc(50% - ${r3}px)`,
        }}
      />
      {/* Contenedor rotatorio Órbita 3 */}
      <div
        className="animate-ring-3 absolute"
        style={{
          width: `${r3 * 2}px`,
          height: `${r3 * 2}px`,
          top: `calc(50% - ${r3}px)`,
          left: `calc(50% - ${r3}px)`,
          transformOrigin: "center center",
        }}
      >
        {renderOrbitItems(orbit3, r3, "counter-ring-3")}
      </div>

      {/* Pista de Órbita 2 (Media) */}
      <div
        className="pointer-events-none absolute rounded-full border border-purple-500/25 shadow-[0_0_20px_rgba(168,85,247,0.1)]"
        style={{
          width: `${r2 * 2}px`,
          height: `${r2 * 2}px`,
          top: `calc(50% - ${r2}px)`,
          left: `calc(50% - ${r2}px)`,
        }}
      />
      {/* Contenedor rotatorio Órbita 2 */}
      <div
        className="animate-ring-2 absolute"
        style={{
          width: `${r2 * 2}px`,
          height: `${r2 * 2}px`,
          top: `calc(50% - ${r2}px)`,
          left: `calc(50% - ${r2}px)`,
          transformOrigin: "center center",
        }}
      >
        {renderOrbitItems(orbit2, r2, "counter-ring-2")}
      </div>

      {/* Pista de Órbita 1 (Interior) */}
      <div
        className="pointer-events-none absolute rounded-full border border-dashed border-cyan-400/30 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
        style={{
          width: `${r1 * 2}px`,
          height: `${r1 * 2}px`,
          top: `calc(50% - ${r1}px)`,
          left: `calc(50% - ${r1}px)`,
        }}
      />
      {/* Contenedor rotatorio Órbita 1 */}
      <div
        className="animate-ring-1 absolute"
        style={{
          width: `${r1 * 2}px`,
          height: `${r1 * 2}px`,
          top: `calc(50% - ${r1}px)`,
          left: `calc(50% - ${r1}px)`,
          transformOrigin: "center center",
        }}
      >
        {renderOrbitItems(orbit1, r1, "counter-ring-1")}
      </div>

      {/* Planeta / Núcleo de Estación Central (PC Core) ampliado a h-24 w-24 */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Auras pulsantes ampliadas */}
        <div className="absolute -inset-5 rounded-full bg-cyan-500/25 blur-xl animate-pulse" />
        <div
          className="absolute -inset-8 rounded-full bg-purple-500/20 blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Esfera central del núcleo (96px x 96px) */}
        <div className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-cyan-400/50 bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-950 p-2 shadow-2xl shadow-cyan-500/35 transition-transform duration-300 hover:scale-110">
          {/* Anillo fino giratorio */}
          <div
            className="absolute inset-0 rounded-full border border-cyan-300/30 animate-spin"
            style={{ animationDuration: "12s" }}
          />

          {/* Icono de Estación / PC con código */}
          <svg
            className="h-10 w-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.85)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Monitor */}
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            {/* Código en pantalla */}
            <polyline points="8 9 6 11 8 13" stroke="#38bdf8" />
            <polyline points="16 9 18 11 16 13" stroke="#38bdf8" />
            <line x1="12" y1="8" x2="12" y2="14" stroke="#c084fc" />
            {/* Base / Soporte */}
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>

          {/* Etiqueta del Core */}
          <span className="mt-1 font-mono text-[10px] font-bold tracking-widest text-cyan-300">
            PC CORE
          </span>
        </div>
      </div>
    </div>
  );
}
