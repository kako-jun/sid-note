"use client";

import { Jacquard_24_400 } from "@/components/common/Font";
import Section from "@/components/score/Section";
import CircleOfFifths from "@/components/track/CircleOfFifths";
import { LeftType, TrackType } from "@/schemas/trackSchema";
import { getInterval } from "@/utils/chordUtil";
import { getScaleDiatonicChords, getScaleNoteNames, scaleText } from "@/utils/scaleUtil";
import { loadTrackFromYamlUrl } from "@/utils/trackLoader";
import Image from "next/image";
import React from "react";

type TrackProps = {
  trackId: number;
};

const Track: React.FC<TrackProps> = ({ trackId }) => {
  const [tracks, setTracks] = React.useState<TrackType[]>([]);
  // 横スクロール位置のstate
  const [scrollLeft, setScrollLeft] = React.useState(0);
  // スクロールイベントハンドラ
  const handleScroll = (left: number) => {
    setScrollLeft(left);
  };

  const track = React.useMemo(() => {
    if (tracks.length > 0) {
      return tracks[0];
    }

    const defaultTrack: TrackType = {
      title: "",
      artist: "",
      album: "",
      year: 0,
      timeSignature: "4/4",
      bpm: 0,
      scale: "",
      sections: [],
    };

    return defaultTrack;
  }, [tracks]);

  React.useEffect(() => {
    const loadTrack = async () => {
      const track = await loadTrackFromYamlUrl(`/track/track_${trackId}.yaml`);
      if (track) {
        const leftsWithInterval = (lefts: LeftType[], chord: string, pitch: string): LeftType[] => {
          return lefts.map((left) => {
            if (left.type === "press") {
              const interval = getInterval(chord, pitch);
              return { ...left, interval };
            }
            return left;
          });
        };

        // 各Sectionの各ChordSegmentの各NoteのleftsをleftsWithIntervalで上書き
        const updatedSections =
          track.sections?.map((section) => ({
            ...section,
            chordSegments:
              section.chordSegments?.map((chordSegment) => ({
                ...chordSegment,
                notes:
                  chordSegment.notes?.map((note) => {
                    const chord = chordSegment.on && chordSegment.on !== "" ? chordSegment.on : chordSegment.chord;
                    return {
                      ...note,
                      lefts: leftsWithInterval(note.lefts, chord, note.pitch),
                    };
                  }) || [],
              })) || [],
          })) || [];
        setTracks((prev) => [...prev, { ...track, sections: updatedSections }]);
      }
    };
    loadTrack();
  }, [trackId]);

  if (track.title === "") {
    return <section>Loading ...</section>;
  }

  return (
    <section>
      <p style={{ fontSize: "1.25rem", fontStyle: "italic" }}>{track.title}</p>
      <div
        style={{
          marginTop: 8,
          marginBottom: 16,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {track.cover && (
          <div style={{ position: "relative", display: "inline-block", width: 320, height: 100 }}>
            <Image
              src={`/track/${track.cover}`}
              alt="cover"
              width={320}
              height={100}
              priority
              style={{ filter: "grayscale(1)", width: 320, height: 100, objectFit: "cover" }}
            />
            <Image
              src="/grunge_1.webp"
              alt="grunge texture"
              width={320}
              height={100}
              priority
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 320,
                height: 100,
                pointerEvents: "none",
                mixBlendMode: "multiply",
                opacity: 0.3,
              }}
            />
          </div>
        )}
      </div>
      <div
        style={{
          marginLeft: "10%",
          marginRight: "10%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "start",
          gap: 8,
          fontSize: "0.875rem",
        }}
      >
        <p style={{ flex: 2, lineHeight: 1, textAlign: "left" }}>{track.artist}</p>
        <p style={{ flex: 2, lineHeight: 1, textAlign: "center" }}>{track.album}</p>
        <p style={{ flex: 1, lineHeight: 1, textAlign: "right" }}>{track.year || ""}</p>
      </div>
      <div
        style={{
          marginTop: 16,
          marginLeft: "10%",
          marginRight: "10%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "start",
          gap: 8,
        }}
      >
        <p style={{ flex: 1, lineHeight: 1, textAlign: "left" }}>
          {track.timeSignature} <span style={{ color: "#888888" }}>time</span>
        </p>
        <p style={{ flex: 1, lineHeight: 1, textAlign: "right" }}>
          {track.bpm} <span style={{ color: "#888888" }}>BPM</span>
        </p>
      </div>
      {track.scale && (
        <div>
          <div style={{ width: 100, marginLeft: "auto", marginRight: "auto" }}>
            <CircleOfFifths scale={track.scale} />
          </div>
          <p style={{ marginTop: 2, marginBottom: 2 }}>{scaleText(track.scale)}</p>
          <table
            style={{
              marginLeft: "10%",
              marginRight: "10%",
              width: "80%",
              tableLayout: "fixed",
            }}
          >
            <thead>
              <tr style={{ color: "#888888" }}>
                <td width={100}></td>
                <td>Ⅰ</td>
                <td>Ⅱ</td>
                <td>Ⅲ</td>
                <td>Ⅳ</td>
                <td>Ⅴ</td>
                <td>Ⅵ</td>
                <td>Ⅶ</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: "#888888", fontSize: "0.75rem" }}>Note Name</td>
                {getScaleNoteNames(track.scale).map((noteName, index) => (
                  <td key={index}>{noteName}</td>
                ))}
              </tr>
              <tr>
                <td style={{ color: "#888888", fontSize: "0.75rem", lineHeight: 1 }}>Diatonic Chord</td>
                {getScaleDiatonicChords(track.scale).map((chord, index) => (
                  <td key={index} style={{ color: "#888888", lineHeight: 1, fontSize: "0.75rem" }}>
                    {chord}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div
        style={{
          marginLeft: "10%",
          marginRight: "10%",
          marginTop: 16,
          fontSize: "0.75rem",
          color: "#888888",
        }}
      >
        {track.remarks?.map((remark, index) => {
          return (
            <ul
              key={index}
              style={{
                textAlign: "left",
              }}
            >
              <li>{remark}</li>
            </ul>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 24,
          border: "1px solid #444444",
          display: "inline-block",
          padding: "4px 40px",
          position: "relative",
          background: "none",
        }}
      >
        {/* 四隅のcorner.webpを背景として表示 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 24,
            height: 24,
            backgroundImage: "url(/corner.webp)",
            backgroundSize: "cover",
            pointerEvents: "none",
            zIndex: 1,
            transform: "rotate(0deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 24,
            height: 24,
            backgroundImage: "url(/corner.webp)",
            backgroundSize: "cover",
            pointerEvents: "none",
            zIndex: 1,
            transform: "rotate(90deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 24,
            height: 24,
            backgroundImage: "url(/corner.webp)",
            backgroundSize: "cover",
            pointerEvents: "none",
            zIndex: 1,
            transform: "rotate(270deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 24,
            height: 24,
            backgroundImage: "url(/corner.webp)",
            backgroundSize: "cover",
            pointerEvents: "none",
            zIndex: 1,
            transform: "rotate(180deg)",
          }}
        />
        <ul>
          {track.sections?.map((section, index) => {
            return (
              <li key={index} style={{ paddingTop: 8, paddingBottom: 8 }}>
                <a
                  className={Jacquard_24_400.className}
                  href={`#${section.name}`}
                  style={{
                    fontSize: "1.25rem",
                    fontFamily: '"Jacquard 24", "Old English Text MT", serif',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                >
                  {section.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        style={{
          // margin: 8,
          marginTop: 32,
          marginBottom: 48,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {track.sections?.map((section, index) => {
          return (
            <div key={index} id={section.name}>
              <Section section={section} scale={track.scale} scrollLeft={scrollLeft} onScroll={handleScroll} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Track;
