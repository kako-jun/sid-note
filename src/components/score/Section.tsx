"use client";

import React from "react";
import Measure from "@/components/score/Measure";
import { SectionType } from "@/models/model";
import { Jacquard_24 } from "next/font/google";

const Jacquard_24_400 = Jacquard_24({
  weight: "400",
  preload: false,
});

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
        className={Jacquard_24_400.className}
        style={{
          marginLeft: 8,
          fontSize: "1.25rem",
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
