"use client";

import React from "react";

type SetlistProps = object;

const Setlist: React.FC<SetlistProps> = (props) => {
  const {} = props;

  const tracks = [
    { id: 1, title: "Battle 1", artist: "Final Fantasy 5" },
    { id: 2, title: "IGGY POP FAN CLUB", artist: "NUMBER GIRL" },
    { id: 3, title: "海岸通り", artist: "ASIAN KUNG-FU GENERATION" },
  ];

  return (
    <section style={{ margin: "32px 0" }}>
      <h2>Setlist</h2>
      <div style={{ marginTop: 16, border: "1px solid #444444", display: "inline-block", padding: "4px 8px" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tracks.map((track, index) => (
            <li
              key={index}
              style={{ cursor: "pointer", textDecoration: "none", paddingTop: 8, paddingBottom: 8 }}
              onClick={() => (window.location.href = `/tracks/${track.id}`)}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              <span style={{ fontStyle: "italic" }}>{track.title}</span>
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
