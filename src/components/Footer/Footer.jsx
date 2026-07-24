// src/components/Footer/Footer.jsx

import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  const scrollToSection = (targetId) => {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-wordmark">
            team<span>axe</span>
          </div>

          <p>Build first. Ask permission never.</p>
        </div>

        <div className="footer-navigation">
          <div className="footer-column">
            <div className="footer-column-title">Navigate</div>

            <button type="button" onClick={() => scrollToSection("home")}>
              Home
            </button>

            <button type="button" onClick={() => scrollToSection("about")}>
              About
            </button>

            <button type="button" onClick={() => scrollToSection("projects")}>
              Projects
            </button>

            <button type="button" onClick={() => scrollToSection("team")}>
              Team
            </button>
          </div>

          <div className="footer-column">
            <div className="footer-column-title">Connect</div>

            <a
              href="https://github.com/akshitsingh13"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub aria-hidden="true" />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/akshitsingh13/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn aria-hidden="true" />
              LinkedIn
            </a>

            <a
              href="https://instagram.com/akshitsingh13"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram aria-hidden="true" />
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Team Axe</span>

        <span>Built by Team Axe.</span>
      </div>
    </footer>
  );
};

export default Footer;
