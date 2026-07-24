// src/main.jsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import App from "./App.jsx";

import "./index.css";

gsap.registerPlugin(ScrollTrigger);

/*
 * Global Lenis instance.
 *
 * Exported so route-level utilities such as ScrollManager
 * can synchronize Lenis when navigation occurs.
 */
export const lenis = new Lenis({
  autoRaf: false,
  smoothWheel: true,
});

/*
 * Keep ScrollTrigger synchronized with Lenis scrolling.
 */
lenis.on("scroll", ScrollTrigger.update);

/*
 * Drive Lenis from GSAP's ticker so Lenis and
 * ScrollTrigger use the same animation loop.
 */
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

/*
 * Prevent GSAP's lag smoothing from interfering
 * with Lenis smooth scrolling.
 */
gsap.ticker.lagSmoothing(0);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
