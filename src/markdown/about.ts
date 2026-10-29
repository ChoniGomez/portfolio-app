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
    frontend: ["React", "Next.js", "Angular", "Vue.js", "TypeScript", "JavaScript"],
    backend: [
      "Node.js",
      "PHP (CodeIgniter)",
      "Java (Spring Boot)",
    ],
    databases: ["PostgreSQL", "MySQL", "MongoDB"],
    aiAndVision: ["Python", "OpenCV"],
    infrastructureAndNetworking: [
      "Linux",
      "Windows",
      "Cisco Packet Tracer",
      "Docker",
    ],
    electronicsAndRobotics: [
      "Arduino",
      "C++",
    ],
  },
};`;
