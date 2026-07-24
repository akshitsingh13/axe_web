// src/components/Journey/Lightbox.jsx

import { useEffect } from "react";

import { getYoutubeEmbedUrl } from "./youtube.js";

import "./Lightbox.css";

const Lightbox = ({ media, onClose }) => {
  useEffect(() => {
    if (!media) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [media, onClose]);

  if (!media) {
    return null;
  }

  const renderContent = () => {
    if (media.type === "youtube") {
      const embedUrl = getYoutubeEmbedUrl(media.url);

      if (!embedUrl) {
        return <div className="lightbox-error">Couldn't load this video.</div>;
      }

      return (
        <div className="lightbox-video-wrap">
          <iframe
            className="lightbox-video"
            src={embedUrl}
            title={media.label || "Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    if (media.type === "pdf") {
      return (
        <div className="lightbox-pdf-wrap">
          <iframe
            className="lightbox-pdf"
            src={media.src}
            title={media.label || "Document"}
          />

          <a
            className="lightbox-open-pdf"
            href={media.src}
            target="_blank"
            rel="noreferrer"
          >
            Open PDF ↗
          </a>
        </div>
      );
    }

    return (
      <img
        className="lightbox-image"
        src={media.src}
        alt={media.alt || media.label || ""}
      />
    );
  };

  const caption = media.label || media.alt;

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={caption || "Media viewer"}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close viewer"
      >
        ×
      </button>

      <div
        className="lightbox-content"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {renderContent()}

        {caption && <div className="lightbox-caption">{caption}</div>}
      </div>
    </div>
  );
};

export default Lightbox;
