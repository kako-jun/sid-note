"use client";

import React from "react";
import { loadSetlistFromYamlUrl, SetlistTrack } from "@/utils/setlistLoader";

const Setlist: React.FC = () => {
  const [tracks, setTracks] = React.useState<SetlistTrack[]>([]);

  React.useEffect(() => {
    loadSetlistFromYamlUrl("/track/setlist.yaml").then(setTracks).catch(console.error);
  }, []);

  if (tracks.length === 0) {
    return <>Loading ...</>;
  }

  return (
    <section>
      <h2>Setlist</h2>
      <div
        style={{
          marginTop: 16,
          border: "1px solid #444444",
          display: "inline-block",
          padding: "4px 40px",
          position: "relative",
          background: "none",
        }}
      >
        {/* 四隅のcorner.webpを背景として表示 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 24,
            height: 24,
            backgroundImage: "url(/corner.webp)",
            backgroundSize: "cover",
            pointerEvents: "none",
            zIndex: 1,
            transform: "rotate(0deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 24,
            height: 24,
            backgroundImage: "url(/corner.webp)",
            backgroundSize: "cover",
            pointerEvents: "none",
            zIndex: 1,
            transform: "rotate(90deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 24,
            height: 24,
            backgroundImage: "url(/corner.webp)",
            backgroundSize: "cover",
            pointerEvents: "none",
            zIndex: 1,
            transform: "rotate(270deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 24,
            height: 24,
            backgroundImage: "url(/corner.webp)",
            backgroundSize: "cover",
            pointerEvents: "none",
            zIndex: 1,
            transform: "rotate(180deg)",
          }}
        />
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
