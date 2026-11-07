export interface Project {
  title: string;
  summary: string;
  category: string;
  technology: string;
  image: string;
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
    image: "/images/projects/cultishop.png",
    link: "https://github.com/ChoniGomez",
    slug: "cultishop",
    publishedDate: "2026",
  },
  {
    title: "QueRico!",
    summary: "E-commerce gastronómico en tiempo real. React, Node.js, Express, PostgreSQL, Tailwind.",
    category: "Full-Stack",
    technology: "Full-Stack",
    image: "/images/projects/querico.png",
    link: "https://github.com/ChoniGomez",
    slug: "querico",
    publishedDate: "2026",
  },
  {
    title: "GuaraSoft",
    summary: "Sistema de Gestión de Postventa Automotriz. Java, JPA, PostgreSQL.",
    category: "Full-Stack",
    technology: "Full-Stack",
    image: "/images/projects/guarasoft.png",
    link: "https://github.com/ChoniGomez",
    slug: "guarasoft",
    publishedDate: "2025",
  },
  {
    title: "Supermercado SOOPER",
    summary: "Plataforma POS y Backend. Java, Spring Boot, MySQL.",
    category: "Full-Stack",
    technology: "Full-Stack",
    image: "/images/projects/supermercado-sooper.png",
    link: "https://github.com/ChoniGomez",
    slug: "supermercado-sooper",
    publishedDate: "2025",
  },
  {
    title: "Sistema Integral de Control de Stock",
    summary: "Vanilla JS, PHP, MySQL.",
    category: "Full-Stack",
    technology: "Full-Stack",
    image: "/images/projects/sistema-control-stock.png",
    link: "https://github.com/ChoniGomez",
    slug: "sistema-control-stock",
    publishedDate: "2024",
  },
  {
    title: "Plataforma Web Fullstack MEAN",
    summary: "AngularJS, Node.js, MongoDB.",
    category: "Full-Stack",
    technology: "Full-Stack",
    image: "/images/projects/plataforma-fullstack-mean.png",
    link: "https://github.com/ChoniGomez",
    slug: "plataforma-fullstack-mean",
    publishedDate: "2024",
  },
  {
    title: "Sistema de Optimización de Recursos (Tesis)",
    summary: "Algoritmos Genéticos (AG) y Optimización de Colonia de Hormigas (OCH) en Python.",
    category: "IA & Visión",
    technology: "IA & Visión",
    image: "/images/projects/optimizacion-recursos-tesis.png",
    link: "https://github.com/ChoniGomez",
    slug: "optimizacion-recursos-tesis",
    publishedDate: "2025",
  },
  {
    title: "Modelos de Machine Learning y Visión Artificial",
    summary: "Detección de objetos y clasificación con Python, OpenCV, YOLO, K-Means++.",
    category: "IA & Visión",
    technology: "IA & Visión",
    image: "/images/projects/machine-learning-vision-artificial.png",
    link: "https://github.com/ChoniGomez",
    slug: "machine-learning-vision-artificial",
    publishedDate: "2025",
  },
  {
    title: "Integración Hardware/Software y Sistemas Embebidos",
    summary: "Desarrollo de lógica de control con C/C++ en Arduino, sincronización IoT (PySerial/Bluetooth) aplicados a prototipos mecánicos y automatización.",
    category: "IoT & Robótica",
    technology: "IoT & Robótica",
    image: "/images/projects/integracion-hardware-software-embebidos.png",
    link: "https://github.com/ChoniGomez",
    slug: "integracion-hardware-software-embebidos",
    publishedDate: "2025",
  },
];
