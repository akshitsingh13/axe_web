// src/components/Projects/Projects.jsx

import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

import projects from "../../data/projectData.js";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;

    if (!section || !grid) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(grid.querySelectorAll(".project-card"));

      if (!cards.length) {
        return;
      }

      /*
       * Set initial card positions.
       *
       * Cards alternate between entering from the
       * left and right.
       */
      cards.forEach((card, index) => {
        gsap.set(card, {
          x: index % 2 === 0 ? -120 : 120,

          y: 35,
          autoAlpha: 0,
          scale: 0.94,
        });
      });

      /*
       * One scrubbed timeline controls the entire
       * pinned Projects sequence.
       */
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: "top top",
          end: "+=140%",

          pin: true,
          pinSpacing: true,

          scrub: 0.8,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });

      /*
       * Section heading enters first.
       */
      timeline.fromTo(
        section.querySelector(".projects-title"),
        {
          y: 30,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,

          duration: 0.35,
          ease: "none",
        },
      );

      /*
       * Then cards assemble into the grid.
       */
      timeline.to(
        cards,
        {
          x: 0,
          y: 0,

          autoAlpha: 1,
          scale: 1,

          stagger: 0.16,

          duration: 0.7,

          ease: "none",
        },
        0.15,
      );

      /*
       * Small settling movement at the end.
       */
      timeline.to(cards, {
        y: -6,

        stagger: 0.04,

        duration: 0.2,

        ease: "none",
      });
    }, sectionRef);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-02"
      aria-labelledby="projects-title"
    >
      <div className="projects-title">
        <div className="section-label">02 — PROJECTS</div>

        <h2 id="projects-title" className="projects-heading">
          What We've Built
        </h2>
      </div>

      <div ref={gridRef} className="projects-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={`${project.id}-${index}`}>
            <div className="project-content">
              <div className="project-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <h3 className="project-title">{project.title}</h3>

              <p className="project-description">{project.shortDescription}</p>

              <p className="project-tech">{project.tech}</p>

              <div className="project-links">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  <FaGithub aria-hidden="true" />
                  GitHub
                </a>

                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  <FaExternalLinkAlt aria-hidden="true" />
                  Live Demo
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
