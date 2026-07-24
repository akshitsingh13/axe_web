// src/components/Achievements/Achievements.jsx

import achievementData from "../../data/achievementData.js";
import { useRef } from "react";
import useSectionReveal from "../../hooks/useSectionReveal.js";
import "./Achievements.css";

const Achievements = () => {
  const sectionRef = useRef(null);

  useSectionReveal(sectionRef, ".achievements-title, .achievement-card", {
    y: 30,
    stagger: 0.12,
  });
  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="section-03"
      aria-labelledby="achievements-title"
    >
      <div className="achievements-title">
        <div className="section-label">03 — ACHIEVEMENTS</div>

        <h2 id="achievements-title" className="achievements-heading">
          By The Numbers
        </h2>
      </div>

      <div className="achievements-grid">
        {achievementData.map((achievement) => (
          <article className="achievement-card" key={achievement.id}>
            <div className="achievement-value">{achievement.value}</div>

            <div className="achievement-label">{achievement.label}</div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
