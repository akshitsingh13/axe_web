// src/data/teamDetail.js
import akshitPhoto from "../assets/teams/akshit-pfp.jpeg";
import defaultPhoto from "../assets/teams/defaultPfp.png";
import snehaPhoto from "../assets/teams/snehaPfp.jpeg";
import aryanPhoto from "../assets/teams/aryanPfp.jpeg";
import brajeshPhoto from "../assets/teams/brajeshPfp.jpeg";
import bhavyaPhoto from "../assets/teams/bhavyaPfp.jpeg";

import { publicAsset } from "../utils/assetPath.js";

const teamDetail = [
  {
    id: "m-2",
    team: ["00", "01", "02"],
    name: "Brajesh Kumar",
    role: "Team Leader & Founder",
    shortDescription:
      "Founder of Team AXE, building a culture where innovation meets execution—creating technology that solves real-world problems and leaves a lasting impact beyond the college.",
    longDescription:
      "I am the Founder and Team Leader of Team AXE, leading a community of builders, innovators, and problem-solvers dedicated to developing technology that creates real-world impact.My vision is to build Team AXE into one of India's most respected student technology teams—representing our college at national and international hackathons, research competitions, and global innovation platforms. I believe great teams are built on curiosity, discipline, execution, and the courage to solve problems that truly matter.Beyond leading the team, Personally, I work actively  in Artificial Intelligence, Computer Vision, and Generative AI, where I focus on developing intelligent systems that solve practical problems. My journey includes an AI internship at Armedu, 3rd Rank at a Google Developer Group Hackathon, participation in Smart India Hackathon, and continuous contributions through open-source projects and real-world software development.As a leader, my goal is not just to build successful projects but to build people—creating an environment where every member of Team AXE can learn, innovate, collaborate, and compete with confidence on the global stage.This is only the beginning. The mission is to build technology that matters, inspire future innovators, and create a legacy that continues long after we graduate.Leadership, to me, is not about titles—it's about creating opportunities for others to grow. My goal is to build Team AXE into a globally recognized student innovation community that represents our college through excellence, collaboration, and meaningful technology.The dream isn't to be remembered as a student. The dream is to build something that students remember",
    photoPath: brajeshPhoto,
    // resumePath: publicAsset("documents/AXE.pdf"),
    contributions: [
      "Built the component library used across all team pages",
      "Set up the CI pipeline for frontend deploys",
      "Led the redesign of the team section, including this card system",
    ],
    workLinks: [
      {
        label: "Cost Report App",
        src: "https://github.com/not-brajesh/Cost-Report-App-",
      },
      {
        label: "Video Threat Detection",
        src: "https://github.com/not-brajesh/video-threat-detection",
      },
      {
        label: "NETRA AI 2.0",
        src: "https://github.com/not-brajesh/Netra-AI-2.0",
      },
      {
        label: "QR Attendance",
        src: "https://github.com/not-brajesh/Netra-AI-2.0",
      },
    ],
    social: [
      {
        type: "github",
        icon: "gh",
        src: "https://github.com/not-brajesh",
      },
      {
        type: "linkdin",
        icon: "in",
        src: "https://linkedin.com/in/not-brajesh",
      },
    ],
  },

  {
    id: "m-1",
    team: ["00", "01"],
    name: "Akshit Singh",
    role: "Frontend",
    shortDescription: "Handling the frontend of the team",
    longDescription:
      "Akshit leads the frontend architecture for the team, turning designs into fast, accessible interfaces. He focuses on component reusability and keeping the codebase clean as the product scales.",
    photoPath: akshitPhoto,
    // resumePath: publicAsset("documents/AXE.pdf"),
    contributions: [
      "Built the component library used across all team pages",
      "Set up the CI pipeline for frontend deploys",
      "Led the redesign of the team section, including this card system",
    ],
    workLinks: [
      {
        label: "Paint Web App",
        src: "https://github.com/akshitsingh13/paint-web-app",
      },
      {
        label: "Solar System - 3D Model",
        src: "https://github.com/akshitsingh13/solar-system",
      },
    ],
    social: [
      {
        type: "github",
        icon: "gh",
        src: "https://github.com/akshitsingh13",
      },
      {
        type: "linkdin",
        icon: "in",
        src: "https://www.linkedin.com/in/akshitsingh13/",
      },
      {
        type: "email",
        icon: "@",
        src: "e25b000931@adypu.edu.in",
      },
    ],
  },

  {
    id: "m-3",
    team: ["00", "02"],
    name: "Aryan Sharma",
    role: "Backend",
    // shortDescription: "Handling the frontend of the team",
    longDescription:
      "Aryan leads the backend development for the team, designing robust APIs, optimizing databases, and building scalable server-side solutions. He emphasizes clean code, performance, and system reliability to ensure the product scales efficiently.",
    photoPath: aryanPhoto,
    // resumePath: publicAsset("documents/AXE.pdf"),
    contributions: [
      "Qualified for the Smart India Hackathon (SIH) 2025 Internal Round with a complete project solution.",
      "Led hardware design and prototype development as Hardware Lead for the Solapur Municipal Corporation hackathon project.",
      "Secured Rank 6 at the GDG Nanded Hackathon among Pune-region colleges.",
    ],
    // workLinks: [
    //   {
    //     label: "Portfolio Website",
    //     src: "https://github.com/akshitsingh13",
    //   },
    //   {
    //     label: "Web-based OS project",
    //     src: "https://github.com/akshitsingh13",
    //   },
    // ],
    social: [
      // {
      //   type: "github",
      //   icon: "gh",
      //   src: "https://github.com/akshitsingh13",
      // },
      {
        type: "linkdin",
        icon: "in",
        src: "https://www.linkedin.com/in/aryan-sharma-487869209/",
      },
      // {
      //   type: "instagram",
      //   icon: "ig",
      //   src: "https://instagram.com/akshitsingh13",
      // },
      // {
      //   type: "email",
      //   icon: "@",
      //   src: "e25b000931@adypu.edu.in",
      // },
    ],
  },

  {
    id: "m-4",
    team: ["00", "03"],
    name: "Sneha Kumari",
    role: "Design + Media",
    // shortDescription: "Handling the frontend of the team",
    longDescription:
      "I am deeply interested in Finance and learning C++ and solving leetcode problems. Currently I am leading the Social & Design Lead Team of Team Axe. Hoping to join the techincal team later on",
    photoPath: snehaPhoto,
    // resumePath: publicAsset("documents/AXE.pdf"),
    contributions: [
      "Made some social media post for team axe",
      "Helping in designing team axe's T-Shirt",
    ],
    // workLinks: [
    //   {
    //     label: "Portfolio Website",
    //     src: "https://github.com/akshitsingh13",
    //   },
    //   {
    //     label: "Web-based OS project",
    //     src: "https://github.com/akshitsingh13",
    //   },
    // ],
    social: [
      {
        type: "linkdin",
        icon: "in",
        src: "https://www.linkedin.com/in/snehakumaribee/",
      },
      {
        type: "email",
        icon: "@",
        src: "e25b000478@adypu.edu.in",
      },
    ],
  },

  {
    id: "m-5",
    team: ["00", "06"],
    name: "Bhavya Mishra",
    role: "Documentation and Research",
    // shortDescription: "",
    longDescription:
      "Hi I'm Bhavya currently in 2nd yr and I got 9.5 sgpa in 2nd sem and it's good but I not overwhelmed about it because I don't know how to code , don't even know c which was in 1st sem ...... Some achievements - runner up in techshastra , 2 round in SIH , 2nd runner up in gdg hackathon mit , 6 position in gdg hackathon nanded .... I was working as a researcher in team and design ppt few time (not so good though) and at last I have to improve alot in all fields like communication, coding, etc.",
    photoPath: bhavyaPhoto,
    // resumePath: publicAsset("documents/AXE.pdf"),
    contributions: [
      "Built the component library used across all team pages",
      "Set up the CI pipeline for frontend deploys",
      "Led the redesign of the team section, including this card system",
    ],
    // workLinks: [
    //   {
    //     label: "Portfolio Website",
    //     src: "https://github.com/akshitsingh13",
    //   },
    //   {
    //     label: "Web-based OS project",
    //     src: "https://github.com/akshitsingh13",
    //   },
    // ],
    social: [
      {
        type: "github",
        icon: "gh",
        src: "https://github.com/akshitsingh13",
      },
      {
        type: "linkdin",
        icon: "in",
        src: "https://www.linkedin.com/in/akshitsingh13/",
      },
      {
        type: "instagram",
        icon: "ig",
        src: "https://instagram.com/akshitsingh13",
      },
      {
        type: "email",
        icon: "@",
        src: "e25b000931@adypu.edu.in",
      },
    ],
  },

  {
    id: "m-6",
    team: ["00", "05"],
    name: "Pragati Dubey",
    role: "Electronics",
    // shortDescription: "Handling the frontend of the team",
    longDescription:
      "I am leading the elctronics of the team. Preivously a Diploma ECE student specializing in Industrial Automation, PLC Programming, and Embedded Systems. Completed a PLC/Ladder Logic internship at Tata Steel Utilities & Infrastructure Services Ltd., plus training at IDTR in Electronic CAD, Embedded Systems, and Siemens Automation. Passionate about hands-on projects and continuous learning. Open to internships, industrial training, and entry-level engineering roles.",
    photoPath: defaultPhoto,
    // resumePath: publicAsset("documents/AXE.pdf"),
    contributions: [
      "Built the component library used across all team pages",
      "Set up the CI pipeline for frontend deploys",
      "Led the redesign of the team section, including this card system",
    ],
    // workLinks: [
    //   {
    //     label: "Portfolio Website",
    //     src: "https://github.com/akshitsingh13",
    //   },
    //   {
    //     label: "Web-based OS project",
    //     src: "https://github.com/akshitsingh13",
    //   },
    // ],
    social: [
      {
        type: "linkdin",
        icon: "in",
        src: "https://www.linkedin.com/in/pragati-dubey-737506379/",
      },
    ],
  },
];

export default teamDetail;
