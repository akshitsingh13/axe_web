// src/components/ScrollManager.jsx

import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

import { ScrollTrigger } from "gsap/ScrollTrigger";

const ScrollManager = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const refresh = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refresh);
    };
  }, [location.pathname]);

  return null;
};

export default ScrollManager;
