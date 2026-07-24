// src/components/Journey/TimelineEvent.jsx

import { getYoutubeThumbnail } from "./youtube.js";

import "./TimelineEvent.css";

const MediaThumb = ({ item, onClick }) => {
  if (item.type === "youtube") {
    const thumbnail = getYoutubeThumbnail(item.url);

    return (
      <button
        type="button"
        className="timeline-gallery-thumb timeline-gallery-thumb--youtube"
        onClick={onClick}
        aria-label={`Play ${item.label || "video"}`}
      >
        {thumbnail ? (
          <img src={thumbnail} alt={item.label || "Video thumbnail"} />
        ) : (
          <div className="timeline-media-placeholder">VIDEO</div>
        )}

        <span className="timeline-play-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </span>

        <span className="timeline-gallery-tag">{item.label || "Video"}</span>
      </button>
    );
  }

  if (item.type === "pdf") {
    return (
      <button
        type="button"
        className="timeline-gallery-thumb timeline-gallery-thumb--pdf"
        onClick={onClick}
        aria-label={`Open ${item.label || "document"}`}
      >
        <svg
          className="timeline-pdf-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />

          <path
            d="M15 2v5h5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>

        <span className="timeline-gallery-tag">{item.label || "PDF"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className="timeline-gallery-thumb"
      onClick={onClick}
      aria-label={`Expand ${item.alt || "photo"}`}
    >
      <img src={item.src} alt={item.alt || ""} />

      {item.label && <span className="timeline-gallery-tag">{item.label}</span>}
    </button>
  );
};

const TimelineEvent = ({ event, side, onMediaClick }) => {
  const media = event.media || [];

  return (
    <article className={`timeline-row timeline-row--${side}`}>
      <div className="timeline-node" />

      <div className="timeline-event-wrap">
        <div className="timeline-card">
          <div className="timeline-card-meta">
            <span className="timeline-card-month">{event.month}</span>

            <span className="timeline-card-year">{event.year}</span>
          </div>

          <h2 className="timeline-card-title">{event.title}</h2>

          <p className="timeline-card-desc">{event.description}</p>

          {media.length > 0 && (
            <div className="timeline-gallery">
              {media.map((item, index) => (
                <MediaThumb
                  key={`${event.id}-media-${index}`}
                  item={item}
                  onClick={() => onMediaClick(item)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default TimelineEvent;
