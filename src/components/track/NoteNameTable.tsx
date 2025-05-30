"use client";

import PopupOnClick from "@/components/common/PopupOnClick";
import { getFunctionalHarmonyFilter } from "@/utils/functionalHarmonyFilter";
import { functionalHarmonyInfo } from "@/utils/harmonyUtil";
import { playNoteSound } from "@/utils/noteSoundPlayer";
import { getScaleNoteNames } from "@/utils/scaleUtil";
import Image from "next/image";
import React from "react";

export type NoteNameTableProps = {
  scaleKey: string;
};

const NoteNameTable: React.FC<NoteNameTableProps> = ({ scaleKey }) => {
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
                  trigger={<span>{functionalHarmonyInfo(degree).roman}</span>}
                  popup={
                    <>
                      <Image
                        src={`/functional_harmony/${functionalHarmony}.drawio.svg`}
                        alt={`${functionalHarmony}`}
                        width={16}
                        height={16}
                        style={{ filter: getFunctionalHarmonyFilter(functionalHarmony) }}
                      />
                      <span style={{ marginLeft: -4 }}>{functionalHarmonyInfo(degree).desc}</span>
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
                  <button
                    style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                    onClick={() => playNoteSound(noteWithOctave, 1.5)}
                  >
                    {note}
                  </button>
                </td>
              );
            });
          })()}
        </tr>
      </tbody>
    </table>
  );
};

export default NoteNameTable;
