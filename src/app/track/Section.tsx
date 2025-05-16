"use client";

import React from "react";
import { SectionType } from "./model";
import Measure from "./Measure";

type SectionProps = {
  section: SectionType;
  scale: string;
};

const Section: React.FC<SectionProps> = (props) => {
  const { section, scale } = props;

  return (
    <div
      style={{
        background: "black",
        textAlign: "left",
        boxShadow: "inset 0 0 40px 1px #333333",
        paddingTop: 8,
      }}
    >
      <p
        style={{
          marginLeft: 8,
          fontFamily: "'UnifrakturCook', 'Old English Text MT', 'IM Fell English', cursive",
          fontSize: "1.2em",
          letterSpacing: "0.05em",
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
        {section.measures.map((measure, index) => {
          return (
            <Measure
              key={index}
              measure={measure}
              prevMeasure={section.measures[index - 1] || null}
              nextMeasure={section.measures[index + 1] || null}
              measureId={index + 1}
              measureCount={section.measures.length}
              scale={scale}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Section;
