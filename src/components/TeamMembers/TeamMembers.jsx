// src/components/TeamMembers/TeamMembers.jsx

import { useRef, useState } from "react";
import useSectionReveal from "../../hooks/useSectionReveal.js";

import teamNames from "../../data/teamNames.js";
import teamDetail from "../../data/teamDetail.js";

import Teammembermodal from "./Teammembermodal.jsx";

import "./TeamMembers.css";

const TeamMembers = () => {
  const sectionRef = useRef(null);

  useSectionReveal(
    sectionRef,
    ".team-title, .team-group-heading, .team-member-card",
    {
      y: 34,
      stagger: 0.07,
    },
  );
  const [selectedMember, setSelectedMember] = useState(null);

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

        <div className="team-groups">
          {teamNames.map((team) => {
            const members = teamDetail.filter((member) =>
              member.team.includes(team.id),
            );

            return (
              <div className="team-group" key={team.id}>
                <div className="team-group-heading">
                  <span className="team-group-id">{team.id}</span>

                  <h3>{team.name}</h3>
                </div>

                {members.length > 0 ? (
                  <div className="team-grid">
                    {members.map((member) => (
                      <button
                        type="button"
                        className="team-member-card"
                        key={member.id}
                        onClick={() => setSelectedMember(member)}
                      >
                        <div className="team-member-image">
                          <img src={member.photoPath} alt={member.name} />
                        </div>

                        <div className="team-member-info">
                          <h4>{member.name}</h4>

                          <span>{member.role}</span>

                          <p>{member.shortDescription}</p>

                          <div className="team-member-open">View Profile →</div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="team-empty">More members coming soon.</p>
                )}
              </div>
            );
          })}
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
