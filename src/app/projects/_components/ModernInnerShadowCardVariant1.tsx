"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";

interface Props {
  title: string;
  hoverTitle?: string;
  description: string;
  tag?: string;
  images?: string[];
  image?: string;
  link?: string;
}

const FALLBACK_IMAGE = "/images/projects/placeholder.png";

export function ModernInnerShadowCardVariant1({
  title,
  hoverTitle,
  description,
  tag = "Project",
  images,
  image = FALLBACK_IMAGE,
  link = "https://github.com/ChoniGomez",
}: Props) {
  // Array de imágenes normalizado
  const imageList = useMemo(() => {
    if (images && images.length > 0) return images;
    if (image) return [image];
    return [FALLBACK_IMAGE];
  }, [images, image]);

  // Estado del índice de imagen actual y modal lightbox
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Registro de errores de carga de imágenes para activar fallback
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Funciones cíclicas de navegación en la tarjeta
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

  // Funciones de navegación dentro del modal
  const handleModalPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => {
      const nextIdx = (prev - 1 + imageList.length) % imageList.length;
      const targetImg = imageList[nextIdx];
      setSelectedImage(failedImages[targetImg] ? FALLBACK_IMAGE : targetImg);
      return nextIdx;
    });
  };

  const handleModalNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => {
      const nextIdx = (prev + 1) % imageList.length;
      const targetImg = imageList[nextIdx];
      setSelectedImage(failedImages[targetImg] ? FALLBACK_IMAGE : targetImg);
      return nextIdx;
    });
  };

  const handleModalClose = () => {
    setSelectedImage(null);
  };

  // Manejo de teclado (Escape para cerrar, flechas para navegar)
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowLeft" && imageList.length > 1) {
        setCurrentImageIndex((prev) => {
          const nextIdx = (prev - 1 + imageList.length) % imageList.length;
          const targetImg = imageList[nextIdx];
          setSelectedImage(failedImages[targetImg] ? FALLBACK_IMAGE : targetImg);
          return nextIdx;
        });
      } else if (e.key === "ArrowRight" && imageList.length > 1) {
        setCurrentImageIndex((prev) => {
          const nextIdx = (prev + 1) % imageList.length;
          const targetImg = imageList[nextIdx];
          setSelectedImage(failedImages[targetImg] ? FALLBACK_IMAGE : targetImg);
          return nextIdx;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, imageList, failedImages]);

  const rawImage = imageList[currentImageIndex] || image;
  const isCurrentFailed = Boolean(failedImages[rawImage]);
  const currentImage = isCurrentFailed ? FALLBACK_IMAGE : rawImage;

  return (
    <>
      <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-700/60 bg-gradient-to-t from-[#1b1b1b] to-[#0d0d0d] shadow-lg transition-all duration-300 hover:border-gray-500 hover:shadow-2xl hover:from-[#182135] hover:to-[#080808]">
        {/* UI del Carrusel en la parte superior con cursor de zoom */}
        <div
          onClick={() => setSelectedImage(currentImage)}
          className="relative h-48 w-full cursor-zoom-in overflow-hidden rounded-t-lg bg-gray-900 group/slider select-none border-b border-gray-800"
          title="Haz clic para ampliar la imagen"
        >
          <Image
            src={currentImage}
            alt={`${title} - Vista ${currentImageIndex + 1}`}
            width={500}
            height={192}
            className="h-48 w-full rounded-t-lg object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            onError={() => {
              if (!failedImages[rawImage]) {
                setFailedImages((prev) => ({ ...prev, [rawImage]: true }));
              }
            }}
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

      {/* Modal / Lightbox a pantalla completa */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={handleModalClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          {/* Botón de cerrar visible en esquina superior derecha */}
          <button
            type="button"
            onClick={handleModalClose}
            aria-label="Cerrar visor"
            className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-gray-900/80 text-white shadow-xl transition-all duration-200 hover:scale-110 hover:bg-gray-800 active:scale-95 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Botón navegación anterior en modal */}
          {imageList.length > 1 && (
            <button
              type="button"
              onClick={handleModalPrev}
              aria-label="Imagen anterior"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black/90 active:scale-95 focus:outline-none"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {/* Contenedor central con la imagen en alta resolución */}
          <div
            className="relative flex max-h-[90vh] max-w-5xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt={`${title} - Vista ampliada ${currentImageIndex + 1}`}
              className="max-h-[90vh] max-w-5xl rounded-lg object-contain shadow-2xl border border-gray-800 bg-gray-950/50"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== FALLBACK_IMAGE) {
                  target.src = FALLBACK_IMAGE;
                }
              }}
            />

            {/* Contador / Indicador de imagen en modal */}
            {imageList.length > 1 && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-full border border-gray-700 bg-gray-900/90 px-3 py-1 font-mono text-xs text-gray-200 backdrop-blur-md">
                {currentImageIndex + 1} / {imageList.length}
              </div>
            )}
          </div>

          {/* Botón navegación siguiente en modal */}
          {imageList.length > 1 && (
            <button
              type="button"
              onClick={handleModalNext}
              aria-label="Siguiente imagen"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black/90 active:scale-95 focus:outline-none"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default ModernInnerShadowCardVariant1;
