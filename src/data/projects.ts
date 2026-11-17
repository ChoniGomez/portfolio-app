export interface Project {
  title: string;
  summary: string;
  category: string;
  technology: string;
  images: string[];
  image?: string;
  link: string;
  slug: string;
  publishedDate?: string;
}

export const projects: Project[] = [
  {
    title: "CultiShop",
    summary: "E-commerce integral. Node.js, Fastify, React, PostgreSQL, Docker.",
    category: "Full-Stack",
    technology: "Full-Stack",
    images: [
      "/images/projects/cultishop1.png",
      "/images/projects/cultishop2.png",
      "/images/projects/cultishop3.png",
    ],
    link: "https://www.cultishop.com.ar/",
    slug: "cultishop",
    publishedDate: "2026",
  },
  {
    title: "QueRico!",
    summary: "E-commerce gastronómico en tiempo real. React, Node.js, Express, PostgreSQL, Tailwind.",
    category: "Full-Stack",
    technology: "Full-Stack",
    images: [
      "/images/projects/querico1.png",
      "/images/projects/querico2.png",
      "/images/projects/querico3.png",
    ],
    link: "https://quericoweb.vercel.app/",
    slug: "querico",
    publishedDate: "2026",
  },
  {
    title: "GuaraSoft",
    summary: "Sistema de Gestión de Postventa Automotriz. Java, JPA, PostgreSQL.",
    category: "Full-Stack",
    technology: "Full-Stack",
    images: [
      "/images/projects/guarasoft1.png",
      "/images/projects/guarasoft2.png",
      "/images/projects/guarasoft3.png",
    ],
    link: "https://github.com/ChoniGomez/GuaraSoft",
    slug: "guarasoft",
    publishedDate: "2025",
  },
  {
    title: "Supermercado SOOPER",
    summary: "Plataforma POS y Backend. Java, Spring Boot, MySQL.",
    category: "Full-Stack",
    technology: "Full-Stack",
    images: [
      "/images/projects/supermercado-sooper-front.png",
      "/images/projects/supermercado-sooper-admin.png",
      "/images/projects/supermercado-sooper.png",
    ],
    link: "https://github.com/ChoniGomez/Supermercado-SOOPER",
    slug: "supermercado-sooper",
    publishedDate: "2025",
  },
  {
    title: "Sistema Integral de Control de Stock",
    summary: "Vanilla JS, PHP, MySQL.",
    category: "Full-Stack",
    technology: "Full-Stack",
    images: [
      "/images/projects/sistema1.png",
      "/images/projects/sistema2.png",
      "/images/projects/sistema3.png",
    ],
    link: "https://github.com/ChoniGomez/Proyecto-Web",
    slug: "sistema-control-stock",
    publishedDate: "2024",
  },
  {
    title: "Plataforma Web Fullstack MEAN",
    summary: "AngularJS, Node.js, MongoDB.",
    category: "Full-Stack",
    technology: "Full-Stack",
    images: [
      "/images/projects/plataforma-fullstack-mean-front.png",
      "/images/projects/plataforma-fullstack-mean-admin.png",
      "/images/projects/plataforma-fullstack-mean.png",
    ],
    link: "https://github.com/ChoniGomez",
    slug: "plataforma-fullstack-mean",
    publishedDate: "2024",
  },
  {
    title: "Sistema de Optimización de Recursos (Tesis)",
    summary: "Algoritmos Genéticos (AG) y Optimización de Colonia de Hormigas (OCH) en Python.",
    category: "IA & Visión",
    technology: "IA & Visión",
    images: [
      "/images/projects/tfc1.png",
      "/images/projects/tfc2.png",
      "/images/projects/tfc3.png",
    ],
    link: "https://github.com/ChoniGomez/TFC-Gomez-Onufrijczuk",
    slug: "optimizacion-recursos-tesis",
    publishedDate: "2025",
  },
  {
    title: "Modelos de Machine Learning y Visión Artificial",
    summary: "Detección de objetos y clasificación con Python, OpenCV, YOLO, K-Means++.",
    category: "IA & Visión",
    technology: "IA & Visión",
    images: [
      "/images/projects/machine-learning-vision-artificial-front.png",
      "/images/projects/machine-learning-vision-artificial-admin.png",
      "/images/projects/machine-learning-vision-artificial.png",
    ],
    link: "https://github.com/ChoniGomez",
    slug: "machine-learning-vision-artificial",
    publishedDate: "2025",
  },
  {
    title: "Integración Hardware/Software y Sistemas Embebidos",
    summary: "Desarrollo de lógica de control con C/C++ en Arduino, sincronización IoT (PySerial/Bluetooth) aplicados a prototipos mecánicos y automatización.",
    category: "IoT & Robótica",
    technology: "IoT & Robótica",
    images: [
      "/images/projects/integracion-hardware-software-embebidos-front.png",
      "/images/projects/integracion-hardware-software-embebidos-admin.png",
      "/images/projects/integracion-hardware-software-embebidos.png",
    ],
    link: "https://github.com/ChoniGomez",
    slug: "integracion-hardware-software-embebidos",
    publishedDate: "2025",
  },
];
