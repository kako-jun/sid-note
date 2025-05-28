"use client";

import PopupOnClick from "@/components/common/PopupOnClick";
import { getChordPositions } from "@/utils/chordUtil";
import { getFunctionalHarmonyFilter } from "@/utils/functionalHarmonyFilter";
import { functionalHarmonyIcon } from "@/utils/harmonyUtil";
import { playChord, playNoteSound } from "@/utils/noteSoundPlayer";
import { getScaleDiatonicChords, getScaleDiatonicChordsWith7th, getScaleNoteNames } from "@/utils/scaleUtil";
import Image from "next/image";
import React from "react";

export type TrackPopupTableProps = {
  scaleKey: string;
};

const TrackPopupTable: React.FC<TrackPopupTableProps> = ({ scaleKey }) => {
  return (
    <table
      style={{
        marginTop: 8,
        marginLeft: "10%",
        marginRight: "10%",
        width: "80%",
        tableLayout: "fixed",
      }}
    >
      <thead>
        <tr style={{ color: "#888888" }}>
          <td width={100}></td>
          {[1, 2, 3, 4, 5, 6, 7].map((degree) => {
            const functionalHarmony = degree;
            return (
              <td key={degree} style={{ cursor: "pointer", position: "relative" }}>
                <PopupOnClick
                  trigger={<span>{"ⅠⅡⅢⅣⅤⅥⅦ"[degree - 1]}</span>}
                  popup={
                    <>
                      <Image
                        src={`/functional_harmony/${functionalHarmony}.drawio.svg`}
                        alt={`${functionalHarmony}`}
                        width={16}
                        height={16}
                        style={{ filter: getFunctionalHarmonyFilter(functionalHarmony) }}
                      />
                      <span style={{ marginLeft: -4 }}>{functionalHarmonyIcon(degree).desc}</span>
                    </>
                  }
                  popupStyle={{
                    padding: "6px 28px 6px 12px",
                  }}
                />
              </td>
            );
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ color: "#888888", fontSize: "0.75rem" }}>Note Name</td>
          {(() => {
            const noteNames = getScaleNoteNames(scaleKey);
            let octave = 2;
            return noteNames.map((note, i) => {
              if (note.startsWith("C")) {
                octave = 3;
              }
              const noteWithOctave = `${note}${octave}`;
              return (
                <td key={i}>
                  <button style={{ cursor: "pointer" }} onClick={() => playNoteSound(noteWithOctave, 1.5)}>
                    {note}
                  </button>
                </td>
              );
            });
          })()}
        </tr>
        <tr>
          <td
            rowSpan={3}
            style={{
              color: "#888888",
              fontSize: "0.75rem",
              lineHeight: 1,
            }}
          >
            Diatonic Chord
          </td>
          {getScaleDiatonicChords(scaleKey).map((chord, index) => {
            const chordPitches = Array.from(
              new Set(getChordPositions(chord).map((pos) => pos.pitch.replace(/\d+$/, "")))
            );
            return (
              <td
                key={index}
                style={{
                  paddingTop: 4,
                  color: "#888888",
                  lineHeight: 1,
                  fontSize: "0.75rem",
                }}
              >
                <PopupOnClick
                  trigger={
                    <button style={{ cursor: "pointer" }} onClick={() => playChord(chord)}>
                      {chord}
                    </button>
                  }
                  popup={
                    <div>
                      <span>{chordPitches.join(", ")}</span>
                    </div>
                  }
                />
              </td>
            );
          })}
        </tr>
        <tr style={{ height: 4 }}></tr>
        <tr>
          {getScaleDiatonicChordsWith7th(scaleKey).map((chord, index) => {
            const chordPitches = Array.from(
              new Set(getChordPositions(chord).map((pos) => pos.pitch.replace(/\d+$/, "")))
            );
            return (
              <td
                key={index}
                className={index % 2 === 1 ? "diatonic-chord-mobile-odd" : "diatonic-chord-mobile-even"}
                style={{
                  color: "#888888",
                  fontSize: "0.75rem",
                }}
              >
                <PopupOnClick
                  trigger={
                    <button style={{ cursor: "pointer" }} onClick={() => playChord(chord)}>
                      {chord}
                    </button>
                  }
                  popup={
                    <div>
                      <span>{chordPitches.join(", ")}</span>
                    </div>
                  }
                />
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default TrackPopupTable;
