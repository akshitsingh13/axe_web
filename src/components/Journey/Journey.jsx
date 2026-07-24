// src/components/Journey/Journey.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Timeline from "./Timeline.jsx";

import "./Journey.css";

const Journey = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  const handleBack = () => {
    navigate("/");

    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    });
  };

  return (
    <main className="journey-page">
      <div className="journey-container">
        <button
          type="button"
          className="journey-back-button"
          onClick={handleBack}
        >
          <span className="journey-back-arrow" aria-hidden="true">
            ←
          </span>

          <span>Back</span>
        </button>

        <header className="journey-header">
          <div className="journey-section-label">01 — OUR JOURNEY</div>

          <h1>Our Journey</h1>

          <p>
            A timeline of the things we've built, learned, attempted, and
            achieved along the way.
          </p>
        </header>

        <Timeline />
      </div>
    </main>
  );
};

export default Journey;
