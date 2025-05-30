"use client";

import { NoteType } from "@/schemas/trackSchema";
import { getLine } from "@/utils/noteUtil";
import React from "react";

const drawLines = (context: CanvasRenderingContext2D) => {
  context.strokeStyle = "#999999";

  const isWindows = navigator.userAgent.includes("Windows");
  context.lineWidth = isWindows ? 2 : 1;

  for (let i = 0; i < 24; i++) {
    const x = 20 + i * 20;
    context.beginPath();
    context.moveTo(x, 40);
    context.lineTo(x, 200);
    context.stroke();
  }

  context.fillStyle = "#555555";
  context.fillRect(14, 40, 12, 80);

  for (let i = 0; i < 3; i++) {
    const x = 54 + i * 20;
    context.fillRect(x, 40, 12, 80);
  }
  for (let i = 0; i < 2; i++) {
    const x = 134 + i * 20;
    context.fillRect(x, 40, 12, 80);
  }
  for (let i = 0; i < 3; i++) {
    const x = 194 + i * 20;
    context.fillRect(x, 40, 12, 80);
  }
  for (let i = 0; i < 2; i++) {
    const x = 274 + i * 20;
    context.fillRect(x, 40, 12, 80);
  }
  for (let i = 0; i < 3; i++) {
    const x = 334 + i * 20;
    context.fillRect(x, 40, 12, 80);
  }
  for (let i = 0; i < 2; i++) {
    const x = 414 + i * 20;
    context.fillRect(x, 40, 12, 80);
  }
  context.fillRect(474, 40, 12, 80);

  // circle
  context.beginPath();
  context.arc(410, 180, 4, 0, Math.PI * 2);
  context.fillStyle = "#555555";
  context.fill();

  // C
  context.fillStyle = "#555555";
  context.font = "20px Arial";
  {
    const text = "C2";
    const textWidth = context.measureText(text).width;
    context.fillText(text, 130 - textWidth / 2, 225);
  }

  {
    const text = "C3";
    const textWidth = context.measureText(text).width;
    context.fillText(text, 270 - textWidth / 2, 225);
  }

  {
    const text = "C4";
    const textWidth = context.measureText(text).width;
    context.fillText(text, 410 - textWidth / 2, 225);
  }
};

const drawNote = (context: CanvasRenderingContext2D, note: NoteType, next: boolean = false) => {
  if (!note.pitch) {
    return;
  }

  const line = getLine(note.pitch);
  if (line === null) {
    // 不正なpitchの場合は描画しない
    return;
  }

  const x = 30 + line * 20; // 15→30, 10→20

  let y = 160; // 80→160
  if (!Number.isInteger(line)) {
    y = 80; // 40→80
  }

  if (next) {
    context.beginPath();
    context.shadowBlur = 10; // 5→10
    context.shadowColor = "rgba(0, 200, 255, 1)";
    context.arc(x, y, 10, 0, Math.PI * 2); // 5→10
    context.fillStyle = "rgba(0, 200, 255, 0.2)";
    context.fill();

    // ぼかしをリセット
    context.shadowBlur = 0;
    context.shadowColor = "transparent";
  } else {
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2); // 5→10
    context.fillStyle = "white";
    context.fill();
  }
};

type KeyboardProps = {
  note: NoteType;
  nextNote?: NoteType | null;
};

const Keyboard: React.FC<KeyboardProps> = (props) => {
  const { note, nextNote = null } = props;
  const bgCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const fgCanvasRef = React.useRef<HTMLCanvasElement>(null);

  // 背景は初回のみ描画
  React.useEffect(() => {
    if (!bgCanvasRef.current) {
      return;
    }
    const canvas = bgCanvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) {
      console.error("2D context not available");
      return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawLines(context);
  }, []);

  // ノートはnote/nextNote変更時のみ描画
  React.useEffect(() => {
    if (!fgCanvasRef.current) {
      return;
    }
    const canvas = fgCanvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) {
      console.error("2D context not available");
      return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (nextNote) {
      drawNote(context, nextNote, true);
    }
    drawNote(context, note);
  }, [note, nextNote]);

  return (
    <div
      style={{
        position: "relative",
        width: 500,
        aspectRatio: "500 / 230",
        maxWidth: "100%",
      }}
    >
      <canvas
        ref={bgCanvasRef}
        width={500}
        height={230}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 1, width: "100%", height: "100%" }}
      />
      <canvas
        ref={fgCanvasRef}
        width={500}
        height={230}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 2,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default Keyboard;
