"use client";

import Section from "@/components/score/Section";
import { TrackType } from "@/schemas/trackSchema";
import React from "react";

export type TrackSectionsProps = {
  sections: TrackType["sections"];
  scale: string;
};

const TrackSections: React.FC<TrackSectionsProps> = ({ sections, scale }) => {
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const handleScroll = (left: number) => {
    setScrollLeft(left);
  };

  return (
    <div
      style={{
        marginTop: 32,
        marginBottom: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 64,
      }}
    >
      {sections?.map((section, index) => (
        <div key={index} id={section.name}>
          <Section section={section} scale={scale} scrollLeft={scrollLeft} onScroll={handleScroll} />
        </div>
      ))}
    </div>
  );
};

export default TrackSections;
