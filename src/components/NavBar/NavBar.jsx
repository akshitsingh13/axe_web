// src/components/NavBar/NavBar.jsx

import "./NavBar.css";

import { useLayoutEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: "Home", targetId: "home" },
  { label: "About", targetId: "about" },
  { label: "Projects", targetId: "projects" },
  { label: "Achievements", targetId: "achievements" },
  { label: "Team", targetId: "team" },
  { label: "Join Us", targetId: "join", highlight: true },
];

const NavBar = () => {
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const hero = document.querySelector(".highlights-panel");

    if (!nav || !hero) return undefined;

    const ctx = gsap.context(() => {
      gsap.set(nav, {
        autoAlpha: 0,
        y: -10,
      });

      ScrollTrigger.create({
        trigger: hero,
        start: "bottom 75%",

        onEnter: () => {
          gsap.to(nav, {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          });
        },

        onLeaveBack: () => {
          gsap.to(nav, {
            autoAlpha: 0,
            y: -10,
            duration: 0.25,
            ease: "power2.out",
          });
        },
      });
    }, navRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleNavigation = (event, targetId) => {
    event.preventDefault();

    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav ref={navRef} className="nav-bar" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.targetId}
          type="button"
          className={`nav-item${item.highlight ? " nav-item--highlight" : ""}`}
          onClick={(event) => handleNavigation(event, item.targetId)}
        >
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default NavBar;
