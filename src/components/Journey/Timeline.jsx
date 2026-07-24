// src/components/Journey/Timeline.jsx

import { useLayoutEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import timelineData from "../../data/timelineData.js";

import TimelineEvent from "./TimelineEvent.jsx";
import Lightbox from "./Lightbox.jsx";

import "./Timeline.css";

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  const [activeMedia, setActiveMedia] = useState(null);

  const timelineRef = useRef(null);
  const progressLineRef = useRef(null);

  useLayoutEffect(() => {
    const timelineElement = timelineRef.current;

    const progressLine = progressLineRef.current;

    if (!timelineElement || !progressLine) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const events = gsap.utils.toArray(".timeline-row", timelineElement);

      /*
       * Start with an empty green progress spine.
       */
      gsap.set(progressLine, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      /*
       * Each event begins slightly lower,
       * dimmer and smaller.
       */
      gsap.set(events, {
        y: 55,
        autoAlpha: 0.18,
        scale: 0.975,
      });

      /*
       * One scrubbed timeline controls the
       * complete Journey reveal.
       */
      const journeyTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: timelineElement,

          start: "top 35%",
          end: "bottom 65%",

          scrub: 0.7,

          invalidateOnRefresh: true,
        },
      });

      /*
       * Green timeline spine grows with scroll.
       */
      journeyTimeline.to(
        progressLine,
        {
          scaleY: 1,
          ease: "none",
          duration: events.length,
        },
        0,
      );

      /*
       * Reveal events sequentially as progress
       * moves down the timeline.
       */
      events.forEach((event, index) => {
        journeyTimeline.to(
          event,
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,

            ease: "none",
            duration: 0.7,
          },
          index + 0.15,
        );
      });
    }, timelineRef);

    const refreshFrame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshFrame);

      ctx.revert();
    };
  }, []);

  return (
    <section
      className="timeline"
      ref={timelineRef}
      aria-label="Team Axe journey timeline"
    >
      <div className="timeline-events">
        <div className="timeline-base-line" />

        <div ref={progressLineRef} className="timeline-progress-line" />

        {timelineData.map((event, index) => {
          const side = event.side || (index % 2 === 0 ? "right" : "left");

          return (
            <TimelineEvent
              key={event.id}
              event={event}
              side={side}
              onMediaClick={setActiveMedia}
            />
          );
        })}
      </div>

      <Lightbox media={activeMedia} onClose={() => setActiveMedia(null)} />
    </section>
  );
};

export default Timeline;
