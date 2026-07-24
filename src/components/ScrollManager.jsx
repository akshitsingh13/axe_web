// src/components/ScrollManager.jsx

import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import { lenis } from "../main.jsx";

const ScrollManager = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    /*
     * Stop Lenis before changing the scroll position.
     * This prevents its current smooth-scroll state from
     * fighting against the route reset.
     */
    lenis.stop();

    /*
     * Reset Lenis's internal scroll position immediately.
     * No smooth animation should occur between routes.
     */
    lenis.scrollTo(0, {
      immediate: true,
    });

    /*
     * Native fallback so the browser itself is also
     * guaranteed to be at the top.
     */
    window.scrollTo(0, 0);

    /*
     * Resume normal smooth scrolling.
     */
    lenis.start();

    /*
     * Wait until React has committed the new route layout
     * before recalculating all ScrollTrigger positions.
     */
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [location.pathname]);

  return null;
};

export default ScrollManager;
