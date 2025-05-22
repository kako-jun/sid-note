"use client";

import { Jacquard_24_400 } from "@/components/common/Font";
import ChordSegment from "@/components/score/ChordSegment";
import { SectionType } from "@/schemas/trackSchema";
import React from "react";

type SectionProps = {
  section: SectionType;
  scale: string;
  scrollLeft: number;
  onScroll: (left: number) => void;
};

const Section: React.FC<SectionProps> = (props) => {
  const { section, scale, scrollLeft, onScroll } = props;

  return (
    <section
      style={{
        background: "black",
        textAlign: "left",
        boxShadow: "inset 0 0 40px 1px #333333",
        paddingTop: 8,
      }}
    >
      <p
        className={Jacquard_24_400.className}
        style={{
          marginLeft: 8,
          fontSize: "1.25rem",
          fontFamily: '"Jacquard 24", "Old English Text MT", serif',
          border: "1px solid #444444",
          display: "inline-block",
          padding: "0px 8px",
        }}
      >
        {section.name}
      </p>
      <div
        style={{
          margin: 8,
          marginTop: 8,
          marginBottom: 16,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {section.chordSegments.map((chordSegment, index) => {
          return (
            <ChordSegment
              key={index}
              chordSegment={chordSegment}
              chordSegmentId={index + 1}
              prevSegment={section.chordSegments[index - 1] || null}
              nextSegment={section.chordSegments[index + 1] || null}
              chordSegmentCount={section.chordSegments.length}
              scale={scale}
              scrollLeft={scrollLeft}
              onScroll={onScroll}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Section;
