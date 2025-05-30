"use client";

import { NoteType } from "@/schemas/trackSchema";
import { getLine } from "@/utils/noteUtil";
import React from "react";

const drawLines = (context: CanvasRenderingContext2D) => {
  context.strokeStyle = "#999999";

  const isWindows = navigator.userAgent.includes("Windows");
  context.lineWidth = isWindows ? 3 : 1;

  for (let i = 0; i < 3; i++) {
    const y = 40 + i * 20;
    context.beginPath();
    context.moveTo(20, y);
    context.lineTo(220, y);
    context.stroke();
  }

  context.beginPath();
  context.moveTo(130, 100);
  context.lineTo(190, 100);
  context.stroke();

  for (let i = 0; i < 5; i++) {
    const y = 120 + i * 20;
    context.beginPath();
    context.moveTo(20, y);
    context.lineTo(220, y);
    context.stroke();
  }

  context.beginPath();
  context.moveTo(130, 220);
  context.lineTo(190, 220);
  context.stroke();

  for (let i = 0; i < 3; i++) {
    const y = 240 + i * 20;
    context.beginPath();
    context.moveTo(20, y);
    context.lineTo(220, y);
    context.stroke();
  }

  // circle
  context.beginPath();
  context.arc(60, 50, 4, 0, Math.PI * 2);
  context.arc(60, 70, 4, 0, Math.PI * 2);
  context.arc(60, 130, 4, 0, Math.PI * 2);
  context.arc(60, 150, 4, 0, Math.PI * 2);
  context.fillStyle = "#555555";
  context.fill();

  // C
  context.fillStyle = "#555555";
  context.font = "32px Arial";
  {
    const text = "C2";
    const textWidth = context.measureText(text).width;
    context.fillText(text, 250 - textWidth / 2, 250);
  }

  {
    const text = "C3";
    const textWidth = context.measureText(text).width;
    context.fillText(text, 250 - textWidth / 2, 180);
  }

  {
    const text = "C4";
    const textWidth = context.measureText(text).width;
    context.fillText(text, 250 - textWidth / 2, 110);
  }
};

const drawNote = (context: CanvasRenderingContext2D, note: NoteType, next: boolean = false) => {
  if (!note.pitch) {
    return;
  }

  let line = getLine(note.pitch);
  if (line === null) {
    // 不正なpitchの場合は描画しない
    return;
  }

  if (note.pitch.includes("＃")) {
    line -= 0.5;
  } else if (note.pitch.includes("♭")) {
    line += 0.5;
  }

  const y = 290 - line * 10; // 145→290, 5→10
  const x = 160; // 80→160

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

    // ＃、♭
    let text = "";
    if (note.pitch.includes("＃")) {
      text = "＃";
    } else if (note.pitch.includes("♭")) {
      text = "♭";
    }

    context.fillStyle = "rgba(0, 200, 255, 1)";
    context.font = "36px Arial";
    const textWidth = context.measureText(text).width;
    context.fillText(text, x - 36 - textWidth / 2, y);
  } else {
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2); // 5→10

    context.fillStyle = "white";
    context.fill();

    // ＃、♭
    let text = "";
    if (note.pitch.includes("＃")) {
      text = "＃";
    } else if (note.pitch.includes("♭")) {
      text = "♭";
    }

    context.fillStyle = "#999999";
    context.font = "36px Arial";
    const textWidth = context.measureText(text).width;
    context.fillText(text, x - 36 - textWidth / 2, y);
  }
};

type StaffProps = {
  note: NoteType;
  nextNote?: NoteType | null;
};

const Staff: React.FC<StaffProps> = (props) => {
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
        width: 270,
        aspectRatio: "270 / 300",
        maxWidth: "100%",
      }}
    >
      <canvas
        ref={bgCanvasRef}
        width={270}
        height={300}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 1, width: "100%", height: "100%" }}
      />
      <canvas
        ref={fgCanvasRef}
        width={270}
        height={300}
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

export default Staff;
