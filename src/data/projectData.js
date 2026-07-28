// src/data/projectData.js

import solarSystem from "../assets/projects/solar-system.png";

const projects = [
  {
    id: "p-1",
    title: "Cost Report App",
    author: "Brajesh",
    imgSrc: solarSystem,
    shortDescription:
      "A cost report application for SUPRA SAEINDIA competitions, helping teams calculate and manage costs for parts and assemblies with real-time totals and Excel export.",
    tech: "React · Vite · xlsx",
    githubLink: "https://github.com/not-brajesh/Cost-Report-App-",
    // liveDemo: "https://cost-report-app.vercel.app",
  },
  {
    id: "p-2",
    title: "Video Threat Detection",
    author: "Brajesh",
    imgSrc: solarSystem,
    shortDescription:
      "An AI-powered surveillance pipeline that detects, tracks, and analyzes threats in video using a vision-language model, producing structured JSON output end-to-end.",
    tech: "Python · LLaVA · Ollama",
    githubLink: "https://github.com/not-brajesh/video-threat-detection",
  },
  {
    id: "p-3",
    title: "Netra AI 2.0",
    author: "Brajesh",
    imgSrc: solarSystem,
    shortDescription:
      "An AI surveillance and incident-memory system with a dedicated frontend and backend, built as the next iteration of the Netra AI project skeleton.",
    tech: "React · Vite · Backend",
    githubLink: "https://github.com/not-brajesh/Netra-AI-2.0",
    // liveDemo: "https://netra-ai-2-0.vercel.app",
  },
  {
    id: "p-4",
    title: "QR Attendance",
    author: "Brajesh",
    imgSrc: solarSystem,
    shortDescription:
      "A QR-based attendance system installable as a PWA, letting faculty scan student QR codes and export attendance offline with a service worker.",
    tech: "JavaScript · PWA · Python",
    githubLink: "https://github.com/not-brajesh/QR-attendence-",
  },
  {
    id: "p-5",
    title: "Paint Web App",
    author: "Akshit",
    imgSrc: solarSystem,
    shortDescription:
      "A React-based drawing app with vector stroke storage, undo/redo history, pan and zoom, and multiple shape tools on a DPR-aware canvas.",
    tech: "React · Canvas API · JS",
    githubLink: "https://github.com/akshitsingh13/paint-web-app",
  },
  {
    id: "p-6",
    title: "Solar System",
    author: "Akshit",
    imgSrc: solarSystem,
    shortDescription:
      "An interactive 3D solar system simulation with orbiting planets, camera controls, and realistic lighting built entirely with Three.js.",
    tech: "HTML · Three JS · CSS",
    githubLink: "https://github.com/akshitsingh13/solar-system",
    // liveDemo: "https://akshitsingh13.github.io/solar-system/",
  },
];

export default projects;
