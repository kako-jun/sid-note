"use client";

import React from "react";
import LeftScore from "./LeftScore";
import RightScore from "./RightScore";
import Staff from "./Staff";
import Keyboard from "./Keyboard";
import { NoteType } from "./model";
import { getCodePositions, getInterval } from "./util";

const valueText = (value: string) => {
  switch (value) {
    case "whole":
      return "Whole Note";
    case "d_whole":
      return "Dotted Whole Note";
    case "half":
      return "Harf Note";
    case "d_half":
      return "Dotted Harf Note";
    case "quarter":
      return "Quarter Note";
    case "d_quarter":
      return "Dotted Quarter Note";
    case "8th":
      return "8th Note";
    case "d_8th":
      return "Dotted 8th Note";
    case "16th":
      return "16th Note";
    case "d_16th":
      return "Dotted 16th Note";
  }
};

type NoteProps = {
  note: NoteType;
  noteId: number;
  nextNote: NoteType | null;
  code: string;
};

const Note: React.FC<NoteProps> = (props) => {
  const { note, noteId, nextNote, code } = props;

  const isCodePitch = React.useCallback(
    (pitch: string) => {
      const positions = getCodePositions(code);
      const found = positions.find((position) => {
        const pitches = position.pitch.split("/").map((p) => p.replace(/\d+$/, "")); // 数字を削除
        return pitches.includes(pitch.replace(/\d+$/, "")); // pitchの数字も削除して比較
      });
      if (found) {
        return true;
      }

      return false;
    },
    [code]
  );

  return (
    <div
      style={{
        padding: 8,
        background: "#333333",
        textAlign: "left",
        clipPath: "polygon(0% 0%, 50% 1%, 100% 0%, 100% 100%, 50% 99%, 0% 100%)", // 上下の中央を引っ込める形状
      }}
    >
      <p>
        <span style={{ color: "#888888" }}>Note </span>
        {noteId}
      </p>
      <div style={{ marginLeft: 8 }}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <p>{note.pitch}</p>
          <p>{valueText(note.value)}</p>
          <p>
            <span style={{ color: "#888888" }}>コードに属す音名か: </span>
            {isCodePitch(note.pitch) ? "Yes" : "No 経過音"}
          </p>
          <p>
            <span style={{ color: "#888888" }}>ルートからの音程: </span>
            {getInterval(code, note.pitch)}
          </p>
          <p>
            {note.tags?.map((tag, index) => {
              const color = tag === "easy" ? "rgba(0, 200, 255, 0.2)" : tag === "hard" ? "#882222" : "black";

              return (
                <span
                  key={index}
                  style={{
                    color: "white",
                    // padding: 2,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    borderBottom: `2px solid ${color}`,
                  }}
                >
                  {tag}
                </span>
              );
            })}
          </p>
        </div>
        <div style={{ marginTop: 0, display: "flex", flexDirection: "row", justifyContent: "left", gap: 8 }}>
          <LeftScore note={note} nextNote={nextNote} />
          <RightScore note={note} nextNote={nextNote} />
        </div>
        <div style={{ marginTop: 0, display: "flex", flexDirection: "row", justifyContent: "left", gap: 8 }}>
          <ul style={{ flex: 1, paddingLeft: 24, paddingTop: 4, color: "#888888", listStyleType: "'・'" }}>
            {note.remarks.map((remark, index) => (
              <li key={index}>{remark}</li>
            ))}
          </ul>
          <div style={{ width: 100 }}>
            <Staff note={note} nextNote={nextNote} />
          </div>
          <div style={{ width: 200 }}>
            <Keyboard note={note} nextNote={nextNote} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
