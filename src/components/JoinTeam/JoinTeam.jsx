// src/components/JoinTeam/JoinTeam.jsx

import "./JoinTeam.css";
import { useRef } from "react";
import useSectionReveal from "../../hooks/useSectionReveal.js";

const JoinTeam = () => {
  const sectionRef = useRef(null);

  useSectionReveal(
    sectionRef,
    ".join-label, .join-content h2, .join-content p, .join-button, .idea-cta p, .idea-cta-button",
    {
      y: 36,
      stagger: 0.11,
    },
  );
  const JOIN_FORM_URL = "https://forms.gle/AU97LN2aXyb6mFCb7";
  const IDEA_FORM_URL = "https://forms.gle/uhTWT5DhaTpcjs1e8";

  const goToJoinForm = () => {
    window.open(JOIN_FORM_URL, "_blank", "noopener,noreferrer");
  };

  const goToIdeaForm = () => {
    window.open(IDEA_FORM_URL, "_blank", "noopener,noreferrer");
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

        <button type="button" className="join-button" onClick={goToJoinForm}>
          Join The Team →
        </button>
      </div>

      <div className="idea-cta">
        <p>
          Have an idea? Want to build something? Click the button here and fill
          the form, and we will get back to you!!
        </p>

        <button
          type="button"
          className="idea-cta-button"
          onClick={goToIdeaForm}
        >
          <span>Pitch Your Idea</span>
          <span className="idea-cta-arrow">→</span>
        </button>
      </div>
    </section>
  );
};

export default JoinTeam;
