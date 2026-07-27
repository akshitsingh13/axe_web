// src/components/TeamMembers/TeamCarousel.jsx

import { useCallback, useEffect, useState } from "react";

import "./TeamCarousel.css";

const TeamCarousel = ({ members, onSelectMember }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (index) => {
      if (members.length === 0) return;

      setActiveIndex(
        ((index % members.length) + members.length) % members.length,
      );
    },
    [members.length],
  );

  // Only reset to the first card when the actual set of members changes
  // (e.g. switching tabs) — not on every parent re-render, which would
  // otherwise create a new `members` array reference and snap the
  // carousel back to index 0 (e.g. whenever the profile modal opens/closes).
  const membersKey = members.map((member) => member.id).join("|");

  useEffect(() => {
    setActiveIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membersKey]);

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

  const getOffset = (index) => {
    let difference = index - activeIndex;
    const halfwayPoint = members.length / 2;

    if (difference > halfwayPoint) {
      difference -= members.length;
    }

    if (difference < -halfwayPoint) {
      difference += members.length;
    }

    return difference;
  };

  if (members.length === 0) {
    return <p className="team-empty">More members coming soon.</p>;
  }

  return (
    <div className="team-carousel-stage">
      {members.map((member, index) => {
        const offset = getOffset(index);
        const isActive = offset === 0;
        const isVisible = Math.abs(offset) <= 2;

        if (!isVisible) {
          return null;
        }

        return (
          <button
            type="button"
            key={member.id}
            className={`team-carousel-card ${isActive ? "is-active" : ""}`}
            style={{ "--offset": offset }}
            onClick={() => (isActive ? onSelectMember(member) : goTo(index))}
            aria-label={
              isActive
                ? `View ${member.name}'s profile`
                : `Show ${member.name}'s card`
            }
            aria-current={isActive ? "true" : undefined}
          >
            <div className="team-carousel-image">
              <img src={member.photoPath} alt={member.name} />
            </div>

            <div className="team-carousel-scrim" />

            <div className="team-carousel-info">
              <h4>{member.name}</h4>

              {member.role && <span>{member.role}</span>}

              {isActive && (
                <div className="team-carousel-open">View Profile →</div>
              )}
            </div>
          </button>
        );
      })}

      <button
        type="button"
        className="team-carousel-arrow team-carousel-arrow-left"
        onClick={() => goTo(activeIndex - 1)}
        aria-label="Previous member"
      >
        &#8249;
      </button>

      <button
        type="button"
        className="team-carousel-arrow team-carousel-arrow-right"
        onClick={() => goTo(activeIndex + 1)}
        aria-label="Next member"
      >
        &#8250;
      </button>

      <div className="team-carousel-dots">
        {members.map((member, index) => (
          <button
            type="button"
            key={`${member.id}-dot`}
            className="team-carousel-dot-button"
            onClick={() => goTo(index)}
            aria-label={`Go to ${member.name}`}
            aria-current={index === activeIndex ? "true" : undefined}
          >
            <span
              className={`team-carousel-dot ${
                index === activeIndex ? "is-active" : ""
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeamCarousel;
