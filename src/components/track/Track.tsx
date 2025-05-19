"use client";

import React from "react";
import Image from "next/image";
import CircleOfFifths from "@/components/track/CircleOfFifths";
import Section from "@/components/score/Section";
import { TrackType } from "@/models/model";
import { scaleText, getScalePitches, getScaleCodes } from "@/utils/util";
import { loadTrackFromYamlUrl } from "@/utils/trackLoader";
import { Jacquard_24 } from "next/font/google";

const Jacquard_24_400 = Jacquard_24({
  weight: "400",
  preload: false,
});

type TrackProps = {
  trackId: number;
};

const Track: React.FC<TrackProps> = ({ trackId }) => {
  const [tracks, setTracks] = React.useState<TrackType[]>([]);

  const track = React.useMemo(() => {
    if (tracks.length > 0) {
      return tracks[0];
    }

    return {
      title: "",
      artist: "",
      album: "",
      year: "",
      time_signature: "",
      bpm: 0,
      scale: "",
      cover: "",
      remarks: [],
      sections: [],
    };
  }, [tracks]);

  React.useEffect(() => {
    const loadTrack = async () => {
      const track = await loadTrackFromYamlUrl(`/track${trackId}.yaml`);
      if (track) {
        setTracks((prev) => [...prev, track]);
      }
    };
    loadTrack();
  }, [trackId]);

  return (
    <>
      <p style={{ fontSize: "1.4rem", fontStyle: "italic" }}>{track.title}</p>
      <div
        style={{
          marginTop: 8,
          marginBottom: 16,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {track.cover && <Image src={`/${track.cover}`} alt="cover" width={320} height={100} />}
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
        }}
      >
        <p style={{ flex: 2, lineHeight: 1, textAlign: "left" }}>{track.artist}</p>
        <p style={{ flex: 2, lineHeight: 1, textAlign: "center" }}>{track.album}</p>
        <p style={{ flex: 1, lineHeight: 1, textAlign: "right" }}>{track.year}</p>
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
          {track.time_signature} <span style={{ color: "#888888" }}>time</span>
        </p>
        <p style={{ flex: 1, lineHeight: 1, textAlign: "right" }}>
          {track.bpm} <span style={{ color: "#888888" }}>BPM</span>
        </p>
      </div>
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
              <td width={110}></td>
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
              <td style={{ color: "#888888" }}>Note Name</td>
              {getScalePitches(track.scale).map((pitch, index) => (
                <td key={index}>{pitch}</td>
              ))}
            </tr>
            <tr>
              <td style={{ color: "#888888", lineHeight: 1 }}>Diatonic Code</td>
              {getScaleCodes(track.scale).map((code, index) => (
                <td key={index} style={{ fontSize: "0.75rem" }}>
                  {code}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
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
      <div style={{ marginTop: 24, border: "1px solid #444444", display: "inline-block", padding: "4px 8px" }}>
        <ul>
          {track.sections?.map((section, index) => {
            return (
              <li key={index} style={{ paddingTop: 8, paddingBottom: 8 }}>
                <a
                  className={Jacquard_24_400.className}
                  href={`#${section.name}`}
                  style={{ fontSize: "1.25rem" }}
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
              <Section section={section} scale={track.scale} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Track;
