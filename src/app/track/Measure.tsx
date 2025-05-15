"use client";

import React from "react";
import { MeasureType, LeftType, NoteType } from "./model";
import LeftScore from "./LeftScore";
// import CircleOfFifths from "./CircleOfFifths";
import Note from "./Note";
import { getScaleCodes, getCodePositions, functionalHarmonyText, cadenceText } from "./util";

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

  return (
    <div
      style={{
        padding: 8,
        background: "#222222",
        textAlign: "left",
        clipPath: "polygon(0% 0%, 50% 1%, 100% 0%, 100% 100%, 50% 99%, 0% 100%)", // 上下の中央を引っ込める形状
      }}
    >
      <p>
        <span style={{ color: "#888888" }}>Measure </span>
        {measureId}
        <span style={{ color: "#888888" }}> / {measureCount}</span>
      </p>
      <div style={{ marginLeft: 8 }}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <p>
            <span>{measure.on && measure.on !== "" ? `${measure.code} on ${measure.on}` : measure.code}</span>
            <span style={{ color: "#888888" }}>: {functionalHarmonyText(measure.functional_harmony)}</span>
          </p>
          <p>
            <span style={{ color: "#888888" }}>スケールに属すコードか:</span> {isScaleCode ? "Yes" : "No"}
          </p>
          <p>
            <span style={{ color: "#888888" }}>
              {prevMeasure &&
                `${functionalHarmonyText(prevMeasure.functional_harmony)} → ${functionalHarmonyText(
                  measure.functional_harmony
                )}: `}
            </span>
            {prevMeasure && `${cadenceText(prevMeasure.functional_harmony, measure.functional_harmony)}`}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <LeftScore note={getCodeNote(code)} />
          {/* <CircleOfFifths scale={getCodeNote(measure.on ?? measure.code)} /> */}
        </div>
        <ul style={{ paddingLeft: 24, paddingTop: 4, color: "#888888", listStyleType: "'・'" }}>
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
