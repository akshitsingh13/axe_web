// src/hooks/useSectionReveal.js

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useSectionReveal = (sectionRef, selector, options = {}) => {
  useLayoutEffect(() => {
    if (!sectionRef.current) return undefined;

    const {
      y = 36,
      stagger = 0.1,
      duration = 0.8,
      start = "top 78%",
    } = options;

    const ctx = gsap.context(() => {
      const elements = sectionRef.current.querySelectorAll(selector);

      if (!elements.length) return;

      gsap.fromTo(
        elements,
        {
          autoAlpha: 0,
          y,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          stagger,
          ease: "power2.out",

          scrollTrigger: {
            trigger: sectionRef.current,
            start,
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [
    sectionRef,
    selector,
    options.y,
    options.stagger,
    options.duration,
    options.start,
  ]);
};

export default useSectionReveal;
