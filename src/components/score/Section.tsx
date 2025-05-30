"use client";

import ChordSegment from "@/components/score/ChordSegment";
import { SectionType } from "@/schemas/trackSchema";
import { scaleText } from "@/utils/scaleUtil";
import Image from "next/image";
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

  // SSRとクライアントの不一致を防ぐため、初期値は固定し、マウント後にランダム値をセット
  const [flipX, setFlipX] = React.useState(1);
  const [flipY, setFlipY] = React.useState(1);
  const [rotate180, setRotate180] = React.useState(0);

  React.useEffect(() => {
    setFlipX(Math.random() < 0.5 ? -1 : 1);
    setFlipY(Math.random() < 0.5 ? -1 : 1);
    setRotate180(Math.random() < 0.5 ? 180 : 0);
  }, []);

  return (
    <section
      style={{
        background: "black",
        textAlign: "left",
        boxShadow: "inset 0 0 40px 1px #333333",
        paddingTop: 8,
        border: "1px solid #333333",
        borderTop: "1px solid #333333",
        borderBottom: "1px solid #333333",
        borderLeft: "none",
        borderRight: "none",
        borderImage: "linear-gradient(to right, #333 0%, rgba(255,255,255,0.15) 50%, #333 100%) 1",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Image
        src="/grunge_1.webp"
        alt="grunge texture background"
        fill
        style={{
          objectFit: "cover",
          pointerEvents: "none",
          opacity: 0.2,
          zIndex: 0,
          transform: `scale(${flipX}, ${flipY}) rotate(${rotate180}deg)`,
        }}
        priority
      />
      {/* <Image
        src="/grunge_2.webp"
        alt="grunge texture"
        width={200}
        height={140}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          objectFit: "cover",
          pointerEvents: "none",
          opacity: 0.05,
          zIndex: 0,
        }}
        priority
      /> */}
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
          gap: 32,
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
