"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  title: string;
  hoverTitle?: string;
  description: string;
  tag?: string;
  images?: string[];
  image?: string;
  link?: string;
}

export function ModernInnerShadowCardVariant1({
  title,
  hoverTitle,
  description,
  tag = "Project",
  images,
  image = "/images/projects/placeholder.png",
  link = "https://github.com/ChoniGomez",
}: Props) {
  // Array de imágenes normalizado
  const imageList = useMemo(() => {
    if (images && images.length > 0) return images;
    if (image) return [image];
    return ["/images/projects/placeholder.png"];
  }, [images, image]);

  // Estado del índice de imagen actual
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Funciones cíclicas de navegación
  const nextImage = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const currentImage = imageList[currentImageIndex] || image;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-700/60 bg-gradient-to-t from-[#1b1b1b] to-[#0d0d0d] shadow-lg transition-all duration-300 hover:border-gray-500 hover:shadow-2xl hover:from-[#182135] hover:to-[#080808]">
      {/* UI del Carrusel en la parte superior */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-gray-900 group/slider select-none">
        <Image
          src={currentImage}
          alt={`${title} - Vista ${currentImageIndex + 1}`}
          width={500}
          height={192}
          className="h-48 w-full rounded-t-lg object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />

        {/* Tag de la Categoría */}
        <div className="absolute left-3 top-3 z-10 rounded-full bg-gray-900/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/30">
          {tag}
        </div>

        {/* Indicador de foto actual si hay más de 1 imagen */}
        {imageList.length > 1 && (
          <div className="absolute right-3 top-3 z-10 rounded-full bg-gray-900/80 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-mono text-gray-200 border border-gray-700">
            {currentImageIndex + 1} / {imageList.length}
          </div>
        )}

        {/* Botones de navegación (solo visibles si el array tiene más de 1 imagen) */}
        {imageList.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/90 hover:scale-110 active:scale-95 focus:outline-none shadow-md border border-white/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Siguiente foto"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/90 hover:scale-110 active:scale-95 focus:outline-none shadow-md border border-white/10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Contenido de la tarjeta */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div className="space-y-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            title={hoverTitle || `Ver ${title}`}
            className="group/link inline-flex items-center gap-1.5 text-lg font-semibold text-slate-100 hover:text-blue-400 transition-colors"
          >
            <span>{title}</span>
            <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover/link:opacity-100 text-blue-400" />
          </a>
          <p
            className="text-sm text-slate-400 text-justify hyphens-auto leading-relaxed line-clamp-3"
            lang="es"
          >
            {description}
          </p>
        </div>

        {/* Botón de enlace en la parte inferior */}
        <div className="pt-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
          >
            <span>Ver Proyecto</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ModernInnerShadowCardVariant1;
