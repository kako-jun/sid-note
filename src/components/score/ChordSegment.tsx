"use client";

import PopupOnClick from "@/components/common/PopupOnClick";
import { RemarkList } from "@/components/common/RemarkList";
import Left from "@/components/performance/Left";
import Note from "@/components/score/Note";
import { ChordSegmentType, LeftType, NoteType } from "@/schemas/trackSchema";
import { getChordPositions } from "@/utils/chordUtil";
import { getFunctionalHarmonyFilter } from "@/utils/functionalHarmonyFilter";
import {
  cadenceText,
  functionalHarmonyText,
  getFunctionalHarmony,
  romanNumeral7thHarmonyInfo,
  romanNumeralHarmonyInfo,
} from "@/utils/harmonyUtil";
import { playChord, playNoteSound } from "@/utils/noteSoundPlayer";
import { comparePitch } from "@/utils/noteUtil";
import { getScaleDiatonicChords, scaleText } from "@/utils/scaleUtil";
import Image from "next/image";
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

  const scaleWithModulation = React.useMemo(() => {
    return chordSegment.key ? chordSegment.key : scale;
  }, [scale, chordSegment.key]);

  const isScaleChord = React.useMemo(() => {
    const chords = getScaleDiatonicChords(scaleWithModulation);
    return chords.includes(chord);
  }, [scaleWithModulation, chord]);

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

  const [windowWidth, setWindowWidth] = React.useState(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const leftWidth = React.useMemo(() => {
    if (windowWidth === 0) return 1000;
    const a = (2000 - 1400) / (1000 - 500);
    const b = 1400;
    return Math.max(1400, Math.min(2000, b + (windowWidth - 500) * a));
  }, [windowWidth]);

  // SSRとクライアントの不一致を防ぐため、初期値は固定し、マウント後にランダム値をセット
  const [flipX, setFlipX] = React.useState(1);
  const [flipY, setFlipY] = React.useState(1);
  const [rotate180, setRotate180] = React.useState(0);

  React.useEffect(() => {
    setFlipX(Math.random() < 0.5 ? -1 : 1);
    setFlipY(Math.random() < 0.5 ? -1 : 1);
    setRotate180(Math.random() < 0.5 ? 180 : 0);
  }, []);

  const functionalHarmony = React.useMemo(() => {
    return getFunctionalHarmony(scaleWithModulation, chord);
  }, [scaleWithModulation, chord]);

  const prevFunctionalHarmony = React.useMemo(() => {
    if (!prevSegment) {
      return 0;
    }

    const prevChord = prevSegment.on && prevSegment.on !== "" ? prevSegment.on : prevSegment.chord;
    return getFunctionalHarmony(scaleWithModulation, prevChord);
  }, [scaleWithModulation, prevSegment]);

  return (
    <section
      style={{
        padding: 8,
        paddingBottom: 16,
        background: "#111111",
        textAlign: "left",
        clipPath: "polygon(0% 0%, 50% 1%, 100% 0%, 100% 100%, 50% 99%, 0% 100%)", // 上下の中央を引っ込める形状
        boxShadow: "inset 0 0 40px 1px #333333",
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
          opacity: 0.05,
          zIndex: 0,
          transform: `scale(${flipX}, ${flipY}) rotate(${rotate180}deg)`,
        }}
        priority
      />
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
        {chordSegment.key && (
          <p style={{ lineHeight: 1, textAlign: "center", fontSize: "0.75rem" }}>
            Modulation: {scaleText(chordSegment.key)}
          </p>
        )}
        <p style={{ lineHeight: 1, textAlign: "right", fontSize: "0.75rem" }}>
          <span style={{ color: "#888888" }}>
            {prevSegment &&
              `${functionalHarmonyText(prevFunctionalHarmony) || "Non-Diatonic"} → ${
                functionalHarmonyText(functionalHarmony) || "Non-Diatonic"
              }`}
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
          <div style={{ flex: 1, lineHeight: 1, textAlign: "left", marginTop: -4 }}>
            {/* コード名ボタンをPopupOnClickでラップし、構成音をポップアップ表示 */}
            <PopupOnClick
              trigger={
                <button style={{ cursor: "pointer" }} onClick={() => playChord(chord)}>
                  {chordSegment.chord}
                  {chordSegment.on && ` on ${chordSegment.on}`}
                </button>
              }
              popup={(() => {
                const chordPitches = Array.from(
                  new Set(getChordPositions(chord).map((pos) => pos.pitch.replace(/\d+$/, "")))
                );
                return (
                  <span>
                    {chordPitches.map((pitch, i) => (
                      <React.Fragment key={pitch}>
                        <button style={{ cursor: "pointer" }} onClick={() => playNoteSound(pitch + "3", 1.5)}>
                          {pitch}
                        </button>
                        {i < chordPitches.length - 1 && ", "}
                      </React.Fragment>
                    ))}
                  </span>
                );
              })()}
              popupStyle={{
                left: 0,
                transform: "none",
              }}
            />
            {functionalHarmony > 0 && (
              <PopupOnClick
                trigger={
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "end",
                      gap: 4,
                      color: "#888888",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    <span>: {functionalHarmonyText(functionalHarmony)}</span>
                    <Image
                      src={`/functional_harmony/${functionalHarmony}.drawio.svg`}
                      alt={`${functionalHarmony}`}
                      width={16}
                      height={16}
                      style={{ filter: getFunctionalHarmonyFilter(functionalHarmony) }}
                    />
                  </span>
                }
                popup={
                  <span>
                    {chord.match(/7|M7|m7|dim7|aug7|sus7|add7/)
                      ? romanNumeral7thHarmonyInfo(functionalHarmony).desc
                      : romanNumeralHarmonyInfo(functionalHarmony).desc}
                  </span>
                }
                popupStyle={{
                  left: 0,
                  transform: "none",
                }}
              />
            )}
          </div>
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
              whiteSpace: "nowrap",
            }}
            onScroll={(e) => onScroll((e.target as HTMLDivElement).scrollLeft)}
            ref={(el) => {
              if (el && el.scrollLeft !== scrollLeft) el.scrollLeft = scrollLeft;
            }}
          >
            <div style={{ width: leftWidth, display: "inline-block" }}>
              <Left note={getChordNote(chord)} scrollLeft={scrollLeft} onScroll={onScroll} />
            </div>
          </div>
        </div>
        <RemarkList remarks={chordSegment.remarks ?? []} showBullet={false} />
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
                scale={scaleWithModulation}
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
