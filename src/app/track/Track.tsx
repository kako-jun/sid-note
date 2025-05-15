"use client";

import React from "react";
import Image from "next/image";
import CircleOfFifths from "./CircleOfFifths";
import Measure from "./Measure";
import { scaleText, getScalePitches, getScaleCodes } from "./util";
import { track } from "./track1";

type TrackProps = object;

const Track: React.FC<TrackProps> = (props) => {
  const {} = props;

  return (
    <>
      <p style={{ marginBottom: 16, fontSize: "1.4rem", fontStyle: "italic" }}>{track.title}</p>
      {track.cover && <Image src={track.cover} alt="cover" width={100} height={100} />}
      <div
        style={{
          marginLeft: "20%",
          marginRight: "20%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <p>{track.artist}</p>
        <p>{track.album}</p>
        <p>{track.year}</p>
      </div>
      <div
        style={{
          marginTop: 16,
          marginLeft: "20%",
          marginRight: "20%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <p>
          {track.time_signature} <span style={{ color: "#888888" }}>time</span>
        </p>
        <p>
          {track.bpm} <span style={{ color: "#888888" }}>BPM</span>
        </p>
      </div>
      <div>
        <p>{scaleText(track.scale)}</p>
        <div style={{ width: 100, marginTop: 2, marginLeft: "auto", marginRight: "auto" }}>
          <CircleOfFifths scale={track.scale} />
        </div>
        <table
          style={{
            marginLeft: "20%",
            marginRight: "20%",
            width: "60%",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr style={{ color: "#888888" }}>
              <td></td>
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
              <td style={{ color: "#888888" }}>Pitch</td>
              {getScalePitches(track.scale).map((pitch, index) => (
                <td key={index}>{pitch}</td>
              ))}
            </tr>
            <tr>
              <td style={{ color: "#888888" }}>Code</td>
              {getScaleCodes(track.scale).map((code, index) => (
                <td key={index}>{code}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 16, color: "#888888" }}>
        {track.remarks.map((remark, index) => {
          return (
            <ul
              key={index}
              style={{
                marginLeft: "10%",
                marginRight: "10%",
              }}
            >
              <li>{remark}</li>
            </ul>
          );
        })}
      </div>
      <div
        style={{
          margin: 8,
          marginTop: 32,
          marginBottom: 32,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {track.measures.map((measure, index) => {
          return (
            <Measure
              key={index}
              measure={measure}
              prevMeasure={track.measures[index - 1] || null}
              nextMeasure={track.measures[index + 1] || null}
              measureId={index + 1}
              measureCount={track.measures.length}
              scale={track.scale}
            />
          );
        })}
      </div>
    </>
  );
};

export default Track;
