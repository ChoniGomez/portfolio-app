"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useIDEWindow } from "@/contexts/IDEWindowContext";

interface TechItem {
  slug: string;
  name: string;
}

// 17 exact technologies requested by the user
const orbit1: TechItem[] = [
  { slug: "react", name: "React" },
  { slug: "nextdotjs", name: "Next.js" },
  { slug: "typescript", name: "TypeScript" },
  { slug: "javascript", name: "JavaScript" },
];

const orbit2: TechItem[] = [
  { slug: "python", name: "Python" },
  { slug: "nodedotjs", name: "Node.js" },
  { slug: "java", name: "Java" },
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
  { slug: "mysql", name: "MySQL" },
  { slug: "mongodb", name: "MongoDB" },
];

export function OrbitingLogos() {
  const { windowSize } = useIDEWindow();

  // Responsive scaling to fit perfectly inside the IDE content panel
  const scale = useMemo(() => {
    if (!windowSize?.width) return 1;
    if (windowSize.width >= 1400) return 1;
    if (windowSize.width >= 1024) return 0.9;
    if (windowSize.width >= 768) return 0.82;
    return Math.max(0.68, (windowSize.width - 40) / 480);
  }, [windowSize]);

  // Orbit radiuses in pixels
  const r1 = 96;
  const r2 = 150;
  const r3 = 208;

  const renderOrbitItems = (
    items: TechItem[],
    radius: number,
    counterClass: string,
  ) => {
    const total = items.length;
    return items.map((item, index) => {
      const angle = (index * 360) / total;
      const rad = (angle * Math.PI) / 180;
      // Coordinates relative to center of the ring
      const x = radius * Math.cos(rad);
      const y = radius * Math.sin(rad);

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
          {/* Counter-rotation container keeps icon upright */}
          <div className={`${counterClass} transition-transform duration-200 hover:scale-125`}>
            <div
              className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-cyan-500/30 bg-gray-900/90 p-1.5 shadow-lg shadow-black/60 backdrop-blur-sm transition-all duration-200 hover:border-cyan-400 hover:bg-gray-800 hover:shadow-cyan-500/40"
              title={item.name}
            >
              <Image
                src={`https://cdn.simpleicons.org/${item.slug}`}
                alt={item.name}
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
                unoptimized
              />
              {/* Tooltip badge on hover */}
              <span className="pointer-events-none absolute -bottom-6 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded border border-gray-700 bg-gray-900/95 px-1.5 py-0.5 text-[10px] font-medium text-cyan-300 opacity-0 shadow transition-opacity duration-150 group-hover:opacity-100">
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
        width: "480px",
        height: "480px",
        maxWidth: "100%",
        maxHeight: "100%",
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      <style jsx>{`
        @keyframes orbit-rotate-cw {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes orbit-rotate-ccw {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        .animate-ring-1 {
          animation: orbit-rotate-cw 24s linear infinite;
        }
        .counter-ring-1 {
          animation: orbit-rotate-ccw 24s linear infinite;
        }

        .animate-ring-2 {
          animation: orbit-rotate-ccw 36s linear infinite;
        }
        .counter-ring-2 {
          animation: orbit-rotate-cw 36s linear infinite;
        }

        .animate-ring-3 {
          animation: orbit-rotate-cw 50s linear infinite;
        }
        .counter-ring-3 {
          animation: orbit-rotate-ccw 50s linear infinite;
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

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-blue-500/10 blur-3xl" />

      {/* Track Ring 3 (Outer) */}
      <div
        className="pointer-events-none absolute rounded-full border border-dashed border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.06)]"
        style={{
          width: `${r3 * 2}px`,
          height: `${r3 * 2}px`,
        }}
      />
      {/* Rotating Ring 3 container */}
      <div
        className="animate-ring-3 absolute"
        style={{
          width: `${r3 * 2}px`,
          height: `${r3 * 2}px`,
        }}
      >
        {renderOrbitItems(orbit3, r3, "counter-ring-3")}
      </div>

      {/* Track Ring 2 (Middle) */}
      <div
        className="pointer-events-none absolute rounded-full border border-purple-500/25 shadow-[0_0_15px_rgba(168,85,247,0.08)]"
        style={{
          width: `${r2 * 2}px`,
          height: `${r2 * 2}px`,
        }}
      />
      {/* Rotating Ring 2 container */}
      <div
        className="animate-ring-2 absolute"
        style={{
          width: `${r2 * 2}px`,
          height: `${r2 * 2}px`,
        }}
      >
        {renderOrbitItems(orbit2, r2, "counter-ring-2")}
      </div>

      {/* Track Ring 1 (Inner) */}
      <div
        className="pointer-events-none absolute rounded-full border border-dashed border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
        style={{
          width: `${r1 * 2}px`,
          height: `${r1 * 2}px`,
        }}
      />
      {/* Rotating Ring 1 container */}
      <div
        className="animate-ring-1 absolute"
        style={{
          width: `${r1 * 2}px`,
          height: `${r1 * 2}px`,
        }}
      >
        {renderOrbitItems(orbit1, r1, "counter-ring-1")}
      </div>

      {/* Central Cyber Planet / Workstation PC Core */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Pulsing Aura Rings */}
        <div className="absolute -inset-4 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
        <div
          className="absolute -inset-7 rounded-full bg-purple-500/15 blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Core Sphere / Workstation PC */}
        <div className="relative flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-cyan-400/50 bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-950 p-2 shadow-2xl shadow-cyan-500/30 transition-transform duration-300 hover:scale-110">
          {/* Subtle spinning glow ring */}
          <div className="absolute inset-0 rounded-full border border-cyan-300/30 animate-spin" style={{ animationDuration: "12s" }} />

          {/* Glowing Workstation / PC Terminal Icon */}
          <svg
            className="h-8 w-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Monitor */}
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            {/* Code Brackets on Screen */}
            <polyline points="8 9 6 11 8 13" stroke="#38bdf8" />
            <polyline points="16 9 18 11 16 13" stroke="#38bdf8" />
            <line x1="12" y1="8" x2="12" y2="14" stroke="#c084fc" />
            {/* Stand */}
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>

          {/* Micro Status Chip */}
          <span className="mt-1 font-mono text-[9px] font-bold tracking-wider text-cyan-300">
            PC CORE
          </span>
        </div>
      </div>
    </div>
  );
}
