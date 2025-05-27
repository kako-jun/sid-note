"use client";

import Left from "@/components/performance/Left";
import Note from "@/components/score/Note";
import { ChordSegmentType, LeftType, NoteType } from "@/schemas/trackSchema";
import { getChordPositions } from "@/utils/chordUtil";
import { cadenceText, functionalHarmonyIcon, functionalHarmonyText, getFunctionalHarmony } from "@/utils/harmonyUtil";
import { playChord } from "@/utils/noteSoundPlayer";
import { comparePitch } from "@/utils/noteUtil";
import { getScaleDiatonicChords } from "@/utils/scaleUtil";
import React from "react";

type ChordSegmentProps = {
  chordSegment: ChordSegmentType;
  chordSegmentId: number;
  prevSegment: ChordSegmentType | null;
  nextSegment: ChordSegmentType | null;
  chordSegmentCount: number;
  scale: string;
  scrollLeft: number;
  onScroll: (left: number) => void;
};

const ChordSegment: React.FC<ChordSegmentProps> = (props) => {
  const { chordSegment, chordSegmentId, prevSegment, nextSegment, chordSegmentCount, scale, scrollLeft, onScroll } =
    props;

  const getChordNote = (chord: string) => {
    const positions = getChordPositions(chord);
    const lefts: LeftType[] = positions.map((position) => {
      return { ...position, finger: 0, type: "chord" };
    });

    // chordSegment.instrumentsからpitchに合うinstrumentを探して付与
    const instruments: { pitch: string; instrument: string }[] = chordSegment.instruments || [];
    const leftsWithInstrument = lefts.map((left) => {
      const found = instruments.find((inst) => comparePitch(inst.pitch, left.pitch ?? ""));
      return {
        ...left,
        instrument: found ? found.instrument : "",
      };
    });

    const chordNote: NoteType = {
      pitch: "",
      value: "whole",
      remarks: [],
      tags: [],
      lefts: leftsWithInstrument,
    };

    return chordNote;
  };

  const chord = React.useMemo(() => {
    return chordSegment.on && chordSegment.on !== "" ? chordSegment.on : chordSegment.chord;
  }, [chordSegment]);

  const isScaleChord = React.useMemo(() => {
    const chords = getScaleDiatonicChords(scale);
    return chords.includes(chord);
  }, [scale, chord]);

  const nextNote = React.useCallback(
    (index: number) => {
      if (index + 1 < chordSegment.notes.length) {
        return chordSegment.notes[index + 1];
      }

      if (nextSegment && nextSegment.notes.length > 0) {
        return nextSegment.notes[0];
      }

      return null;
    },
    [chordSegment, nextSegment]
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
    return getFunctionalHarmony(scale, chord);
  }, [scale, chord]);

  const prevFunctionalHarmony = React.useMemo(() => {
    if (!prevSegment) {
      return 0;
    }

    const prevChord = prevSegment.on && prevSegment.on !== "" ? prevSegment.on : prevSegment.chord;
    return getFunctionalHarmony(scale, prevChord);
  }, [scale, prevSegment]);

  return (
    <section
      style={{
        padding: 8,
        paddingBottom: 16,
        background: "#111111",
        textAlign: "left",
        clipPath: "polygon(0% 0%, 50% 1%, 100% 0%, 100% 100%, 50% 99%, 0% 100%)", // 上下の中央を引っ込める形状
        boxShadow: "inset 0 0 40px 1px #333333",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          marginBottom: 4,
        }}
      >
        <p>
          <span style={{ color: "#888888" }}>Chord </span>
          {chordSegmentId}
          <span style={{ color: "#888888" }}> of {chordSegmentCount}</span>
        </p>
        <p style={{ lineHeight: 1, textAlign: "right", fontSize: "0.75rem" }}>
          <span style={{ color: "#888888" }}>
            {prevSegment &&
              `${functionalHarmonyText(prevFunctionalHarmony)} → ${functionalHarmonyText(functionalHarmony)}`}
          </span>
          {prevSegment &&
            (() => {
              const cadence = cadenceText(prevFunctionalHarmony, functionalHarmony);
              return cadence ? ` (${cadence})` : "";
            })()}
        </p>
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
          <p style={{ flex: 2, lineHeight: 1, textAlign: "left" }}>
            <span
              onClick={() => {
                playChord(chord);
              }}
              style={{ cursor: "pointer" }}
            >
              {chord}
            </span>
            {functionalHarmony > 0 && (
              <span style={{ color: "#888888" }}>
                : {functionalHarmonyText(functionalHarmony)}{" "}
                <span
                  title={functionalHarmonyIcon(functionalHarmony).desc}
                  style={{
                    filter: "grayscale(1) brightness(0.7)",
                    WebkitFilter: "grayscale(1) brightness(0.7)",
                    display: "inline-block",
                    cursor: "help",
                  }}
                >
                  {functionalHarmonyIcon(functionalHarmony).icon}
                </span>
              </span>
            )}
          </p>
          <p style={{ flex: 1, lineHeight: 1, textAlign: "right" }}>
            {isScaleChord ? <span style={{ color: "#888888" }}>Diatonic Chord</span> : "Non-Diatonic Chord"}
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
            onScroll={(e) => onScroll((e.target as HTMLDivElement).scrollLeft)}
            ref={(el) => {
              if (el && el.scrollLeft !== scrollLeft) el.scrollLeft = scrollLeft;
            }}
          >
            <div style={{ width: scoreWidth, display: "inline-block" }}>
              <Left note={getChordNote(chord)} scrollLeft={scrollLeft} onScroll={onScroll} />
            </div>
          </div>
        </div>
        <ul style={{ paddingLeft: 24, paddingTop: 4, fontSize: "0.75rem", color: "#888888", listStyleType: "'・'" }}>
          {chordSegment.remarks?.map((remark, index) => (
            <li key={index}>{remark}</li>
          ))}
        </ul>
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
          {chordSegment.notes.map((note, index) => {
            return (
              <Note
                key={index}
                note={note}
                noteId={index + 1}
                nextNote={nextNote(index)}
                noteCount={chordSegment.notes.length}
                chord={chord}
                scale={scale}
                scrollLeft={scrollLeft}
                onScroll={onScroll}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChordSegment;
