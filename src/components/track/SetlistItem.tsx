import { SetlistTrackType } from "@/schemas/setlistSchema";
import Link from "next/link";
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
      <li style={{ paddingTop: 8, paddingBottom: 8 }}>
        <Link
          className="link-hover-underline"
          href={`/tracks/${track.id}`}
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          <span style={{ fontStyle: "italic" }}>{track.title}</span>
          {" / "}
          <span>{track.artist}</span>
        </Link>
      </li>
    </>
  );
};

export default SetlistItem;
