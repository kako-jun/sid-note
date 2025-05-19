"use client";

import React from "react";
import LeftScore from "@/components/performance/LeftScore";
import RightScore from "@/components/performance/RightScore";
import Staff from "@/components/performance/Staff";
import Keyboard from "@/components/performance/Keyboard";
import { NoteType } from "@/models/model";
import { getCodePositions, getInterval } from "@/utils/util";

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

  return (
    <div
      style={{
        padding: 8,
        background: "#222222",
        textAlign: "left",
        clipPath: "polygon(0% 0%, 50% 2%, 100% 0%, 100% 100%, 50% 98%, 0% 100%)", // 上下の中央を引っ込める形状
        boxShadow: "inset 0 0 40px 1px #333333",
      }}
    >
      <p>
        <span style={{ color: "#888888" }}>Note </span>
        {noteId}
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
          <p style={{ flex: 1, lineHeight: 1, textAlign: "left" }}>{note.pitch}</p>
          <p style={{ flex: 2, lineHeight: 1, textAlign: "center" }}>{valueText(note.value)}</p>
          <p style={{ flex: 2, lineHeight: 1, textAlign: "right" }}>
            {getInterval(code, note.pitch)}:{" "}
            {isCodePitch(note.pitch) ? <span style={{ color: "#888888" }}>Chord Tone</span> : "Nonchord Tone"}
          </p>
        </div>
        <div
          style={{
            marginTop: 4,
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            gap: 8,
          }}
        >
          <div
            className="hidden-scrollbar"
            style={{
              overflowX: "auto",
              width: "100%",
              // maxWidth: 320,
              whiteSpace: "nowrap",
              flex: 3.5,
            }}
          >
            <div style={{ width: scoreWidth, display: "inline-block" }}>
              <LeftScore note={note} nextNote={nextNote} />
            </div>
          </div>
          <div style={{ flex: 1, maxWidth: 181 }}>
            <RightScore note={note} nextNote={nextNote} />
          </div>
        </div>
        <div
          style={{
            marginTop: 0,
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
            gap: 8,
            flexWrap: "wrap-reverse",
          }}
        >
          <div>
            <ul
              style={{
                paddingLeft: 24,
                paddingTop: 8,
                paddingBottom: 4,
                fontSize: "0.75rem",
                color: "#888888",
                listStyleType: "'・'",
              }}
            >
              {note.remarks.map((remark, index) => (
                <li key={index}>{remark}</li>
              ))}
            </ul>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 8,
              marginLeft: "auto",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "right", gap: 8 }}>
              <div style={{ width: 100, marginTop: -4 }}>
                <Staff note={note} nextNote={nextNote} />
              </div>
              <div style={{ width: 200 }}>
                <div style={{ marginTop: -5 }}>
                  <Keyboard note={note} nextNote={nextNote} />
                </div>
                <div style={{ marginTop: 4, marginRight: 4, textAlign: "right" }}>
                  {note.tags?.map((tag, index) => {
                    const color = tag === "easy" ? "rgba(0, 200, 255, 0.2)" : tag === "hard" ? "#882222" : "black";
                    return (
                      <span
                        key={index}
                        style={{
                          color: "#888888",
                          // padding: 2,
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          borderBottom: `2px solid ${color}`,
                          // position: "relative",
                          // top: "-4px",
                        }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
