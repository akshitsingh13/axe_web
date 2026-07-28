// src/components/TeamMembers/TeamCarousel.jsx

import { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import "./TeamCarousel.css";

const TeamCarousel = ({ members, onSelectMember }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(activeIndex);

  const goTo = useCallback(
    (index) => {
      if (members.length === 0) return;

      setActiveIndex(
        ((index % members.length) + members.length) % members.length,
      );
    },
    [members.length],
  );

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // ---------- Press-and-hold continuous scroll ----------
  // Holding an arrow steps through cards smoothly and repeatedly. A short
  // initial delay keeps a normal quick click feeling like a single step
  // (the click handler covers that), then it settles into a steady
  // repeat interval for continuous movement until released.
  const holdTimeoutRef = useRef(null);
  const holdIntervalRef = useRef(null);

  const stopHold = useCallback(() => {
    if (holdTimeoutRef.current !== null) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }

    if (holdIntervalRef.current !== null) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  }, []);

  const startHold = useCallback(
    (direction) => {
      stopHold();

      holdTimeoutRef.current = window.setTimeout(() => {
        holdIntervalRef.current = window.setInterval(() => {
          goTo(activeIndexRef.current + direction);
        }, 420);
      }, 380);
    },
    [goTo, stopHold],
  );

  useEffect(() => stopHold, [stopHold]);

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
          <div
            key={member.id}
            className="team-carousel-slot"
            style={{ "--offset": offset }}
          >
            <button
              type="button"
              className={`team-carousel-card ${isActive ? "is-active" : ""}`}
              style={{ "--wave": index % 2 === 0 ? -1 : 1 }}
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
          </div>
        );
      })}

      <button
        type="button"
        className="team-carousel-arrow team-carousel-arrow-left"
        onClick={() => goTo(activeIndex - 1)}
        onPointerDown={(event) => {
          if (event.pointerType === "mouse" && event.button !== 0) return;
          startHold(-1);
        }}
        onPointerUp={stopHold}
        onPointerLeave={stopHold}
        onPointerCancel={stopHold}
        aria-label="Previous member"
      >
        <FaChevronLeft aria-hidden="true" />
      </button>

      <button
        type="button"
        className="team-carousel-arrow team-carousel-arrow-right"
        onClick={() => goTo(activeIndex + 1)}
        onPointerDown={(event) => {
          if (event.pointerType === "mouse" && event.button !== 0) return;
          startHold(1);
        }}
        onPointerUp={stopHold}
        onPointerLeave={stopHold}
        onPointerCancel={stopHold}
        aria-label="Next member"
      >
        <FaChevronRight aria-hidden="true" />
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
