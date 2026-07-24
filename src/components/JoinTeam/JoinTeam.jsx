// src/components/JoinTeam/JoinTeam.jsx

import "./JoinTeam.css";
import { useRef } from "react";
import useSectionReveal from "../../hooks/useSectionReveal.js";

const JoinTeam = () => {
  const sectionRef = useRef(null);

  useSectionReveal(
    sectionRef,
    ".join-label, .join-content h2, .join-content p, .join-button",
    {
      y: 36,
      stagger: 0.11,
    },
  );
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="join"
      className="section-05"
      aria-labelledby="join-title"
    >
      <div className="join-label">05 — JOIN US</div>

      <div className="join-content">
        <div>
          <h2 id="join-title">
            Want To Build
            <br />
            Something Real?
          </h2>

          <p>
            We're always looking for people who would rather build, break,
            learn, and ship than wait for permission.
          </p>
        </div>

        <button type="button" className="join-button" onClick={scrollToContact}>
          Join The Team →
        </button>
      </div>
    </section>
  );
};

export default JoinTeam;
