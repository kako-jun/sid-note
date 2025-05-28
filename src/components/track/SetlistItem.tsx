"use client";
import { SetlistTrackType } from "@/schemas/setlistSchema";
import React from "react";

type SetlistItemProps = {
  track: SetlistTrackType;
  prevTrackId?: number;
};

const SetlistItem: React.FC<SetlistItemProps> = ({ track, prevTrackId }) => {
  const showDot =
    prevTrackId !== undefined && Math.floor(Number(track.id) / 10) !== Math.floor(Number(prevTrackId) / 10);

  return (
    <>
      {showDot && <li>・</li>}
      <li
        style={{ cursor: "pointer", textDecoration: "none", paddingTop: 8, paddingBottom: 8 }}
        onClick={() => (window.location.href = `/tracks/${track.id}`)}
        onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
        onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
      >
        <span style={{ fontStyle: "italic" }}>{track.title}</span>
        {" / "}
        <span>{track.artist}</span>
      </li>
    </>
  );
};

export default SetlistItem;
