// src/components/TeamMembers/Teammembermodal.jsx

import { useEffect } from "react";

import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileAlt,
} from "react-icons/fa";

import "./Teammembermodal.css";

const SOCIAL_ICONS = {
  github: FaGithub,
  linkdin: FaLinkedinIn,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  email: FaEnvelope,
};

const Teammembermodal = ({ member, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const getSocialHref = (social) => {
    if (social.type === "email") {
      return `mailto:${social.src}`;
    }

    return social.src;
  };

  return (
    <div
      className="member-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="member-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="member-modal-name"
      >
        <button
          type="button"
          className="member-modal-close"
          onClick={onClose}
          aria-label="Close member profile"
        >
          ×
        </button>

        <div className="member-modal-header">
          <div className="member-modal-photo">
            <img src={member.photoPath} alt={member.name} />
          </div>

          <div className="member-modal-intro">
            <div className="member-modal-label">TEAM MEMBER</div>

            <h2 id="member-modal-name">{member.name}</h2>

            <div className="member-modal-role">{member.role}</div>

            <p>{member.longDescription}</p>

            {member.resumePath && (
              <div className="member-resume-actions">
                <a
                  href={member.resumePath}
                  target="_blank"
                  rel="noreferrer"
                  className="member-modal-action"
                >
                  <FaFileAlt aria-hidden="true" />
                  View Resume
                </a>

                <a
                  href={member.resumePath}
                  download
                  className="member-modal-action"
                >
                  ↓ Download
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="member-modal-content">
          <div className="member-modal-section">
            <h3>Contributions</h3>

            <ul className="member-contributions">
              {member.contributions.map((contribution, index) => (
                <li key={`${member.id}-contribution-${index}`}>
                  <span>&gt;</span>

                  {contribution}
                </li>
              ))}
            </ul>
          </div>

          <div className="member-modal-section">
            <h3>Work</h3>

            <div className="member-work-links">
              {member.workLinks.map((link, index) => (
                <a
                  key={`${member.id}-work-${index}`}
                  href={link.src}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}

                  <FaExternalLinkAlt aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="member-modal-section">
            <h3>Connect</h3>

            <div className="member-socials">
              {member.social.map((social, index) => {
                const Icon = SOCIAL_ICONS[social.type] ?? FaExternalLinkAlt;

                return (
                  <a
                    key={`${member.id}-social-${index}`}
                    href={getSocialHref(social)}
                    target={social.type === "email" ? undefined : "_blank"}
                    rel={social.type === "email" ? undefined : "noreferrer"}
                    aria-label={social.type}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teammembermodal;
