"use client";

import { RemarkList } from "@/components/common/RemarkList";
import Keyboard from "@/components/performance/Keyboard";
import Left from "@/components/performance/Left";
import Right from "@/components/performance/Right";
import Staff from "@/components/performance/Staff";
import { NoteType } from "@/schemas/trackSchema";
import { getChordPositions, getInterval } from "@/utils/chordUtil";
import { isChromaticNote } from "@/utils/chromaticUtil";
import { getChordToneLabel } from "@/utils/harmonyUtil";
import { playNoteSound } from "@/utils/noteSoundPlayer";
import { comparePitch, valueText } from "@/utils/noteUtil";
import Image from "next/image";
import React from "react";

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
      return positions.some((pos) => comparePitch(pos.pitch, pitch));
    },
    [chord]
  );

  const [windowWidth, setWindowWidth] = React.useState(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useMemoでscoreWidthを計算
  const scoreWidth = React.useMemo(() => {
    if (windowWidth === 0) return 1000;
    const a = 2.5;
    const b = 1000;
    return Math.max(820, Math.min(2000, b + (windowWidth - 500) * a));
  }, [windowWidth]);

  // ランダムで左右反転・上下反転・180度回転（初回のみ）
  const flipX = React.useMemo(() => (Math.random() < 0.5 ? -1 : 1), []);
  const flipY = React.useMemo(() => (Math.random() < 0.5 ? -1 : 1), []);
  const rotate180 = React.useMemo(() => (Math.random() < 0.5 ? 180 : 0), []);

  return (
    <section
      style={{
        padding: 8,
        background: "#222222",
        textAlign: "left",
        clipPath: "polygon(0% 0%, 50% 2%, 100% 0%, 100% 100%, 50% 98%, 0% 100%)", // 上下の中央を引っ込める形状
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
          marginBottom: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "start",
          gap: 8,
        }}
      >
        <p>
          <span style={{ color: "#888888" }}>Note </span>
          {noteId}
          <span style={{ color: "#888888" }}> of {noteCount}</span>
        </p>
        <div style={{ marginTop: -2 }}>
          {note.tags?.map((tag, index) => {
            const color = tag === "easy" ? "rgba(0, 200, 255, 0.2)" : tag === "hard" ? "#882222" : "black";
            return (
              <span
                key={index}
                style={{
                  color: "#888888",
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
          <p style={{ flex: 1, lineHeight: 1, textAlign: "left" }}>
            <button
              style={{
                cursor: "pointer",
              }}
              onClick={() => playNoteSound(note.pitch, 1.5)}
            >
              {note.pitch}
            </button>
          </p>
          <p
            style={{
              marginTop: -2,
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
              <Image
                src={`/note/${note.value}.drawio.svg`}
                alt={note.value}
                width={16}
                height={16}
                style={{
                  filter: "invert(100%)",
                }}
              />
            </span>
            <span>{valueText(note.value)}</span>
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
            <RemarkList remarks={note.remarks ?? []} showBullet={false} />
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
              <div style={{ width: 81, marginTop: -12 }}>
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
