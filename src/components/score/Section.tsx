"use client";

import ChordSegment from "@/components/score/ChordSegment";
import { SectionType } from "@/schemas/trackSchema";
import { scaleText } from "@/utils/scaleUtil";
import React from "react";

type SectionProps = {
  section: SectionType;
  scale: string;
  scrollLeft: number;
  onScroll: (left: number) => void;
};

const Section: React.FC<SectionProps> = (props) => {
  const { section, scale, scrollLeft, onScroll } = props;

  const scaleWithModulation = React.useMemo(() => {
    return section.key ? section.key : scale;
  }, [scale, section.key]);

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
        // className={Jacquard_24_400.className}
        style={{
          marginLeft: 8,
          // fontSize: "1.25rem",
          // fontFamily: '"Jacquard 24", "Old English Text MT", serif',
          border: "1px solid #444444",
          display: "inline-block",
          padding: "4px 8px",
        }}
      >
        {section.name}
      </p>
      <p style={{ marginLeft: 16, marginTop: 8 }}>{section.key && <span>Modulation: {scaleText(section.key)}</span>}</p>
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
              scale={scaleWithModulation}
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
