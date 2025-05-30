import CornerBox from "@/components/common/CornerBox";
import { RemarkList } from "@/components/common/RemarkList";
import CircleOfFifths from "@/components/track/CircleOfFifths";
import NoteNameTable from "@/components/track/NoteNameTable";
import TrackSectionItem from "@/components/track/TrackSectionItem";
import TrackSections from "@/components/track/TrackSections";
import { TrackType } from "@/schemas/trackSchema";
import { scaleText } from "@/utils/scaleUtil";
import Image from "next/image";
import React from "react";
import DiatonicChord7thTable from "./DiatonicChord7thTable";
import DiatonicChordTable from "./DiatonicChordTable";

// TrackPropsをtrack: TrackTypeに変更
export type TrackProps = {
  track: TrackType;
};

const Track: React.FC<TrackProps> = ({ track }) => {
  if (!track || track.title === "") {
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
        <p style={{ flex: 1, lineHeight: 1, textAlign: "left" }}>{track.artist}</p>
        <p style={{ flex: 1, lineHeight: 1, textAlign: "center" }}>{track.album}</p>
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

      {track.key && (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircleOfFifths scale={track.key} />
          </div>
          <p style={{ marginTop: 2, marginBottom: 2 }}>{scaleText(track.key)}</p>
          <div>
            <NoteNameTable scaleKey={track.key} />
            <DiatonicChordTable scaleKey={track.key} />
            <DiatonicChord7thTable scaleKey={track.key} />
          </div>
        </>
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
        <RemarkList remarks={track.remarks ?? []} showBullet={false} style={{ textAlign: "left" }} />
      </div>
      <CornerBox style={{ marginTop: 24, padding: "4px 40px" }}>
        <ul>
          {track.sections?.map((section, index) => (
            <TrackSectionItem key={index} section={section} />
          ))}
        </ul>
      </CornerBox>
      {/* Sectionリスト部分をクライアントコンポーネントに分離 */}
      <TrackSections sections={track.sections} scale={track.key} />
      {/* Diatonic Chord テーブルのスマホ用スタイル */}
      <style>{`
        @media (max-width: 640px) {
          .diatonic-chord-mobile-odd {
            padding-top: 16px !important;
            padding-bottom: 0 !important;
          }
          .diatonic-chord-mobile-even {
            padding-bottom: 16px !important;
            padding-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Track;
