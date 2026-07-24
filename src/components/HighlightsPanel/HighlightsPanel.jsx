// src/components/HighlightsPanel/HighlightsPanel.jsx

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import sihPhoto1 from "../../assets/timeline/sih-photo-1.jpeg";

import "./HighlightsPanel.css";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  {
    title: "Hackathon Win",
    img: sihPhoto1,
  },
  {
    title: "Project Showcase",
    img: sihPhoto1,
  },
  {
    title: "Workshop",
    img: sihPhoto1,
  },
  {
    title: "Open Source",
    img: sihPhoto1,
  },
  {
    title: "Innovation",
    img: sihPhoto1,
  },
];

const CYCLE_MS = 4000;

const HighlightsPanel = () => {
  // -----------------------------
  // Carousel state
  // -----------------------------

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // -----------------------------
  // Refs
  // -----------------------------

  const highlightsRef = useRef(null);

  const rafRef = useRef(null);
  const startRef = useRef(null);
  const elapsedRef = useRef(0);

  // -----------------------------
  // GSAP: Pin Highlights section
  // -----------------------------

  useLayoutEffect(() => {
    const section = highlightsRef.current;

    if (!section) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,

        start: "top top",
        end: "+=35%",

        pin: true,
        pinSpacing: true,

        anticipatePin: 1,
      });
    }, highlightsRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // -----------------------------
  // GSAP: Active image parallax
  // -----------------------------

  useLayoutEffect(() => {
    const section = highlightsRef.current;

    if (!section) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const activeImage = section.querySelector(".slide.is-active img");

      if (!activeImage) {
        return;
      }

      gsap.fromTo(
        activeImage,
        {
          scale: 1.06,
          yPercent: -3,
        },
        {
          scale: 1.14,
          yPercent: 6,

          ease: "none",

          scrollTrigger: {
            trigger: section,

            start: "top top",
            end: "+=55%",

            scrub: 0.6,
          },
        },
      );
    }, highlightsRef);

    return () => {
      ctx.revert();
    };
  }, [activeIndex]);

  // -----------------------------
  // Refresh ScrollTrigger whenever
  // the active carousel slide changes
  // -----------------------------

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [activeIndex]);

  // -----------------------------
  // Carousel navigation
  // -----------------------------

  const goTo = useCallback((index) => {
    setActiveIndex(((index % PANELS.length) + PANELS.length) % PANELS.length);

    elapsedRef.current = 0;
    startRef.current = null;

    setProgress(0);
  }, []);

  const advance = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  // -----------------------------
  // Auto-advance + progress
  // -----------------------------

  useEffect(() => {
    if (isPaused) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      return undefined;
    }

    const tick = (timestamp) => {
      if (startRef.current === null) {
        startRef.current = timestamp - elapsedRef.current;
      }

      const elapsed = timestamp - startRef.current;

      elapsedRef.current = elapsed;

      setProgress(Math.min(elapsed / CYCLE_MS, 1));

      if (elapsed >= CYCLE_MS) {
        advance();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isPaused, activeIndex, advance]);

  // -----------------------------
  // Keyboard navigation
  // -----------------------------

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        goTo(activeIndex + 1);
      }

      if (event.key === "ArrowLeft") {
        goTo(activeIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, goTo]);

  // -----------------------------
  // Calculate carousel position
  // -----------------------------

  const getOffset = (index) => {
    let difference = index - activeIndex;

    const halfwayPoint = PANELS.length / 2;

    if (difference > halfwayPoint) {
      difference -= PANELS.length;
    }

    if (difference < -halfwayPoint) {
      difference += PANELS.length;
    }

    return difference;
  };

  return (
    <section
      ref={highlightsRef}
      className="section-00"
      aria-labelledby="highlights-title"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="section-00-title">
        <div className="section-00-header">00 — Featured</div>

        <h1 id="highlights-title" className="highlights-header">
          Highlights.
        </h1>
      </div>

      <div className="slideshow-stage">
        {PANELS.map((panel, index) => {
          const offset = getOffset(index);

          const isActive = offset === 0;

          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) {
            return null;
          }

          return (
            <button
              key={`${panel.title}-${index}`}
              type="button"
              className={`slide ${isActive ? "is-active" : ""}`}
              style={{
                "--offset": offset,
              }}
              onClick={() => goTo(index)}
              aria-label={`Show slide ${index + 1}: ${panel.title}`}
              aria-current={isActive ? "true" : undefined}
            >
              <div className="slide-image">
                <img src={panel.img} alt={panel.title} />
              </div>

              <div className="slide-scrim" />

              {isActive && (
                <>
                  <div className="slide-index">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(PANELS.length).padStart(2, "0")}
                  </div>

                  <div className="slide-caption">
                    <span className="slide-caption-prompt">&gt;</span>

                    <h3>{panel.title}</h3>

                    <span className="slide-caption-cursor" aria-hidden="true" />
                  </div>
                </>
              )}
            </button>
          );
        })}

        <button
          type="button"
          className="slide-arrow slide-arrow-left"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous slide"
        >
          &#8249;
        </button>

        <button
          type="button"
          className="slide-arrow slide-arrow-right"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next slide"
        >
          &#8250;
        </button>
      </div>

      <div className="dot-indicators">
        {PANELS.map((panel, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              type="button"
              key={`${panel.title}-dot-${index}`}
              className="dot-button"
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span className={`dot ${isActive ? "is-active" : ""}`}>
                {isActive && (
                  <span
                    className="dot-progress"
                    style={{
                      width: `${progress * 100}%`,
                    }}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default HighlightsPanel;
