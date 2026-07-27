// src/components/TeamMembers/TeamMembers.jsx

import { useRef, useState } from "react";
import useSectionReveal from "../../hooks/useSectionReveal.js";

import teamNames from "../../data/teamNames.js";
import teamDetail from "../../data/teamDetail.js";

import TeamNav from "./TeamNav.jsx";
import Teammembermodal from "./Teammembermodal.jsx";

import "./TeamMembers.css";

const TeamMembers = () => {
  const sectionRef = useRef(null);

  const [activeTeamId, setActiveTeamId] = useState(
    teamNames.length > 0 ? teamNames[0].id : "",
  );

  const [selectedMember, setSelectedMember] = useState(null);

  useSectionReveal(sectionRef, ".team-title, .team-nav-wrap", {
    y: 34,
    stagger: 0.07,
  });

  const activeTeam = teamNames.find((team) => team.id === activeTeamId);

  const activeMembers = teamDetail.filter((member) =>
    member.team.includes(activeTeamId),
  );

  return (
    <>
      <section
        ref={sectionRef}
        id="team"
        className="section-04"
        aria-labelledby="team-title"
      >
        <div className="team-title">
          <div className="section-label">04 — THE TEAM</div>

          <h2 id="team-title" className="team-heading">
            Meet The Crew
          </h2>
        </div>

        <div className="team-nav-wrap">
          <TeamNav activeId={activeTeamId} onSelect={setActiveTeamId} />
        </div>

        <div className="team-active-group">
          {activeTeam && (
            <div className="team-group-heading">
              <span className="team-group-id">{activeTeam.id}</span>

              <h3>{activeTeam.name}</h3>
            </div>
          )}

          {activeMembers.length > 0 ? (
            <div
              className="team-scroll-row"
              key={activeTeamId}
              aria-label={`${activeTeam?.name ?? "Team"} members`}
            >
              {activeMembers.map((member) => (
                <button
                  type="button"
                  className="team-member-card"
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  aria-label={`View ${member.name}'s profile`}
                >
                  <div className="team-member-image">
                    <img src={member.photoPath} alt={member.name} />
                  </div>

                  <div className="team-member-info">
                    <h4>{member.name}</h4>

                    {member.role && <span>{member.role}</span>}

                    {member.shortDescription && (
                      <p>{member.shortDescription}</p>
                    )}

                    <div className="team-member-open">View Profile →</div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="team-empty">More members coming soon.</p>
          )}
        </div>
      </section>

      {selectedMember && (
        <Teammembermodal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </>
  );
};

export default TeamMembers;
