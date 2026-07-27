// src/components/TeamMembers/Teammembermodal.jsx

import { useCallback, useEffect, useRef, useState } from "react";

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

const CLOSE_ANIMATION_MS = 300;

const Teammembermodal = ({ member, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const closingRef = useRef(false);
  const closeTimerRef = useRef(null);
  const openFrameRef = useRef(null);

  const handleClose = useCallback(() => {
    if (closingRef.current) {
      return;
    }

    closingRef.current = true;
    setIsClosing(true);
    setIsOpen(false);

    closeTimerRef.current = window.setTimeout(() => {
      onClose();
    }, CLOSE_ANIMATION_MS);
  }, [onClose]);

  useEffect(() => {
    // Mount in the "closed" (flipped) state first, then flip open on the
    // next frame so the transition from rotateY(90deg) -> rotateY(0deg)
    // actually plays instead of snapping straight to open.
    openFrameRef.current = window.requestAnimationFrame(() => {
      setIsOpen(true);
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }

      if (openFrameRef.current !== null) {
        window.cancelAnimationFrame(openFrameRef.current);
      }
    };
  }, [handleClose]);

  const getSocialHref = (social) => {
    if (social.type === "email") {
      return `mailto:${social.src}`;
    }

    return social.src;
  };

  return (
    <div
      className={`member-modal-backdrop ${
        isClosing ? "is-closing" : isOpen ? "is-open" : "is-entering"
      }`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="member-modal-perspective"
        onMouseDown={(event) => event.stopPropagation()}
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
            onClick={handleClose}
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

              {member.role && (
                <div className="member-modal-role">{member.role}</div>
              )}

              {member.longDescription && <p>{member.longDescription}</p>}

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
            {member.contributions && member.contributions.length > 0 && (
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
            )}

            {member.workLinks && member.workLinks.length > 0 && (
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
            )}

            {member.social && member.social.length > 0 && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teammembermodal;
