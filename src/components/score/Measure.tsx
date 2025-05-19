"use client";

import React from "react";
import Note from "@/components/score/Note";
import LeftScore from "@/components/performance/LeftScore";
import { MeasureType, LeftType, NoteType } from "@/models/model";
import {
  getScaleCodes,
  getCodePositions,
  functionalHarmonyText,
  cadenceText,
  getFunctionalHarmony,
} from "@/utils/util";

const getCodeNote = (code: string) => {
  const positions = getCodePositions(code);
  const lefts: LeftType[] = positions.map((position) => {
    return { ...position, finger: 0, type: "code" };
  });

  const codeNote: NoteType = {
    pitch: "",
    value: "whole",
    remarks: [],
    tags: [],
    lefts,
  };

  return codeNote;
};

type MeasureProps = {
  measure: MeasureType;
  measureId: number;
  prevMeasure: MeasureType | null;
  nextMeasure: MeasureType | null;
  measureCount: number;
  scale: string;
};

const Measure: React.FC<MeasureProps> = (props) => {
  const { measure, measureId, prevMeasure, nextMeasure, measureCount, scale } = props;

  const code = React.useMemo(() => {
    return measure.on && measure.on !== "" ? measure.on : measure.code;
  }, [measure]);

  const isScaleCode = React.useMemo(() => {
    const codes = getScaleCodes(scale);
    return codes.includes(code);
  }, [scale, code]);

  const nextNote = React.useCallback(
    (index: number) => {
      if (index + 1 < measure.notes.length) {
        return measure.notes[index + 1];
      }

      if (nextMeasure && nextMeasure.notes.length > 0) {
        return nextMeasure.notes[0];
      }

      return null;
    },
    [measure, nextMeasure]
  );

  const [windowWidth, setWindowWidth] = React.useState(typeof window !== "undefined" ? window.innerWidth : 0);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useMemoでscoreWidthを計算
  const scoreWidth = React.useMemo(() => {
    const a = 2.5;
    const b = 1000;
    return Math.max(1000, Math.min(2000, b + (windowWidth - 500) * a));
  }, [windowWidth]);

  const functionalHarmony = React.useMemo(() => {
    return getFunctionalHarmony(scale, code);
  }, [scale, code]);

  const prevFunctionalHarmony = React.useMemo(() => {
    if (!prevMeasure) {
      return 0;
    }

    const prevCode = prevMeasure.on && prevMeasure.on !== "" ? prevMeasure.on : prevMeasure.code;
    return getFunctionalHarmony(scale, prevCode);
  }, [scale, prevMeasure]);

  return (
    <div
      style={{
        padding: 8,
        paddingBottom: 16,
        background: "#111111",
        textAlign: "left",
        clipPath: "polygon(0% 0%, 50% 1%, 100% 0%, 100% 100%, 50% 99%, 0% 100%)", // 上下の中央を引っ込める形状
        boxShadow: "inset 0 0 40px 1px #333333",
      }}
    >
      <p>
        <span style={{ color: "#888888" }}>Measure </span>
        {measureId}
        <span style={{ color: "#888888" }}> / {measureCount}</span>
      </p>
      <div style={{ marginLeft: 8 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "start",
            gap: 8,
            fontSize: "0.75rem",
          }}
        >
          <p style={{ flex: 2, lineHeight: 1, textAlign: "left" }}>
            <span>{measure.on && measure.on !== "" ? `${measure.code} on ${measure.on}` : measure.code}</span>
            <span style={{ color: "#888888" }}>: {functionalHarmonyText(functionalHarmony)}</span>
          </p>
          <p style={{ flex: 1, lineHeight: 1, textAlign: "center" }}>
            {isScaleCode ? <span style={{ color: "#888888" }}>Diatonic Chord</span> : "Non-Diatonic Chord"}
          </p>
          <p style={{ flex: 2, lineHeight: 1, textAlign: "right" }}>
            <span style={{ color: "#888888" }}>
              {prevMeasure &&
                `${functionalHarmonyText(prevFunctionalHarmony)} → ${functionalHarmonyText(functionalHarmony)}`}
            </span>
            {prevMeasure &&
              cadenceText(prevFunctionalHarmony, functionalHarmony) &&
              `: ${cadenceText(prevFunctionalHarmony, functionalHarmony)}`}
          </p>
        </div>
        <div
          style={{
            marginTop: 4,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            className="hidden-scrollbar"
            style={{
              overflowX: "auto",
              width: "100%",
              // maxWidth: 320,
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ width: scoreWidth, display: "inline-block" }}>
              <LeftScore note={getCodeNote(code)} />
            </div>
          </div>
        </div>
        <ul style={{ paddingLeft: 24, paddingTop: 4, fontSize: "0.75rem", color: "#888888", listStyleType: "'・'" }}>
          {measure.remarks.map((remark, index) => (
            <li key={index}>{remark}</li>
          ))}
        </ul>
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
          {measure.notes.map((note, index) => {
            return <Note key={index} note={note} noteId={index + 1} nextNote={nextNote(index)} code={code} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Measure;
