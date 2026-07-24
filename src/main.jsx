// src/main.jsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import "./index.css";
import App from "./App.jsx";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.1,
  smoothWheel: true,
  syncTouch: false,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const refreshScrollTrigger = () => {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
};

window.addEventListener("load", refreshScrollTrigger);

document.querySelectorAll("img").forEach((image) => {
  if (image.complete) return;

  image.addEventListener("load", refreshScrollTrigger, { once: true });
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
