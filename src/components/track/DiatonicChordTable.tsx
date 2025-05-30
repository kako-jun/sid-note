"use client";

import PopupOnClick from "@/components/common/PopupOnClick";
import { getChordPositions } from "@/utils/chordUtil";
import { getFunctionalHarmonyFilter } from "@/utils/functionalHarmonyFilter";
import { romanNumeralHarmonyInfo } from "@/utils/harmonyUtil";
import { playChord, playNoteSound } from "@/utils/noteSoundPlayer";
import { getScaleDiatonicChords } from "@/utils/scaleUtil";
import Image from "next/image";
import React from "react";

export type DiatonicChordTableProps = {
  scaleKey: string;
};

const DiatonicChordTable: React.FC<DiatonicChordTableProps> = ({ scaleKey }) => {
  return (
    <table
      style={{
        marginTop: 16,
        marginLeft: "5%",
        marginRight: "5%",
        width: "90%",
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
                  trigger={
                    <span style={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}>
                      {romanNumeralHarmonyInfo(degree).roman}
                    </span>
                  }
                  popup={
                    <>
                      <Image
                        src={`/functional_harmony/${functionalHarmony}.drawio.svg`}
                        alt={`${functionalHarmony}`}
                        width={16}
                        height={16}
                        style={{ filter: getFunctionalHarmonyFilter(functionalHarmony) }}
                      />
                      <span style={{ marginLeft: -4 }}>{romanNumeralHarmonyInfo(degree).desc}</span>
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
          <td
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
                  lineHeight: 1,
                  fontSize: "0.75rem",
                }}
              >
                <PopupOnClick
                  trigger={
                    <button style={{ cursor: "pointer", whiteSpace: "nowrap" }} onClick={() => playChord(chord)}>
                      {chord}
                    </button>
                  }
                  popup={
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

export default DiatonicChordTable;
