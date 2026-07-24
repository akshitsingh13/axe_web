// src/components/About/About.jsx

import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import useSectionReveal from "../../hooks/useSectionReveal.js";

import "./About.css";

const About = () => {
  const sectionRef = useRef(null);

  useSectionReveal(
    sectionRef,
    ".about-lead, .about-card, .about-motto, .journey-button",
    {
      y: 32,
      stagger: 0.1,
    },
  );
  const navigate = useNavigate();

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-01"
      aria-labelledby="about-title"
    >
      <div className="section-01-title">
        <div className="section-01-header">01 — WHO WE ARE</div>

        <h2 id="about-title" className="about-header">
          About Team Axe
        </h2>
      </div>

      <div className="about-body">
        <div className="about-lead-col">
          <p className="about-lead">
            We exist to cut through the gap between theory and practice. Team
            Axe is a cross-disciplinary crew of undergrad engineers who'd rather
            ship a working prototype than memorize a slide deck.
          </p>

          <button
            type="button"
            className="about-cta"
            onClick={() => navigate("/journey")}
          >
            See Our Journey
          </button>
        </div>

        <div className="about-cards">
          <article className="about-card">
            <div className="about-card-label">Our Goal</div>

            <p className="about-card-text">
              Give every member hands-on experience building real, working
              systems before they graduate — no gatekeeping, no permission
              slips.
            </p>
          </article>

          <article className="about-card">
            <div className="about-card-label">What We Do</div>

            <p className="about-card-text">
              Workshops, hackathons, open-source contributions, and
              semester-long build projects that ship to real users, not just a
              grade sheet.
            </p>
          </article>

          <article className="about-card">
            <div className="about-card-label">How We Do It</div>

            <p className="about-card-text">
              Small pods, tight feedback loops, and a bias toward shipping — we
              pair every idea with a prototype in the first week, then iterate
              in public.
            </p>
          </article>
        </div>
      </div>

      <div className="about-motto">
        <p>"Build first. Ask permission never."</p>
      </div>
    </section>
  );
};

export default About;
