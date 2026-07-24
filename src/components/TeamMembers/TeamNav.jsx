// src/components/TeamMembers/TeamNav.jsx

import teamNames from "../../data/teamNames.js";

import "./TeamNav.css";

const TeamNav = ({ activeId, onSelect }) => {
  return (
    <nav className="team-nav" aria-label="Team categories">
      {teamNames.map((team) => {
        const isActive = activeId === team.id;

        return (
          <button
            key={team.id}
            type="button"
            className={`team-nav-item${isActive ? " is-active" : ""}`}
            onClick={() => onSelect(team.id)}
            aria-pressed={isActive}
          >
            {team.name}
          </button>
        );
      })}
    </nav>
  );
};

export default TeamNav;
