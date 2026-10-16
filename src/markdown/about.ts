export const aboutCode = `interface Developer {
  name: string;
  role: string;
  location: string;
  currentCompany: string;
  skills: {
    frontend: string[];
    backend: string[];
    databases: string[];
    aiAndVision: string[];
    infrastructureAndNetworking: string[];
    electronicsAndRobotics: string[];
  };
}

// Personal Information
const me: Developer = {
  name: "Jonathan Matias Gomez",
  role: "Ingeniero en Informática & Full Stack Developer",
  location: "Posadas, Misiones, Argentina",
  currentCompany: "Escuela de Robótica de Misiones",
  skills: {
    frontend: ["React", "Vue.js"],
    backend: [
      "Node.js (Fastify)",
      "PHP (Laravel, CodeIgniter)",
      "Java (Spring Boot)",
    ],
    databases: ["PostgreSQL", "MySQL", "Prisma ORM"],
    aiAndVision: ["Python", "OpenCV", "YOLO", "MediaPipe"],
    infrastructureAndNetworking: [
      "Linux",
      "Windows",
      "Cisco Packet Tracer",
      "Docker",
    ],
    electronicsAndRobotics: [
      "Arduino",
      "ESP32",
      "C/C++",
      "3D Printing",
    ],
  },
};`;
