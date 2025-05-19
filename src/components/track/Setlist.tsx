"use client";

import React from "react";

type SetlistProps = object;

const Setlist: React.FC<SetlistProps> = (props) => {
  const {} = props;

  const tracks = [
    { id: 1, title: "Battle 1", artist: "Nobuo Uematsu" },
    { id: 2, title: "Song B", artist: "Artist 2" },
    { id: 3, title: "Song C", artist: "Artist 3" },
  ];

  return (
    <section style={{ margin: "32px 0" }}>
      <h2>Setlist</h2>
      <div style={{ marginTop: 16, border: "1px solid #444444", display: "inline-block", padding: "4px 8px" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tracks.map((track, index) => (
            <li
              key={index}
              style={{ cursor: "pointer", textDecoration: "none" }}
              onClick={() => (window.location.href = `/tracks/${track.id}`)}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              <span style={{ fontWeight: "bold" }}>{track.title}</span>
              {" / "}
              <span>{track.artist}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Setlist;
