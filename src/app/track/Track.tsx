"use client";

import React from "react";
import Image from "next/image";
import CircleOfFifths from "./CircleOfFifths";
import Section from "./Section";
import { TrackType } from "./model";
import { scaleText, getScalePitches, getScaleCodes } from "./util";
import { loadTrackFromYamlUrl } from "./trackLoader";

type TrackProps = object;

const Track: React.FC<TrackProps> = (props) => {
  const {} = props;

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
      const track = await loadTrackFromYamlUrl("/track1.yaml");
      if (track) {
        setTracks((prev) => [...prev, track]);
      }
    };
    loadTrack();
  }, []);

  return (
    <>
      <p style={{ marginBottom: 16, fontSize: "1.4rem", fontStyle: "italic" }}>{track.title}</p>
      {track.cover && <Image src={track.cover} alt="cover" width={100} height={100} />}
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
        <p style={{ width: "100%", lineHeight: 1, textAlign: "left" }}>{track.artist}</p>
        <p style={{ width: "100%", lineHeight: 1, textAlign: "center" }}>{track.album}</p>
        <p style={{ width: "100%", lineHeight: 1, textAlign: "right" }}>{track.year}</p>
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
        <p style={{ width: "100%", lineHeight: 1, textAlign: "left" }}>
          {track.time_signature} <span style={{ color: "#888888" }}>time</span>
        </p>
        <p style={{ width: "100%", lineHeight: 1, textAlign: "right" }}>
          {track.bpm} <span style={{ color: "#888888" }}>BPM</span>
        </p>
      </div>
      <div>
        <p>{scaleText(track.scale)}</p>
        <div style={{ width: 100, marginTop: 4, marginLeft: "auto", marginRight: "auto" }}>
          <CircleOfFifths scale={track.scale} />
        </div>
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
          color: "#888888",
        }}
      >
        {track.remarks.map((remark, index) => {
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
          margin: "0 auto",
          marginTop: 24,
          padding: 4,
          width: 200,
          border: "1px solid #333333",
        }}
      >
        <ul>
          {track.sections.map((section, index) => {
            return (
              <li key={index}>
                <a
                  href={`#${section.name}`}
                  style={{
                    fontFamily: "'UnifrakturCook', 'Old English Text MT', 'IM Fell English', cursive",
                    fontSize: "1.2em",
                    letterSpacing: "0.05em",
                  }}
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
        {track.sections.map((section, index) => {
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
