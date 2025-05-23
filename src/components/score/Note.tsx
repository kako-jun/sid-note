"use client";

import Keyboard from "@/components/performance/Keyboard";
import Left from "@/components/performance/Left";
import Right from "@/components/performance/Right";
import Staff from "@/components/performance/Staff";
import { NoteType } from "@/schemas/trackSchema";
import { getChordPositions, getInterval } from "@/utils/chordUtil";
import { isChromaticNote } from "@/utils/chromaticUtil";
import { getChordToneLabel } from "@/utils/harmonyUtil";
import { valueText } from "@/utils/noteUtil";
import React from "react";
import NoteSymbol from "./NoteSymbol";

type NoteProps = {
  note: NoteType;
  noteId: number;
  nextNote: NoteType | null;
  noteCount: number;
  chord: string;
  scale: string;
  scrollLeft: number;
  onScroll: (left: number) => void;
};

const Note: React.FC<NoteProps> = (props) => {
  const { note, noteId, nextNote, noteCount, chord, scrollLeft, onScroll } = props;
  const { scale } = props;

  const isChordPitch = React.useCallback(
    (pitch: string) => {
      const positions = getChordPositions(chord);
      return positions.some((pos) => pos.pitch === pitch);
    },
    [chord]
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
    return Math.max(820, Math.min(2000, b + (windowWidth - 500) * a));
  }, [windowWidth]);

  return (
    <section
      style={{
        padding: 8,
        background: "#222222",
        textAlign: "left",
        clipPath: "polygon(0% 0%, 50% 2%, 100% 0%, 100% 100%, 50% 98%, 0% 100%)", // 上下の中央を引っ込める形状
        boxShadow: "inset 0 0 40px 1px #333333",
      }}
    >
      <div
        style={{
          marginBottom: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
        }}
      >
        <p>
          <span style={{ color: "#888888" }}>Note </span>
          {noteId}
          <span style={{ color: "#888888" }}> of {noteCount}</span>
        </p>
        <div>
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
          <p
            style={{
              flex: 2,
              lineHeight: 1,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              color: "#fff",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center" }}>
              <NoteSymbol value={note.value} size={16} color="currentColor" />
            </span>
            <span>{valueText(note.value)}</span>
          </p>
          <p>
            <span style={{ display: "inline-flex", alignItems: "center" }}>
              <NoteSymbol value="whole" size={16} color="currentColor" />
              <NoteSymbol value="dotted_whole" size={16} color="currentColor" />
              <NoteSymbol value="half" size={16} color="currentColor" />
              <NoteSymbol value="dotted_half" size={16} color="currentColor" />
              <NoteSymbol value="quarter" size={16} color="currentColor" />
              <NoteSymbol value="dotted_quarter" size={16} color="currentColor" />
              <NoteSymbol value="8th" size={16} color="currentColor" />
              <NoteSymbol value="dotted_8th" size={16} color="currentColor" />
              <NoteSymbol value="16th" size={16} color="currentColor" />
              <NoteSymbol value="dotted_16th" size={16} color="currentColor" />
              <NoteSymbol value="triplet_quarter" size={16} color="currentColor" />
              <NoteSymbol value="triplet_8th" size={16} color="currentColor" />
              <NoteSymbol value="triplet_16th" size={16} color="currentColor" />
            </span>
          </p>
          <p style={{ flex: 2, lineHeight: 1, textAlign: "right" }}>
            {getInterval(chord, note.pitch)}:{" "}
            {isChordPitch(note.pitch)
              ? (() => {
                  const label = getChordToneLabel(scale, chord, note.pitch);
                  return label ? (
                    <span style={{ color: "#888888" }}>Chord Tone ({label})</span>
                  ) : (
                    <span style={{ color: "#888888" }}>Chord Tone</span>
                  );
                })()
              : (() => {
                  const chromaticNote = nextNote && isChromaticNote(note, nextNote);
                  return chromaticNote ? <span>Nonchord Tone (Chromatic Note)</span> : <span>Nonchord Tone</span>;
                })()}
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
            onScroll={(e) => onScroll((e.target as HTMLDivElement).scrollLeft)}
            ref={(el) => {
              if (el && el.scrollLeft !== scrollLeft) el.scrollLeft = scrollLeft;
            }}
          >
            <div style={{ width: scoreWidth, display: "inline-block" }}>
              <Left note={note} nextNote={nextNote} scrollLeft={scrollLeft} onScroll={onScroll} />
            </div>
          </div>
          <div style={{ flex: 1, maxWidth: 181 }}>
            <Right note={note} nextNote={nextNote} />
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
              {note.remarks?.map((remark, index) => (
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
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "right", gap: 0 }}>
              <div style={{ width: 72, marginTop: -12 }}>
                <Staff note={note} nextNote={nextNote} />
              </div>
              <div style={{ width: 225, marginTop: -18, marginLeft: 8 }}>
                <div>
                  <Keyboard note={note} nextNote={nextNote} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Note;
