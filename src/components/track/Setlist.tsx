import CornerBox from "@/components/common/CornerBox";
import { SetlistType } from "@/schemas/setlistSchema";
import React from "react";
import SetlistItem from "./SetlistItem";

export type SetlistProps = {
  setlist: SetlistType;
};

const Setlist: React.FC<SetlistProps> = ({ setlist }) => {
  if (setlist.tracks.length === 0) {
    return <>Loading ...</>;
  }

  return (
    <section>
      <h2>Setlist</h2>
      <CornerBox style={{ marginTop: 16, padding: "4px 40px" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {setlist.tracks.map((track, index) => (
            <SetlistItem
              key={track.id}
              track={track}
              prevTrackId={index > 0 ? setlist.tracks[index - 1].id : undefined}
            />
          ))}
        </ul>
      </CornerBox>
    </section>
  );
};

export default Setlist;
