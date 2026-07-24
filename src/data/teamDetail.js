// src/data/teamDetail.js
import akshitPhoto from "../assets/teams/akshit-pfp.jpeg";

import { publicAsset } from "../utils/assetPath.js";

const teamDetail = [
  {
    id: "m-1",
    team: ["02", "01"],
    name: "Akshit Singh",
    role: "Frontend",
    shortDescription: "Handling the frontend of the team",
    longDescription:
      "Akshit leads the frontend architecture for the team, turning designs into fast, accessible interfaces. He focuses on component reusability and keeping the codebase clean as the product scales.",
    photoPath: akshitPhoto,
    resumePath: publicAsset("documents/AXE.pdf"),
    contributions: [
      "Built the component library used across all team pages",
      "Set up the CI pipeline for frontend deploys",
      "Led the redesign of the team section, including this card system",
    ],
    workLinks: [
      {
        label: "Portfolio Website",
        src: "https://github.com/akshitsingh13",
      },
      {
        label: "Web-based OS project",
        src: "https://github.com/akshitsingh13",
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
];

export default teamDetail;
